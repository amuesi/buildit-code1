import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AppState } from '../../../app/app.global';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { CurrencyProvider } from '../../../providers/currency-provider/currecy-provider'

@Component({
  selector: 'page-currency',
  templateUrl: 'currency.html'
})
export class CurrencyComponent {

  currencies = [{currencyID:'GHS',currencyName:'Ghanaian cedi',name:'Ghana',id:'GH',
              flag: 'assets/flags100px/gh.png', rate: 1},
              {name: 'United States of America',
                id: 'US',
                currencyID: 'USD',
                currencySymbol: '$',
                flag: 'assets/flags100px/us.png', rate: 0.22632115},
              {name: 'United Kingdom',
                id: 'GB',
                currencyID: 'GBP',
                currencySymbol: '£',
                flag: 'assets/flags100px/gb.png', rate:0.17481295}
                ];
  // current_currency = {currencyID:'GHS',currencyName:'Ghanaian cedi',name:'Ghana',id:'GH',
  //                     flag: 'assets/flags100px/gh.png'};


  constructor(public navCtrl: NavController,
              private http: Http,
              private global: AppState,
              private currencyProvider: CurrencyProvider) {

      var s: any;
      // alert("start");
      // alert(localStorage.getItem('GHS_USD'));
      if(localStorage.getItem('GHS_USD')) {
          s = localStorage.getItem('GHS_USD');
      }
      else{
          s = 0.22632115;
      }
      this.currencies[1].rate = Number(parseFloat(s).toFixed(3));


      if(localStorage.getItem('GHS_GBP')) {
          s = localStorage.getItem('GHS_GBP');
      }
      else {
          s = 0.17481295;
      }
      this.currencies[2].rate = Number(parseFloat(s).toFixed(3));

      // alert("start1");
    this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=GHS_USD&compact=y')
        .map(res => res.json())
        .subscribe(data => {
            // alert("GHS_USD");
          s = parseFloat(data.GHS_USD.val);
          this.currencies[1].rate = Number((this.currencies[0].rate * s).toFixed(3));
            localStorage.setItem('GHS_USD', s);
        });

    this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=GHS_GBP&compact=y')
        .map(res => res.json())
        .subscribe(data => {
            // alert("GHS_GHP");
          s = parseFloat(data.GHS_GBP.val);
          this.currencies[2].rate = Number((this.currencies[0].rate * s).toFixed(3));
            localStorage.setItem('GHS_GBP', s);
        });

    // this.currencyProvider.getCurrencyByCurrencyID('USD').then((result: any)=>{
    //   console.log(result);
    //   this.current_currency['name'] = result.name;
    //   this.current_currency['currencyID'] = result.currencyId;
    //   this.current_currency['id'] = result.id;
    //   this.current_currency['currencySymbol'] = result.currencySymbol;
    //   this.current_currency['flag'] = 'assets/flags100px/' + result.id.toLowerCase() + '.png';
    //
    // });

    // this.currencyProvider.getCurrencies().then((result1: any)=>{
    //   console.log(result1);
    //
    //   Object.keys(result1).forEach(key => {
    //     var val = result1[key];
    //
    //       var currency = {};
    //
    //       currency['name'] = result1[key].name;
    //       currency['currencyID'] = result1[key].currencyId;
    //       currency['id'] = result1.id;
    //       currency['currencySymbol'] = result1[key].currencySymbol;
    //       currency['flag'] = 'assets/flags100px/' + result1[key].id.toLowerCase() + '.png';
    //       this.currencies.push(currency);
    //   });

    // });




  }

    valuChange(currency){
        var s: any;
      switch(currency.currencyID){
          case('GHS'):

              if(localStorage.getItem('GHS_USD')) {
                  s = localStorage.getItem('GHS_USD');
              }
              else{
                  s = 0.22632115;
              }
              this.currencies[1].rate = Number((this.currencies[0].rate * parseFloat(s)).toFixed(3));


              if(localStorage.getItem('GHS_GBP')) {
                  s = localStorage.getItem('GHS_GBP');
              }
              else {
                  s = 0.17481295;
              }
              this.currencies[2].rate = Number((this.currencies[0].rate * parseFloat(s)).toFixed(3));

              this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=GHS_USD&compact=y')
                  .map(res => res.json())
                  .subscribe(data => {
                      // alert("GHS_USD");
                      s = parseFloat(data.GHS_USD.val);
                      localStorage.setItem('GHS_USD', s);
                      this.currencies[1].rate = Number((this.currencies[0].rate * s).toFixed(3));
                  });

              this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=GHS_GBP&compact=y')
                  .map(res => res.json())
                  .subscribe(data => {
                      // alert(data.val);
                      s = parseFloat(data.GHS_GBP.val);
                      localStorage.setItem('GHS_GBP', s);
                      this.currencies[2].rate = Number((this.currencies[0].rate * s).toFixed(3));
                  });
              break;
          case('USD'):
              if(localStorage.getItem('USD_GHS')) {
                  s = localStorage.getItem('USD_GHS');
              }
              else{
                  s = 4.4185;
              }
              this.currencies[0].rate = Number((this.currencies[1].rate * parseFloat(s)).toFixed(3));


              if(localStorage.getItem('USD_GBP')) {
                  s = localStorage.getItem('USD_GBP');
              }
              else {
                  s = 0.77053475;
              }
              this.currencies[2].rate = Number((this.currencies[1].rate * parseFloat(s)).toFixed(3));

              this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=USD_GHS&compact=y')
                  .map(res => res.json())
                  .subscribe(data => {
                      // alert(data.val);
                      s = parseFloat(data.USD_GHS.val);
                      localStorage.setItem('USD_GHS', s);
                      this.currencies[0].rate = Number((this.currencies[1].rate * s).toFixed(3));
                  });

              this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=USD_GBP&compact=y')
                  .map(res => res.json())
                  .subscribe(data => {
                      // alert(data.val);
                      s = parseFloat(data.USD_GBP.val);
                      localStorage.setItem('USD_GBP', s);
                      this.currencies[2].rate = Number((this.currencies[1].rate * s).toFixed(3));
                  });
              break;
          case('GBP'):
              if(localStorage.getItem('GBP_GHS')) {
                  s = localStorage.getItem('GBP_GHS');
              }
              else{
                  s = 5.7204;
              }
              this.currencies[0].rate = Number((this.currencies[2].rate * parseFloat(s)).toFixed(3));


              if(localStorage.getItem('GBP_USD')) {
                  s = localStorage.getItem('GBP_USD');
              }
              else {
                  s = 1.2978;
              }
              this.currencies[1].rate = Number((this.currencies[2].rate * parseFloat(s)).toFixed(3));


              this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=GBP_GHS&compact=y')
                  .map(res => res.json())
                  .subscribe(data => {
                      // alert(data.val);
                      s = parseFloat(data.GBP_USD.val);
                      localStorage.setItem('GBP_USD', s);
                      this.currencies[0].rate = Number((this.currencies[2].rate * s).toFixed(3));
                  });

              this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=GBP_USD&compact=y')
                  .map(res => res.json())
                  .subscribe(data => {
                      // alert(data.val);
                      s = parseFloat(data.GBP_GHS.val);
                      localStorage.setItem('GBP_GHS', s);
                      this.currencies[1].rate = Number((this.currencies[2].rate * s).toFixed(3));
                  });
              break;
          default:
              break;

      }
    }



}
