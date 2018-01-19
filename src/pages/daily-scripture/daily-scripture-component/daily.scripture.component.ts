import { Component } from '@angular/core';

import { NavController, PopoverController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SocialSharing } from '@ionic-native/social-sharing';

import { AppState } from '../../../app/app.global';

// import { PopOverSharePage } from '../../pop-over-share/pop-over-share'

@Component({
  selector: 'page-daily-scripture',
  templateUrl: 'daily.scripture.html'
})
export class DailyScriptureComponent {

  biblle_name = '';
  book_name = '';
  chapter_number = '';
  verse_number = '';
  text = '';

  constructor(public navCtrl: NavController,
              private global: AppState,
              private http: Http,
              private sharingVar: SocialSharing,
              private popOverCtrl: PopoverController,
                private modalController: ModalController) {

    this.http.get("assets/scripture/kiv.json")
        .map(res => {
          var bibleContentJson = res.json();
          this.biblle_name = bibleContentJson[0].bible.name;

          var book_data = bibleContentJson[0].bible.book;
          var book_count = book_data.length;
          var rand_book_number = Math.floor(Math.random() * book_count);
          var selected_book = book_data[rand_book_number];
          this.book_name = selected_book.num;

          var chapter_data = selected_book.chapter;
          var chapter_count = chapter_data.length;

          var selected_chapter: any;
          if(!chapter_count){
            selected_chapter = chapter_data;
            this.chapter_number = '1';
          }
          else{
            var rand_chapter_number = Math.floor(Math.random() * chapter_count);
            selected_chapter = chapter_data[rand_chapter_number];
            this.chapter_number = selected_chapter.num;
          }




          var verse_data = selected_chapter.verse;
          var verse_count = verse_data.length;
          var selected_verse: any;
          if(!verse_count){
            selected_verse = verse_data;
            this.verse_number = '1';
          }
          else{
            var rand_verse_number = Math.floor(Math.random() * verse_count);
            selected_verse = verse_data[rand_verse_number];
            this.verse_number = selected_verse.num;


          }
          this.text = selected_verse.text;

          
          
          

        }).subscribe(data => {
      		var data1 = data;
      	}, (rej) => {
      		console.error("Could not load local data",rej);
      	});

  }

    whatsappShare(){
        this.sharingVar.shareViaWhatsApp(this.text, null /*Image*/,  null /* url */)
            .then(()=>{
                    alert("Success");
                },
                ()=>{
                    alert("failed")
                })
    }

    twitterShare(){
        this.sharingVar.shareViaTwitter(this.text,null /*Image*/,null)
            .then(()=>{
                    alert("Success");
                },
                ()=>{
                    alert("failed")
                })
    }

    facebookShare(){
        this.sharingVar.shareViaFacebook(this.text,null /*Image*/,null)
            .then(()=>{
                    alert("Success");
                },
                ()=>{
                    alert("failed")
                })
    }

    otherShare(){
        this.sharingVar.share(this.text,null/*Subject*/,null/*File*/,null)
            .then(()=>{
                    alert("Success");
                },
                ()=>{
                    alert("failed")
                })

    }

    sharePopover(myEvent){
        // alert('share start');
        let infoModal = this.popOverCtrl.create('PopOverSharePage', {ev: myEvent, text1: this.text});
        // infoModal.onDidDismiss(data => {
        // });
        infoModal.present();
    }

}
