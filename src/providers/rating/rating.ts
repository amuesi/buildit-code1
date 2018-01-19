import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppRate } from '@ionic-native/app-rate';

/*
 Generated class for the RatingProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class RatingProvider {

  constructor(public http: Http,
              private _RATE: AppRate) {
    console.log('Hello RatingProvider Provider');

    this._RATE.preferences = {
      displayAppName 		: 'GH informer',
      storeAppURL      		: {
        ios                 : "com.ghananews.sarchitech",
        android           	: 'market://details?id=com.ghananews.sarchitech'
      }
    };
  }

  requestRating()
  {
    // alert('start');
    this._RATE.promptForRating(true);
  }
}
