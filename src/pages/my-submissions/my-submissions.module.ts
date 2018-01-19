import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySubmissionsPage } from './my-submissions';

@NgModule({
  declarations: [
    MySubmissionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MySubmissionsPage),
  ],
  exports: [
    MySubmissionsPage
  ]
})
export class MySubmissionsPageModule {}
