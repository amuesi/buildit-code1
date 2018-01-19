import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { CurrencyComponent } from './currency-component/currency.component';

@NgModule({
  declarations: [
      CurrencyComponent
  ],
  imports: [
  	CommonModule,
  	SharedModule
  ],
  exports: [
      CurrencyComponent
  ],
  entryComponents:[
      CurrencyComponent
  ]
})
export class CurrencyModule {}
