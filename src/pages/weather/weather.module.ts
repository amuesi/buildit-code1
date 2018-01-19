import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { WeatherComponent } from './weather-component/weather.component';
import { HomeWeatherPage } from './home-weather/home-weather';
import { LocationPage } from './location/location';
import { SettingsPage } from './settings/settings';
import { TabsPage } from './tabs/tabs';
import { WeatherDetailPage } from './weather-detail/weather-detail';
import { WorldCityListPage } from './world-city-list/world-city-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
      WeatherComponent
  ],
  imports: [
      ComponentsModule,
  	CommonModule,
  	SharedModule
  ],
  exports: [
      WeatherComponent
  ],
  entryComponents:[
      WeatherComponent
  ]
})
export class WeatherModule {}
