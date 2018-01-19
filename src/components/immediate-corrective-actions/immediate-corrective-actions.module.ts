import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImmediateCorrectiveActionsComponent } from './immediate-corrective-actions';

@NgModule({
  declarations: [
    ImmediateCorrectiveActionsComponent,
  ],
  imports: [
    IonicPageModule.forChild(ImmediateCorrectiveActionsComponent),
  ],
  exports: [
    ImmediateCorrectiveActionsComponent
  ]
})
export class ImmediateCorrectiveActionsComponentModule {}
