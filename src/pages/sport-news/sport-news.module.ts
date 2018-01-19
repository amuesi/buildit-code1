import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { SportNews } from './sport-news.component';

@NgModule({
  declarations: [
    SportNews
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SportNews
  ],
  entryComponents:[
    SportNews
  ]
})
export class SportNewsModule {}
