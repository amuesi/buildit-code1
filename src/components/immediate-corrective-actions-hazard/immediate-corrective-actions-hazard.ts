import { Component , Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Events, ToastController} from 'ionic-angular';
import { SubmissionsProvider } from '../../providers/submissions/submissions';


@Component({
  selector: 'immediate-corrective-actions-hazard',
  templateUrl: 'immediate-corrective-actions-hazard.html'


  
})
export class ImmediateCorrectiveActionsComponentHazard {

  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;

  constructor(private ev: Events,
              public DB : SubmissionsProvider,
              private toastCtrl: ToastController) {
    console.log('Hello ImmediateCorrectiveActionsComponent Component');
  }

  autosave($event, key, control_name){
    var data = {};
    data['key'] = key;
    data['value'] = this.parent.controls.immediateCorrectiveAction.get(control_name).value;

    if (this.parent.controls.immediateCorrectiveAction.get(control_name).dirty){
      this.ev.publish("autosave_hazzard", data);
    }
  }

}
