import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImmediateCorrectiveActionsBehaviourComponent } from './immediate-corrective-actions-behaviour';

@NgModule({
  declarations: [
    ImmediateCorrectiveActionsBehaviourComponent,
  ],
  imports: [
    IonicPageModule.forChild(ImmediateCorrectiveActionsBehaviourComponent),
  ],
  exports: [
    ImmediateCorrectiveActionsBehaviourComponent
  ]
})
export class ImmediateCorrectiveActionsBehaviourComponentModule {}
