import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { SettingsComponent } from './settings-component/settings.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
  	CommonModule,
  	SharedModule,
      IonicPageModule.forChild(SettingsComponent),
  ],
  exports: [
    SettingsComponent
  ],
  entryComponents:[
  	SettingsComponent
  ]
})
export class SettingsModule {}
