import { Component , Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ApplicationDataProvider } from "../../providers/application-data/application-data";
import {ToastController, Events} from 'ionic-angular';

@Component({
  selector: 'standards-water-quality',
  templateUrl: 'standards-water-quality.html'
})
export class StandardsWaterQualityComponent implements OnInit{

   @Input()
  parent: FormGroup;

    @Input()
    isNotEditable: boolean;

  public WaterType:any;
  public EnvironmentalType: any;
  public HazardType: any;

  public selectedremovedHazard:any = false;
  public selectedremovedQuality: any = false;
  
  
  constructor(private fb: FormBuilder,
              private ev: Events,
              private appDataProvider: ApplicationDataProvider){
  
  }
  
  ngOnInit(){
   this.WaterTypeInit();
   this.EnvironmentalTypeInit();
   this.HazardTypeInit();
  
  }

  RemovedHazard($event){
    switch($event) {
      case "Water Quality": {
        this.selectedremovedQuality = true;
        this.selectedremovedHazard = false;

        break;
      }
      case "Environmental Hazard": {
        this.selectedremovedQuality = false;
        this.selectedremovedHazard = true;

        break;
      }
      default: {
        this.selectedremovedHazard = false;
        this.selectedremovedQuality = false;
        break;

      }

    // this.autosave($event, "LocationVariable", "locationType");

    }
  }

  async HazardTypeInit(){
    try {
      await this.appDataProvider.getHazard()
        .subscribe(category =>{
          this.HazardType = category;
          console.dir('appDataServicengOnInit=', this.HazardType);
        });
    }
    catch (error) {
      console.warn(error);
    }
  }
  
  async WaterTypeInit(){
    try {
      await this.appDataProvider.getWaterQuality()
        .subscribe(category =>{
          this.WaterType = category;
          console.dir('appDataServicengOnInit=', this.WaterType);
        });
    }
    catch (error) {
      console.warn(error);
    }
  }

  async EnvironmentalTypeInit(){
    try {
      await this.appDataProvider.getEnvironmentalHazard()
        .subscribe(category =>{
          this.EnvironmentalType = category;
          console.dir('appDataServicengOnInit=', this.EnvironmentalType);
        });
    }
    catch (error) {
      console.warn(error);
    }
  }

  autosave($event, key, control_name){
      var data = {};
      data['key'] = key;
      data['value'] = this.parent.controls.furtherInformation.get(control_name).value;

      if (this.parent.controls.furtherInformation.get(control_name).dirty){
        this.ev.publish("autosave_hazzard", data);
      }
    }
  
}
