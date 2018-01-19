import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { DailyScriptureComponent } from './daily-scripture-component/daily.scripture.component';

@NgModule({
  declarations: [
      DailyScriptureComponent
  ],
  imports: [
  	CommonModule,
  	SharedModule
  ],
  exports: [
      DailyScriptureComponent
  ],
  entryComponents:[
      DailyScriptureComponent
  ]
})
export class DailyScriptureModule {}
