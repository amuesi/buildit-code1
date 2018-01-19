
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Network } from '@ionic-native/network';
import { SQLite } from '@ionic-native/sqlite';
import { AppVersion } from '@ionic-native/app-version';
import { Toast } from '@ionic-native/toast';
import { Device } from '@ionic-native/device';
import { Badge } from '@ionic-native/badge';
import { OneSignal } from '@ionic-native/onesignal';
import { EmailComposer } from '@ionic-native/email-composer';


export class NativeProviders {

  public static getProviders (){

    let providers: any;

    if(document.URL.includes('https://') || document.URL.includes('http://')){

      // browser providers
      providers = [  StatusBar,
        SplashScreen,
        Network,
        Device,
        Camera,
        Geolocation,
        GoogleAnalytics,
        SQLite,
        AppVersion,
        Toast,
        Badge,
        OneSignal,
        EmailComposer
      ]

    }
    else{
      // use device providers
      providers = [  StatusBar,
        SplashScreen,
        Network,
        Device,
        Camera,
        Geolocation,
        GoogleAnalytics,
        SQLite,
        AppVersion,
        Toast,
        Badge, OneSignal,
        EmailComposer

      ];
    }

    return providers;

  } // end method

} // end class
