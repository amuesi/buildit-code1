import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StandardsWaterQualityComponent } from './standards-water-quality';

@NgModule({
  declarations: [
    StandardsWaterQualityComponent,
  ],
  imports: [
    IonicPageModule.forChild(StandardsWaterQualityComponent),
  ],
  exports: [
    StandardsWaterQualityComponent
  ]
})
export class StandardsWaterQualityComponentModule {}
