/**
 * Created by mac on 09/08/2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CurrencyProvider {

    currencyDataJson: any;

    constructor(public http: Http) {
        console.log('Hello Currency Provider');
        this.currencyDataJson = localStorage.getItem('Currencies');

        // this.http.get("assets/data/currencies.json")
        //     .map(res => {
        //         this.currencyDataJson = res.json();
        //     }).subscribe(data => {
        // }, (rej) => {
        //     console.error("Could not load local data",rej);
        // });

    }

    getCurrencyByCurrencyID(currencyID){
        return new Promise(resolve=>{
            this.http.get("assets/data/currencies.json")
                .map(res => {
                    this.currencyDataJson = res.json();
                    Object.keys(this.currencyDataJson.results).forEach(key => {
                        var val = this.currencyDataJson.results[key];
                        if (this.currencyDataJson.results[key].currencyId === currencyID) {
                            console.log("Found.");
                            resolve(this.currencyDataJson.results[key]);
                        }
                    });
                    // localStorage.setItem('Currencies', res.json().results);
                }).subscribe(data => {
            }, (rej) => {
                console.error("Could not load local data",rej);
            });



        });

    }

    getCurrencyByCountryName(countryName){
        return new Promise(resolve=>{
            this.http.get("assets/data/currencies.json")
                .map(res => {
                    this.currencyDataJson = res.json();
                    Object.keys(this.currencyDataJson.results).forEach(key => {
                        var val = this.currencyDataJson.results[key];
                        if (this.currencyDataJson.results[key].name === countryName) {
                            console.log("Found.");
                            resolve(this.currencyDataJson.results[key]);
                        }
                    });
                    // localStorage.setItem('Currencies', res.json().results);
                }).subscribe(data => {
            }, (rej) => {
                console.error("Could not load local data",rej);
            });

        });

    }

    getCurrencies(){
        return new Promise(resolve=>{
            this.http.get("assets/data/currencies.json")
                .map(res => {
                    resolve(res.json().results);
                }).subscribe(data => {
            }, (rej) => {
                console.error("Could not load local data",rej);
            });



        });

    }

}
