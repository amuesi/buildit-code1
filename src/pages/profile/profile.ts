import { Component } from '@angular/core';

import { NavController, MenuController, IonicPage , AlertController, ModalController} from 'ionic-angular';
import firebase from 'firebase';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfileListPage {
  rootPage: any;
  items: Array<{ title: string, page: any }>;

  constructor(public navCtrl: NavController,
              public menu: MenuController,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) {
    this.rootPage = 'ProfileListPage';
    this.menu.enable(true, 'menu-profile');
    this.items = [
      // {
      //   title: 'Type One',
      //   page: 'ProfileOnePage'
      // },
      // {
      //   title: 'Type Two',
      //   page: ProfileTwoPage
      // },
      // {
      //   title: 'Type Three',
      //   page: 'ProfileThreePage'
      // },
      // {
      //   title: 'Type Four',
      //   page: 'ProfileFourPage'
      // },
      {
        title: 'Profile Settings',
        page: 'ProfileSettingsPage'
      },
    ]
  }

  itemTapped(event, item) {
    if(item.page == 'ProfileSettingsPage'){
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          let alert = this.alertCtrl.create({
            title: 'Information',
            message: "Please login.",
            buttons: [
                {
                    text: "Ok",
                    handler: data => {
                      unsubscribe();
                      // let modal = this.modalCtrl.create(LoginPage);
                      // modal.onDidDismiss(val => {
                      //   if(val.login_status == 'true'){
                      //     this.navCtrl.push(item.page, {'user': user});
                      //   }
                      //
                      // });
                      // modal.present();
                    }
                },
                {
                  text: "Cancel",
                  handler: data => {
                  }
                }
            ]
          });
          alert.present();
          unsubscribe();
        }
        else {
          this.navCtrl.push(item.page);
          unsubscribe();
        }
      });
    }
    else{
      this.navCtrl.push(item.page);
    }


  }
}
