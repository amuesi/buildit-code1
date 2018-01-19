import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from 'ng2-translate';
import { AppState } from '../../../app/app.global';

@Component({
    templateUrl: 'settings.html'
})
export class SettingsComponent implements OnInit {

	language: string;

	constructor(
		private storage: Storage,
		private translate: TranslateService,
		public global: AppState
		){}

	ngOnInit() {
	    this.storage.get('language')
	    .then(value => {
	        if(value) {
	        	this.language = value;
	        } else {
	        	this.language = 'en';
	        }
	    });
	}

	selectLanguage() {
		this.storage.set('language', this.language);
        this.translate.setDefaultLang(this.language);
        this.translate.use(this.language);
	}

	changeTheme(theme) {
		this.global.set('theme', theme);
		localStorage.setItem('theme', theme);
	}

}


