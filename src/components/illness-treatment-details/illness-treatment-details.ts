import { Component , Input, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ApplicationDataProvider } from '../../providers/application-data/application-data';
import {ModalController, NavController, NavParams, Events} from "ionic-angular";
import {search_page} from "../../pages/search-page/search-page";
import * as moment from 'moment';


@Component({
  selector: 'illness-treatment-details',
  templateUrl: 'illness-treatment-details.html'
  
})

export class IllnessTreatmentDetailsComponent implements OnInit {


  @Input()
  isNotEditable: boolean;

  @Input()
  parent: FormGroup;


  injury:string = "no";
  bodyparts:any;
  bodypartsInjuredMultiselect: any;
  InjuryType: any;
  treatmentType:any;
  selectedMultibodys: any;
  incidentResultedInLostTimes: any;
  incidentResultedInRestrictedDutieses: any;
  bodyPart: any;
  public selectedBodyPart:any;

  public selectedIncidentResultedInLostTime:any = false;
  public selectedIncidentResultedInRestrictedDuties: any = false;
  public selectedTreatmentGiven: any = false;

  public selectedAddress:any;
  public selected_X: any;
  public selected_Y:any;
  selected_coordinate: any;

  public maxDate = "2000-01-01";

  constructor(private fb: FormBuilder,
              private nvaCtrl:NavController, 
              private modalCtrl:ModalController,
              private appDataProvider: ApplicationDataProvider, 
              private navParams:NavParams, 
              private ev:Events)
    
    {
              this.maxDate = moment().format("YYYY-MM-DD");
          
              var data = navParams.get('loc_data');
              if (data != null)
              {
                this.selected_X = data.X;
                this.selected_Y = data.Y;
                this.selected_coordinate = data.X + "," + data.Y;
                this.selectedAddress = data.location;
              }
          
              this.ev.subscribe('goToWhere', data => {
                this.selected_X = data.X;
                this.selected_Y = data.Y;
                this.selected_coordinate = data.X + "," + data.Y;
                this.selectedAddress = data.location;
              });
    
    
    
    {
    var data = navParams.get('data');
    if (data != null)
    {
      this.selectedMultibodys = data;
      
    }

    this.ev.subscribe('goToInjuery', data => {
      this.selectedMultibodys = data;
      this.bodyPart = '';
      for (let singleBody in this.selectedMultibodys) {
         this.bodyPart = this.bodyPart + this.selectedMultibodys[singleBody].Body_Part + '-' + this.selectedMultibodys[singleBody].Injury_Type + ','  + '  ' ;
      }
      // this.bodyPart= 
      // this.bodyPart = this.selectedMultibodys[0].Body_Part + '-' + this.selectedMultibodys[0].Injury_Type ;
    });



var data = navParams.get('bodypart_data');
if (data != null)
{
  this.selectedBodyPart = data.bodypartsGroup;
  // this.bodyPart = data.bodypartsGroup;
}

  this.ev.subscribe('goToWhere', data => {
    this.selectedBodyPart = data.bodypartsGroup;
    // this.bodyPart = data.bodypartsGroup;
});

    }}
    
  ngOnInit(){
    this.bodypartsInit();
    this.InjuryTypesInit();
    this.TreatmentTypeInit();
    this.multiBodypartsInit();
    this.incidentResultedInLostTimesInit();
    this.incidentResultedInRestrictedDutiesInit();
  }


    IncidentResultedInLostTime($event){
    switch($event) {
      case "Yes": {
        this.selectedIncidentResultedInLostTime = true;

        break;
      }
      default: {
        this.selectedIncidentResultedInLostTime = false;
        break;

      }
   }
  }

    IncidentResultedInRestrictedDuties($event){
      switch($event) {
        case "Yes": {
          this.selectedIncidentResultedInRestrictedDuties = true;
  
          break;
        }
        default: {
          this.selectedIncidentResultedInRestrictedDuties = false;
          break;
  
        }  
      }
    }

