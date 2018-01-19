import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhereAndWhenHazardSecurityIncidentComponent } from './where-and-when-hazard-security-incident';

@NgModule({
  declarations: [
    WhereAndWhenHazardSecurityIncidentComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhereAndWhenHazardSecurityIncidentComponent),
  ],
  exports: [
    WhereAndWhenHazardSecurityIncidentComponent
  ]
})
export class WhereAndWhenHazardSecurityIncidentComponentModule {}
