import { Component, ViewChild } from '@angular/core';
import {
	Nav, Platform, MenuController, LoadingController, AlertController, ModalController,
	Events
} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TranslateService } from 'ng2-translate';
import { Config } from './app.config';
import firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
// import { OneSignal } from '@ionic-native/onesignal';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
// import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

import { NetworkProvider } from '../providers/network/network';
import { ToastService } from '../providers/util/toast.service';
import {environment} from '../environments/environment';
import * as $ from 'jquery'


// import {
// 	Push,
// 	PushToken
// } from '@ionic/cloud-angular';


import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
// import { Push, PushObject, PushOptions} from '@ionic-native/push';
import { AngularFireAuth } from 'angularfire2/auth';

import { TabsComponent } from '../pages/tabs/tabs-component/tabs.component';
import { SettingsComponent } from '../pages/settings/settings-component/settings.component';
import { WordpressMenus } from '../pages/wordpress/wordpress-menus/wordpress-menus.component';
import { WordpressCategories } from '../pages/wordpress/wordpress-categories/wordpress-categories.component';
import { WeatherComponent } from '../pages/weather/weather-component/weather.component';
import { BusinessNews } from '../pages/business-news/business-news.component';
import { SportNews } from '../pages/sport-news/sport-news.component';
import { ProfileListPage } from '../pages/profile/profile';
import { LikesComponent } from '../pages/wordpress/likes/likes';
import { HomeComponent } from '../pages/wordpress/home-component/home.component';
import { AboutComponent } from '../pages/about/about-component/about.component';
import { DailyScriptureComponent } from '../pages/daily-scripture/daily-scripture-component/daily.scripture.component';
import { CurrencyComponent } from '../pages/currency/currency-component/currency.component';

import { WordpressPosts } from '../pages/wordpress/wordpress-posts/wordpress-posts.component';
import {FeedbackPage} from '../pages/feedback/feedback'
import { WordpressService } from '../pages/wordpress/shared/services/wordpress.service';
import { AppState } from './app.global';
import { AuthProvider } from '../providers/auth/auth';
import { AlertService } from '../providers/util/alert.service';

import { LoginPage } from '../pages/login/login';
import {RatingProvider} from "../providers/rating/rating";
import {AnalyticsProvider} from '../providers/analytics/analytics';

firebase.initializeApp({
	// apiKey: "AIzaSyDmaLu7eOCmkji-VgS9bt7_kgSkCfHTQgU",
	// authDomain: "ghananewsapp-53b34.firebaseapp.com",
	// databaseURL: "https://ghananewsapp-53b34.firebaseio.com",
	// projectId: "ghananewsapp-53b34",
	// storageBucket: "ghananewsapp-53b34.appspot.com",
	// messagingSenderId: "934837894682"
	// apiKey: "AIzaSyDylROIXxYhVGJPrjeVQSJciNGkz7ygv-c",
	// authDomain: "ghananews-8a9d2.firebaseapp.com",
	// databaseURL: "https://ghananews-8a9d2.firebaseio.com",
	// projectId: "ghananews-8a9d2",
	// storageBucket: "ghananews-8a9d2.appspot.com",
	// messagingSenderId: "658844577080"
	apiKey: environment.firebase.apiKey,
	authDomain: environment.firebase.authDomain,
	databaseURL: environment.firebase.databaseURL,
	projectId: environment.firebase.projectId,
	storageBucket: "",
	messagingSenderId: environment.firebase.messagingSenderId
});

interface AdMobType {
	banner: string,
	interstitial: string
}

