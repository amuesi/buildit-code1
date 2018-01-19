import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecurityNonCompliancePage } from './security-non-compliance';


import { WhereAndWhenSecurityNonComplianceComponent } from "../../components/where-and-when-security-non-compliance/where-and-when-security-non-compliance";


import { ImmediateCorrectiveActionSecurityNonComplianceComponent } from "../../components/immediate-corrective-action-security-non-compliance/immediate-corrective-action-security-non-compliance";


import { SafetyNetModule } from "../../app/safetynet.module";

@NgModule({
  declarations: [
    SecurityNonCompliancePage,
    WhereAndWhenSecurityNonComplianceComponent,
    ImmediateCorrectiveActionSecurityNonComplianceComponent,
    
  ],
  imports: [
    IonicPageModule.forChild(SecurityNonCompliancePage),
    SafetyNetModule
  ],
  exports: [
    SecurityNonCompliancePage
  ]
})
export class SecurityNonCompliancePageModule {}
