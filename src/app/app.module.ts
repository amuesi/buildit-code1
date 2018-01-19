import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CacheModule } from "ionic-cache";
import { CallNumber } from '@ionic-native/call-number';
import {FormsModule, Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

import{Store} from './store';

import { MyApp } from './app.component';


// native plugins
import { NativeProviders } from './app.native.providers';

//app providers
import { AppProviders } from './app.providers';

// Esri dependencies
import { EsriLoaderService } from 'angular2-esri-loader';
import { Angular2Esri4Module } from 'angular2-esri4-components';

import {MapPage} from '../pages/map/map';
// import {FlocLocationsPage} from "../pages/floc-locations/floc-locations";



// safetyNet module for pages
import { SafetyNetModule } from "./safetynet.module";
import { FlocSTWProvider } from '../providers/floc/flocSTW';
import { FlocSTSProvider } from '../providers/floc/flocSTS';
import {search_page} from "../pages/search-page/search-page";
import {PersonSearchPage} from "../pages/person_search/person-search";
import { ErrorLoggerProvider } from '../providers/error-logger/error-logger';


@NgModule({
  declarations: [
    MyApp,
    MapPage,
    search_page,
    PersonSearchPage,

    
  ],
  imports: [
    //import the whole app
    SafetyNetModule,
    Angular2Esri4Module,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CacheModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      platforms: {

        android:{
        backButtonText: "",
        backButtonIcon: "md-arrow-back",
        iconMode: "md",
        modalEnter: "modal-md-slide-in",
        modalLeave: "modal-md-slide-out",
        pageTransition: "md"
        },

        ios:{
          backButtonText: "Back",
          backButtonIcon: "ios-arrow-back",
          iconMode: "ios",
          modalEnter: "modal-ios-slide-in",
          modalLeave: "modal-ios-slide-out",
          pageTransition: "ios",
        }

      }
    }),
    IonicStorageModule.forRoot(),
    HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    search_page,
    PersonSearchPage
  ],
  providers: [
    AppProviders.getProviders(),
    NativeProviders.getProviders(),
    EsriLoaderService,
    FlocSTWProvider,
    FlocSTSProvider,
    ErrorLoggerProvider,
    CallNumber,
  ]
  
})
export class AppModule {}
