import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController, ToastController} from 'ionic-angular';
/*
  Generated class for the MessagingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MessagingProvider {

  constructor(public http: Http, private _ALERT : AlertController, private _TOAST : ToastController) {
    console.log('Hello MessagingProvider Provider');
  }

  displayMessageWindow(title : string, message :string) :void
  {
    let alert = this._ALERT.create({
      title : title,
      subTitle : message,
      buttons: ['Got It!']
    });
    alert.present();
  }

  displayNotification(message){
    let toast = this._TOAST.create({
      message : message,
      duration :3000,
      position :'bottom'
    });
    toast.present();
  }
}
