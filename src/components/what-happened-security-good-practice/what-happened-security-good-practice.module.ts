import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatHappenedSecurityGoodPracticeComponent } from './what-happened-security-good-practice';

@NgModule({
  declarations: [
    WhatHappenedSecurityGoodPracticeComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhatHappenedSecurityGoodPracticeComponent),
  ],
  exports: [
    WhatHappenedSecurityGoodPracticeComponent
  ]
})
export class WhatHappenedSecurityGoodPracticeComponentModule {}
