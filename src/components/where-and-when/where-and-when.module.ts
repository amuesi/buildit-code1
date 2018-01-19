import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhereAndWhenComponent } from './where-and-when';

@NgModule({
  declarations: [
    WhereAndWhenComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhereAndWhenComponent),
  ],
  exports: [
    WhereAndWhenComponent
  ]
})
export class WhereAndWhenComponentModule {}
