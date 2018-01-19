import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatHappenedSecurityComponent } from './what-happened-security';

@NgModule({
  declarations: [
    WhatHappenedSecurityComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhatHappenedSecurityComponent),
  ],
  exports: [
    WhatHappenedSecurityComponent
  ]
})
export class WhatHappenedSecurityComponentModule {}