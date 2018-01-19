import { Component , Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ApplicationDataProvider } from "../../providers/application-data/application-data";
import {ToastController, Events} from 'ionic-angular';

@Component({
  selector: 'standards',
  templateUrl: 'standards.html'
})
export class StandardsComponent implements OnInit{

   @Input()
  parent: FormGroup;

    @Input()
    isNotEditable: boolean;

  public StandardType:any;
  
  
  constructor(private fb: FormBuilder,
              private ev: Events,
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
        this.ev.publish("autosave_hazzard", data);
      }
    }
  
}
