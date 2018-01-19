import { Component } from '@angular/core';
import { NavController, Events, MenuController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WordpressService } from '../shared/services/wordpress.service';
import { WordpressPost } from '../wordpress-post/wordpress-post.component';
import { FirebaseUseProvider } from '../../../providers/firebase-use/firebase-use';

import { AppState } from '../../../app/app.global';

import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { CacheService } from "ionic-cache";

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { NetworkProvider } from '../../../providers/network/network';
import { ToastService } from '../../../providers/util/toast.service';
import {AnalyticsProvider} from '../../../providers/analytics/analytics';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomeComponent {
	pages: Array<{title: string, component: any, icon: string, note: string, params?: any}>;

	categories = ["1", '2', '3', '4', '5'];
	isBusy = false;
	isBusyMore = false;
	showDetail = false;
	isBusyScroll = false;
	pageCount:any;
	pageCountDetail:any;
	selected_posts: any;
	shouldShowCancel = true;

	current_most_post: any;
	search: any;
	current_category: any;
	tag: any;
	author:any;
	most_posts = [];
	category_name: any;
	_options: any;
	favoritePosts: any;
	hideSearchbar = true;

	posts: any;
	category: any;
	menu_icon_name = 'assets/icon/menu-icon-default.png';
	comment_count = 0;

	persist0: any;


	timeInterval :any = null;

	@ViewChild(Slides) slides: Slides;


	constructor(
		private navController: NavController,
		private menuController: MenuController,
		private events: Events,
		private wordpressService: WordpressService,
		private toastController: ToastController,
		private storage: Storage,
		private firebaseUseProvider: FirebaseUseProvider,
		public global: AppState,
		private ga: GoogleAnalytics,
		public cache: CacheService,
		private networkProvider: NetworkProvider,
		private toastService: ToastService,
		private _ANALYTICS :AnalyticsProvider
	) {





		// this._options = {
		// 	slidesPerView:2,
		// 	pager: true,
		// 	nextButton: ".swiper-button-next",
		// 	prevButton: ".swiper-button-prev",
		// 	onInit:()=>{
		// 	}
		// }

	}

	ngOnInit() {

		this._ANALYTICS.trackPageView('Home page view');
		// this.category = this.navParams.get('category');
		// this.tag = this.navParams.get('tag');
		// this.author = this.navParams.get('author');
		this.hideSearchbar = true;
		this.search = '';
		this.favoritePosts = [];
		this.storage.get('wordpress.favorite')
            .then(data => {
				if(data) {
					this.favoritePosts = JSON.parse(data);
				}
			});
		// this.googleAnalyticsSetup();
		// this.cache.saveItem('savedPosts', []);
		this.loadPostData();


	}

	pageReload(){
		clearInterval(this.persist0);
		this.loadPostData();
	}


	loadPostData(){
		this.cache.getItem('savedPosts').catch(() => {
			this.getPosts(true);
		}).then((data) => {
			if(data != null && data.length > 0){
				this.posts = data;
				for(var post of this.posts){
					let s = post.title.rendered.replace('&#8216;', "'");
					post.title.rendered = s;
					s = post.title.rendered.replace('&#8217;', "'");
					post.title.rendered = s;
					s = post.title.rendered.replace('&#8211;', "-");
					post.title.rendered = s;
					post['comment_count'] = this.comment_count;
					// this.getCommentDataByID(post);
				}
				this.pageCount = 1;
				this.getPosts(false);
				this.loadMore(null);

			}
			else{
				if(!this.networkProvider.obtainNetworkConnection())
				{
					alert("Please check network connection state.");
					return;
				}
				this.getPosts(true);
			}

		});
	}

	// googleAnalyticsSetup(){
	// 	this.ga.startTrackerWithId('UA-96166653-4')
     //        .then(() => {
	// 			alert('Google analytics is ready now');
	// 			this.ga.trackView('Home');
	// 			// Tracker is ready
	// 			// You can now track pages or set additional information such as AppVersion or UserId
	// 		})
     //        .catch(e => alert('Error starting GoogleAnalytics'+e));
	// 	// this.ga.enableUncaughtExceptionReporting(true).then((_success) => {
	// 	// 	alert("Successful enabling of uncaught exception reporting "+_success)
	// 	// }).catch((_error) => {
	// 	// 	alert("error occured "+_error)
	// 	// });
    //
	// 	this.ga.trackEvent('form', 'vote', 'Hours online', 1)
     //        .then(() => {
	// 			alert('Google analytics Event is ready now');
	// 		});
	// }

	getPosts(showFlag) {
		this.pageCount = 1;

		let query = this.createQuery();
		// let loader = this.loadingController.create({
		// 	content: "Please wait",
		// // duration: 10000
		// });

		// loader.present();
		// if (showFlag)
		// {
		// 	if(!this.networkProvider.obtainNetworkConnection()){
		// 		console.log('Sorry, network is unavailable. Please make sure status of network.');
		// 		// alert('Sorry, network is unavailable. Please make sure status of network.');
		// 		this.toastService.create('Sorry, network is unavailable. Please make sure status of network.', false, 3000);
		// 		// this.toastService.present()
		// 		// this.platform.exitApp();
		// 	}
		// }

		this.isBusy = showFlag;
		this.isBusyMore = false;
		// alert(this.networkProvider.obtainNetworkConnection());
		if (!this.networkProvider.obtainNetworkConnection())
		{
			// alert(this.networkProvider.obtainNetworkConnection());
			if (this.timeInterval == null)
			{
				// alert("start");
				this.timeInterval = setInterval((function () {
					this.toggleRefresh();
				}).bind(this), 2000);
			}
			return;
		}
		else{
			if (this.timeInterval != null)
			{
				// alert("end");
				clearInterval(this.timeInterval);
				this.timeInterval = null;
			}
		}

		this.wordpressService.getPosts(query)
            .subscribe(result => {

				for(var post of result){
					let s = post.title.rendered.replace('&#8216;', "'");
					post.title.rendered = s;
					s = post.title.rendered.replace('&#8217;', "'");
					post.title.rendered = s;
					s = post.title.rendered.replace('&#8211;', "-");
					post.title.rendered = s;
					post['comment_count'] = this.comment_count;
					this.getCommentDataByID(post);
				}
				if(showFlag){
					this.posts = result;
					this.loadMore(null);
				}
				else{
					var i = 0;
					for(var post of result){
						this.posts[i] = result[i];
						i++;
					}
				}

				this.isBusy = false;
				this.cache.saveItem('savedPosts', result);

			},
			err => {
            	// alert('getPost error');
            	// alert(JSON.stringify(err));
			});
	}
	getCommentDataByID(post){
		// if(this.firebaseUseProvider.getCommentData(post.id.toLocaleString())) {
		// 	this.firebaseUseProvider.getCommentData(post.id.toLocaleString()).subscribe(snapshots => {
		// 		this.comment_count = 0;
		// 		snapshots.forEach(snapshot1 => {
		// 			var snapshot :any = snapshot1;
		// 			var item = snapshot.val();
		// 			if (item.comment_post_ID == String(post.id)) {
		// 				this.comment_count = this.comment_count + 1;
		// 				post['comment_count'] = this.comment_count;
		// 			}
		// 			console.log(snapshot.key, snapshot.val());
		// 		});
        //
		// 	});
		// }
	}

	getDate(post){
		return post.date.split('T')[0];
	}

	getAuthorPosts(author) {
		this.author = author;
		this.getPosts(true);
	}

	searchPosts() {
		this.posts = [];
		this.getPosts(true);
	}

	loadMore(infiniteScroll) {
		if(this.pageCount > 10){
			return;
		}
		// alert("loadMore");
		if (!this.networkProvider.obtainNetworkConnection())
		{

			if (this.timeInterval == null)
			{
				// alert("start");
				this.timeInterval = setInterval((function () {
					this.toggleRefresh();
				}).bind(this), 2000);
			}
			return;
		}
		else{
			if (this.timeInterval != null)
			{
				// alert("end");
				clearInterval(this.timeInterval);
				this.timeInterval = null;
			}
		}


		this.pageCount++;

		let query = this.createQuery();
		// let loader = this.loadingController.create({
		// 	content: "Please wait"
		// });
		let toast = this.toastController.create({
			message: "There are no more posts.",
			duration: 2000
		});

		// loader.present();
		this.isBusyMore = true;

		this.wordpressService.getPosts(query)
            .subscribe(result => {
					// infiniteScroll.complete();
					if(result.length < 1) {
						// infiniteScroll.complete();
						// infiniteScroll.enable(false);
						toast.present();
					} else {
						for(var post of result){
							post['comment_count'] = this.comment_count;
							this.getCommentDataByID(post);
						}
						this.posts = this.posts.concat(result);

					}
					this.isBusyMore = false;
					this.loadMore(null);
				},
				err => {
            		// alert(JSON.stringify(err));
					if (!this.networkProvider.obtainNetworkConnection())
					{
						// alert(this.networkProvider.obtainNetworkConnection());
						if (this.timeInterval == null)
						{
							// alert("start");
							this.timeInterval = setInterval((function () {
								this.toggleRefresh();
							}).bind(this), 2000);
						}

					}
					this.isBusyMore = false
				});
	}

	loadMoreScroll(infiniteScroll) {
		if(this.pageCount <= 10){
			return;
		}
		this.pageCount++;

		let query = this.createQuery();
		// let loader = this.loadingController.create({
		// 	content: "Please wait"
		// });
		let toast = this.toastController.create({
			message: "There are no more posts.",
			duration: 2000
		});

		// loader.present();
		this.isBusyMore = true;

		this.wordpressService.getPosts(query)
            .subscribe(result => {
					// infiniteScroll.complete();
					if(result.length < 1) {
						infiniteScroll.complete();
						infiniteScroll.enable(false);
						toast.present();
					} else {
						for(var post of result){
							let s = post.title.rendered.replace('&#8216;', "'");
							post.title.rendered = s;
							s = post.title.rendered.replace('&#8217;', "'");
							post.title.rendered = s;
							s = post.title.rendered.replace('&#8211;', "-");
							post.title.rendered = s;
							post['comment_count'] = this.comment_count;
							this.getCommentDataByID(post);
						}
						this.posts = this.posts.concat(result);

					}
					this.isBusyMore = false;
				},
				() => this.isBusyMore = false);
	}

	loadPost(post) {
		this.navController.push(WordpressPost, {
			post: post, firebaseUseProvider: this.firebaseUseProvider
		});
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

	toggleSearchbar() {
		this.hideSearchbar = !this.hideSearchbar;
	}

	createQuery() {
		let query = {};
		query['page'] = this.pageCount;
		if(this.search) {
			query['search'] = this.search;
		}
		if(this.category) {
			query['categories'] = null;//this.category.id;
		}
		if(this.tag) {
			query['tags'] = this.tag.id;
		}
		if(this.author) {
			query['author'] = this.author;
		}
		return query;
	}

	toggleRefresh(){

		this.storage.get('wordpress.favorite')
            .then(data => {
				if(data) {
					this.favoritePosts = JSON.parse(data);
				}
			});
		this.posts = [];
		this.getPosts(true);
	}

	get_menu_icon_name(){
		alert(this.global.state['theme']);
		if(this.global.state['theme'] == 'dark'){
			this.menu_icon_name = 'assets/icon/menu-icon-dark.png';
		}
		else{
			this.menu_icon_name = 'assets/icon/menu-icon-default.png';
		}
	}
	ionViewWillLeave(){
		if (this.timeInterval){
			clearInterval(this.timeInterval);
		}
	}
}
