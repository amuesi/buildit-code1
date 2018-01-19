import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnsafeBehaviourPage } from './unsafe-behaviour';
import { SafetyNetModule } from "../../app/safetynet.module";

import { ImmediateCorrectiveActionsUnsafeBehaviourComponent } from "../../components/immediate-corrective-actions-unsafe-behaviour/immediate-corrective-actions-unsafe-behaviour";
import { WhatHappenedUnsafeBehaviourComponent } from "../../components/what-happened-unsafe-behaviour/what-happened-unsafe-behaviour";
import { WhereAndWhenUnsafeBehaviourComponent } from "../../components/where-and-when-unsafebehaviour/where-and-when-unsafebehaviour";
import { StandardsUnsafeBehaviourComponent } from "../../components/standards-unsafebehaviour/standards-unsafe-behaviour";




@NgModule({
  declarations: [
    UnsafeBehaviourPage,
    WhatHappenedUnsafeBehaviourComponent,
    WhereAndWhenUnsafeBehaviourComponent,
    ImmediateCorrectiveActionsUnsafeBehaviourComponent,
    StandardsUnsafeBehaviourComponent
  ],
  imports: [
    IonicPageModule.forChild(UnsafeBehaviourPage),
        SafetyNetModule

  ],
  exports: [
    UnsafeBehaviourPage
  ]
})
export class UnsafeBehaviourPageModule {}
