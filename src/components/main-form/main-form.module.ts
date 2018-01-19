import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainFormComponent } from './main-form';

@NgModule({
  declarations: [
    MainFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(MainFormComponent),
  ],
  exports: [
    MainFormComponent
  ]
})
export class MainFormComponentModule {}
