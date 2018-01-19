import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutboxPage } from './outbox';

@NgModule({
  declarations: [
    OutboxPage,
  ],
  imports: [
    IonicPageModule.forChild(OutboxPage),
  ],
  exports: [
    OutboxPage
  ]
})
export class OutboxPageModule {}
