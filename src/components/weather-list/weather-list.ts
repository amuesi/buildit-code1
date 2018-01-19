import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import {NavController, LoadingController, AlertController} from 'ionic-angular';
import {
  CONFIG,
  DatabaseService,
  DataPoint,
  DEFAULT_METRICS,
  Forecast,
  ForecastService,
  Location,
  Metrics,
  UtilService
} from '../../providers/weather-service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { AppState } from '../../app/app.global';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'weather-list',
  templateUrl: 'weather-list.html'
})
export class WeatherListComponent implements OnInit, OnDestroy {
  @Input() onInitEmitter: EventEmitter<string>;
  @Input() onDestroyEmitter: EventEmitter<string>;
  @Input() location: Location;
  forecast: Forecast;
  metrics: Metrics;
  todayForecast: DataPoint;
  forecastSubscriber: Subscription;
  hourlyArray: Array<{
    time: number,
    icon: string,
    temperature: number
  }> = [];
  loading : any;
  constructor(public navCtrl: NavController,
              public forecastService: ForecastService,
              public databaseService: DatabaseService,
              public utilService: UtilService,
              private global:AppState,
              private geolocation:Geolocation,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController,
  ) {
  }
  ionViewDidLoad(){
    this.loading = this.loadingCtrl.create({
      content: 'Loading Weather data...'
    });

    this.loading.present();
  }
  itemClicked(item: any) {
    this.navCtrl.push('WeatherDetailPage', {
      forecast: this.forecast,
      currentForecast: item,
      currentLocation: this.location,
      metrics: this.metrics
    });
  }

  ngOnInit() {
    //these emitters are used to programmatically activate lifecycle events
    //because in Ionic 2, changing tabs doesn't activate lifecycle of templates
    if (this.onInitEmitter) {
      this.onInitEmitter.subscribe(() => this.init());
    }
    if (this.onDestroyEmitter) {
      this.onDestroyEmitter.subscribe(() => this.destroy());
    }
    this.init();
  }

  init() {
    // this.loading = this.loadingCtrl.create({
    //   content: 'Loading Weather data...'
    // });
    // this.loading.present();

    let self = this;
    if (self.location.name !='') {
      self.getForecast(self.location);
    }
    else{
      self.geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        self.location['lat'] = pos.coords.latitude;
        self.location['lng'] = pos.coords.longitude;
        self.location['name'] = '';
        self.getForecast(self.location);
      }).catch(err=>{
          self.loading.dismiss();
          self.alertShow("Can not get your current loction. Please check network state.")
      });
    }
    this.databaseService.getJson(CONFIG.METRICS).then(data => {
      if (data === null) {
        self.databaseService.setJson(CONFIG.METRICS, DEFAULT_METRICS);
        self.metrics = DEFAULT_METRICS;
      } else {
        self.metrics = data;
      }
    });
  }

  getForecast(location: Location) {
    let self = this;
    this.forecastSubscriber = self.forecastService.getForecast(location)
      .subscribe((data: Forecast) => {
        self.forecast = data;
        if (self.forecast && self.forecast.daily && self.forecast.daily.data) {
          self.todayForecast = self.forecast.daily.data[0];
        }
        self.hourlyArray = [];
        let currentHour = self.utilService.getCurrentHour(self.forecast.timezone);
        let flag = false;
        _.forEach(self.forecast.hourly.data, (obj: DataPoint) => {
          if (!flag && self.utilService.epochToHour(obj.time, self.forecast.timezone) < currentHour) {
            return;
          }
          flag = true;
          self.hourlyArray.push({
            time: obj.time,
            icon: obj.icon,
            temperature: obj.temperature
          });
          if (self.hourlyArray.length > 10) {
            return false;
          }
        });
        self.loading.dismiss();
      }, err => {
        self.loading.dismiss();
        self.alertShow("Can not get Weather data. Please check network state.")
        console.error(err);
      });
  }

  ngOnDestroy() {
    this.destroy();
  }

  destroy() {
    if (this.forecastSubscriber) {
      this.forecastSubscriber.unsubscribe();
    }
  }
  alertShow(message){
    let alert = this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: "Ok",
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }
}
