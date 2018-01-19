import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController, ViewController,
  ModalController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeComponent } from '../home/home-component/home.component';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { SignupPage } from '../signup/signup';
import { PasswordResetPage } from '../password-reset/password-reset';


@IonicPage()
@Component({
  selector: 'page-loading-modal',
  templateUrl: 'loading-modal.html',
})
export class LoadingModal {

  isBusy: any;
  persist0: any;
  isLoading: any;
  message = 'Loading...';

  constructor(public navParams: NavParams, private viewController: ViewController, private navController: NavController) {
    this.isLoading = navParams.get("isLoading");
    if(navParams.get("text")){
      this.message = navParams.get("text");
    }

    this.isBusy = true;
    var me = this;
    // this.persist0 = setInterval(function() {
    //   me.timeClose();
    // }, 200);
  }
  // timeClose(){
  //   clearInterval(this.persist0);
  //   if(!this.isLoading){
  //     // this.viewController.dismiss();
  //     this.navController.pop();
  //   }
  // }

  show(){
    this.isBusy = true;
  }

  hide(){
    this.isBusy = false;
  }

}
