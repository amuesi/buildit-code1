import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase/app';
import {tryCatch} from "rxjs/util/tryCatch";
import {Account} from "../../model/account/account.interface"
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {}

  /**
   * loginUser takes in an email and password and signs the user into the application.
   */
  loginUser(email: string, password: string): firebase.Promise<any> {
    return new Promise((resolve, reject) => {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(user=>{
      if (user){
        var accountObject = this.afDatabase.object('/userProfile/' + user.uid).take(1).subscribe(data =>{
          resolve(data);
        });
        // resolve(accountObject.take(1).subscribe(datat));
      }
      else{
        resolve(null);
      }
    }).catch(err => {reject(err)});
    });
  }

  /**
   * signupUser takes in an email and password and does 3 things:
   * 1. It creates the new user.
   * 2. It signs the user into the application.
   * 3. It creates a database node for the user to store the userProfile, which starts with just
   *    the email address.
   */
  signupUser(user: Account): firebase.Promise<any> {
    return new Promise((resolve) => {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((newUser) => {
      if (newUser){
        user.key = newUser.uid;
        this.afDatabase.object(`/userProfile/${newUser.uid}`).set(user);
        resolve(user);
      }
      else{
        resolve(null);
      }
    }).catch(err=>{
      resolve(null);
    });
    });
  }


  /**
   * resetPassword takes the email address as a string and sends the email with the reset password 
   * link.
   */
  resetPassword(email: string): firebase.Promise<any>{
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  /**
   * logoutUser doesn't take any parameters, it looks into the authentication object and signs out
   * the currently logged in user.
   */
  // logoutUser(): firebase.Promise<any> {
  //   return this.afAuth.auth.signOut();
  // }
  logoutUser(){
    try{
      this.afAuth.auth.signOut();
    }
    catch(Error){

    }

  }

}
