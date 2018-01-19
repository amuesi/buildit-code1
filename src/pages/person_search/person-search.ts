import { Component,OnInit } from '@angular/core';
import {
  NavController, NavParams, ToastController, LoadingController, ViewController, AlertController, IonicPage,
  Events
} from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import {  ApplicationDataProvider } from '../../providers/application-data/application-data';
import { Http } from '@angular/http';
import {SafetyIncidentPage} from "../safety-incident/safety-incident";
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";



@IonicPage()
@Component({
  selector: 'page-person-search',
  templateUrl: 'person-search.html',
})

export class PersonSearchPage implements OnInit{

  // page member properties

  searchTerm: string = '';
  public flocSearchControl: FormControl;
  public items = [];
  // public flocLocations: FlocLocation[];
  public searching: any = false;

  // public users: FlocLocation[];
  // public originalItems: FlocLocation[];
  public selectedLocation:any;

  // Loading component
  public loading : any;
  public mapitems :any;
  public initialitems :any;
  public start = 0;
  // public lat:number;
  // public long:number;
  // public X:number;
  // public Y:number;
  pageName:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private http:Http,
              private ev: Events,
              public flocLocationsData: ApplicationDataProvider,
              public cache: CacheService
  ) {
    /*
     floc stuff
     */
    // previousPageName
    this.ev.subscribe('previousPageName1', pagename => {
      this.pageName = pagename;

    });
    this.getFlocListData();

  }// end constructor

  ngOnInit(){
    // this.storage.get('X').then((val) => {
    //   if (val != null) {
    //     this.X = parseFloat( val);
    //   }
    // });
    // this.storage.get('Y').then((val) => {
    //   if (val != null) {
    //     this.Y = parseFloat( val);
    //
    //     if (this.X != null){
    //       this.getFlocListData();
    //     }
    //   }
    // });
    // this.storage.get('long').then((val) => {
    //   if (val != null) {
    //     this.long = parseFloat( val);
    //   }
    // });
    // this.storage.get('lat').then((val) => {
    //   if (val != null) {
    //     this.lat = parseFloat( val);
    //   }
    // });
  }


  ionViewWillEnter() {
    // Starts the process

    // this.getFlocListData();

  }

  public showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    // Show the loading page
    this.loading.present();
  }

  public hideLoading(){
    // Hide the loading component
    this.loading.dismiss();
  }


  ionViewDidLoad(){

  }

  //////////////////////////////// sort loctions//////////////////////////////////////////////////////////////////////
  sortLocation(location_list){
    // try{
      // if (this.X != null) {
      //
      //   let arr = [];
      //   for (var i = 0; i < location_list.length; i++) {
      //     if (location_list[i].X != "" && location_list[i].Y != "") {
      //       var item = location_list[i];
      //       var x = parseFloat(location_list[i].X);
      //       var y = parseFloat(location_list[i].Y);
      //       var distance = (this.X - x) ^ 2 + (this.Y - y) ^ 2;
      //       if (distance < 0) distance = distance * -1;
      //       item.dist = distance
      //       arr.push(item);
      //     }
      //   }
      location_list.sort(function (a, b) {
          if(a.FirstName + a.Surname  < b.FirstName + b.Surname) return -1;
          if(a.FirstName + a.Surname  > b.FirstName + b.Surname) return 1;
          // if (a.Body_Part == b.Body_Part)
          // {
          //   if(a.Description < b.Description) return -1;
          //   if(a.Description > b.Description) return 1;
          // }
          return 0;
      });

        this.initialitems = location_list
        this.mapitems = location_list;
        this.loaditems()
        this.hideLoading();
        // console.log(this.mapitems);
        //       });
        //     });
        //   });
    //   }
    //   else {
    //     var me = this;
    //     this.geolocation.getCurrentPosition().then((position) => {
    //
    //       if (position != null) {
    //         this.esriLoader.load({
    //           url: 'https://js.arcgis.com/3.19/'
    //         }).then(() => {
    //           this.esriLoader.require([
    //             "esri/map", "esri/geometry/Point", "esri/SpatialReference", "esri/tasks/ProjectParameters", "esri/tasks/GeometryService"
    //           ], function (Map, Point, SpatialReference, ProjectParameters, GeometryService) {
    //             var pt = new Point(position.coords.longitude, position.coords.latitude, new SpatialReference({wkid: 4326}));
    //             var outSR = new SpatialReference(102100);
    //             var params = new ProjectParameters();
    //             params.geometries = [pt];
    //             params.outSR = outSR;
    //             var gsvc = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
    //
    //             gsvc.project(params, function (projectedPoints) {
    //
    //               var pt_x_y = projectedPoints[0];
    //               var posX = pt_x_y.x;
    //               var posY = pt_x_y.y;
    //               console.log(posX)
    //
    //               let arr = [];
    //               for (var i = 0; i < location_list.length; i++) {
    //                 if (location_list[i].X != "" && location_list[i].Y != "") {
    //                   var item = location_list[i];
    //                   var x = parseFloat(location_list[i].X);
    //                   var y = parseFloat(location_list[i].Y);
    //                   var distance = (posX - x) ^ 2 + (posY - y) ^ 2;
    //                   if (distance < 0) distance = distance * -1;
    //                   item.dist = distance
    //                   arr.push(item);
    //                 }
    //               }
    //               arr.sort(function (a, b) {
    //                 return parseFloat(a.dist) - parseFloat(b.dist);
    //               });
    //               me.initialitems = arr
    //               me.mapitems = arr;
    //               me.loaditems()
    //
    //               // console.log(this.mapitems);
    //
    //               me.storage.set("X", pt_x_y.x.toString());
    //               me.storage.set("Y", pt_x_y.y.toString());
    //
    //               me.storage.set("lat", position.coords.latitude.toString());
    //               me.storage.set("long", position.coords.longitude.toString());
    //
    //               me.hideLoading();
    //             });
    //           });
    //         })
    //       }
    //
    //     }).catch((error) => {
    //       this.initialitems = location_list
    //       this.mapitems = location_list;
    //       this.loaditems();
    //       // this.items = location_list;
    //       this.hideLoading();
    //     });
    //   }
    // }
    // catch (error){
    //   this.hideLoading();
    // }
  }

  // async makeArray(pt){
  //   try {
  //     var posX = pt.x;
  //     var posY = pt.y;
  //     await this.appDataProvider.getLocationType1()
  //       .subscribe(category =>{
  //         var locs = category;
  //         let arr = [];
  //         for (var i=0 ; i<locs.length; i++)
  //         {
  //           if (locs[i].X != "" && locs[i].Y != "")
  //           {
  //             var item = locs[i];
  //             var x = parseFloat(locs[i].X);
  //             var y = parseFloat(locs[i].Y);
  //             var distance = (posX - x)^2 + (posY-y)^2;
  //             if (distance < 0) distance = distance * -1;
  //             item.dist = distance
  //             arr.push(item);
  //           }
  //         }
  //         arr.sort(function(a, b) {
  //           return parseFloat(a.dist) - parseFloat(b.dist);
  //         });
  //         this.items = arr;
  //         this.hideLoading();
  //         console.log(this.items);
  //       });
  //   }
  //   catch (error) {
  //     console.warn(error);
  //   }
  // }

