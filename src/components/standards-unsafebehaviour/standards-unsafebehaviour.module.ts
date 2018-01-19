import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StandardsUnsafeBehaviourComponent } from './standards-unsafe-behaviour';

@NgModule({
  declarations: [
    StandardsUnsafeBehaviourComponent,
  ],
  imports: [
    IonicPageModule.forChild(StandardsUnsafeBehaviourComponent),
  ],
  exports: [
    StandardsUnsafeBehaviourComponent
  ]
})
export class StandardsUnsafeBehaviourComponentModule {}
