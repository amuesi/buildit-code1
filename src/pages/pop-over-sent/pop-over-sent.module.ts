import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopOverSentPage } from './pop-over-sent';

@NgModule({
  declarations: [
    PopOverSentPage,
  ],
  imports: [
    IonicPageModule.forChild(PopOverSentPage),
  ],
  exports: [
    PopOverSentPage
  ]
})
export class PopOverSentPageModule {}