//////////////////////////////////////////////////////////////////////////////////////


  getFlocListData(){
    this.showLoading();
    try{
      console.info("getting person data");

      let key = 'personData';
      this.cache.getItem(key).catch(() => {
        this.flocLocationsData.getPersons().subscribe(data => {
              // this.mapitems = data;
              this.sortLocation(data);
              this.cache.saveItem(key, data);


            },
            err => {
              this.hideLoading();
              console.log(err);
            },
            () =>{
              console.log('Floc data loaded');
            });




      }).then((data) => {
        if(data != null){
          this.sortLocation(data);
        }

      });


    }

    catch (error){
      console.log(error);
    }


  }


  /*
   Floc location service implementation
   */

  searchFlocLocations(ev: any) {

    this.searching = true;

    // set val to the value of the searchbar
    let val = ev.target.value;
    val = val.replace(/ /g,'');
    // if the value is an empty string don't filter the items
    this.start = 0;
    // if (val && val.trim() != '') {
    this.mapitems = this.initialitems.filter((item) => {
      return ((item.FirstName+item.Surname).toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
    this.loaditems();
    // }
  }


  onCancel(){
    this.searching = false;
    this.getFlocListData();
    this.searchTerm = '';

  }
  onBlur(){
    this.searching = false;
    this.searchTerm = '';

  }

  onClear(){
    this.searching = false;
    this.searchTerm = '';
  }

  onFocus(){

  }

  // setFilteredItems(){
  //   this.items = this.flocLocationsData.filterItems(this.searchTerm);
  // }

  selectLocation(item) {
    this.presentConfirm(item);

    this.selectedLocation = location;
    this.searching = false;
    console.log(location);

  }



  presentConfirm(location) {

    let selectedLocation ={
      location:location,
    };

    let alert = this.alertCtrl.create({
      title: 'Please confirm the location ',
      message: `Correct?
              <br/>
             ${JSON.stringify(location)}`,

      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            // let data = { 'location': location };
            this.dismissModal(location);
            console.log(location);
          }
        }
      ]
    });
    alert.present();
  }

  dismissModal(data){

    console.log(data);
    // this.viewCtrl.dismiss(data);
    this.ev.publish("goToPersonComponent", data);
    // this.navCtrl.push(SafetyIncidentPage, {loc_data : data});
    this.navCtrl.pop();
  }

  loaditems() {
    if (this.start == 0) this.items = [];
    // return new Promise(resolve => {
    var end = this.start + 40;
    for(var i= this.start; i < end && i< this.mapitems.length; i++) {

      this.items.push(this.mapitems[i]);
    }
    this.searching = false;
    // resolve(true);

    // });

  }
  doInfinite(infiniteScroll:any) {
    console.log('doInfinite, start is currently '+this.start);
    this.start+=40;
    if (this.start > this.mapitems.length) return;
    // this.loaditems().then(()=>{
    //   infiniteScroll.complete();
    // });
    setTimeout(() => {
      this.loaditems();

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 400);

  }


}// end class