import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImmediateCorrectiveActionsComponentHazard } from './immediate-corrective-actions-hazard';

@NgModule({
  declarations: [
    ImmediateCorrectiveActionsComponentHazard,
  ],
  imports: [
    IonicPageModule.forChild(ImmediateCorrectiveActionsComponentHazard),
  ],
  exports: [
    ImmediateCorrectiveActionsComponentHazard
  ]
})
export class ImmediateCorrectiveActionsHazardComponentModule {}
