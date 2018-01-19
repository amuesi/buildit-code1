import { Component } from '@angular/core';

import { OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { WordpressService } from '../wordpress/shared/services/wordpress.service';
import { WordpressPosts } from '../wordpress/wordpress-posts/wordpress-posts.component';

@Component({
	templateUrl: './business-news.html',
	providers: [ WordpressService ]
})
export class BusinessNews implements OnInit {

	category: any;

	constructor(
		private wordpressService: WordpressService,
		private navController: NavController,
		private loadingController: LoadingController) {}

	ngOnInit() {
		this.getCategory();
	}

	getCategory() {
		let loader = this.loadingController.create({
			content: "Please wait"
		});
		loader.present();
		
		this.wordpressService.getCategories()
		.subscribe(result => {
			for(var cat of result){
				if(cat.name == 'Business'){
					this.category = cat;
				}
			}

		},
		error => console.log(error),
    () => loader.dismiss());
	}

	loadCategory(category) {
		if(category) {
			this.navController.push(WordpressPosts, {
				category: category
			});
		}
	}

}
