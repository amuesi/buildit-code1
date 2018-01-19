import { Component,OnInit } from '@angular/core';
import {
  NavController, NavParams, ToastController, LoadingController, ViewController, AlertController, IonicPage,
  Events
} from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import {  FlocSTSProvider } from '../../providers/floc/flocSTS';
import { Http } from '@angular/http';
import { EsriLoaderService } from 'angular2-esri-loader';
import { Geolocation } from '@ionic-native/geolocation';
import {SafetyIncidentPage} from "../safety-incident/safety-incident";
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-floc-locationsSTS',
  templateUrl: 'floc-locationsSTS.html',
})

export class FlocLocationsSTSPage implements OnInit{

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
  public lat:number;
  public long:number;
  public X:number;
  public Y:number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private http:Http,
              private storage:Storage,
              private geolocation: Geolocation,
              private esriLoader: EsriLoaderService,
              public flocLocationsData: FlocSTSProvider,
              private ev: Events
  ) {

    // this.storage.get('long').then((val) => {
    //   if (val != null) {
    //     this.long = parseFloat( val);
    //   }
    // });
    // this.storage.get('lat').then((val) => {
    //   if (val != null) {
    //     this.lat = parseFloat( val);
    //     this.getFlocListData();
    //   }
    // });


    ///////// test/////////////////////////
    // this.long = -0.44689018;
    // this.lat =  52.615573;
    //  this.long = -1.5063875;
    //  this.lat =  52.40499;
    this.getFlocListData();


  }// end constructor

  ngOnInit(){
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

    if (this.lat != null) {

      let arr = [];
      for (var i = 0; i < location_list.length; i++) {
        if (location_list[i].Longitude != "" && location_list[i].Latitude != "") {
          var item = location_list[i];
          var x = parseFloat(location_list[i].Longitude);
          var y = parseFloat(location_list[i].Latitude);
          var distance = Math.pow((this.long - x), 2) + Math.pow((this.lat - y) , 2);
          if (distance < 0) distance = distance * -1;
          item.dist = distance;
          arr.push(item);
        }
      }
      arr.sort(function (a, b) {
        return parseFloat(a.dist) - parseFloat(b.dist);
      });
      this.initialitems = arr;
      this.mapitems = arr;
      this.loaditems();
      this.hideLoading();


   //   console.log(this.mapitems);
      //       });
      //     });
      //   });
    }
    else{
      var me = this;
      this.geolocation.getCurrentPosition().then((position) => {

        if (position != null) {
          // this.esriLoader.load({
          //   url: 'https://js.arcgis.com/3.19/'
          // }).then(() => {
          //   this.esriLoader.require([
          //     "esri/map", "esri/geometry/Point", "esri/SpatialReference", "esri/tasks/ProjectParameters", "esri/tasks/GeometryService"
          //   ], function (Map, Point, SpatialReference, ProjectParameters, GeometryService) {
          //     var pt = new Point(position.coords.longitude, position.coords.latitude, new SpatialReference({wkid: 4326}));
          //     var outSR = new SpatialReference(102100);
          //     var params = new ProjectParameters();
          //     params.geometries = [pt];
          //     params.outSR = outSR;
          //     var gsvc = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
          //
          //     gsvc.project(params, function (projectedPoints) {
          //
          //       var pt_x_y = projectedPoints[0];
                var posX = position.coords.longitude;
                var posY = position.coords.latitude;

                let arr = [];
                for (var i = 0; i < location_list.length; i++) {
                  if (location_list[i].X != "" && location_list[i].Y != "") {
                    var item = location_list[i];
                    var x = parseFloat(location_list[i].Longitude);
                    var y = parseFloat(location_list[i].Latitude);
                    var distance = Math.pow((posX - x), 2) + Math.pow((posY - y) , 2);
                    if (distance < 0) distance = distance * -1;
                    item.dist = distance;
                    arr.push(item);
                  }
                }
                arr.sort(function (a, b) {
                  return parseFloat(a.dist) - parseFloat(b.dist);
                });
                this.initialitems = arr
                this.mapitems = arr;
                this.loaditems()

                 console.log(this.mapitems);

                // me.storage.set("X", pt_x_y.x.toString());
                // me.storage.set("Y", pt_x_y.y.toString());

                me.storage.set("lat", position.coords.latitude.toString());
                me.storage.set("long", position.coords.longitude.toString());

                this.hideLoading();
              // });
            // });
          // })
        }

      }).catch((error) => {
        this.initialitems = location_list;
        this.mapitems = location_list;
        this.loaditems();
        // this.items = location_list;
        this.hideLoading();
      });
    }

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
      console.info("getting floc data");
      this.flocLocationsData.load().subscribe(data => {
            // this.mapitems = data;
            this.sortLocation(data);

          },
          err => {
            this.hideLoading();
            console.log(err);
          },
          () =>{
            console.log('Floc data loaded');
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

    // if the value is an empty string don't filter the items
    this.start = 0;
    // if (val && val.trim() != '') {
    this.mapitems = this.initialitems.filter((item) => {
      return (item.Description.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
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

  setFilteredItems(){
    this.items = this.flocLocationsData.filterItems(this.searchTerm);
  }

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
      message: 'Description: ' + location.Description + '<br/>' + 'X: ' + location.X + '<br/>' + 'Y: ' + location.Y,
      // message: `Correct?
      //         <br/>
      //        ${JSON.stringify(location)}`,

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
    // data = { 'location': "" };
    var locations = {
      'location': data.Description,
      'X': data.X,
      'Y': data.Y
      // 'selectedAddress': this.selectedAddress
    };
    console.log(data);
    // this.viewCtrl.dismiss(data);
    // this.navCtrl.push(SafetyIncidentPage, {loc_data : locations});

    this.ev.publish("goToWhere", locations);
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
