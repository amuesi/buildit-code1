import { Component } from '@angular/core';
import { NavParams, LoadingController, NavController, AlertController, ModalController, ToastController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AppState } from '../../../app/app.global';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase from 'firebase';
import {
	AngularFireDatabase,
	} from 'angularfire2/database';

import { FirebaseUseProvider } from '../../../providers/firebase-use/firebase-use'
import { WordpressService } from '../shared/services/wordpress.service';
import { LoginPage } from '../../../pages/login/login';

@Component({
	selector: 'page-wordpress-post',
	templateUrl: './wordpress-post.html',
	providers: [ WordpressService ]
})
export class WordpressPost {
	post: any;
    authorData: any;
    comments: any;
	commentData = [];
    isBusy: any;
	current_id: any;
	currentPostDate: any;
	favoritePosts: any;

	postBrnStr = 'POST COMMENT';
	author_name = '';
	content = '';
	constructor(
			private navParams: NavParams,
			private http: Http,
			private wordpressService: WordpressService,
			private loadingController: LoadingController,
			private iab: InAppBrowser,
			private socialSharing: SocialSharing,
			private firebaseUseProvider: FirebaseUseProvider,
			public navCtrl: NavController,
			private alertCtrl: AlertController,
			public modalCtrl: ModalController,
			private toastController: ToastController,
			private storage: Storage,
			private global: AppState,
			public afAuth: AngularFireAuth
		) {
		if (navParams.get('post')) {
			this.post = navParams.get('post');
			if(this.post){
				this.currentPostDate = this.post.date.split('T')[0];
			}
			this.current_id = String(this.post.id);
			// this.authorData = this.post["_embedded"].author[0];
			this.getCommentDataByID();
			// if(this.post["_embedded"].replies) {
			//  	this.comments = this.post["_embedded"].replies[0];
			// }
		}

		this.favoritePosts = [];
		this.storage.get('wordpress.favorite')
            .then(data => {
				if(data) {
					this.favoritePosts = JSON.parse(data);
				}
			});


		if (navParams.get('id')) {
			this.getPost(navParams.get('id'));
		}

		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				this.postBrnStr = 'LOG IN';
				unsubscribe();
			}
			else {
				if (localStorage.getItem('isLogin') == 'true') {

					unsubscribe();
				}
				else{
					this.postBrnStr = 'LOG IN';
					unsubscribe();
				}
			}
		});
	}
	getCommentDataByID(){
		if(this.firebaseUseProvider.getCommentData(this.current_id)) {
			this.firebaseUseProvider.getCommentData(this.current_id).subscribe(snapshots => {
				this.commentData = [];
				for(let obj of snapshots)
				{
					let obj1:any = obj;
					// if (obj1.comment_post_ID == this.current_id) {
					// 	this.commentData.push({'author': obj1.author, 'comment': obj1.comment});
					// }
					if (obj1.A.k.ba.value.B == this.current_id) {
						this.commentData.push({'author': obj1.A.k.ba.left.left.value.B, 'comment': obj1.A.k.ba.left.value.B});
					}
				}
				// snapshots.forEach(snapshot1 => {
				// 	var snapshot :any = snapshot1;
				// 	var item = snapshot.val();
				// 	if (item.comment_post_ID == this.current_id) {
				// 		this.commentData.push({'author': item.author, 'comment': item.comment});
				// 	}
				// 	console.log(snapshot.key, snapshot.val());
				// });
			});
		}
	}

	getPost(id) {
		// let loader = this.loadingController.create({
		// 	content: "Please wait"
		// });

		// loader.present();
		this.isBusy = true;

		this.wordpressService.getPost(id)
		.subscribe(result => {
			this.post = result;
			if(this.post){
				this.currentPostDate = this.post.date.split('T')[0];
			}
			// this.authorData = this.post["_embedded"].author[0];
				this.getCommentDataByID();
			// if(this.post["_embedded"].replies) {
			//  	this.comments = this.post["_embedded"].replies[0];
			// }
		},
		error => console.log(error),
    () => this.isBusy = false);
	}

	previewPost() {
		const browser = this.iab.create(this.post.link, '_blank');
		browser.show();
	}

	sharePost() {
		let subject = this.post.title.rendered;
		let message = this.post.content.rendered;
		message = message.replace(/(<([^>]+)>)/ig,"");
		let url = this.post.link;
		this.socialSharing.share(message, subject, '', url);	
	}

	postComment(){
		// let loader = this.loadingController.create({
		// 	content: "Please wait"
		// });
		this.isBusy = true;

		console.log("post comment");
		this.wordpressService.postComment({'comment': 'test comment', 'comment_post_ID': 146, '_wp_unfiltered_html_comment':'b1b82053ab', 'comment_parent':0})
            .subscribe(result => {
					this.post = result;
					if(this.post){
						this.currentPostDate = this.post.date.split('T')[0];
					}
					// this.authorData = this.post["_embedded"].author[0];
					this.getCommentDataByID();
					// if(this.post["_embedded"].replies) {
					// 	this.comments = this.post["_embedded"].replies[0];
					// }
				},
				error => console.log(error),
				() => this.isBusy = false);
	}

	doComment(value, event){
		// var data = {'post_id':this.post.id.toLocaleString(),
		// 			'author_name':value.author_name,
		// 			'author_email': value.author_email,
		// 			'comment': value.content};
		// this.firebaseUseProvider.commentData.push(data);

		// this.http.post(this.post._links.replies[0].href, value).subscribe( data =>{
		// 	console.log("success comment");
		// });

		// const unsubscribe = firebase.auth().onAuthStateChanged((user) => {

		var user = this.afAuth.auth.currentUser;
			if (this.postBrnStr == 'LOG IN') {
				let modal = this.modalCtrl.create(LoginPage);
				modal.onDidDismiss(val => {
					if(val.login_status == 'true'){
						this.postBrnStr = 'POST COMMENT';
						this.getCommentDataByID();
						// var data = {'comment_post_ID': this.post.id,
						// 	'comment_parent': '0',
						// 	'author': value.author_name,
						// 	'email': val.email,
						// 	'comment': value.content};
						// this.commentData.push({'author': value.author_name, 'comment': value.content});
						// this.firebaseUseProvider.saveCommentData(data);
						// this.http.post('http://scraper.sarchitech.com/wp-comments-post.php', data).subscribe( data =>{
						// 	console.log("success comment");
						// });
					}

				});
				modal.present();
				// let alert = this.alertCtrl.create({
				// 	title: 'Information',
				// 	message: 'You can not comment. Please signin firstly.',
				// 	buttons:[
				// 		{
				// 			text: 'OK',
				// 			handler: data => {
				// 				// unsubscribe();
				// 				let modal = this.modalCtrl.create(LoginPage);
				// 				modal.onDidDismiss(val => {
				// 					if(val.login_status == 'true'){
				// 						var data = {'comment_post_ID': this.post.id,
				// 							'comment_parent': '0',
				// 							'author': value.author_name,
				// 							'email': val.email,
				// 							'comment': value.content};
				// 						this.commentData.push({'author': value.author_name, 'comment': value.content});
				// 						this.firebaseUseProvider.saveCommentData(data);
				// 						// this.http.post('http://scraper.sarchitech.com/wp-comments-post.php', data).subscribe( data =>{
				// 						// 	console.log("success comment");
				// 						// });
				// 					}
                //
				// 				});
				// 				modal.present();
				// 			}
				// 		},
				// 		{
				// 			text: 'CANCEL',
				// 			role: 'cancel',
				// 			handler: () => {
				// 				// confirm.dismiss().then(() => {
				// 				//
				// 				// });
				// 			}
                //
				// 		}
				// 	]
				// });

				// alert.present();

			}
			else{
				var author = localStorage.getItem('currentUser');
				var data = {'comment_post_ID': this.post.id,
					'comment_parent': '0',
					'author': author,
					'email': user.email,
					'comment': value.content};

				this.firebaseUseProvider.saveCommentData(data).then(result=>{
					if(result)
					{
						// this.commentData.push({'author': value.author_name, 'comment': value.content});
						this.author_name = '';
						this.content = '';
					}
					else{
					}
				});

				// this.http.post('http://scraper.sarchitech.com/wp-comments-post.php', data).subscribe( data =>{
				// 	console.log("success comment");
				// });
			}
		// });



	}

	favoritePost(post) {
		let newPost:Boolean = true;
		let message:string;

		this.favoritePosts.forEach(favPost => {
			if(JSON.stringify(favPost) === JSON.stringify(post)) {
				newPost = false;
			}
		});

		if(newPost) {
			this.favoritePosts.push(post);
			this.storage.set('wordpress.favorite', JSON.stringify(this.favoritePosts));
			message = "This post has been saved to your list";
		} else {
			message = "This post is already in your list";
		}
		let toast = this.toastController.create({
			message: message,
			duration: 2000
		});
		toast.present();
	}

}
