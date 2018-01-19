import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmissionsPage } from './submissions';

@NgModule({
  declarations: [
    SubmissionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmissionsPage),
  ],
  exports: [
    SubmissionsPage
  ]
})
export class SubmissionsPageModule {}
