import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqSecurityPage } from './faq-security';

@NgModule({
  declarations: [
    FaqSecurityPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqSecurityPage),
  ],
  exports: [
    FaqSecurityPage
  ]
})
export class FaqSecurityPageModule {}
