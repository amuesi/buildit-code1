import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImmediateCorrectiveActionSecurityComponent } from './immediate-corrective-action-security';

@NgModule({
  declarations: [
    ImmediateCorrectiveActionSecurityComponent,
  ],
  imports: [
    IonicPageModule.forChild(ImmediateCorrectiveActionSecurityComponent),
  ],
  exports: [
    ImmediateCorrectiveActionSecurityComponent
  ]
})
export class ImmediateCorrectiveActionSecurityComponentModule {}
