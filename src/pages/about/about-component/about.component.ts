import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AppState } from '../../../app/app.global';
import { InAppBrowser } from '@ionic-native/in-app-browser';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutComponent {

  constructor(public navCtrl: NavController,
              private global: AppState, private iab: InAppBrowser) {

    // throw new Error('I am a bug... 🐛');

  }
  goToSite(){
    const browser = this.iab.create('https://sarchitech.com/privacy-policy/');
  }
}
