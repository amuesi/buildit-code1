import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { search_page } from './search-page';

@NgModule({
  declarations: [
    search_page,
  ],
  imports: [
    IonicPageModule.forChild(search_page),
  ],
  exports: [
    search_page
  ]
})
export class search_pageModule {}
