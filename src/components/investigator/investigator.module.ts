import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvestigatorComponent } from './investigator';

@NgModule({
  declarations: [
    InvestigatorComponent,
  ],
  imports: [
    IonicPageModule.forChild(InvestigatorComponent),
  ],
  exports: [
    InvestigatorComponent
  ]
})
export class InvestigatorComponentModule {}
