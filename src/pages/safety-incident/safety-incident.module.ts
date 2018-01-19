import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SafetyIncidentPage } from './safety-incident';
import { SafetyNetModule } from "../../app/safetynet.module";
import { WhatHappenedComponent } from "../../components/what-happened/what-happened";
import { WhereAndWhenComponent } from "../../components/where-and-when/where-and-when";
import { EventCategoryComponent } from "../../components/event-category/event-category";
import { PersonInvolvedComponent } from "../../components/person-involved/person-involved";
import { InvestigatorComponent } from "../../components/investigator/investigator";
import { IllnessTreatmentDetailsComponent } from "../../components/illness-treatment-details/illness-treatment-details";
import { ImmediateCorrectiveActionsComponent } from "../../components/immediate-corrective-actions/immediate-corrective-actions";








@NgModule({
  declarations: [
    SafetyIncidentPage,
    WhatHappenedComponent,
    WhereAndWhenComponent,
    ImmediateCorrectiveActionsComponent,
    EventCategoryComponent,
    PersonInvolvedComponent,
    InvestigatorComponent,
    IllnessTreatmentDetailsComponent,
  
  ],
  imports: [
    IonicPageModule.forChild(SafetyIncidentPage),
     SafetyNetModule
  ],
  entryComponents: [
    
  ]
})
export class SafetyIncidentPageModule {}
