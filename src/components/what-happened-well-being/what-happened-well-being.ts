import { Component , Input} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Events} from 'ionic-angular';
import { ApplicationDataProvider } from "../../providers/application-data/application-data";

@Component({
  selector: 'what-happened-well-being',
  templateUrl: 'what-happened-well-being.html'
})
export class WhatHappenedWellBeingComponent{
 
  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;

  public WellbeingActionType:any;
  
  
  constructor(private fb: FormBuilder,
              private ev:Events,
              private appDataProvider: ApplicationDataProvider){
  
  }            
  ngOnInit(){
   this.WellbeingActionTypeInit();
  
  }
  
  async WellbeingActionTypeInit(){
    try {
      await this.appDataProvider.getWellbeingConversationReasons()
        .subscribe(category =>{
          this.WellbeingActionType = category;
          console.dir('appDataServicengOnInit=', this.WellbeingActionType);
        });
    }
    catch (error) {
      console.warn(error);
    }
  

  }
  autosave($event, key, control_name){
    var data = {};
    data['key'] = key;
    data['value'] = this.parent.controls.whatHappenedWellbeing.get(control_name).value;

    if (this.parent.controls.whatHappenedWellbeing.get(control_name).dirty){
      this.ev.publish("autosave_well_being", data);
    }
  }
  
}