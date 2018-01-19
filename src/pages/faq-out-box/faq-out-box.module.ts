import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqOutBoxPage } from './faq-out-box';

@NgModule({
  declarations: [
    FaqOutBoxPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqOutBoxPage),
  ],
  exports: [
    FaqOutBoxPage
  ]
})
export class FaqOutBoxPageModule {}
