import { Component } from '@angular/core';
import { NavController, Events, MenuController } from 'ionic-angular';

import { WeatherCurrentComponent } from '../weatherCurrent/weather-current-component/weatherCurrent.component';
import { LocationComponent } from '../location/location-component/location.component';
import { PageInterface, UtilService } from '../../../providers/weather-service';
declare let google: any;

@Component({
	selector: 'page-weather',
	templateUrl: 'weather.html'
})
export class WeatherComponent {
	// pages: Array<{title: string, component: any, icon: string, note: string, params?: any}>;
	acService: any;

	pages: Array<{ heading: string, items: PageInterface[] }> = [
		{
			heading: 'Weather',
			items: [
				// { title: 'Current Location', name: 'TabsPage', tabName: 'HomeWeatherPage', index: 0, icon: 'home' },
				// { title: 'World', name: 'TabsPage', tabName: 'WorldCityListPage', index: 1, icon: 'globe' }
				{ title: 'Current Location', name: 'HomeWeatherPage', icon: 'home' },
				{ title: 'World', name: 'WorldCityListPage', icon: 'globe' }
			]
		},
		{
			heading: 'Settings',
			items: [
				{ title: 'Settings', name: 'SettingsPage', icon: 'settings' }
			]
		}
	];
	constructor(
		private navController: NavController,
		private menuController: MenuController,
		private events: Events) {}

	ngOnInit() {
	  	// this.pages = [
	    //   // { title: 'Edit Locations', component: LocationComponent, icon: 'create', note: 'Location' },
	    //   { title: 'Current Location', component: WeatherCurrentComponent, icon: 'pin', note: 'Location' }
	    // ];

		this.acService = null;// new google.maps.places.AutocompleteService();


	    this.events.subscribe('navigationEvent',(object) => {
	    	this.menuController.close();
				if (object.component) {
					this.navController.push(object.component, object.params);
				}
		});
	}

	openPage(page: PageInterface) {
		// if (this.isActive(page)) {
		// 	return;
		// }
		let params = page.index ? { tabIndex: page.index } : {};
		this.navController.push(page.name).catch(err => console.error(err));


		// if (this.navController.getActiveChildNav() && page.index != undefined) {
		// 	this.navController.getActiveChildNav().select(page.index);
		// } else {
		// 	this.navController.push(page.name, params).catch(err => console.error(err));
		// }
	}



}
