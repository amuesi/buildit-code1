import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StandardsBehaviourComponent } from './standards-behaviour';

@NgModule({
  declarations: [
    StandardsBehaviourComponent,
  ],
  imports: [
    IonicPageModule.forChild(StandardsBehaviourComponent),
  ],
  exports: [
    StandardsBehaviourComponent
  ]
})
export class StandardsBehaviourComponentModule {}
