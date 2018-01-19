import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { BusinessNews } from './business-news.component';

@NgModule({
  declarations: [
    BusinessNews
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BusinessNews
  ],
  entryComponents:[
    BusinessNews
  ]
})
export class BusinessNewsModule {}
