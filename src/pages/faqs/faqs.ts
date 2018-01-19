import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-faqs',
  templateUrl: 'faqs.html',
})
export class FaqsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqsPage');
  }

  dismissModal(){

   // this.viewCtrl.dismiss();
    this.navCtrl.setRoot("HomePage");
  }



}
