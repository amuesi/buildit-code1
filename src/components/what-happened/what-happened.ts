import { Component , Input, Output, EventEmitter} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Events} from 'ionic-angular';
import { ApplicationDataProvider } from "../../providers/application-data/application-data";

@Component({
  selector: 'what-happened',
  templateUrl: 'what-happened.html',
})
export class WhatHappenedComponent {
  
  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;

  @Output() personInvolved: EventEmitter<any> = new EventEmitter();

  vehicleAsset: any;

  public AssetType:any
  public selectedwhatHappenedVehicleAsset:any = false;
  public selectedpersonInvoled: any = false;
  public selectedanyoneInjured: any = false;
  public selectedVehicleDamage: any = false;
  public selectedenvironmentalImpact: any = false;
  
  
  constructor(private ev: Events,
              private fb: FormBuilder,
              private appDataProvider: ApplicationDataProvider){
  
  }

  ngOnInit(){
    this.AssetTypeInit();
    this.vehicleAssetInit();
   
   }

   WhatHappenedVehicleAsset($event){
    switch($event) {
      case "Yes": {
        this.selectedwhatHappenedVehicleAsset = true;

        break;
      }
      default: {
        this.selectedwhatHappenedVehicleAsset = false;
        break;
      }
    }
  }

  PersonInvolved($event){
    switch($event) {
      case "Yes": {
        this.selectedpersonInvoled = true;
        this.personInvolved.emit(true);
        break;
      }
      default: {
        this.selectedpersonInvoled = false;
        this.personInvolved.emit(false);
        break;

      }
    }
  }

  WasAnyOneInjured($event){
    switch($event) {
      case "Yes": {
        this.selectedanyoneInjured = true;

        break;
      }
      default: {
        this.selectedanyoneInjured = false;
        break;

      }
    }
  }

  PropertyVehicleDamage($event){
    switch($event) {
      case "Damage to mobile plant/vehicle": 
      {
        this.selectedVehicleDamage = true;

        break;
      }
      default: {
        this.selectedVehicleDamage = false;
        break;

      }  
    }
  }

  EnvironmentalImpact($event){
    switch($event) {
      case "Yes": {
        this.selectedenvironmentalImpact = true;

        break;
      }
      default: {
        this.selectedenvironmentalImpact = false;
        break;

      }
    }
  }
   
   async AssetTypeInit(){
     try {
       await this.appDataProvider.getasset()
         .subscribe(category =>{
           this.AssetType = category;
           console.dir('appDataServicengOnInit=', this.AssetType);
         });
     }
     catch (error) {
       console.warn(error);
     }

    }

    async vehicleAssetInit(){
      try {
        await this.appDataProvider.getVehicleAsset()
          .subscribe(category =>{
            this.vehicleAsset = category;
            // console.dir('appDataServicengOnInit=', this.InjuryType);
          });
      }
      catch (error) {
        console.warn(error);
      }
    }

  autosave($event, key, control_name){
    var data = {};
    data['key'] = key;
    data['value'] = this.parent.controls.whatHappened.get(control_name).value;

    if (this.parent.controls.whatHappened.get(control_name).dirty){
      this.ev.publish("autosave_well_being", data);
    }
  }
  
}
