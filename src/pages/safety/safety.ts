import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-safety',
  templateUrl: 'safety.html',
})
export class SafetyPage {

  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController ) {

    // this.loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafetyPage');
  }
  
  openHazardPage(){
    // this.loading.present();
    this.navCtrl.setRoot("HazardPage",{ }, {
      animate: true,
      direction: "forward" 
    });
  }
  
  openSafetyIncidentPage(){
    // this.loading.present();

    this.navCtrl.setRoot("SafetyIncidentPage",{ }, {
      animate: true,
      direction: "forward"
    });
  }
  
  openPositiveBehaviour(){
    this.navCtrl.setRoot("PositiveBehaviourPage",{
    }, {
      animate: true,
      direction: "forward" 
    });
  }
  
  openUnsafeBehaviour(){
    this.navCtrl.setRoot("UnsafeBehaviourPage",{
    }, {
      animate: true,
      direction: "forward" 
    });
    
    
  }

  faqSafetyModalOpen(){
    this.navCtrl.push("FaqSafetyPage");
 
  }
  




}
