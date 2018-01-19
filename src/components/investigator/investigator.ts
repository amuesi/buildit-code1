import { Component , Input} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Events} from 'ionic-angular';
@Component({
  selector: 'investigator',
  templateUrl: 'investigator.html'
})
export class InvestigatorComponent {

  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;


    constructor(private fb: FormBuilder,
              private ev:Events){

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

    if (this.parent.controls.investigator.get(control_name).dirty){
      this.ev.publish("autosave_incident", data);
    }
  }

}
