import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-faq-safety',
  templateUrl: 'faq-safety.html',
})
export class FaqSafetyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqsPage');
  }

  dismissSafetyModal(){

   // this.viewCtrl.dismiss();
    this.navCtrl.setRoot("SafetyPage");
  }



}
