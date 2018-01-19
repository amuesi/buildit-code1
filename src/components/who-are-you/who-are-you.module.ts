import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhoAreYouComponent } from './who-are-you';

@NgModule({
  declarations: [
    WhoAreYouComponent,
  ],
  imports: [
    IonicPageModule.forChild(WhoAreYouComponent),
  ],
  exports: [
    WhoAreYouComponent
  ]
})
export class WhoAreYouComponentModule {}
