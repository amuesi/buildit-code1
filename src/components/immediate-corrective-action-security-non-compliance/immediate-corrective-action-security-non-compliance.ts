import { Component , Input} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Events} from 'ionic-angular';

@Component({
  selector: 'immediate-corrective-action-security-non-compliance',
  templateUrl: 'immediate-corrective-action-security-non-compliance.html'
})
export class ImmediateCorrectiveActionSecurityNonComplianceComponent {

  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;

  constructor(public ev:Events) {
    console.log('Hello ImmeditateCorrectiveActionsComponent Component');
  }
  autosave($event, key, control_name){
    var data = {};
    data['key'] = key;
    data['value'] = this.parent.controls.immediatediateCorrectiveAction.get(control_name).value;

    if (this.parent.controls.immediatediateCorrectiveAction.get(control_name).dirty){
      this.ev.publish("autosave_security_incident", data);
    }
  }

}
