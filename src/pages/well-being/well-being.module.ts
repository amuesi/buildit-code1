import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WellBeingPage } from './well-being';

import { WhatHappenedWellBeingComponent } from "../../components/what-happened-well-being/what-happened-well-being";
import { WhereAndWhenWellbeingComponent } from "../../components/where-and-when-wellbeing/where-and-when-wellbeing";

import { FurtherInformationComponent } from '../../components/further-information/further-information';


import { SafetyNetModule } from "../../app/safetynet.module";



@NgModule({
  declarations: [
    WellBeingPage,
    WhatHappenedWellBeingComponent,
    WhereAndWhenWellbeingComponent,
    WhereAndWhenWellbeingComponent,
    FurtherInformationComponent
  ],
  imports: [
    IonicPageModule.forChild(WellBeingPage),
    SafetyNetModule
  ],
  exports: [
    WellBeingPage
  ]
})
export class WellBeingPageModule {}
