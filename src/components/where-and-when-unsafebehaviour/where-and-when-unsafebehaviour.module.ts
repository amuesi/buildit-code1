import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhereAndWhenUnsafeBehaviourComponent } from './where-and-when-unsafebehaviour';

@NgModule({
  declarations: [
    WhereAndWhenUnsafeBehaviourComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhereAndWhenUnsafeBehaviourComponent),
  ],
  exports: [
    WhereAndWhenUnsafeBehaviourComponent
  ]
})
export class WhereAndWhenBehaviourComponentModule {}
