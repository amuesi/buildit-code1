import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IllnessTreatmentDetailsComponent } from './illness-treatment-details';
import {search_page} from "../../pages/search-page/search-page";

@NgModule({
  declarations: [
    IllnessTreatmentDetailsComponent,
  ],
  imports: [
    IonicPageModule.forChild(IllnessTreatmentDetailsComponent),
  ],
  exports: [
    IllnessTreatmentDetailsComponent
  ]
})
export class IllnessTreatmentDetailsComponentModule {}
