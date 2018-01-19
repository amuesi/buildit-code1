import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Config } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { UsernameServiceProvider } from '../../providers/username-service/username-service';
import { Storage } from '@ionic/storage';




@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  manager: string;

    loginParams = {
    "username":"",
    "password":""

    }

    
    public colUsername:string;

    public isMyProfile: boolean = false;

    public username: any;
    public Colleague: any;
    public FirstName: any;
    public LastName: any;
    public TeamName: any;
    public Department: any;
    public employee: any;

    public employees:any;
  
    public data: any;
    public _DB: any;


    colleagueDetails = {
      "FirstName":"",
      "LastName":"",
      "Email":"",
      "Phone":"",
      "JobTitle":"",
      "Department":"",
      "Location":"",
      "Manager":"",
      "AboutMe":"",
      "SPSResponsibility":[],
      "Picture":""
  }

  windowOpen(link) {
      window.open(link,'_blank')
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public colleaguesService: UsernameServiceProvider,
              public config:Config,
              private storage: Storage,
             ) {

  }

  ionViewDidLoad() {

    this.username = this.config.get('username');
    console.log('username',this.username);
    this.colUsername = this.config.get('username');
    this.getUserDetails();
    if(this.colUsername != null){
      this.isMyProfile = this.username == this.colUsername.toLowerCase();
  }


  // this.colleagueDetails = this.navParams.get('colleague');//.__zone_symbol__value;
  // this.manager = this.colleagueDetails.Manager
  // this.colleaguesService.getNameFromUsername(this.colleagueDetails.Manager)
  //   .then(res => {
  //     this.manager=(<any>res).FirstName+' '+(<any>res).LastName
  //   })
}

getUserDetails() {
this.employee = this.config.get('employee');
console.log('Found Employee ', this.employee);
//  this.colleaguesService.search(query,1)
//      .then(data => {this.navCtrl.push(this.resultsPage, {colleagues:(<any>data).Items, count:(<any>data).TotalAvailable, backText: this.colleagueDetails.FirstName, query})})
}


}