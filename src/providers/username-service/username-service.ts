import {Injectable} from '@angular/core';
import {
    ToastController,
    AlertController,
    LoadingController,
    Platform,
    Config
} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AppVersion} from '@ionic-native/app-version';
import {Device} from '@ionic-native/device';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class UsernameServiceProvider {
    username: string;
    deviceId: string;
    appName: string;
    appV: string;

    constructor(private http: Http,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController,
                private loadingCtrl: LoadingController,
                private plt: Platform,
                private device: Device,
                private appVersion: AppVersion,
                public config: Config) {
        plt.ready()
            .then(res => {
                let cordova = (<any>window).cordova;
                if (cordova && cordova.platformId != "browser" && cordova.airwatch) {
                    console.log('Cordova Plugin found');
                    cordova.airwatch.getUsername(username => {
console.log('####################################### Fetched username from airwatch', username);
                        this.username = username
                    })
                }
            });

        if (document.URL.includes('https://') || document.URL.includes('http://')) {

        }
        else {
            this.appVersion.getPackageName().then((res) => {
                this.appName = res
            });
            this.appVersion.getVersionNumber().then((res) => {
                this.appV = res
            });
        }
    }

    alertMessage: any;

    displayNoResults() {
        this.alertMessage = this.alertCtrl.create({
            title: 'No results',
            subTitle: 'Search returned no results.',
            buttons: ['Ok']
        });
        this.alertMessage.present();
    }

    loadingMessage: any;

    displaySearching() {
        this.loadingMessage = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'Searching'
        });
        this.loadingMessage.present()
    }

    displayFetching() {
        this.loadingMessage = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'Fetching'
        });
        this.loadingMessage.present()
    }

    displayUpdating() {
        this.loadingMessage = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'Updating'
        });
        this.loadingMessage.present()
    }

    errorMessage() {
        let alert = this.alertCtrl.create({
            title: 'Connection error',
            message: 'Please make sure you have an internet connection and Airwatch Tunnel installed.',
            buttons: [{
                text: 'Ok',
                role: 'cancel'
            }]
        });
        alert.present()
    }

    characterError() {
        let alert = this.alertCtrl.create({
            title: 'Error',
            message: 'Some characters in your Ask Me About or your About Me section are invalid. Ensure you only have standard characters.',
            buttons: [{
                text: 'Ok',
                role: 'cancel'
            }]
        });
        alert.present()
    }

    personFilter(page) {
        if (!page.path.startsWith("http://mysite/Person")) {
            page = null
        }
        return page
    }
}
