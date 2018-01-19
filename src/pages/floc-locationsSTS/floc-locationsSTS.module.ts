import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlocLocationsSTSPage } from './floc-locationsSTS';

@NgModule({
  declarations: [
    FlocLocationsSTSPage,
  ],
  imports: [
    IonicPageModule.forChild(FlocLocationsSTSPage),
  ],
  exports: [
    FlocLocationsSTSPage
  ]
})
export class FlocLocationsSTSPageModule {}
