import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {
  AngularFireDatabase,
  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the FirebaseUseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseUseProvider {

  public commentData:any;

  public currentUser:firebase.User;
  userId: any;

  constructor(public http: Http,
              public afDatabase: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
    console.log('Hello FirebaseUseProvider Provider');

    // if(this.afAuth.auth.currentUser) {
    //
    //   localStorage.setItem("userUID", this.afAuth.auth.currentUser.uid);
    // }
    // this.userId = this.afAuth.auth.currentUser.uid;


    // firebase.auth().onAuthStateChanged( user => {
    //   this.currentUser = user;
    //   this.commentData = firebase.database().ref('/commentData')
    //       .child(user.uid);
    //   this.commentData.set({'id':1, 'data':'sfdasfsf'});
    //   if (user){
    //     this.currentUser = user;
    //     this.commentData = firebase.database().ref('/commentData')
    //         .child(user.uid);
    //   }
    // });


  }

  saveCommentData(data){

    // firebase.auth().onAuthStateChanged( user => {
    //   this.currentUser = this.afAuth.auth.currentUser;
    return new Promise(resolve => {
      if (localStorage.getItem('isLogin') == 'true') {
        var commentData0 = firebase.database().ref('/commentData');//.child(this.afAuth.auth.currentUser.uid);

        // var data = {'post_id':value.id,
        // 			'author_name':value.author_name,
        // 			'author_email': value.author_email,
        // 			'comment': value.content};
        commentData0.push(data).then(result => {
          resolve(true)
        }).catch(err => {
          resolve(false);
        });
      } else {
        resolve(false);
      }
    });

  }

  getCommentData(post_ID){

    if(localStorage.getItem('isLogin') == 'true') {
      // var commentData1 = this.afDatabase
      //     .list(`/commentData/${this.afAuth.auth.currentUser.uid}`, {preserveSnapshot: true});
      var commentData1 = this.afDatabase
          .list(`/commentData`, {preserveSnapshot: true});
      return commentData1;
    }
    else{
      return null;
    }


    // if(localStorage.getItem('isLogin') == 'true') {
    //   var commentData1 = this.afDatabase.list<any>('/commentData').valueChanges();
    // }
    // else{
    //   return null;
    // }
    //  return commentData1;
  }
//   getCommentData(post_ID) {
//     return new Promise(resolve => {
//       firebase.auth().onAuthStateChanged( user => {
//         this.currentUser = user;
//
//         this.commentData = this.afDatabase.list('/commentData/' + user.uid, {
//           query: {
//             comment_post_ID: post_ID
//           }
//         });
//         resolve(this.commentData);
//     });
//
//
//       // this.commentData = firebase.database().ref('/commentData').child(user.uid);
//       // for(var d of this.commentData){
//       //   console.log(d);
//       // }
//
//       // var data = {'post_id':value.id,
//       // 			'author_name':value.author_name,
//       // 			'author_email': value.author_email,
//       // 			'comment': value.content};
//
//
//     });
//
// }

}
