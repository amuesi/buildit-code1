import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController, AlertController } from 'ionic-angular';

import {SecurityPage} from '../security/security';


@IonicPage()
@Component({
  selector: 'page-faq-security',
  templateUrl: 'faq-security.html',
})
export class FaqSecurityPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqsPage');
  }

  dismissModal(){

   // this.viewCtrl.dismiss();
    this.navCtrl.setRoot(SecurityPage);
  }



}
