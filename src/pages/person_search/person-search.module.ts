import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PersonSearchPage} from "./person-search";

@NgModule({
  declarations: [
    PersonSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonSearchPage),
  ],
  exports: [
    PersonSearchPage
  ]
})
export class PersonSearchPageModule {}
