import { Component, Input, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApplicationDataProvider } from "../../providers/application-data/application-data";
import { Events } from 'ionic-angular';

import { SubmissionsProvider } from '../../providers/submissions/submissions';

@Component({
  selector: 'what-happened-security-good-practice',
  templateUrl: 'what-happened-security-good-practice.html'
})
export class WhatHappenedSecurityGoodPracticeComponent {

  @Input()
  parent: FormGroup;
  @Input()
  form_name: string;
  @Input()
  referenceNum: string;

  @Input()
  isNotEditable: boolean;

  @Input()
  isVisible: boolean;

  reportedToPolice: any;
  policeForce: any;
  itemOwnership: any;
  smartWaterSite: any;
  seriousInjuryOrFatality: any;

  constructor(private appDataProvider: ApplicationDataProvider,
    private ev:Events, public DB : SubmissionsProvider) {
this.ev.subscribe('functionCall:securityincidenttype', eventData => {;
});
console.log('Hello SecurityCategoryComponent Component');

}


    autosave($event, key, control_name){
      var data = {};
      data['key'] = key;
      data['value'] = this.parent.controls.whatHappened.get(control_name).value;

      if (this.parent.controls.whatHappened.get(control_name).dirty) {
        this.ev.publish("autosave_security_incident", data);
      }
    }

  }