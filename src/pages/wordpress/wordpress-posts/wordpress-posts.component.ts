import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";

import { WordpressService } from '../shared/services/wordpress.service';
import { WordpressPost } from '../wordpress-post/wordpress-post.component';
import { FirebaseUseProvider } from '../../../providers/firebase-use/firebase-use';

@Component({
	selector: 'page-wordpress-posts',
	templateUrl: './wordpress-posts.html',
	providers: [ WordpressService ]
})
export class WordpressPosts implements OnInit {

	posts: any;
	pageCount: number;
	category: any;
	tag: any;
	author: any;
	search: string;
	hideSearchbar: boolean;
	favoritePosts: any;
	isBusy: any;
	isBusyMore: any;
	shouldShowCancel = true;


	constructor(
		private navParams: NavParams,
		private wordpressService: WordpressService,
		private navController: NavController,
		private loadingController: LoadingController,
		private toastController: ToastController,
		private storage: Storage,
		private firebaseUseProvider: FirebaseUseProvider,
		public cache: CacheService) {}

	ngOnInit() {
		this.category = this.navParams.get('category');
		this.tag = this.navParams.get('tag');
		this.author = this.navParams.get('author');
		this.hideSearchbar = true;
		this.search = '';
		this.favoritePosts = [];
	    this.storage.get('wordpress.favorite')
	    .then(data => {
	        if(data) {
	        	this.favoritePosts = JSON.parse(data);
	        }
	    });
		this.cache.getItem('savedPosts' + this.category.id).catch(() => {
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
				}
				this.pageCount = 1;
				this.getPosts(false);
				this.loadMore(null);

			}
			else{
				this.getPosts(true);
			}

		});
	}
	getPosts(showFlag) {
		this.pageCount = 1;

		let query = this.createQuery();
		// let loader = this.loadingController.create({
		// 	content: "Please wait",
		// // duration: 10000
		// });

		// loader.present();
		this.isBusy = showFlag;
		this.isBusyMore = false;

		this.wordpressService.getPosts(query)
            .subscribe(result => {

				for(var post of result){
					let s = post.title.rendered.replace('&#8216;', "'");
					post.title.rendered = s;
					s = post.title.rendered.replace('&#8217;', "'");
					post.title.rendered = s;
					s = post.title.rendered.replace('&#8211;', "-");
					post.title.rendered = s;
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
				this.cache.saveItem('savedPosts' + this.category.id, result);

			});
	}

	// getPosts() {
	// 	this.pageCount = 1;
    //
	// 	let query = this.createQuery();
	// 	// let loader = this.loadingController.create({
	// 	// 	content: "Please wait",
     //  // // duration: 10000
	// 	// });
    //
	// 	// loader.present();
	// 	this.isBusy = true;
	// 	this.isBusyMore = false;
    //
	// 	this.wordpressService.getPosts(query)
	// 	.subscribe(result => {
	// 		this.posts = result;
	// 		for(var post of this.posts){
	// 			let s = post.title.rendered.replace('&#8216;', "'");
	// 			post.title.rendered = s;
	// 			s = post.title.rendered.replace('&#8217;', "'");
	// 			post.title.rendered = s;
	// 			s = post.title.rendered.replace('&#8211;', "-");
	// 			post.title.rendered = s;
	// 		}
	// 		this.isBusy = false;
	// 	});
	// }

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
					let s = post.title.rendered.replace('&#8216;', "'");
					post.title.rendered = s;
					s = post.title.rendered.replace('&#8217;', "'");
					post.title.rendered = s;
					s = post.title.rendered.replace('&#8211;', "-");
					post.title.rendered = s;
				}
				this.posts = this.posts.concat(result);
				this.loadMore(null);

			}
			this.isBusyMore = false;
		},
    () => this.isBusyMore = false);
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
			query['categories'] = this.category.id;
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
}
