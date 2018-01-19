import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatHappenedUnsafeBehaviourComponent } from './what-happened-unsafe-behaviour';

@NgModule({
  declarations: [
    WhatHappenedUnsafeBehaviourComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhatHappenedUnsafeBehaviourComponent),
  ],
  exports: [
    WhatHappenedUnsafeBehaviourComponent
  ]
})
export class WhatHappenedUnsafeBehaviourComponentModule {}
