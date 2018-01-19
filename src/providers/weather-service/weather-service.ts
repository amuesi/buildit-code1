import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { CurrentLoc } from '../../app/interfaces/current-loc';


/*
  Generated class for the WeatherServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WeatherServiceProvider {
  data: any = null;

  constructor(public http: Http) {
    console.log('Hello WeatherServiceProvider Provider');
  }

  load(currentLoc:CurrentLoc) {
    // if (this.data) {
    //   return Promise.resolve(this.data);
    // }

    return new Promise(resolve => {
      // this.http.get('assets/data/data.json')
      //     .map(res => res.json())
      //     .subscribe(data => {
      //       this.data = data;
      //       resolve(this.data);
      //     });

      this.http.get('https://api.darksky.net/forecast/11471c56c5c16eedc5f1b4a714010a4f/' + currentLoc.lat + ',' + currentLoc.lon)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
    });
  }

  getWeather(currentLoc:CurrentLoc) {
    return this.load(currentLoc).then(data => {
      return data;
    });
  }



}
