import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';



@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

    @ViewChild('player') player;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  private callNumber: CallNumber,
  private emailComposer: EmailComposer) {
  }


    // It's interesting to remove the src and put it back
  // when entering and leaving the page so there are no memory leaks.
  ionViewWillLeave() {
    // the .nativeElement property of the ViewChild is the reference to the tag <video>
    // this.player.nativeElement.src = '';
    // this.player.nativeElement.load();
  }

    ionViewWillEnter() {
    // this.player.nativeElement.src = 'assets/video/water1.mp4';
    // this.player.nativeElement.load();
  }


async callTelNumber(num:string):Promise<any>{
  try{
   await this.callNumber.callNumber(num,true);
  }

   catch(e){
    console.log(e);
 }
}

emailSecurity(emailAddress:string){

  this.emailComposer.isAvailable().then((available: boolean) =>{
 if(available) {
   //Now we know we can send
let email = {
  to: emailAddress,
  subject: 'Message from SafetyNetApp',
  body: 'test',
  isHtml: true
};

this.emailComposer.open(email);


 }

 else{
   console.log("email composer not available")
 }
});

}

  




}
