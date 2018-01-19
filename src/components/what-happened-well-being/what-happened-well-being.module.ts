import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatHappenedWellBeingComponent } from './what-happened-well-being';

@NgModule({
  declarations: [
    WhatHappenedWellBeingComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhatHappenedWellBeingComponent),
  ],
  exports: [
    WhatHappenedWellBeingComponent
  ]
})
export class WhatHappenedWellBeingComponentModule {}
