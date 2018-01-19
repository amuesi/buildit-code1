import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonInvolvedComponent } from './person-involved';

@NgModule({
  declarations: [
    PersonInvolvedComponent,
  ],
  imports: [
    IonicPageModule.forChild(PersonInvolvedComponent),
  ],
  exports: [
    PersonInvolvedComponent
  ]
})
export class PersonInvolvedComponentModule {}
