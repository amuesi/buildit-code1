import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhereAndWhenHazardComponent } from './where-and-when-hazard';

@NgModule({
  declarations: [
    WhereAndWhenHazardComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhereAndWhenHazardComponent),
  ],
  exports: [
    WhereAndWhenHazardComponent
  ]
})
export class WhereAndWhenHazardComponentModule {}
