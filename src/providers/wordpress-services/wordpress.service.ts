import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../app/app.config';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import { NetworkProvider } from '../../providers/network/network';

@Injectable()
export class WordpressService {

	constructor(private http: Http, private config: Config, private network:NetworkProvider) {}

	public login(data) {
		let url = this.config.wordpressApiUrl + '/jwt-auth/v1/token';
		return this.http.post(url, data)
	  	.map(result => {
			return result.json();
		});    
	}

	public getPosts(query) {
		query = this.transformRequest(query);
		let url = this.config.wordpressApiUrl + `/wp/v2/posts?${query}&_embed`;
		return this.http.get(url)
	  	.map(result => {
			return result.json();
		});
	}

	// public getPosts(query) {
	// 	query = this.transformRequest(query);
	// 	let url = this.config.wordpressApiUrl + `/wp/v2/posts?${query}&_embed`;
	// 	return Observable.create(observer => {
	// 		this.http.get(url)
     //            .map(res => res.json())
     //            .subscribe(data => {
	// 				console.log("Your data : " , data);
	// 				observer.next(data);
	// 			},(err) => {
	// 				console.log("Your error : ", err);
	// 				observer.error(err);
	// 				// if(err.status == 400){
	// 				// 	this.presentToast('Validation error');
	// 				// }else if(err.status == 403){
	// 				// 	this.presentToast('Authorization error'):
	// 				// }else if(err.status == 500){
	// 				// 	this.presentToast('Something wrong with server');
	// 				// }else ...
	// 			});
	// 	});
	// }

	public getPost(id) {
		return this.http.get(this.config.wordpressApiUrl + `/wp/v2/posts/${id}?_embed`)
	  	.map(result => {
			return result.json();
		});
	}

	public getMedia(id) {
		return this.http.get(this.config.wordpressApiUrl + `/wp/v2/media/${id}`)
	  	.map(result => {
			return result.json();
		});
	}

	public getCategories() {
		return this.http.get(this.config.wordpressApiUrl + '/wp/v2/categories?per_page=100')
		.map(result => {
			return result.json();
		});
	}

	public getTags() {
		return this.http.get(this.config.wordpressApiUrl + '/wp/v2/tags?per_page=100')
		.map(result => {
			return result.json();
		});
	}

	public getPages() {
		return this.http.get(this.config.wordpressApiUrl + '/wp/v2/pages?per_page=100')
		.map(result => {
			return result.json();
		});
	}

	public getPage(id) {
		return this.http.get(this.config.wordpressApiUrl + `/wp/v2/pages/${id}`)
	  	.map(result => {
			return result.json();
		});
	}

	public getMenus() {
		return this.http.get(this.config.wordpressApiUrl + '/wp-api-menus/v2/menus')
		.map(result => {
			return result.json();
		});
	}

	public getMenu(id) {
		return this.http.get(this.config.wordpressApiUrl + `/wp-api-menus/v2/menus/${id}`)
	  	.map(result => {
			return result.json();
		});
	}

	private transformRequest(obj) {
		let p, str;
		str = [];
		for (p in obj) {
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
		}
		return str.join('&');
	}

	public postComment(data){
		let url = this.config.wordpressApiUrl + '/wp/v2/comments';
		return this.http.post(url, data)
            .map(result => {
				return result.json();
			});
	}

}