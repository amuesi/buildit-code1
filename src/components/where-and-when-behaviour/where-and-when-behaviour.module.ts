import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhereAndWhenBehaviourComponent } from './where-and-when-behaviour';

@NgModule({
  declarations: [
    WhereAndWhenBehaviourComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhereAndWhenBehaviourComponent),
  ],
  exports: [
    WhereAndWhenBehaviourComponent
  ]
})
export class WhereAndWhenBehaviourComponentModule {}
