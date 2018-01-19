import { Component , Input, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Events} from 'ionic-angular';

import {ApplicationDataProvider} from "../../providers/application-data/application-data";



@Component({
  selector: 'further-information',
  templateUrl: 'further-information.html'
})
export class FurtherInformationComponent implements OnInit{
  
  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;

  public WellbeingActionTypes: any;
  
  
  constructor(private fb: FormBuilder,
              private appDataProvider: ApplicationDataProvider,
              private ev:Events){
  
  }
  
  ngOnInit(){
    this.WellbeingActionTypeInit();
    
  }
  
  async WellbeingActionTypeInit(){
    try {
      await this.appDataProvider.getWellbeingActions()
        .subscribe(category =>{
          this.WellbeingActionTypes = category;
          console.dir('appDataServicengOnInit=', this.WellbeingActionTypes);
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
      this.ev.publish("autosave_well_being", data);
    }
  }
  
}
