import { Component , Input} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Events} from 'ionic-angular';

@Component({
  selector: 'immediate-corrective-actions-behaviour',
  templateUrl: 'immediate-corrective-actions-behaviour.html'
})
export class ImmediateCorrectiveActionsBehaviourComponent {

  
  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;

  constructor(private ev: Events) {
    console.log('Hello ImmeditateCorrectiveActionsComponent Component');
  }

  autosave($event, key, control_name){
    var data = {};
    data['key'] = key;
    data['value'] = this.parent.controls.immediatediateCorrectiveAction.get(control_name).value;

    if (this.parent.controls.immediatediateCorrectiveAction.get(control_name).dirty){
      this.ev.publish("autosave_positive_behaviour", data);
    }
  }

}
