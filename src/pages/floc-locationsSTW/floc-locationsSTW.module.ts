import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlocLocationsSTWPage } from './floc-locationsSTW';

@NgModule({
  declarations: [
    FlocLocationsSTWPage,
  ],
  imports: [
    IonicPageModule.forChild(FlocLocationsSTWPage),
  ],
  exports: [
    FlocLocationsSTWPage
  ]
})
export class FlocLocationsSTWPageModule {}
