import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the SecurityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-security',
  templateUrl: 'security.html',
})
export class SecurityPage {

  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecurityPage');
  }
  
  openSecurityIncidentPage(){
    this.navCtrl.setRoot("SecurityIncidentPage",{});
  
  }
  
  openSecurityGoodPracticePage(){
    this.navCtrl.setRoot("SecurityGoodPracticePage",{});
  }
  
  openSecurityNonCompliancePage(){
    this.navCtrl.setRoot("SecurityNonCompliancePage",{});
  }

  faqModalSecurityOpen(){
        this.navCtrl.setRoot("FaqSecurityPage");
  }

}
