import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaterQualityPage } from './water-quality';


import { WhatHappenedWaterQualityComponent } from "../../components/what-happened-water-quality/what-happened-water-quality";
import { WhereAndWhenWaterQualityComponent } from "../../components/where-and-when-water-quality/where-and-when-water-quality";

import {StandardsWaterQualityComponent} from '../../components/standards-water-quality/standards-water-quality';

import { ImmediateCorrectiveActionsWaterQualityComponent } from "../../components/immediate-corrective-actions-water-quality/immediate-corrective-actions-water-quality";


import { SafetyNetModule } from "../../app/safetynet.module";

@NgModule({
  declarations: [
    WaterQualityPage,
    WhatHappenedWaterQualityComponent,
    WhereAndWhenWaterQualityComponent,
    ImmediateCorrectiveActionsWaterQualityComponent,
    StandardsWaterQualityComponent
  ],
  imports: [
    IonicPageModule.forChild(WaterQualityPage),
    SafetyNetModule
  ],
  exports: [
    WaterQualityPage
  ]
})
export class WaterQualityPageModule {}
