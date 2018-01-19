import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhereAndWhenWaterQualityComponent } from './where-and-when-water-quality';

@NgModule({
  declarations: [
    WhereAndWhenWaterQualityComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhereAndWhenWaterQualityComponent),
  ],
  exports: [
    WhereAndWhenWaterQualityComponent
  ]
})
export class WhereAndWhenWaterQualityComponentModule {}
