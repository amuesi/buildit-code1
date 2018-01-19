import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {InAppBrowser} from '@ionic-native/in-app-browser';
/*
  Generated class for the UtilitiesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UtilitiesProvider {

  public browser :any;
  constructor(public http: Http, private _INAPP : InAppBrowser) {
    console.log('Hello UtilitiesProvider Provider');
  }

  debugLogger(message : string, isLog : boolean): void {
    if(isLog){
      console.log(message);
    }
    else{
      console.dir(message);
    }
  }

  openExternalWebsiteLinks(href:string): void {
    let options : string = 'location=no,toolbar=yes,hidden=no';
    this.browser = this._INAPP.create(href, '_blank', options);
    this.browser.show();
  }

  returnRandomAssociativeArrayElement(arrayName : any) :any
  {
    let a: any = [],
    k:any;

    for (k in arrayName)
    {
      if (arrayName.hasOwnProperty(k))
      {
        a.push(k);
      }
    }
    if (a.length == 0)
    {
      return null;
    }
    else{
      return arrayName[a[Math.floor(Math.random()*a.length)]];
    }
  }

  filterArrays(arr1: any, arr2: any):any
  {
    let remoteValues : any,
        localValues : any,
        returnedValues : any;

    remoteValues = arr1.map((val: any) =>
    {
      return val.quoteID;
    });

    localValues = arr2.map((val: any) =>
    {
      return val.quoteID;
    });

    returnedValues = remoteValues.filter((val: any) =>
    {
      return localValues.indexOf(val) === -1;
    });
    return returnedValues;
  }

  filterByMostRecentTimestamp(arr: any) :any{
    let timestamps : any =[],
        maxTimestamp : any,
        key : any;
    for(key in arr){
      timestamps.push(parseInt(arr[key].timestamp));

    }
    maxTimestamp = Math.max.apply(null, timestamps);
    return maxTimestamp;

  }

  addLeadingZerosToDateValueRequired(digit:number) :string{
    let num :any = digit;
    if(num < 10)
    {
      num = '0' + num;
    }
    return num;
  }

  returnCurrentDate():string{
    let currdate : any = new Date(),
        currYear : any = currdate.getFullYear(),
        currMonth : any = this.addLeadingZerosToDateValueRequired((currdate.getMonth() + 1)),
        currDay : any = this.addLeadingZerosToDateValueRequired(currdate.getDate()),
        currDateValue : any = currYear + '-' + currMonth + '-' +currDay;
    return currDateValue;
  }

  returnCurrentDateAndTime() : string
  {
    let currDate : any = new Date(),
        currYear : any = currDate.getFullYear(),
        currMonth :  any = this.addLeadingZerosToDateValueRequired((currDate.getMonth()+1)),
        currDay : any = this.addLeadingZerosToDateValueRequired(currDate.getDate() ),
        currHour : any = this.addLeadingZerosToDateValueRequired(currDate.getHours()),
        currMins : any  = this.addLeadingZerosToDateValueRequired(currDate.getMinutes()),
        currSecs : any = this.addLeadingZerosToDateValueRequired(currDate.getSeconds()),
        currDateValue : any = currYear + '-' + currMonth + '-' +currDay + ' ' + currHour + ':' +currMins + ':' +currSecs;
    return currDateValue;
  }
  returnCurrentTimestamp() : number{
    let currentTimestamp : number = Math.floor(Date.now()/1000);
    return currentTimestamp;
  }
  determineTiming(startTime : number) :number
  {
    let startTiming : number = startTime,
        endTiming : number = new Date().getTime();
    return endTiming - startTiming;
  }
}
