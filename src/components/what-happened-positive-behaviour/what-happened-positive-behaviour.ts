import { Component , Input} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Events} from 'ionic-angular';

@Component({
  selector: 'what-happened-positive-behaviour',
  templateUrl: 'what-happened-positive-behaviour.html'
})
export class WhatHappenedPositiveBehaviourComponent {

  
  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;
  
  
  constructor(private fb: FormBuilder,
              private ev: Events){
  
  }

  autosave($event, key, control_name){
    var data = {};
    data['key'] = key;
    data['value'] = this.parent.controls.whatHappened.get(control_name).value;

    if (this.parent.controls.whatHappened.get(control_name).dirty){
      this.ev.publish("autosave_positive_behaviour", data);
    }
  }
  
}
