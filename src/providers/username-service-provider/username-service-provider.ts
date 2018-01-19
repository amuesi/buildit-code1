import { Injectable } from '@angular/core';
import { AlertController, Platform, Config } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class UsernameServiceProvider {
    baseUrl: string;
  username:string;
  deviceId:string;
  appName:string;
  appV:string;


  constructor(
    private http: Http,
    private alertCtrl: AlertController,
    private plt: Platform,
    private device: Device,
    private appVersion: AppVersion,
    public config: Config
  ) {
    // console.log('Hello Colleagues Provider');

          plt.ready()
              .then(res => {
                  let cordova = (<any>window).cordova;
                  if (cordova && cordova.platformId != "browser" && cordova.airwatch) {
                      console.log('Cordova Plugin found');
                      cordova.airwatch.getUsername(username => {this.username = username})
                  }
                  // this.username = 'hquick1';
                  // this.username = this.config.get('username');
                  // console.log('got username', this.username);
              });

    
        this.baseUrl = config.get('baseUrl');



  }

}
