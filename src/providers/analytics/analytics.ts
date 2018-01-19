/**
 * Created by kang on 27/09/2017.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {GoogleAnalytics} from '@ionic-native/google-analytics';


@Injectable()

export class AnalyticsProvider{
    private _TRACKER_ID : string = 'UA-104510871-1';
    private _USER_ID : string = '96166653';

    constructor (public http : Http, private _GA :GoogleAnalytics)
    {

    }

    initiateAnalytics():void
    {
        this._GA.startTrackerWithId(this._TRACKER_ID).then(()=>
            {
                // alert('Google analytics is ready now');
                this._GA.trackView('view');
                this.setAppVersion();
                this.setUserID();
            })
            .catch((e:any) =>
                {
                    console.dir('Error starting GoogleAnalytics:' + e);
                }
        );

    }

    setUserID(): void
    {
        this._GA.setUserId(this._USER_ID);
    }

    setAppVersion():void
    {
        this._GA.setAppVersion('3.0.0');
    }

    trackPageView(screen:string):void
    {
        this._GA.trackView(screen);
    }

    // trackCustomMetric(key:string, value:any):void{
    //     this._GA.trackMetric(key, value);
    // }

    trackPageEvent(category:string, action :string):void
    {
        this._GA.trackEvent(category, action);
    }

    trackTiming(category : string, timeTaken : number, variable :string, label :string): void{
        this._GA.trackTiming(category, timeTaken, variable, label);
    }

    trackException(whatHappend :string, isFatal : any= null){
        this._GA.trackException(whatHappend, isFatal);
    }
}