import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
/*
  Generated class for the PreloaderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PreloaderProvider {
  private loading : any;
  constructor(public http: Http, private _LOADING : LoadingController) {
    console.log('Hello PreloaderProvider Provider');
  }

  displayPreloader(message: string) :void{
    this.loading = this._LOADING.create({
      content :message
    });
    this.loading.present();
  }

  hidePreloader():void{
    this.loading.dismiss();
  }
}
