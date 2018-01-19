import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

import { AdMobFree } from '@ionic-native/admob-free';
import { AdMob } from '@ionic-native/admob';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

// import { Push } from '@ionic-native/push';
// import {
//   Push,
//   PushToken
// } from '@ionic/cloud-angular';
import { AppState } from './app.global'

import { SharedModule } from './shared/shared.module';
import { HomeModule } from '../pages/home/home.module';
import { TabsModule } from '../pages/tabs/tabs.module';
import { GoogleMapsModule } from '../pages/google-maps/google-maps.module';
import { WordpressModule } from '../pages/wordpress/wordpress.module';
import { SlidesModule } from '../pages/slides/slides.module';
import { GridModule } from '../pages/grid/grid.module';
import { SettingsModule } from '../pages/settings/settings.module';
import { FeedsModule } from '../pages/feeds/feeds.module';
import { YoutubeModule } from '../pages/youtube/youtube.module';
import { AboutModule } from '../pages/about/about.module';
import { ContactModule } from '../pages/contact/contact.module';
import { DatetimeModule } from '../pages/datetime/datetime.module';
import { RangesModule } from '../pages/ranges/ranges.module';
import { ActionSheetModule } from '../pages/action-sheet/action-sheet.module';
import { FacebookConnectModule } from '../pages/facebook-connect/facebook-connect.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ChartsModule } from '../pages/charts/charts.module';
import { FirebaseModule } from '../pages/firebase/firebase.module';
import { WeatherModule } from '../pages/weather/weather.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { PasswordResetPageModule } from '../pages/password-reset/password-reset.module';
import { CityWeatherPageModule } from '../pages/weather/city-weather/city-weather.module';

import { HomeWeatherPageModule } from '../pages/weather/home-weather/home-weather.module';
import { LocationPageModule } from '../pages/weather/location/location.module';
import { SettingsPageModule } from '../pages/weather/settings/settings.module';
import { TabsPageModule } from '../pages/weather/tabs/tabs.module';
import { WeatherDetailPageModule } from '../pages/weather/weather-detail/weather-detail.module';
import { WorldCityListPageModule } from '../pages/weather/world-city-list/world-city-list.module';
import { DailyScriptureModule} from '../pages/daily-scripture/daily.scripture.module';
import { CurrencyModule } from '../pages/currency/currency.module';
import {FeedbackPageModule} from '../pages/feedback/feedback.module';
import { SentryErrorHandler } from '../services/sentry-errorhandler';
// import {  PopOverSharePageModule } from '../pages/pop-over-share/pop-over-share.module';

import { LoadingModalModule } from '../components/loading-modal/loading-modal.module';
import { LikepopoverModule } from '../components/likepopover/likepopover.module'


import { BusinessNewsModule } from '../pages/business-news/business-news.module';
import { SportNewsModule } from '../pages/sport-news/sport-news.module';

import { ProfileOnePageModule } from '../pages/profile/profile-one/profile-one.module';
import { ProfileSettingsPageModule } from '../pages/profile/profile-settings/profile-settings.module';
import { ProfileListPageModule } from '../pages/profile/profile.module';
// Module Example: Use the PlaceholderModule for any new App Module
import { PlaceholderModule } from '../pages/placeholder/placeholder.module';
import { ComponentsModule } from '../components/components.module'
import { DirectivesModule } from '../pages/weather/directives/directives.module';



import { MyApp } from './app.component';
import { WeatherServiceProvider } from '../providers/weather-service/weather-service';
import { GeocodeServiceProvider } from '../providers/geocode-service/geocode-service';
import { WordpressService } from '../pages/wordpress/shared/services/wordpress.service';
import { AuthProvider } from '../providers/auth/auth';
import { CurrencyProvider } from '../providers/currency-provider/currecy-provider';
import { AlertService } from '../providers/util/alert.service';
import { ToastService } from '../providers/util/toast.service';
import { NetworkProvider } from '../providers/network/network';

import { environment } from '../environments/environment';
import { FirebaseUseProvider } from '../providers/firebase-use/firebase-use';

import { DatabaseService, ForecastService, Sql, UtilService } from '../providers/weather-service';
import {AnalyticsProvider} from '../providers/analytics/analytics';
import { MessagingProvider } from '../providers/messaging/messaging';
import { PreloaderProvider } from '../providers/preloader/preloader';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { ValidationProvider } from '../providers/validation/validation';
import { RatingProvider } from '../providers/rating/rating';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    SharedModule,
    HomeModule,
    TabsModule,
    GoogleMapsModule,
    WordpressModule,
    SlidesModule,
    GridModule,
    SettingsModule,
    FeedsModule,
    YoutubeModule,
    AboutModule,
    ContactModule,
    DatetimeModule,
    RangesModule,
    ActionSheetModule,
    FacebookConnectModule,
    LoginPageModule,
    ChartsModule,
    FirebaseModule,
    PlaceholderModule,
    WeatherModule,
    BusinessNewsModule,
    LoadingModalModule,
      SportNewsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    SignupPageModule,
    PasswordResetPageModule,
    ProfileOnePageModule,
    ProfileSettingsPageModule,
    ProfileListPageModule,
    LikepopoverModule,
    ComponentsModule,
    CityWeatherPageModule,
    HomeWeatherPageModule,
    LocationPageModule,
    SettingsPageModule,
    TabsPageModule,
    WeatherDetailPageModule,
    WorldCityListPageModule,
    DirectivesModule,
    DailyScriptureModule,
    CurrencyModule,
    FeedbackPageModule,
    // PopOverSharePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [{provide: ErrorHandler, useClass: SentryErrorHandler},
    WeatherServiceProvider,
    GeocodeServiceProvider,
    WordpressService,
    AuthProvider,
    AngularFireAuth,
    FirebaseUseProvider,
    AdMobFree,
    CurrencyProvider,
    AdMob,
    NativeGeocoder,
    // Push,
    AppState,
    AlertService,
      ToastService,
    Sql,
    DatabaseService,
    UtilService,
    ForecastService,
    NetworkProvider,
    AnalyticsProvider,
    MessagingProvider,
    PreloaderProvider,
    UtilitiesProvider,
    ValidationProvider,
    RatingProvider
  ]
})
export class AppModule {}
