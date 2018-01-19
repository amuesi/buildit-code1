import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  Loading,
  Slides,
  LoadingController,
  AlertController, ViewController,
  ModalController, Events
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeComponent } from '../home/home-component/home.component';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { SignupPage } from '../signup/signup';
import { PasswordResetPage } from '../password-reset/password-reset';
import { LoadingModal } from '../../components/loading-modal/loading-modal';
import { AngularFireAuth } from 'angularfire2/auth';
import {Account} from '../../model/account/account.interface';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  backgrounds = [
    "assets/img/background/background-1.jpg",
    "assets/img/background/background-2.jpg",
    "assets/img/background/background-3.jpg",
    "assets/img/background/background-4.jpg"
  ];
  isSignup = false;
  public loginForm:FormGroup;  
  public loading:Loading;
  acceptButtonName = "Login";
  username ="test";
  fullname = "test";
  constructor(public viewCtrl: ViewController,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public formBuilder: FormBuilder,
              public authProvider: AuthProvider,
              private modalCtrl: ModalController,
              public afAuth: AngularFireAuth,
              private events: Events,
  ) {

    this.loginForm = formBuilder.group({
      fullname: ['test', Validators.compose([Validators.required])],
      username: ['test', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  // Slider methods
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  loginUser(){
    // this.loading = this.loadingCtrl.create();
    // this.loading.present();



    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.navCtrl.push(LoadingModal, {'text': 'Please wait...'});
      this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        var menuObject = {
          "isLogin": true,
          "currentUser" : authData1.username,
        }
        this.events.publish('loginEvent', menuObject);
        var authData1 : any =authData;
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("userUID", authData1.key);
        localStorage.setItem("currentUser", authData1.username);
        // this.loading.dismiss().then( () => {
          let data = { 'email': this.loginForm.value.email, 'login_status': 'true'};
        this.navCtrl.pop(LoadingModal);
          this.viewCtrl.dismiss(data);
        // });
      }, error => {
        var err:any = error;
        this.navCtrl.pop(LoadingModal);
        var errMsg = error.message;
        if (err.code == "auth/wrong-password"){
          errMsg = "The password is incorrect.";
        }
        else if(err.code == "auth/user-not-found"){
          errMsg = "The user does not exist.";
        }

        // this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: errMsg,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        // });
      });


    }
  }

  loginCancel(){
    this.viewCtrl.dismiss({login_status: 'false'});
  }

  goToSignup(){


    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.navCtrl.push(LoadingModal, {'text': 'Please wait...'});
      let user = {} as Account;
      user.email = this.loginForm.value.email;
      user.password = this.loginForm.value.password;
      user.fullname = this.loginForm.value.fullname;
      user.username = this.loginForm.value.username;
      this.authProvider.signupUser(user)
          .then((newUser) => {
            if(newUser){
              var menuObject = {
                "isLogin": true,
                "currentUser" : newUser.username,
              }
              this.events.publish('loginEvent', menuObject);
              localStorage.setItem("userUID", this.afAuth.auth.currentUser.uid);
              localStorage.setItem("currentUser", newUser.username);
              let data = { 'email': this.loginForm.value.email,
                    'login_status' : 'true'
              };
              localStorage.setItem("isLogin", "true");
              // this.navCtrl.pop(LoadingModal);
              this.viewCtrl.dismiss(data);
              this.navCtrl.pop(LoadingModal);
            }
            else{
              this.navCtrl.pop(LoadingModal);
              // this.loading.dismiss().then( () => {
              var errorMessage: string = "Sorry Sign up failed. Please check network connection state.";
              let alert = this.alertCtrl.create({
                message: errorMessage,
                buttons: [{ text: "Ok", role: 'cancel' }]
              });
              alert.present();
            }

            // });
          }, (error) => {
            this.navCtrl.pop(LoadingModal);
            // this.loading.dismiss().then( () => {
              var errorMessage: string = error.message;
              let alert = this.alertCtrl.create({
                message: errorMessage,
                buttons: [{ text: "Ok", role: 'cancel' }]
              });
              alert.present();
            // });
          });
    }
  }

  goToResetPassword(){
    this.navCtrl.push(PasswordResetPage);
    // let modal = this.modalCtrl.create(PasswordResetPage);
    // modal.onDidDismiss(val => {
    //   let data = { 'email': val.email, 'login_status': 'false'};
    //   // localStorage.setItem("isLogin", "true");
    //   this.viewCtrl.dismiss(data);
    // });
    // modal.present();
    // this.navCtrl.push('PasswordResetPage');
  }

  slideNext() {
    this.innerSlider.slideNext();
  }

  slidePrevious() {
    this.innerSlider.slidePrev();
  }

  loginSegmentButtonClicked(){
    this.isSignup = false;
    this.loginForm.controls['username'].setValue("test");
    this.loginForm.controls['fullname'].setValue("test");
    this.acceptButtonName = "Login";
  }

  registerSegmentButtonClicked(){

    this.acceptButtonName = "SignUp"
    this.loginForm.controls['username'].setValue("");
    this.loginForm.controls['fullname'].setValue("");
    this.isSignup = true;
  }

  startSign(){
    if(this.isSignup){
      this.goToSignup();
    }else{
      this.loginUser();
    }
  }
}
