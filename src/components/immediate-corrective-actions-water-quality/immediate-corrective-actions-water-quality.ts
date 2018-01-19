import { Component , Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Events, ToastController} from 'ionic-angular';
import { SubmissionsProvider } from '../../providers/submissions/submissions';

@Component({
  selector: 'immediate-corrective-actions-water-quality',
  templateUrl: 'immediate-corrective-actions-water-quality.html'
})
export class ImmediateCorrectiveActionsWaterQualityComponent{

  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;

  constructor(private ev: Events,
              public DB : SubmissionsProvider,
              private toastCtrl: ToastController) {
    // console.log('Hello Immediate Corrective Actions Water Quality Component');
  }

  autosave($event, key, control_name){
    var data = {};
    data['key'] = key;
    data['value'] = this.parent.controls.immediateCorrectiveAction.get(control_name).value;

    if (this.parent.controls.immediateCorrectiveAction.get(control_name).dirty){
      this.ev.publish("autosave_waterquality", data);
    }
  }

}
