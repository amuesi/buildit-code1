import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqsPage } from './faqs';

@NgModule({
  declarations: [
    FaqsPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqsPage),
  ],
  exports: [
    FaqsPage
  ]
})
export class FaqsPageModule {}
