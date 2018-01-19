import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { Storage } from '@ionic/storage';

import {FaqsPage} from '../faqs/faqs'


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  loading:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private platform: Platform,
              private oneSignal   : OneSignal,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public storage: Storage) {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });


    this.platform.ready().then(()=> {

      this.getFirstName();
      this.getLastName();
      this.getTeamName();

      if ((<any>window).cordova) {
        this.triggerNotification();
      }
      else{
        console.log("needs to be on device");
        return ;
      }

    })
  } // end constructor

  ionViewDidLoad(showCloseButton, closeButtonText) {
    this.storage.get('has-loaded').then(value => {
      {
        if (!value) {
          console.log('show banner')
          let toast = this.toastCtrl.create({
            message: "Please Note: Raising and sending forms to the STW database has been suspended on this version of the app in favour of the Map Functionality. The forms save functionality will be reinstated once ‘split tunnelling’ is live.",
            // duration: 5000
            showCloseButton: true,
            closeButtonText: "Ok"
          });
          toast.present();
        }
      }

    this.storage.set('has-loaded', true)
  })
    console.log('ionViewDidLoad HomePage');

  }


  getFirstName(){
    this.storage.get("firstName")
      .then(val => {
        console.log("First Name is: ", val);
      })
  }

  getLastName(){
    this.storage.get("lastName")
      .then(val => {
        console.log("Last Name is: ", val);
      })
  }

    getTeamName(){
    this.storage.get("teamName")
      .then(val => {
        console.log("Team Name is: ", val);
      })
  }

  faqModalOpen(){
    this.navCtrl.setRoot("FaqsPage");

  }




  openSafetyPage(){
    this.navCtrl.push("SafetyPage");
  }

  openSecurityPage(){
    this.navCtrl.push("SecurityPage");
  }

  openWellBeingPage(){
    this.navCtrl.setRoot("WellBeingPage",{
    }, {
      animate: true,
      direction: "forward"
    });
  }

  openHazardPage(){
    // this.loading.present();
    this.navCtrl.setRoot("HazardPage",{ }, {
      animate: true,
      direction: "forward" 
    });
  }

  openWaterQualityPage(){
    this.navCtrl.setRoot("WaterQualityPage", { }, {
      animate: true,
      direction: "forward"
    });
  }
  


  triggerNotification()
  {

    this.oneSignal.startInit('cbd21c38-27e5-416a-94c0-67e35a68b746');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((msg) => {
      // do something when notification is received
      // Log data received from the push notification service
      console.log('Notification received');
      console.dir(msg);
    });

    this.oneSignal.handleNotificationOpened().subscribe((msg) => {

      //     // Log data received from the push notification service
      console.log('Notification opened');
      console.dir(msg);

    });

    this.oneSignal.endInit();
  }

}
