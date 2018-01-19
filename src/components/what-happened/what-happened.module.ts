import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatHappenedComponent } from './what-happened';

@NgModule({
  declarations: [
    WhatHappenedComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhatHappenedComponent),
  ],
  exports: [
    WhatHappenedComponent
  ]
})
export class WhatHappenedComponentModule {}
