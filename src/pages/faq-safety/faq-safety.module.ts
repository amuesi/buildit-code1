import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqSafetyPage } from './faq-safety';

@NgModule({
  declarations: [
    FaqSafetyPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqSafetyPage),
  ],
  exports: [
    FaqSafetyPage
  ]
})
export class FaqSafetyPageModule {}
