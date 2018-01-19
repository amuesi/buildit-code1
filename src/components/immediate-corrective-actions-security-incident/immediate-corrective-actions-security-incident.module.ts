import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImmediateCorrectiveActionsSecurityIncidentComponent } from './immediate-corrective-actions-security-incident';

@NgModule({
  declarations: [
    ImmediateCorrectiveActionsSecurityIncidentComponent,
  ],
  imports: [
    IonicPageModule.forChild(ImmediateCorrectiveActionsSecurityIncidentComponent),
  ],
  exports: [
    ImmediateCorrectiveActionsSecurityIncidentComponent
  ]
})
export class ImmediateCorrectiveActionsSecurityIncidentComponentModule {}
