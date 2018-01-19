import { Component , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage implements  OnInit{

  public introShown: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    localStorage.setItem("shownIntro", "true");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }


  skip(){
    this.navCtrl.setRoot("HomePage");
  }


  ngOnInit(){

  }

}
