import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhereAndWhenSecurityNonComplianceComponent } from './where-and-when-security-non-compliance';

@NgModule({
  declarations: [
    WhereAndWhenSecurityNonComplianceComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhereAndWhenSecurityNonComplianceComponent),
  ],
  exports: [
    WhereAndWhenSecurityNonComplianceComponent
  ]
})
export class WhereAndWhenSecurityNonComplianceComponentModule {}
