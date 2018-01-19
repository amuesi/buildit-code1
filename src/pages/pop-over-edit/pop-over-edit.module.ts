import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopOverEditPage } from './pop-over-edit';

@NgModule({
  declarations: [
    PopOverEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PopOverEditPage),
  ],
  exports: [
    PopOverEditPage
  ]
})
export class PopOverEditPageModule {}