@Component({
	templateUrl: './app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage : any;
	menuPage = WordpressMenus;
	pages: Array<{title: string, component: any, icon: string}>;
	wordpressMenusNavigation: boolean = false;

	categoryPagesTitle  = ['Politics', 'Business', 'Sport', 'Entertainment', 'World'];

	category:any;
	sign_name = "SIGN IN";
	email = '';
	category_list = [{name: 'Business', id: 4},
		{name: 'Culture', id: 5},
		{name: 'Entertainment', id: 29},
		{name: 'Lifestyle', id: 10},
		{name: 'News', id: 3},
		{name: 'Politics', id: 7},
		{name: 'Showbiz', id: 9},
		{name: 'Sport', id: 2},
		{name: 'Uncategorized', id: 1},
		{name: 'World', id: 8}];

	constructor(
		private platform: Platform,
		private translate: TranslateService,
		private storage: Storage,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private config: Config,
		private menuController: MenuController,
		private loadingController: LoadingController,
		private wordpressService: WordpressService,
		public alertCtrl: AlertController,
		private admob: AdMobFree,
		// public push: Push,
		private http: Http,
		public global: AppState,
		private authProvider: AuthProvider,
		private alertService:AlertService,
		private modalCtrl: ModalController,
		public afAuth: AngularFireAuth,
		private ga: GoogleAnalytics,
		// private oneSignal: OneSignal,
		private socialSharing: SocialSharing,
		private networkProvider: NetworkProvider,
		private toastService: ToastService,
		private nativeGeocoder: NativeGeocoder,
		private _RATE       : RatingProvider,
		private _ANALTICS : AnalyticsProvider,
		private events: Events,
		) {


		if(!localStorage.getItem('theme')){
			this.global.set('theme', '');
		}
		else{
			this.global.set('theme', localStorage.getItem('theme'));
		}

		this.http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
            .map(res => res.json())
            .subscribe(data => {
				var d = data;
				console.log(d);
			});


		// this.nativeGeocoder.forwardGeocode('Aachen')
         //    .then((coordinates: NativeGeocoderForwardResult) => alert('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude))
         //    .catch((error: any) => alert(JSON.stringify(error)));


		$.getJSON("assets/data/citiesOfAllCountries.json", function(json) {
			console.log(json); // this will show the info it in firebug console
		});


		// this.fcm.subscribeToTopic('marketing');
        //
		// this.fcm.getToken().then(token=>{
		// 	alert(token);
		// });
        //
		// this.fcm.onNotification().subscribe(data=>{
		// 	if(data.wasTapped){
		// 		alert("background  " + JSON.stringify(data));
		// 	} else {
		// 		alert('foreground  ' + JSON.stringify(data));
		// 	};
		// });
        //
		// this.fcm.onTokenRefresh().subscribe(token=>{
		// 	alert(token);
		// });
        //
		// this.fcm.unsubscribeFromTopic('marketing');




		// this.pushSetup();
		// this.googleAnalyticsSetup();

		// localStorage.setItem("isLogin", "false");


		this.initializeApp();

		this.translate.setDefaultLang('en');
		storage.get('language').then((value) => {
			if (value) {
				this.translate.use(value);
			} else {
				this.translate.use('en');
				this.storage.set('language', 'en');
			}
		});

		this.pages = [

			// display top news items, have a news slider, or carousel
			// { title: 'HOME', component: TabsComponent, icon: 'home'},
			{ title: 'HOME', component: HomeComponent, icon: 'home'},
			{ title: 'Categories', component: WordpressCategories, icon: 'link'},
			{ title: 'Liked Articles', component: LikesComponent, icon: 'heart'},

			//https://bibles.org/pages/api
			{ title: 'Daily Scripture', component: DailyScriptureComponent, icon: 'information-circle'},

			{ title: 'Politics', component: TabsComponent, icon: 'outlet'},

			{ title: 'Business', component: BusinessNews, icon: 'people'},

			{ title: 'Sport', component: SportNews, icon: 'football'},

			{ title: 'Entertainment', component: TabsComponent, icon: 'sad'},

			{ title: 'World', component: TabsComponent, icon: 'globe'},

			{ title: 'Currency', component: CurrencyComponent, icon: 'card'},

			{ title: 'Weather', component: WeatherComponent, icon: 'partly-sunny'},
// settings, contains push notifications settings, region settings
			{ title: 'Settings', component: SettingsComponent, icon: 'settings'},

			{ title: 'Share this app', component: ProfileListPage, icon: 'share'},


			// { title: 'Privacy Policy', component: TabsComponent, icon: 'easel'},
			{title: 'Get in Touch', component:FeedbackPage, icon: 'mail'},

			{ title: 'About', component: AboutComponent, icon: 'alert'},

			// {title : 'Rate this App', component:'', icon: 'thumbs-up'},

			// this is the divider of the components we can use below
			// 		{ title: 'DIVIDER', component: PlaceholderComponent, icon: 'logo-buffer', iconStyle: 'color: blue;' },

			// { title: 'GRID', component: GridComponent, icon: 'grid'},
			// { title: 'DATETIME', component: DatetimeComponent, icon: 'clock'},
			// { title: 'RANGES', component: RangesComponent, icon: 'sunny'},
			// { title: 'ACTION_SHEET', component: ActionSheetComponent, icon: 'create'},



		];

		this.wordpressMenusNavigation = config.wordpressMenusNavigation;

		this.platform.ready().then(()=>{
			this._ANALTICS.initiateAnalytics();
			}
		);
		// this.googleAnalyticsSetup();


	}

	// googleAnalyticsSetup(){
	// 	this.ga.startTrackerWithId('UA-104510871-1')
     //        .then(() => {
	// 			alert('Google analytics is ready now');
	// 			this.ga.trackView('test');
	// 			// Tracker is ready
	// 			// You can now track pages or set additional information such as AppVersion or UserId
	// 		})
     //        .catch(e => alert('Error starting GoogleAnalytics'+e));
	// 	this.ga.enableUncaughtExceptionReporting(true).then((_success) => {
	// 		alert("Successful enabling of uncaught exception reporting "+_success)
	// 	}).catch((_error) => {
	// 		alert("error occured "+_error)
	// 	});
    // //
    //
	// }

	// pushSetup(){
	// 	// Enable to debug issues.
	// 	this.oneSignal.startInit('d7986097-7f5f-4c06-9f72-48d620297cab', '882443494375');
    //
	// 	this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    //
	// 	this.oneSignal.handleNotificationReceived().subscribe(() => {
	// 		// do something when notification is received
	// 		alert('OneSignal received');
	// 	});
    //
	// 	this.oneSignal.handleNotificationOpened().subscribe(() => {
	// 		// do something when a notification is opened
	// 		alert('OneSignal opened');
	// 	});
    //
	// 	this.oneSignal.endInit();
	// // 	const options: PushOptions = {
	// // 		android: {
	// // 			senderID: '882443494375'
	// // 		},
	// // 		ios: {
	// // 			alert: 'true',
	// // 			badge: true,
	// // 			sound: 'false'
	// // 		},
	// // 		windows: {}
	// // 	};
    // //
	// // 	const pushObject: PushObject = this.push.init(options);
    // //
	// // 	pushObject.on('notification').subscribe((notification: any) => {
	// // 		// alert(notification.message);
	// // 		if(notification.additionalData.foreground){
	// // 			// alert(notification.message);
	// // 			let yourAlertCtrl = this.alertCtrl.create({
	// // 				title: 'New Push Notification',
	// // 				message: notification.message
	// // 			});
	// // 			yourAlertCtrl.present();
	// // 		}
	// // 	});
    // //
	// // 	pushObject.on('registration').subscribe((registration: any) => alert('Device registered: ' + registration));
    // //
	// // 	pushObject.on('error').subscribe((error: any) => alert('error with push plugin: ' + error));
	// }

	admobShow(){
		// alert('start');
		// var admobid: AdMobType;
		// if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
		// 	// alert("android");
		//   admobid = {
		//     banner: 'ca-app-pub-5862034108951384/4493464110',
		//     interstitial: 'ca-app-pub-3940256099942544/6300978111'
		//   };
		// } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
		// 	// alert("ios");
		//   admobid = {
		//     banner: 'ca-app-pub-8145684018864402/2046455373',
		//     interstitial: 'ca-app-pub-3940256099942544/6300978111'
		//   };
		// } else { // for windows phone
		//   admobid = {
		//     banner: 'ca-app-pub-8145684018864402~9569722170',
		//     interstitial: 'ca-app-pub-3940256099942544/6300978111'
		//   };
		// }

		// alert(admobid.banner);
		// this.admob.createBanner({
		// 	adId: admobid.banner,
		// 	adSize: 'SMART_BANNER',
		// 	isTesting: true,
		// 	// autoShow: true
		// }).then(() => {
		// 	alert('will show admob');
		// 	this.admob.showBanner(8);
		// }).catch(e => {
		// 	alert("error");
		// 		console.log(e);
		// 		alert(e);
		// 	});

		let bannerConfig: AdMobFreeBannerConfig = {
			isTesting: false, // Remove in production
			autoShow: true,
			id: environment.ads.appid
			//id: Your Ad Unit ID goes here
		};

		// alert('start');

		this.admob.banner.config(bannerConfig);

		this.admob.banner.prepare().then(() => {
			// alert("end");
		}).catch(e => {
			// alert("error");
			console.log(e);
			// alert(e);
		});
	}

	registerNotification(){
		// //Register push notification
		// this.push.register().then((t: PushToken) => {
		// 	return this.push.saveToken(t);
		// }).then((t: PushToken) => {
		// 	console.log('Push Token saved:', t.token);
        //
		// 	// this.storage.set(this.KEY_TOKEN, t.token);
        //
		// 	let blogId = Object.keys(res.user_blogs)[0];
		// 	let site = res.user_blogs[blogId].siteurl.split("/").pop();
        //
		// 	this.saveDeviceToken(site, t.token, blogId)
         //        .subscribe((res) => {
        //
		// 			console.log('save device token res:', res);
		// 			this.push.rx.notification()
         //                .subscribe((msg) => {
		// 					console.log('Notification recieved: ',msg.title + ': ' + msg.text);
		// 				});
        //
		// 		});
        //
		// }, err => {
		// 	console.log('Push register failed. Err:'+err);
		// });
	}

	initializeApp() {

		this.platform.ready().then(() => {
			this.events.subscribe('loginEvent',(object) => {
				if (object.isLogin) {
					this.sign_name = "SIGN OUT";
					this.email = object.currentUser;
				}
			});
			if(!this.networkProvider.obtainNetworkConnection()){
				console.log('Sorry, network is unavailable. Please make sure status of network.');
				// alert('Sorry, network is unavailable. Please make sure status of network.');
				this.toastService.create('Sorry, network is unavailable. Please make sure status of network.', false, 3000);
				// this.toastService.present()
				// this.platform.exitApp();
			}

			// Enable RTL Support
			// this.platform.setDir('rtl', true);
			this.statusBar.styleDefault();
			this.splashScreen.hide();






			this.admobShow();
			this.loadCurrencies();
			this.registerNotification();

			// let data = {
			// 	Host: 'http://scraper.sarchitech.com',
			// 	'Content-Length': 26,
			// 	'Content-Type': 'application/x-www-form-urlencoded',
			// 	token: this.device.uuid + '&os=Android'
			// };
            //
			// this.http.post('/pnfw/register/', data).subscribe( data =>{
			// 	alert("success post");
			// });
		});


			// var user = this.afAuth.auth.currentUser;
			// if(!user){
			// 	localStorage.setItem('isLogin', "false")
			// }
			// if (localStorage.getItem('isLogin') != 'true') {
			// 	this.rootPage = HomeComponent;
			// }
			// else {
			// 	var user:any = localStorage.getItem("currentUser");
			// 	this.email = user.email;
			// 	this.sign_name = 'SIGN OUT';
			// 	this.rootPage = HomeComponent;
			// }
		// const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
		// 	if (!user) {
		// 		this.rootPage = HomeComponent;
		// 		unsubscribe();
		// 	}
		// 	else {

				if (localStorage.getItem('isLogin') == 'true') {
					this.email = localStorage.getItem('currentUser');
					this.sign_name = 'SIGN OUT';
					this.rootPage = HomeComponent;

					// unsubscribe();
				}
				else{
					this.rootPage = HomeComponent;

					// unsubscribe();
				}
			// }
		// });
	}

	loadCurrencies(){
		// throw new Error('I am a bug..');
		// this.http.get("assets/data/currencies.json")
         //    .map(res => {
         //    	// localStorage.setItem('Currencies', res.json().results);
		// 	}).subscribe(data => {
		// }, (rej) => {
		// 	console.error("Could not load local data",rej);
		// });
	}

	openPage(page) {
		// this.ga.trackEvent('form', 'vote', 'Hours online', 1)
         //    .then(() => {
		// 		alert('Google analytics Event is ready now');
		// 	});
		this.platform.ready()
		.then(() =>
		{
			this._ANALTICS.trackPageView(page.title);
		});

		this.menuController.close();
		// if(!localStorage.getItem("isLogin") || localStorage.getItem("isLogin") == "false"){
		// 	this.nav.setRoot(LoginPage);
		// 	let alert = this.alertCtrl.create({
		// 		message: "Please login.",
		// 		buttons: [
		// 			{
		// 				text: "Ok",
		// 				role: 'cancel'
		// 			}
		// 		]
		// 	});
		// 	alert.present();
		// 	return;
		// }



		var isCategoryPage = false;
		if( this.categoryPagesTitle.indexOf(page.title) > -1 ) {
			isCategoryPage = true;
		}

		if(page.title == 'Logout'){
			this.logOut();
			return;
		}

		if(!isCategoryPage){
			if(page.title == 'Share this app'){
				this.shareRecipe();
			}
			else if(page.title == 'Get in Touch'){
				this.nav.push(page.component);
			}
			else if(page.title == 'Rate this App'){
				this.promptForAppRating();
				return;
			}
			else{
				this.nav.setRoot(page.component);
			}

		}
		else
		{
			switch (page.title){
				case('Politics'):
					this.getCategory(page.title);
					break;
				case('Business'):
					this.getCategory(page.title);
					break;
				case('Sport'):
					this.getCategory(page.title);
					break;
				case('Entertainment'):
					this.getCategory(page.title);
					break;
				case('World'):
					this.getCategory(page.title);
					break;
				default:
					break;
			}

		}

		// throw new Error('I am a bug... 🐛');

	}



	getCategory(categoryName) {
		// let loader = this.loadingController.create({
		// 	content: "Please wait"
		// });
		// loader.present();
		// this.nav.setRoot('LoadingModal', {'isLoading': true});
		// this.nav.push(LoadingModal, {'isLoading': true});

		for(var cat of this.category_list){
			if(cat.name == categoryName){
				this.category = cat;
			}
		};
		this.loadCategory(this.category);

		// this.wordpressService.getCategories()
         //    .subscribe(result => {
		// 			for(var cat of result){
		// 				if(cat.name == categoryName){
		// 					this.category = cat;
		// 				}
		// 			};
		// 			this.loadCategory(this.category);
        //
		// 		},
		// 		error => console.log(error),);
				// () => this.nav.pop(LoadingModal));
	}

	loadCategory(category) {
		if(category) {
			// this.nav.pop(LoadingModal);
			// this.nav.push(TabsComponent);
			this.nav.setRoot(WordpressPosts, {
				category: category
			});
			// this.nav.pop(LoadingModal);
		}
	}
	logINOut(){
		if(this.sign_name == 'SIGN IN'){
			this.logIn();
		}
		else{
			this.logOut();
		}
	}

	logIn(){

		this.nav.push(LoginPage);
		// let modal = this.modalCtrl.create(LoginPage);
		// modal.onDidDismiss(val => {
		// 	if(val.login_status == 'true'){
		// 		this.sign_name = 'SIGN OUT';
		// 		this.email = val.email;
		// 	}
        //
		// });
		// modal.present();
	}

	logOut() {
		var me = this;
		const confirm = this.alertCtrl.create({
			title: 'Information',
			message: "Are you sure?",
			buttons: [ {
				text: 'Yes',
				role: 'yes',
				handler: () => {
					// this.authProvider.logoutUser();
					console.log('User iog out successfully.');
					localStorage.setItem('isLogin', 'false');
					localStorage.setItem('currentUser', '');
					this.sign_name = 'SIGN IN';
					this.email = '';
					// confirm.dismiss().then(() => {
					// 	this.authProvider.logoutUser();
					// 	console.log('User iog out successfully.');
					// });
				}

			},
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						// confirm.dismiss().then(() => {
						//
						// });
					}
				}]
		});

		confirm.present();
	}

	getIsLogin(){
		return localStorage.getItem('isLogin');
	}

	shareRecipe() {
		this.socialSharing.shareWithOptions({
			message: 'GH informer',
			url:'https://play.google.com/store/apps/details?id=com.ghananews.sarchitech'
		}).then(() => {
			console.log('Shared!');
		}).catch((err) => {
			console.log('Oops, something went wrong:', err);
		});
	}

	menuOpened(){

		// const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
		// 	if (!user) {
		// 		unsubscribe();
		// 	}
		// 	else {

				if (localStorage.getItem('isLogin') == 'true') {
					this.email = localStorage.getItem('currentUser');
					this.sign_name = 'SIGN OUT';
					// unsubscribe();
				}
				else{
					this.email = "";
				}
		// 	}
		// });
	}
	promptForAppRating()
	{
		// Only allow the plugin to be triggered when the device is ready
		this.platform.ready()
            .then(() =>
			{
				this._RATE.requestRating();
			});
	}
}
