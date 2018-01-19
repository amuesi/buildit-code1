import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhereAndWhenSecurityGoodPracticeComponent } from './where-and-when-security-good-practice';

@NgModule({
  declarations: [
    WhereAndWhenSecurityGoodPracticeComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhereAndWhenSecurityGoodPracticeComponent),
  ],
  exports: [
    WhereAndWhenSecurityGoodPracticeComponent
  ]
})
export class WhereAndWhenSecurityGoodPracticeComponentModule {}
