import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReferenceNumberComponent } from './reference-number';

@NgModule({
  declarations: [
    ReferenceNumberComponent,
  ],
  imports: [
    IonicPageModule.forChild(ReferenceNumberComponent),
  ],
  exports: [
    ReferenceNumberComponent
  ]
})
export class ReferenceNumberComponentModule {}
