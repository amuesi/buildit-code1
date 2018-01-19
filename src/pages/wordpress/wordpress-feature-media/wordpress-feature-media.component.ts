import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

import { WordpressService } from '../shared/services/wordpress.service';
import { NetworkProvider } from '../../../providers/network/network';
@Component({
	selector: 'wordpress-feature-media',
	templateUrl: './wordpress-feature-media.html',
	providers: [WordpressService]
})
export class WordpressFeatureMedia implements OnInit {
	@Input() id: number;
	timeInterval :any = null;
	media: any;
	// image_url = 'assets/img/placeholder.png';

	constructor(
		private wordpressService: WordpressService, private network:NetworkProvider) {}

	ngOnInit() {
		if (this.id > 0) {
			this.getMedia(this.id);
		}
	}

	getMedia(id) {

		this.wordpressService.getMedia(id)
			.subscribe(result => {
				this.media = result;
				// this.image_url = this.media.source_url;
				if (this.timeInterval){
					// alert("claear1");
					clearInterval(this.timeInterval);
				}
			},
			err => {
				// alert(this.network.obtainNetworkConnection());
				// if (!this.network.obtainNetworkConnection() && this.timeInterval == null) {
				// 	this.timeInterval = setInterval((function () {
				// 		alert("start");
				// 		this.getMedia(id)
				// 	}).bind(this), 2000);
				// 	console.log("Oops!");
				// }
				// else{
				// 	alert("ddd");
				// 	if (this.network.obtainNetworkConnection() && this.timeInterval != null)
				// 	{
                //
				// 		clearInterval(this.timeInterval);
				// 	}
				// }
				// console.log("Oops!");
			});
	}

}
