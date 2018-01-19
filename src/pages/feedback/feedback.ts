import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AnalyticsProvider} from '../../providers/analytics/analytics';
import {MessagingProvider} from '../../providers/messaging/messaging';
import {PreloaderProvider} from '../../providers/preloader/preloader';
import {UtilitiesProvider} from '../../providers/utilities/utilities';
import { ValidationProvider} from '../../providers/validation/validation';
import {AngularFireDatabase} from "angularfire2/database/database";
/**
 * Generated class for the FeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage(
    {name: "app-feedback"}
)
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  public form : FormGroup;
  public formName : string;
  public formEmail : string;
  public formMessage : string;
  public baseURI :string = 'remote-url.php?'
  constructor( public navCtrl : NavController,
              public navParams: NavParams,
               public viewCtrl: ViewController,
               private _FB : FormBuilder,
               private _ANALYTICS : AnalyticsProvider,
               private _HTTP : Http,
               private _MESSAGE :MessagingProvider,
               private _PRELOAD : PreloaderProvider,
               private _UTILS : UtilitiesProvider,
               private _VAL : ValidationProvider,
               private database: AngularFireDatabase
  ) {

    this.form = this._FB.group({
      "name" : ["", Validators.required, this._VAL.isValidName],
      "email" : ["", Validators.required, this._VAL.isValidEmail],
      "message" : ["", Validators.required]
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
    this._ANALYTICS.trackPageView('Ghana news app Feedback view');
  }
  sendMessage(){
    this._PRELOAD.displayPreloader('Sending your message...');
    let startTiming : number = new Date().getTime(),
        totalTime : number,
        name: string = this.form.controls["name"].value,
        email: string = this.form.controls["email"].value,
        message : string = this.form.controls["message"].value;


    var profileObject = this.database.object('/Feedbacks/' + name);
    var feedback = {'name': name, 'email': email, 'message': message};

    profileObject.set(feedback).then(result => {
      this._PRELOAD.hidePreloader();

      this._MESSAGE.displayNotification('Congratulations! Your message was successfully delivered');

      this._ANALYTICS.trackPageEvent('User sent a message from the feedback page', 'Click');
      this.clearForm();

    }).catch( error => {
      this._PRELOAD.hidePreloader();

      this._MESSAGE.displayNotification('Whoops! Your message was NOT delivered at this time. Please try again');

      this._ANALYTICS.trackException(error.message, true);
      }
    );
  }

  clearForm(){
    this.formName = "";
    this.formEmail = "";
    this.formMessage = "";
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

  URL_check(control: FormControl) : Promise <any>{
    // return (control: AbstractControl): {[key: string]: any} => {
    //   var re = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    //   let input = control.value;
    //   let isValid=re.test(input);
    //   if(!isValid)
    //     return { 'url_check': {isValid} }
    //   else
    //     return null;
    // };

    return new Promise (resolve =>{
      let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!emailPattern.test(control.value))
      {
        resolve({url_check : true});
      }
      resolve(null);
    });
  }
}
