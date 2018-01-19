import { Component , Input} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Events} from 'ionic-angular';

@Component({
  selector: 'immediate-corrective-actions',
  templateUrl: 'immediate-corrective-actions.html'
})
export class ImmediateCorrectiveActionsComponent {

  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;

  constructor(private ev:Events) {
    console.log('Hello ImmediateCorrectiveActionsComponent Component');
  }

  autosave($event, key, control_name){
    var value;
    if($event.currentTarget == null){
      value = $event;
    }
    else{
      value = $event.currentTarget.value;
    }
    let key_name = key;
    var data = {};
    data['key'] = key_name;
    data['value'] = value;

    if (this.parent.controls.immediateCorrectiveActions.get(control_name).dirty){
      this.ev.publish("autosave_incident", data);
    }
  }

}
