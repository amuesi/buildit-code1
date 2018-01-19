import { Component , Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Events, ToastController} from 'ionic-angular';

import { SubmissionsProvider } from '../../providers/submissions/submissions';

@Component({
  selector: 'what-happened-water-quality',
  templateUrl: 'what-happened-water-quality.html'
})
export class WhatHappenedWaterQualityComponent {

  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;

  // public isDisabled = false;


  
  constructor(private ev: Events){
    // this.isDisabled = this.isNotEditable;
  
  }
  autosave($event, key, control_name){
    var data = {};
    data['key'] = key;
    data['value'] = this.parent.controls.whatHappened.get(control_name).value;

    if (this.parent.controls.whatHappened.get(control_name).dirty){
      this.ev.publish("autosave_waterquality", data);
    }
  }
}
