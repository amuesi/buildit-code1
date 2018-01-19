import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecurityIncidentPage } from './security-incident';



import { WhereAndWhenHazardSecurityIncidentComponent } from "../../components/where-and-when-hazard-security-incident/where-and-when-hazard-security-incident";


import { ImmediateCorrectiveActionsSecurityIncidentComponent } from "../../components/immediate-corrective-actions-security-incident/immediate-corrective-actions-security-incident"



import { SafetyNetModule } from "../../app/safetynet.module";


@NgModule({
  declarations: [
    SecurityIncidentPage,
    WhereAndWhenHazardSecurityIncidentComponent,
    ImmediateCorrectiveActionsSecurityIncidentComponent
    
  ],
  imports: [
    IonicPageModule.forChild(SecurityIncidentPage),
    SafetyNetModule
  ],
  exports: [
    SecurityIncidentPage
  ]
})
export class SecurityIncidentPageModule {}