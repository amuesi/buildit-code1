import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { likepopover } from '../../../components/likepopover/likepopover';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WordpressPost } from '../wordpress-post/wordpress-post.component';
import { FirebaseUseProvider } from '../../../providers/firebase-use/firebase-use';


@Component({
  selector: 'likes-page',
  templateUrl: 'likes.html'
})

export class LikesComponent {

 likes:Array<any>;

 constructor(public navCtrl: NavController,
             public navParams: NavParams,
             public popoverCtrl: PopoverController,
             private storage: Storage,
             private firebaseUseProvider: FirebaseUseProvider) {

     this.likes = [];
     this.storage.get('wordpress.favorite')
         .then(data => {
             if(data) {
                 this.likes = JSON.parse(data);
             }
         });
    // this.likes = [
    //       {img: 'assets/img/img_1.jpg' , subTitle: 'ipsum dolor sit amet, consecteturipsum dolor sit '},
    //       {img: 'assets/img/img_2.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit '},
    //       {img: 'assets/img/img_3.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit '},
    //       {img: 'assets/img/img_1.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit '},
    //       {img: 'assets/img/img_2.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit'},
    //       {img: 'assets/img/img_3.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit'},
    //       {img: 'assets/img/img_1.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit'},
    //       {img: 'assets/img/img_2.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit'},
    //       {img: 'assets/img/img_3.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit'},
    //       {img: 'assets/img/img_1.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit'}
    //
    //
    //   ];

 }

    
   
  presentPopover(myEvent, post) {
      let popover = this.popoverCtrl.create(likepopover);
      popover.onDidDismiss(val => {
         if(val){
             if(val.result){
                 let isPost:Boolean = false;

                 this.likes.forEach(favPost => {
                     if(JSON.stringify(favPost) === JSON.stringify(post)) {
                         isPost = true;
                     }
                 });

                 if(isPost) {
                     let index: number = this.likes.indexOf(post);
                     if(index !== -1){
                         this.likes.splice(index, 1);
                         this.storage.set('wordpress.favorite', JSON.stringify(this.likes));
                     }
                 }
             }

         }
      });
      popover.present({
        ev: myEvent
      });
  }

    loadPost(post) {
        this.navCtrl.push(WordpressPost, {
            post: post, firebaseUseProvider: this.firebaseUseProvider
        });
    }

}