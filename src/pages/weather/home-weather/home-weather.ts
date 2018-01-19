import { Component, EventEmitter } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CONFIG, DatabaseService, Location } from '../../../providers/weather-service';
// import { Geolocation } from '@ionic-native/geolocation';

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-home-weather',
  templateUrl: 'home-weather.html'
})
export class HomeWeatherPage {
  onInitEmitter: EventEmitter<string>;
  onDestroyEmitter: EventEmitter<string>;
  location = {};
  // location: Location;

  constructor(public databaseService: DatabaseService,
              public modalCtrl: ModalController,
              ) {
    this.onInitEmitter = new EventEmitter<string>();
    this.onDestroyEmitter = new EventEmitter<string>();
  }

  ionViewWillEnter() {
    let self = this;
    // this.geolocation.getCurrentPosition().then(pos => {
    //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
    //   self.location['lat'] = pos.coords.latitude;
    //   self.location['lng'] = pos.coords.longitude;
    self.location['name'] = '';
    //   self.emitInit();
    // });
    self.emitInit();
  }

  emitInit() {
    if (this.onInitEmitter) {
      this.onInitEmitter.emit('');
    }
  }

  ionViewWillLeave() {
    if (this.onDestroyEmitter) {
      this.onDestroyEmitter.emit('');
    }
  }
}
