import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopOverOutboxPage } from './pop-over-outbox';

@NgModule({
  declarations: [
    PopOverOutboxPage,
  ],
  imports: [
    IonicPageModule.forChild(PopOverOutboxPage),
  ],
  exports: [
    PopOverOutboxPage
  ]
})
export class PopOverOutboxPageModule {}
