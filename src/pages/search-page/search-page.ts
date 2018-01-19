import { Component,OnInit } from '@angular/core';
import {
  NavController, NavParams, ToastController, LoadingController, ViewController, AlertController, IonicPage,
  Events
} from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import {  FlocSTWProvider } from '../../providers/floc/flocSTW';
import { Http } from '@angular/http';
import { EsriLoaderService } from 'angular2-esri-loader';
import { Geolocation } from '@ionic-native/geolocation';
import {SafetyIncidentPage} from "../safety-incident/safety-incident";
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'search-page',
  templateUrl: 'search-page.html',
})

export class search_page implements OnInit{

  // page member properties

  searchTerm: string = '';
  public flocSearchControl: FormControl;
  public items = [];
  // public flocLocations: FlocLocation[];
  public searching: any = false;

  // public users: FlocLocation[];
  // public originalItems: FlocLocation[];
  public selectedLocations = [];

  // Loading component
  public loading : any;
  public mapitems :any;
  public initialitems :any;
  public start = 0;
  public searchField :string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private http:Http,
              private storage:Storage,
              public flocLocationsData: FlocSTWProvider,
              private ev: Events
  ) {
    /*
     floc stuff
     */

    var data = navParams.get('data');
    this.searchField = navParams.get('searchField');
    if (data != null)
    {
      var me = this;
      data.sort(function(a, b){
        if(a.Body_Part < b.Body_Part) return -1;
        if(a.Body_Part > b.Body_Part) return 1;
        if (a.Body_Part == b.Body_Part)
        {
          if(a.Description < b.Description) return -1;
          if(a.Description > b.Description) return 1;
        }
        return 0;
      })
      this.initialitems = data;
      this.getFlocListData();
    }

    //

    // this.flocSearchControl = new FormControl();
    // this.geolocation.getCurrentPosition().then((position) => {
    //   this.lat = position.coords.latitude;
    //   this.long = position.coords.longitude;
    //   this.getFlocListData();
    // }, (err) => {
    // this.getFlocListData();
    // });




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


  getFlocListData(){
    this.showLoading();
    // try{
    //   console.info("getting floc data");
    //   this.flocLocationsData.load().subscribe(data => {
            this.mapitems = this.initialitems;
            this.loaditems();
    //       },
    //       err => {
            this.hideLoading();
    //         console.log(err);
    //       },
    //       () =>{
    //         console.log('Floc data loaded');
    //       });
    // }
    //
    // catch (error){
    //   console.log(error);
    // }


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
      return ((item.Body_Part + item[this.searchField]).toLowerCase().indexOf(val.toLowerCase()) > -1);
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

  selectLocation(event, item) {
    // this.presentConfirm(item);
    var index = this.selectedLocations.indexOf(item)
    if(event.isTrusted)
    {
      if (index < 0) this.selectedLocations.push(item);
    }
    else{
      if (index != 1) this.selectedLocations.splice(index, 1);
    }
    // this.selectedLocations = location;
    this.searching = false;
    console.log(location);

  }



  presentConfirm(location) {


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
    // this.navCtrl.push(SafetyIncidentPage, {data : data});

    this.ev.publish("goToInjuery", data);
    this.navCtrl.pop();
  }

  closeDlg(){
    // this.ev.publish("goToInjuery", this.selectedLocations);
    // this.navCtrl.pop();
    // this.navCtrl.push(SafetyIncidentPage, {data : this.selectedLocations});
    this.dismissModal(this.selectedLocations);
  }
  loaditems() {
    if (this.start == 0) this.items = [];
    // return new Promise(resolve => {
    var end = this.start + 40;
    for(var i= this.start; i < end && i< this.mapitems.length; i++) {
      var item = this.mapitems[i];
      item.Description = item[this.searchField]
      this.items.push(this.mapitems[i]);
    }
    this.searching = false;
    // resolve(true);

    // });

  }
  doInfinite(infiniteScroll:any) {
    // console.log('doInfinite, start is currently '+this.start);
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