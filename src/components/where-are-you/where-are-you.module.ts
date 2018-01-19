import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhereAreYouComponent } from './where-are-you';

@NgModule({
  declarations: [
    WhereAreYouComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhereAreYouComponent),
  ],
  exports: [
    WhereAreYouComponent
  ]
})
export class WhereAreYouComponentModule {}
