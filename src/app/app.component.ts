import { Component, ViewChild } from '@angular/core';
import { Config, MenuController, Platform, NavController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { UsernameServiceProvider } from '../providers/username-service/username-service';

import { SubmissionsProvider } from '../providers/submissions/submissions';
import { CacheService } from "ionic-cache";

import { ErrorLoggerProvider } from '../providers/error-logger/error-logger';


import { Geolocation } from '@ionic-native/geolocation';
import { EsriLoaderService } from "angular2-esri-loader";
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find'
PouchDB.plugin(PouchDBFind);


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') _NAV: NavController;

  rootPage: any;// = "IntroPage";

  // pages array for side menu navigation
  pages: Array<{ title: string, component: any, icon: string }>;

  public Username: any;
  public Colleague: any;
  public FirstName: any;
  public LastName: any;
  public TeamName: any;

  employee: any;

  employees:any;

  data: any;
  _DB: any;

  colleagueDetails = {
    "FirstName": "",
    "LastName": "",
    "Email": "",
    "Phone": "",
    "JobTitle": "",
    "Department": "",
    "Location": "",
    "Manager": "",
    "AboutMe": "",
    "SPSResponsibility": [],
    "Picture": ""
  };

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private config: Config,
    private ga: GoogleAnalytics,
    // private device: Device,
    private splashScreen: SplashScreen,
    private _MENU: MenuController,
    // public geodesy: GeodesyService,
    private storage: Storage,
    // private badge: Badge,
    public colleaguesService: UsernameServiceProvider,
    public alertCtrl: AlertController,
    public submissions: SubmissionsProvider,
    private geolocation: Geolocation,
    private esriLoader: EsriLoaderService,
    private cache: CacheService,
    public errorLogs: ErrorLoggerProvider
  ) {
    let shownIntropage = localStorage.getItem("shownIntro");
    if (shownIntropage != "true") {
      this.rootPage = "IntroPage";
    }
    else {
      this.rootPage = "HomePage";
    }
    this.cache.setDefaultTTL(60 * 60 * 24);

    ga.startTrackerWithId("");
    ga.enableUncaughtExceptionReporting(true).then((_success) => {
      console.log("Successful enabling of uncaught exception reporting " + _success)
    }).catch((_error) => {
      console.log("error occured " + _error)
    });

    submissions.initialiseDB();
    errorLogs.initialiseDB();
    this.employees = new PouchDB('');
        console.log('Employees are...');
        console.dir(this.employees);


    this.pages = [
      { title: 'Home', component: "HomePage", icon: 'ios-home-outline' },
      { title: 'About', component: "AboutPage", icon: 'ios-information-circle-outline' },
      { title: 'Profile', component: "ProfilePage", icon: 'ios-contact-outline' },
      { title: 'My Submissions', component: "TabsPage", icon: 'ios-create-outline' },
      { title: 'Support', component: "SupportPage", icon: 'ios-help-buoy-outline' }
    ];

    localStorage.setItem("submissionIntervalRunning", "false");
    localStorage.setItem("outboxPageSetIntervalRunning", "false");

    platform.ready().then(() => {

      this.getUserProfileDetails();

      this.getLocation();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  } // end constructor

  pageToLoad(page) {
    let link: string = page.link,
      name: string = page.name;

    this._NAV.setRoot(link, name);
    this._MENU.close();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.getUserProfileDetails();
    this._NAV.setRoot(page.component, page.component);

    this._MENU.close();
  }

  goHome() {
    this._NAV.setRoot("HomePage");
    this._MENU.close();
  }

  getLocation() {
    var me = this;
    this.geolocation.getCurrentPosition().then((position) => {

      if (position != null) {
        me.storage.set("lat", position.coords.latitude.toString());
        me.storage.set("long", position.coords.longitude.toString());
      }

    }).catch((error) => {
      alert(error.toString());
      console.log('Error getting location', error);
    });
  }


  getUserProfileDetails() {
    let cordova = (<any>window).cordova;

    // in browser
    if (!(this.platform.is('cordova') && cordova.airwatch)) {
      console.log(' - In browser, or plugin not found defaulting username')

      this.storage.set("firstName", "First Name")
      this.storage.set("lastName", "Last Name")
      this.storage.set("teamName", "Tom Name");
    }
    // on device
    else{
      let username = this.config.get('username'); 
      console.log(`username is...${username}`)

      console.log(' - On Device: Cordova Plugin found');

      cordova.airwatch.getUsername(username => {
        //username==colUsername?.toLowerCase()
        console.log(`username is ${username}`);
        if (typeof username === 'string') {
          var cleaned = username.toLowerCase().replace(/^stwater[\\]*/g, '');

          this.setKey('username', cleaned);
          console.log('username set to: ', cleaned);
          
          this.getNameFromUserName(username)
            .then((employees) => {
              console.log(employees);
              console.log('Found Employee a', employees.docs[0]);
              this.setKey('employee', employees.docs[0]);
            }).catch((err)=>{
              console.log('Error trying to find employee in Pouch', err);
            });
 }
      })
    }
  }

  setKey(key, val){
    this.config.set(key, val);
    this.storage.set(key, val);
  }

  getNameFromUserName(username) {
    // username = 'TBURTO2'

    // console.log(`Attempting to get Name username ${username}`);
    // this.employees.info((info) => {
    //   console.log('Got DB Connection to employees:, ', info);
    // })
    // console.log (this.employees.allDocs());
    // return this.employees.get('001cbeff1840421a921c4657d4a89082');
    


    console.log('Employee Details');
    console.log(' username up:',username.toUpperCase())
    console.log(' this.employees.find:',this.employees.find({
      selector: {'User Id': username.toUpperCase()}
  }))
    return this.employees.find({
        selector: {'User Id': username.toUpperCase()}

    });
    //.then (function (result) {
    //   console.log ('success')
    //   console.log (result)
    // },function (failure){
    //   console.log('failed')
    //   console.log(failure)});

    // let obj = this.employees.find(e => e.UserId === username);
    // console.log(`obj=${obj}`);
    // return obj;
  }



  // getUserDetails() {
  //   this.employee = this.config.get('employee');
  //   console.log('Found User ', this.employee);
  // }
}// end class