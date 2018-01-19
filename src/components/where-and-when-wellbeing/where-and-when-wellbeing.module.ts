import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhereAndWhenWellbeingComponent } from './where-and-when-wellbeing';

@NgModule({
  declarations: [
    WhereAndWhenWellbeingComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhereAndWhenWellbeingComponent),
  ],
  exports: [
    WhereAndWhenWellbeingComponent
  ]
})
export class WhereAndWhenWellbeingComponentModule {}
