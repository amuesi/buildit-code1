import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqProfilePage } from './faq-profile';

@NgModule({
  declarations: [
    FaqProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(FaqProfilePage),
  ],
  exports: [
    FaqProfilePage
  ]
})
export class FaqProfilePageModule {}
