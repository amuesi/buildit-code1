import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImmediateCorrectiveActionsUnsafeBehaviourComponent } from './immediate-corrective-actions-unsafe-behaviour';

@NgModule({
  declarations: [
    ImmediateCorrectiveActionsUnsafeBehaviourComponent,
  ],
  imports: [
    IonicPageModule.forChild(ImmediateCorrectiveActionsUnsafeBehaviourComponent),
  ],
  exports: [
    ImmediateCorrectiveActionsUnsafeBehaviourComponent
  ]
})
export class ImmediateCorrectiveActionsUnsafeBehaviourComponentModule {}
