import { Component, Input, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApplicationDataProvider } from "../../providers/application-data/application-data";
import { Events } from 'ionic-angular';

import { SubmissionsProvider } from '../../providers/submissions/submissions';

@Component({
  selector: 'what-happened-security',
  templateUrl: 'what-happened-security.html'
})
export class WhatHappenedSecurityComponent {

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

  securityType:any;
  securitySubType: any;

  reportedToPolice: any;
  policeForce: any;
  itemOwnership: any;
  seriousInjuryOrFatality: any;
  

  public selectedReportedToPolice: any = false;
  public selectedItemOwnership: any = false;

  constructor(private appDataProvider: ApplicationDataProvider,
    private ev:Events, public DB : SubmissionsProvider) {
this.ev.subscribe('functionCall:securityincidenttype', eventData => {
this.securityTypeCategoryChange(eventData);
});
console.log('Hello SecurityCategoryComponent Component');

}
ngOnInit(){
  this.formInit();
  this.SecurityCategoryInit();
}

ReportedToPolice($event){
  switch($event) {
    case "Yes": {
      this.selectedReportedToPolice = true;

      break;
    }
    default: {
      this.selectedReportedToPolice = false;
      break;

    }
  }
}

ItemOwnership($event){
  switch($event) {
    case "Contractor":
    case "Hired":
    case "Member of Public":
    case "Personal":
    case "STS":
    case "STW":
    {
      this.selectedItemOwnership = true;

      break;
    }
    default: {
      this.selectedItemOwnership = false;
      break;

    }
  }
}

async formInit(){
  try {
    await this.appDataProvider.getSecurityCategory()
        .subscribe(securitycategory =>{
          this.securityType = securitycategory;
          console.dir('appDataServicengOnInit=', this.securityType);
        });
  }
  catch (error) {
    console.warn(error);
  }}

  async SecurityCategoryInit(){

          try {
        await this.appDataProvider.getreportedToPolice()
          .subscribe(category =>{
            this.reportedToPolice = category;
            console.dir('reportedToPolice=', this.reportedToPolice);
          });

        await this.appDataProvider.getpoliceForce()
          .subscribe(category =>{
            this.policeForce = category;
            console.dir('policeForce=', this.policeForce);
          });

        await this.appDataProvider.getitemOwnership()
          .subscribe(category =>{
            this.itemOwnership = category;
            console.dir('itemOwnership=', this.itemOwnership);
          });

        await this.appDataProvider.getseriousInjuryOrFatality()
          .subscribe(category =>{
            this.seriousInjuryOrFatality = category;
            console.dir('seriousInjuryOrFatality=', this.seriousInjuryOrFatality);
          });

        // await this.appDataProvider.getSecurityCategory()
        //   .subscribe(category =>{
        //     this.securityCategory = category;
        //     console.dir('appDataServicengOnInit=', this.securityCategory);
        //   });
      }
      catch (error) {
        console.warn(error);
      }

}
async securityTypeCategoryChange(value){
  try {
    await this.appDataProvider.getSecurityIncidentType()
        .subscribe(securityincidenttype =>{
          let items = [];
          for (var i = 0 ; i < securityincidenttype.length; i++)
          {
            if (securityincidenttype[i].SecurityCategory == value)
            {
              items.push(securityincidenttype[i]);
            }
          }
          this.securitySubType = items;
          console.dir('appDataServicengOnInit=', this.securityType);
        });
    this.autosave(value, "SecurityCategoryApplicable", "securityTypeControl");
  }
  catch (error) {
    // console.warn(error);
  }
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