    ImmediateTreatmentGiven($event){
      switch($event) {
        case "First Aid": 
        case "GP / walk-in centre": 
        case "On-Site Paramedic": 
        case "Sent to hospital (for treatment)":
        case "Sent to hospital (precautionary)":
        {
          this.selectedTreatmentGiven = true;
  
          break;
        }
        default: {
          this.selectedTreatmentGiven = false;
          break;
  
        }  
      }
    }

  async TreatmentTypeInit(){
    try {
      await this.appDataProvider.getTreatment()
        .subscribe(category =>{
          this.treatmentType = category;
          // console.dir('appDataServicengOnInit=', this.treatmentType);
        });
    }
    catch (error) {
      console.warn(error);
    }
  }


  async incidentResultedInLostTimesInit(){
    try {
      await this.appDataProvider.getIncidentResultedInLostTimes()
        .subscribe(category =>{
          this.incidentResultedInLostTimes = category;
          // console.dir('appDataServicengOnInit=', this.InjuryType);
        });
    }
    catch (error) {
      console.warn(error);
    }
  }

  async incidentResultedInRestrictedDutiesInit(){
    try {
      await this.appDataProvider.getIncidentResultedInRestrictedDuties()
        .subscribe(category =>{
          this.incidentResultedInRestrictedDutieses = category;
          // console.dir('appDataServicengOnInit=', this.InjuryType);
        });
    }
    catch (error) {
      console.warn(error);
    }
  }

  async InjuryTypesInit(){
    try {
      await this.appDataProvider.getInjuryTypes()
        .subscribe(category =>{
          this.InjuryType = category;
          // console.dir('appDataServicengOnInit=', this.InjuryType);
        });
    }
    catch (error) {
      console.warn(error);
    }
  }

  async bodypartsInit(){
    try {
      await this.appDataProvider.getbodypart()
        .subscribe(category =>{
          this.bodyparts = category;
          // console.dir('appDataServicengOnInit=', this.bodyparts);
        });
    }
    catch (error) {
      console.warn(error);
    }
  }
  async MultiBodypartsOpen(){
    this.nvaCtrl.push(search_page, {data: this.bodypartsInjuredMultiselect, searchField: "Injury_Type"});

    // let modal = this.modalCtrl.create(search_page, {data: this.bodypartsInjuredMultiselect, searchField: "Injury_Type"});
    // modal.present();
    // modal.onDidDismiss(data=>{ //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed
    //   console.log("Data =>", data) //This will log the form entered by user in add modal.
    //   // this.selected_X = data['X'];
    //   // this.selected_Y = data['Y'];
    //   // this.selectedAddress = data['location'];
    // })
  }
  async multiBodypartsInit(){
    try {
      await this.appDataProvider.getbodypartsInjuredMultiselectType()
          .subscribe(category =>{
            this.bodypartsInjuredMultiselect = category;
            // console.dir('appDataServicengOnInit=', this.bodypartsInjuredMultiselect);
          });
    }
    catch (error) {
      console.warn(error);
    }
  }
  async cmbBodypartsChange(value){
    try {
      await this.appDataProvider.getbodypartsInjuredMultiselectType()
        .subscribe(subcategory =>{
          let items = [];
          for (var i = 0 ; i < subcategory.length; i++)
          {
            if (subcategory[i].Body_Part == value)
            {
              items.push(subcategory[i]);
            }
          }
          this.bodypartsInjuredMultiselect = items;
          // console.dir('appDataServicengOnInit=', this.bodypartsInjuredMultiselect);
        });
    }
    catch (error) {
      console.warn(error);
    }
  }

  autosave($event, key, control_name){
    var value;
    if($event.currentTarget == null){
      value = $event;
    }
    else{
      value = $event.currentTarget.value;
    }
    let key_name = key;
    var data = {};
    data['key'] = key_name;
    data['value'] = value;

    if (this.parent.controls.bodypartsGroup.get(control_name).dirty){
      this.ev.publish("autosave_incident", data);
    }
  }

}
