import { Component , Input, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ModalController, NavController, NavParams, Events, ToastController} from 'ionic-angular';

import { ApplicationDataProvider } from '../../providers/application-data/application-data';
import { SubmissionsProvider } from '../../providers/submissions/submissions';
import { NetworkProvider } from '../../providers/network/network';
import { GeodesyService } from '../../providers/geodesy-service/geodesy-service';
import * as moment from 'moment';

// LocationType model
import { LocationType } from '../../models/locationType';
// floclocation model
import { FlocLocation } from '../../models/floclocations';


import {MapPage} from "../../pages/map/map";
import {FlocLocationsSTWPage} from "../../pages/floc-locationsSTW/floc-locationsSTW";
import {FlocLocationsSTSPage} from "../../pages/floc-locationsSTS/floc-locationsSTS";
import {SafetyIncidentPage} from "../../pages/safety-incident/safety-incident";



@Component({
  selector: 'where-and-when-water-quality',
  templateUrl: 'where-and-when-water-quality.html'
})
export class WhereAndWhenWaterQualityComponent implements OnInit {
 
  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;



  public isSearching:boolean = false;
  public selectedLocation: any;
  public searchInput: string;

  public flocs: FlocLocation[];
  public originalFlocs: FlocLocation[];
  public floclocation: FlocLocation[];


  public user: any;
  public locationType:any;
  public email: any;
  public team: any;
  public chosenLocationType:any;
  public location: any;
  public standards: any;
  public safeUnsafeAct: any;


  // public recordId: any;
  // public revisionId: any;
  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;
  private showList: boolean;
  public selectedStandard:any;
  public standard:any;
  public locationTypeModel:any;
  public standardModel:any;
  public searchControl: FormControl;
  public personInjured:any;
  public wasSecurityConcern:any;
  public phoneNumber:any;
  public whoWasInvolved:any;
  public HomeAddress: any;
  public description: any;
  public searchLocations:any;
  // public category:any = "Incident";
  private isInstantiated: boolean;
  public success: boolean;
  public _DB : any;
  public immediateActionsTaken:any;
  public selectedLocationType:any = false;
  public selectedLocationTypeSTW:any = false;
  public selectedLocationTypeSTS:any = false;
  public selectedLocationTypeOther:any = false;
  public viewPreciseLocation:any = false;
  public isOffline:any = false;
  public otherLocationTextArea: any;
  public images: any;
  public grid: Array<Array<string>>;
  public multipleImages:any;
  public item:any;
  public photoTaken:boolean = false;
  public subEventSubEventCategory:boolean = false;
  public weatherConditions:any;


  public WeatherTypes:any;
  public selectedAddress:any;
  public selected_X: any;
  public selected_Y:any;
  public selected_coordinate : any;

  public maxDate = "2000-01-01";

  constructor(private fb: FormBuilder,
              public Modal:ModalController,
              private appDataProvider: ApplicationDataProvider,
              public navController: NavController,
              private navParams: NavParams,
              private ev: Events,
              private networkProvider: NetworkProvider,
              private geodesyService: GeodesyService

  ){
    this.maxDate = moment().format("YYYY-MM-DD");

    var data = navParams.get('loc_data');
    if (data != null)
    {
      this.selected_X = data.X;
      this.selected_Y = data.Y;
      this.selectedAddress = data.location;
      this.selected_coordinate = data.X + "," + data.Y;
    }

    this.ev.subscribe('goToWhere', data => {
      this.selected_X = data.X;
      this.selected_Y = data.Y;
      this.selectedAddress = data.location;
      this.selected_coordinate = data.X + "," + data.Y;
    });



  }


  ngOnInit(){
    this.formInit();
    this.WeatherTypeInit();

  }



