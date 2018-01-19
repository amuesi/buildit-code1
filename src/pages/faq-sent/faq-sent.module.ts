import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqSentPage } from './faq-sent';

@NgModule({
  declarations: [
    FaqSentPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqSentPage),
  ],
  exports: [
    FaqSentPage
  ]
})
export class FaqSentPageModule {}
