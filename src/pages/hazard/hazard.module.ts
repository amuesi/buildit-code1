import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HazardPage } from './hazard';


import { WhatHappenedHazardComponent } from "../../components/what-happened-hazard/what-happened-hazard";
import { WhereAndWhenHazardComponent } from "../../components/where-and-when-hazard/where-and-when-hazard";

import {StandardsComponent} from '../../components/standards/standards';

import { ImmediateCorrectiveActionsComponentHazard } from "../../components/immediate-corrective-actions-hazard/immediate-corrective-actions-hazard";



import { SafetyNetModule } from "../../app/safetynet.module";

@NgModule({
  declarations: [
    HazardPage,
    WhatHappenedHazardComponent,
    WhereAndWhenHazardComponent,
    ImmediateCorrectiveActionsComponentHazard,
    StandardsComponent,
  ],
  imports: [
    IonicPageModule.forChild(HazardPage),
    SafetyNetModule
  ],
  exports: [
    HazardPage
  ]
})
export class HazardPageModule {}
