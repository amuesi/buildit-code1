import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FurtherInformationComponent } from './further-information';

@NgModule({
  declarations: [
    FurtherInformationComponent,
  ],
  imports: [
    IonicPageModule.forChild(FurtherInformationComponent),
  ],
  exports: [
    FurtherInformationComponent
  ]
})
export class FurtherInformationComponentModule {}
