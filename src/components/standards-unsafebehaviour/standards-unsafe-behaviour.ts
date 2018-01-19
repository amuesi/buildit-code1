import { Component , Input, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ApplicationDataProvider } from "../../providers/application-data/application-data";
import {Events} from 'ionic-angular';

@Component({
  selector: 'standards-unsafe-behaviour',
  templateUrl: 'standards-unsafe-behaviour.html'
})
export class StandardsUnsafeBehaviourComponent implements OnInit{
 @Input()
  parent: FormGroup;

    @Input()
    isNotEditable: boolean;

  public StandardType:any;
  
  
  constructor(private fb: FormBuilder,
              public ev: Events,
              private appDataProvider: ApplicationDataProvider){
  
  }
  
  ngOnInit(){
    this.StandardTypeInit();
    
  }
  
  async StandardTypeInit(){
    try {
      await this.appDataProvider.getStandards()
        .subscribe(category =>{
          this.StandardType = category;
          console.dir('appDataServicengOnInit=', this.StandardType);
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
            this.ev.publish("autosave_unsafe_behaviour", data);
        }
    }
  
}
