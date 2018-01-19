import { NgModule } from '@angular/core';
import { IonicModule, LoadingController, NavController } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { CacheService } from "ionic-cache";
import { Network } from '@ionic-native/network';
import {AppRate} from '@ionic-native/app-rate';
import { Geolocation } from '@ionic-native/geolocation'
// import { OneSignal } from '@ionic-native/onesignal';

import { Keyboard } from '@ionic-native/keyboard';
import { JsonpModule } from '@angular/http';

import { AdMobFree } from '@ionic-native/admob-free';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { TruncatePipe } from './pipes/truncate.pipe';
import { TrimHtmlPipe } from './pipes/trim-html.pipe';

import { Config } from '../app.config';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/translations', '.json');
}

@NgModule({
  declarations: [
    TruncatePipe,
    TrimHtmlPipe
  ],
  imports: [
    BrowserModule,
    IonicModule,
    JsonpModule,
    IonicStorageModule.forRoot(),
    CommonModule,
    HttpModule,
    TranslateModule.forRoot({ 
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  exports: [
    BrowserModule,
    IonicModule,
    TranslateModule,
    TruncatePipe,
    TrimHtmlPipe
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    SocialSharing,
    EmailComposer,
    Config,
    Geolocation,
    LoadingController,
    Keyboard,
    AdMobFree,
    GoogleAnalytics,
    // OneSignal,
    CacheService,
    Network,
    AppRate
  ]
})
export class SharedModule {}