  locationTypeChange($event){
    switch($event) {
      case "Severn Trent Water (STW)": {
        //statements;
        // alert("STW");
        this.selectedLocationTypeSTW = true;
        this.selectedLocationTypeSTS = false;
        this.selectedLocationTypeOther = false;
        this.isOffline = false;
        this.viewPreciseLocation = false;
        this.selectedLocation = null;
        break;
      }
      case "Severn Trent Services (STS)": {
        //statements;
        // alert("STS");
        this.selectedLocationTypeSTW = false;
        this.selectedLocationTypeSTS = true;
        this.selectedLocationTypeOther = false;
        this.isOffline = false;
        this.selectedLocation = null;
        this.viewPreciseLocation = false;
        break;
      }
      default: {
        //statements;
        // alert("Other");
        if(this.networkProvider.obtainNetworkConnection()){
          this.selectedLocationTypeOther = true;
          this.isOffline = false;
        }
        else{
          this.selectedLocationTypeOther = false;
          this.isOffline = true;
        }
        this.viewPreciseLocation = true;
        this.selectedLocationTypeSTS = false;
        this.selectedLocationTypeSTW = false;
        this.selectedLocation = null;
        break;
      }
    }

    // this.autosave($event, "LocationVariable", "locationType");
  }


  async formInit(){
    try {
      await this.appDataProvider.getLocationType()
          .subscribe(locationType =>{
            this.locationType = locationType;
            console.dir('appDataServicengOnInit=', this.locationType);
          });
    }
    catch (error) {
      console.warn(error);
    }
    // try {
    //   await this.appDataProvider.getStandards()
    //     .subscribe(standards => {
    //       console.dir(standards);
    //       this.standards = standards;
    //     });
    // }
    // catch (error){
    //   console.warn(error);
    // }
  }

  getLocation(){

  }

  offlineButtonClick(){
    this.geodesyService.getLocation().then((data) =>{
      // alert(data[0].toString());
      // alert(data[1].toString());
      this.selected_coordinate = data[0].toString() + "," + data[1].toString();
    });


  }

  goMap(){
    // this.navController.push(MapPage);

  //   let modal = this.Modal.create(MapPage);
  //   modal.present();
    // modal.onDidDismiss(data=>{ //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed
    //   console.log("Data =>", data) //This will log the form entered by user in add modal.
    //   // this.selected_X = data['X'];
    //   // this.selected_Y = data['Y'];
    //   // this.selectedAddress = data['location'];
    // })
    this.sendEvent("SafetyIncidentPage");
    this.navController.push(MapPage, {prevPage: "SafetyIncidentPage"});
  }

  async WeatherTypeInit(){
    try {
      await this.appDataProvider.getWeather()
          .subscribe(category =>{
            this.WeatherTypes = category;
            console.dir('appDataServicengOnInit=', this.WeatherTypes);
          });
    }
    catch (error) {
      console.warn(error);
    }
  }

  floclocationSTWModalOpen(){

      // let flocModal =  this.modalCtrl.create(FlocLocationsSTWPage);
      // flocModal.present();
      // flocModal.onDidDismiss(data => {
      //   this.selectedLocation = data.location;
      //   console.log(data);
      // });
    this.navController.push(FlocLocationsSTWPage)

  }

  floclocationSTSModalOpen(){

      // let flocModal =  this.modalCtrl.create(FlocLocationsSTSPage);
      // flocModal.present();
      // flocModal.onDidDismiss(data => {
      //   this.selectedLocation = data.location;
      //   console.log(data);
      // });

    this.navController.push(FlocLocationsSTSPage)
  }


  sendEvent(currentPage){
    this.ev.publish('previousPageName', currentPage);
    console.log("event from: ", currentPage);
  }

  autosave_address_location(value, key){
    var data = {};
    if (this.selected_coordinate != null) data["XYCoordinate"] = this.selected_coordinate;
    if (this.selectedAddress != null) data['Location'] = this.selectedAddress;
    this.ev.publish("autosave_hazzard", data);
  }

  autosave($event, key, control_name){
    var data = {};
    data['key'] = key;
    data['value'] = this.parent.controls.whereAndWhen.get(control_name).value;

    if (this.parent.controls.whereAndWhen.get(control_name).dirty){
      this.ev.publish("autosave_hazzard", data);
    }
  }

}// end class
