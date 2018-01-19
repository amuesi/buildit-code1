import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StandardsComponent } from './standards';

@NgModule({
  declarations: [
    StandardsComponent,
  ],
  imports: [
    IonicPageModule.forChild(StandardsComponent),
  ],
  exports: [
    StandardsComponent
  ]
})
export class StandardsComponentModule {}
