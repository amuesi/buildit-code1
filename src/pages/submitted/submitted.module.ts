import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmittedPage } from './submitted';

@NgModule({
  declarations: [
    SubmittedPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmittedPage),
  ],
  exports: [
    SubmittedPage
  ]
})
export class SubmittedPageModule {}
