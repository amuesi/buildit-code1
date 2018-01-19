import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PositiveBehaviourPage } from './positive-behaviour';
import { SafetyNetModule } from "../../app/safetynet.module";

import { WhatHappenedPositiveBehaviourComponent } from "../../components/what-happened-positive-behaviour/what-happened-positive-behaviour";
import { WhereAndWhenBehaviourComponent } from "../../components/where-and-when-behaviour/where-and-when-behaviour";
import { ImmediateCorrectiveActionsBehaviourComponent } from "../../components/immediate-corrective-actions-behaviour/immediate-corrective-actions-behaviour";
import {StandardsBehaviourComponent} from '../../components/standards-behaviour/standards-behaviour';



@NgModule({
  declarations: [
    PositiveBehaviourPage,
    WhatHappenedPositiveBehaviourComponent,
    WhereAndWhenBehaviourComponent,
    ImmediateCorrectiveActionsBehaviourComponent,
    StandardsBehaviourComponent
    
  ],
  imports: [
    IonicPageModule.forChild(PositiveBehaviourPage),
    SafetyNetModule
  ],
  exports: [
    PositiveBehaviourPage
  ]
})
export class PositiveBehaviourPageModule {}
