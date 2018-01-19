import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageComponent } from './image';

@NgModule({
  declarations: [
    ImageComponent,
  ],
  imports: [
    IonicPageModule.forChild(ImageComponent),
  ],
  exports: [
    ImageComponent
  ]
})
export class ImageComponentModule {}
