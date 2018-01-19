import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecurityGoodPracticePage } from './security-good-practice';

import { WhereAndWhenSecurityGoodPracticeComponent } from "../../components/where-and-when-security-good-practice/where-and-when-security-good-practice";


import { ImmediateCorrectiveActionSecurityGoodPracticeComponent } from "../../components/immediate-corrective-action-security-good-practice/immediate-corrective-action-security-good-practice";

import { WhatHappenedSecurityGoodPracticeComponent } from "../../components/what-happened-security-good-practice/what-happened-security-good-practice";


import { SafetyNetModule } from "../../app/safetynet.module";



@NgModule({
  declarations: [
    SecurityGoodPracticePage,
    WhereAndWhenSecurityGoodPracticeComponent,
    ImmediateCorrectiveActionSecurityGoodPracticeComponent,
    WhatHappenedSecurityGoodPracticeComponent

  ],
  imports: [
    IonicPageModule.forChild(SecurityGoodPracticePage),
        SafetyNetModule

  ],
  exports: [
    SecurityGoodPracticePage
  ]
})
export class SecurityGoodPracticePageModule {}
