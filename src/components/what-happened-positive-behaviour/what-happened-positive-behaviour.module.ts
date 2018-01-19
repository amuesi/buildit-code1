import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatHappenedPositiveBehaviourComponent } from './what-happened-positive-behaviour';

@NgModule({
  declarations: [
    WhatHappenedPositiveBehaviourComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhatHappenedPositiveBehaviourComponent),
  ],
  exports: [
    WhatHappenedPositiveBehaviourComponent
  ]
})
export class WhatHappenedPositiveBehaviourComponentModule {}
