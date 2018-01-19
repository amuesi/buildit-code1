import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatHappenedHazardComponent } from './what-happened-hazard';

@NgModule({
  declarations: [
    WhatHappenedHazardComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhatHappenedHazardComponent),
  ],
  exports: [
    WhatHappenedHazardComponent
  ]
})
export class WhatHappenedHazardComponentModule {}
