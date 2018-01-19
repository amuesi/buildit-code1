import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatHappenedWaterQualityComponent } from './what-happened-water-quality';

@NgModule({
  declarations: [
    WhatHappenedWaterQualityComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhatHappenedWaterQualityComponent),
  ],
  exports: [
    WhatHappenedWaterQualityComponent
  ]
})
export class WhatHappenedWaterQualityComponentModule {}
