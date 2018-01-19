import { Component } from '@angular/core';

import { OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { WordpressService } from '../shared/services/wordpress.service';
import { WordpressPosts } from '../wordpress-posts/wordpress-posts.component';
// import { LoadingModal } from '../../../components/loading-modal/loading-modal';

@Component({
	selector: 'page-wordpress-categories',
	templateUrl: './wordpress-categories.html',
	providers: [ WordpressService ]
})
export class WordpressCategories implements OnInit {

	categories=[];
	isBusy: any;

	constructor(
		private wordpressService: WordpressService,
		private navController: NavController,
		private loadingController: LoadingController) {}

	ngOnInit() {
		this.getCategories();
	}

	getCategories() {
		this.isBusy = true;
		// let loader = this.loadingController.create({
		// 	spinner: 'hide',
		// 	content: `
		// 			  <div class="container0" [ngClass]="{'busy': isBusy}">
		// 				<div class="spinner0">
		// 				  <div class="backdrop0"></div>
		// 				  <p>&#9733;</p>
		// 				</div>
		// 			  </div>`,
		// 	cssClass: 'spinner0 backdrop0 container0'
		// });
		// loader.present();
		
		this.wordpressService.getCategories()
			.subscribe(result => {
				// this.categories = result;
					result.forEach(cat => {
					switch (cat.name){
						case 'Business':
							cat['img'] = 'assets/img/category/icons8-business.png';
							this.categories.push(cat);
							break;
						case 'Culture':
							cat['img'] = 'assets/img/category/culture.png';
							break;
						case 'Entertainment':
							cat['name'] = 'Lifestyle and Entertainment'
							cat['img'] = 'assets/img/category/icons8-lifestyle-entertainment.png';
							this.categories.push(cat);
							break;
						case 'Health':
							cat['img'] = 'assets/img/category/icons8-health.png';
							this.categories.push(cat);
							break;
						// case 'News':
						// 	cat.name = 'General News';
						// 	cat['img'] = 'assets/img/category/news.png';
						// 	this.categories.push(cat);
						// 	break;
						case 'Politics':
							cat['img'] = 'assets/img/category/icons8-politics.png';
							this.categories.push(cat);
							break;
						case 'Showbiz':
							cat['img'] = 'assets/img/category/showbiz.png';
							break;
						case 'Sport':
							cat['img'] = 'assets/img/category/icons8-sport.png';
							this.categories.push(cat);
							break;
						case 'Uncategorized':
							cat['img'] = 'assets/img/category/icons8-uncategorized.png';
							this.categories.push(cat);
							break;
						case 'World':
							cat['img'] = 'assets/img/category/icons8-international.png';
							this.categories.push(cat);
							break;
						case 'Africa':
							cat['img'] = 'assets/img/category/icons8-africa.png';
							this.categories.push(cat);
							break;
					}

				});
			},
			error => console.log(error),
			() => this.isBusy = false);
	}

	loadCategory(category) {
		this.navController.push(WordpressPosts, {
			category: category
		});
	}

}
