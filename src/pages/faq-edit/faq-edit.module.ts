import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqEditPage } from './faq-edit';

@NgModule({
  declarations: [
    FaqEditPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqEditPage),
  ],
  exports: [
    FaqEditPage
  ]
})
export class FaqEditPageModule {}
