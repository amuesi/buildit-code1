import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopOverSharePage } from './pop-over-share';

@NgModule({
  declarations: [
    PopOverSharePage,
  ],
  imports: [
    IonicPageModule.forChild(PopOverSharePage),
  ],
  exports: [
    PopOverSharePage
  ]
})
export class PopOverSharePageModule {}
