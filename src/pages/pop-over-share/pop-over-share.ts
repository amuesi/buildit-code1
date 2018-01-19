import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { AlertService } from '../../providers/util/alert.service'

/**
 * Generated class for the PopOverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pop-over-share',
  templateUrl: 'pop-over-share.html',
})
export class PopOverSharePage {

  text1 = "GH informer App";
  file_url = '';
  share_url = "https://play.google.com/store/apps/details?id=com.ghananews.sarchitech";
  subject = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private sharingVar: SocialSharing, private viewCtrl: ViewController, private alertService: AlertService) {

    this.text1 = navParams.get("text1");
    // alert(this.text1);
    if(navParams.get("file_url")){
      this.file_url = navParams.get("file_url");
    }
    if(navParams.get("share_url")){
      this.share_url = navParams.get("share_url");
    }
    if(navParams.get("subject")){
      this.subject = navParams.get("subject");
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopOverSharePage');
  }

  whatsappShare(){
    this.sharingVar.shareViaWhatsApp(this.text1, this.file_url /*Image*/,  this.share_url /* url */)
        .then(()=>{
              // alert("Success");
              this.viewCtrl.dismiss({result: true});
            },
            (error)=>{
              this.alertService.presentAlert('Information', 'Sorry, please install WhatsApp on your phone to share needed content.');
              this.viewCtrl.dismiss({result: false});
            })
  }

  twitterShare(){
    this.sharingVar.shareViaTwitter(this.text1, this.file_url /*Image*/, this.share_url)
        .then(()=>{
              // alert("Success");
              this.viewCtrl.dismiss({result: true});
            },
            (error)=>{
                // alert("failed: " + error);
              this.viewCtrl.dismiss({result: false});
            });
  }

  facebookShare(){
    this.sharingVar.shareViaFacebook(this.text1, this.file_url /*Image*/, this.share_url)
        .then(()=>{
              // alert("Success");
              this.viewCtrl.dismiss({result: true});
            },
            (error)=>{
                // alert("then: " + error);
                this.alertService.presentAlert('Information', 'Sorry, please install FacebookApp on your phone to share needed content.');
              this.viewCtrl.dismiss({result: false});
    }).catch((error)=>{
        // alert("failed: " + error);
        this.viewCtrl.dismiss({result: false});
    })
  }

  otherShare(){
    this.sharingVar.share(this.text1, this.subject/*Subject*/,this.file_url/*File*/, this.share_url)
        .then(()=>{
              // alert("Success");
              this.viewCtrl.dismiss({result: true});
            },
            ()=>{
              // alert("failed");
              this.viewCtrl.dismiss({result: false});
            })

  }

}
