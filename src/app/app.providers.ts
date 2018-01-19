
import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';

import { GeodesyService } from '../providers/geodesy-service/geodesy-service';
import { UsernameServiceProvider } from '../providers/username-service/username-service';
import { NetworkProvider } from '../providers/network/network';

import { ApplicationDataProvider } from '../providers/application-data/application-data';
import { SubmissionsProvider } from '../providers/submissions/submissions';
import { MediaCaptureProvider } from '../providers/media-capture/media-capture';
import { ImageProvider } from '../providers/image/image';
import { ErrorLoggerProvider } from '../providers/error-logger/error-logger';


export class AppProviders {
  
  
  public static getProviders(){
    
    let providers:any;
    
    providers = [
      { provide: ErrorHandler, useClass: IonicErrorHandler },
      GeodesyService,
      UsernameServiceProvider,
      NetworkProvider,
      SubmissionsProvider,
      MediaCaptureProvider,
      ApplicationDataProvider,
      ImageProvider
    
    ]
    
    return providers;
    
  }
  
  
  
}
