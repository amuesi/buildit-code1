import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImmediateCorrectiveActionsWaterQualityComponent } from './immediate-corrective-actions-water-quality';

@NgModule({
  declarations: [
    ImmediateCorrectiveActionsWaterQualityComponent,
  ],
  imports: [
    IonicPageModule.forChild(ImmediateCorrectiveActionsWaterQualityComponent),
  ],
  exports: [
    ImmediateCorrectiveActionsWaterQualityComponent
  ]
})
export class ImmediateCorrectiveActionsWaterQualityComponentModule {}



