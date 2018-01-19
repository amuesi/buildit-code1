import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { likepopover } from './likepopover';

@NgModule({
  declarations: [
    likepopover,
  ],
  imports: [
    IonicPageModule.forChild(likepopover),
  ],
  exports: [
    likepopover
  ]
})
export class LikepopoverModule {}
