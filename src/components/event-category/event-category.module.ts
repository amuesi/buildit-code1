import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventCategoryComponent } from './event-category';

@NgModule({
  declarations: [
    EventCategoryComponent,
  ],
  imports: [
    IonicPageModule.forChild(EventCategoryComponent),
  ],
  exports: [
    EventCategoryComponent
  ]
})
export class EventCategoryComponentModule {}
