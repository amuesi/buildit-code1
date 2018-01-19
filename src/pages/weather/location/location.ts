// import { Component, NgZone, ViewChild } from '@angular/core';
// import { IonicPage, NavParams, ViewController } from 'ionic-angular';
// import { Keyboard } from '@ionic-native/keyboard';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
//
//
// import { Location } from '../../../providers/weather-service';
// import * as _ from 'lodash';
// import { Geolocation } from '@ionic-native/geolocation';
// import { AppState } from '../../../app/app.global';
// declare let google: any;
//
// import * as $ from 'jquery'
//
// @IonicPage({
//   priority: 'high'
// })
// @Component({
//   selector: 'page-location',
//   templateUrl: 'location.html'
// })
// export class LocationPage {
//   @ViewChild('searchInput') searchInput;
//   heading: string;
//   autocompleteItems: Array<{ description: string, place_id: string }>;
//
//   autocompleteCountries = [];
//   autocompleteCities = [];
//
//   queryCity: string;
//   queryCountry: string;
//   acService: any;
//   locationObj: Location;
//   showCancel: boolean;
//   showCountryList = false;
//   showCityList = false;
//
//   cityObj: any;
//
//   constructor(public navParams: NavParams,
//               public viewCtrl: ViewController,
//               public keyboard: Keyboard,
//               public zone: NgZone,
//               private global:AppState,
//               private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
//     this.heading = navParams.get('heading') ? navParams.get('heading') : 'Search City Name';
//     this.showCancel = navParams.data.showCancel !== undefined ? navParams.data.showCancel : true;
//   }
//
//   ionViewDidEnter() {
//
//     var self = this;
//
//     $.getJSON("assets/data/citiesOfAllCountries.json", function(json) {
//       self.cityObj = json;
//     });
//
//
//     // this.zone.run(() => {
//     //   this.searchInput.setFocus();
//     //   this.keyboard.show();
//     // });
//
//
//   }
//
//   ionViewWillEnter() {
//
//     this.autocompleteItems = [];
//     this.queryCountry = '';
//     this.queryCity = '';
//     this.locationObj = {
//       name: null,
//       lat: null,
//       lng: null
//     };
//
//     this.acService = new google.maps.places.AutocompleteService();
//   }
//
//   ionViewWillLeave() {
//     this.keyboard.close();
//   }
//
//   dismiss() {
//     this.viewCtrl.dismiss();
//   }
//
//   updateSearchCountry() {
//     console.debug('modal > updateSearch > query ', this.queryCountry);
//     if (this.queryCountry.trim() == '') {
//       this.autocompleteCountries = [];
//       return;
//     }
//     let self = this;
//     let config = {
//       types: ['(cities)'],
//       input: this.queryCountry
//     };
//     // this.acService.getPlacePredictions(config, (predictions, status) => {
//     //   console.debug('modal > getPlacePredictions > status > ', status);
//     //   self.zone.run(() => {
//     //     self.autocompleteItems = predictions ? predictions : [];
//     //   });
//     // });
//
//
//
//
//     self.autocompleteCountries = [];
//     for (let key in this.cityObj) {
//       // var s = "";
//       // s.toUpperCase();
//       // s.toLowerCase();
//       let index = key.toUpperCase().indexOf(self.queryCountry.toUpperCase());
//       if(index >= 0){
//         self.autocompleteCountries.push(key);
//       }
//       // console.log("      key:", key, "value:", json[key]);
//     }
//
//     if(self.autocompleteCountries.length > 0 ){
//       self.showCountryList = true;
//     }
//
//   }
//
//   chooseItemCountry(item) {
//     this.queryCountry = item;
//     this.showCountryList = false;
//     // let self = this;
//     // let request = {
//     //   placeId: item.place_id
//     // };
//     // let response: Location;
//     // let placesService = new google.maps.places.PlacesService(document.createElement('div'));
//     // placesService.getDetails(request, (place, status) => {
//     //   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     //     self.locationObj.lat = place.geometry.location.lat();
//     //     self.locationObj.lng = place.geometry.location.lng();
//     //     let obj = _.find(place.address_components, ['types[0]', 'locality']);
//     //     if (obj) {
//     //       self.locationObj.name = obj['short_name'];
//     //     }
//     //     response = self.locationObj;
//     //   } else {
//     //     console.debug('page > getPlaceDetail > status > ', status);
//     //   }
//     //   self.zone.run(() => {
//     //     self.viewCtrl.dismiss(response);
//     //   });
//     // });
//   }
//
//   updateSearchCityByCountry(){
//     if(!this.cityObj[this.queryCountry]){
//       return;
//     }
//
//     if (this.queryCity.trim() == '') {
//       this.autocompleteCities = [];
//       return;
//     }
//     let self = this;
//
//     self.autocompleteCities = [];
//     for (let key of this.cityObj[this.queryCountry]) {
//       // var s = "";
//       // s.toUpperCase();
//       // s.toLowerCase();
//       let index = key.toUpperCase().indexOf(self.queryCity.toUpperCase());
//       if(index >= 0){
//         self.autocompleteCities.push(key);
//       }
//     }
//
//     if(self.autocompleteCities.length > 0 ){
//       self.showCityList = true;
//     }
//   }
//
//   chooseItemCity(itemCity){
//     this.queryCity = itemCity;
//     this.showCityList = false;
//   }
//
//
//   savebtnclick(){
//     let self = this;
//     let response: Location;
//
//     this.nativeGeocoder.forwardGeocode(this.queryCity)
//        .then((coordinates: NativeGeocoderForwardResult) =>{
//          self.locationObj['lat'] = parseFloat(coordinates.latitude);
//          self.locationObj['lng'] = parseFloat(coordinates.longitude);
//          self.locationObj['name'] =  self.queryCity + " , " + self.queryCountry;
//          // alert('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)
//          self.viewCtrl.dismiss(self.locationObj);
//
//        }).catch((error: any) => {
//             alert(JSON.stringify(error))
//     });
//
//
//
//     // this.geolocation.watchPosition().subscribe(result => {
//     //   var s = result;
//     // });
//
//     // this.geolocation.getCurrentPosition().then(pos => {
//     //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
//     //   self.locationObj['lat'] = pos.coords.latitude;
//     //   self.locationObj['lng'] = pos.coords.longitude;
//     //   self.locationObj['name'] =  self.queryCity;
//     //   self.viewCtrl.dismiss(self.locationObj);
//     // }).catch(error => {
//     //   alert('google maps service error');
//     // });
//
//
//     //
//     // let placesService = new google.maps.places.PlacesService(document.createElement('div'));
//     // placesService.getDetails(request, (place, status) => {
//     //   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     //     self.locationObj.lat = place.geometry.location.lat();
//     //     self.locationObj.lng = place.geometry.location.lng();
//     //     let obj = _.find(place.address_components, ['types[0]', 'locality']);
//     //     if (obj) {
//     //       self.locationObj.name = obj['short_name'];
//     //     }
//     //     response = self.locationObj;
//     //   } else {
//
//     //     console.debug('page > getPlaceDetail > status > ', status);
//     //   }
//     //   self.zone.run(() => {
//     //     self.viewCtrl.dismiss(response);
//     //   });
//     // });
//
//   }
//
// }


import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { Location } from '../../../providers/weather-service';
import * as _ from 'lodash';
import { Geolocation } from '@ionic-native/geolocation';
import { AppState } from '../../../app/app.global';
declare let google: any;

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  @ViewChild('searchInput') searchInput;
  heading: string;
  autocompleteItems: Array<{ description: string, place_id: string }>;
  query: string;
  acService: any;
  locationObj: Location;
  showCancel: boolean;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public keyboard: Keyboard,
              public zone: NgZone,
              private global: AppState,
              private geolocation: Geolocation) {

    this.heading = navParams.get('heading') ? navParams.get('heading') : 'Search City Name';
    this.showCancel = navParams.data.showCancel !== undefined ? navParams.data.showCancel : true;
    this.acService = new google.maps.places.AutocompleteService();

  }
  ionViewDidEnter() {

    this.zone.run(() => {
      this.searchInput.setFocus();
      this.keyboard.show();
    });
  }

  ionViewWillEnter() {
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.query = '';
    this.locationObj = {
      name: null,
      lat: null,
      lng: null
    };
  }

  ionViewWillLeave() {
    this.keyboard.close();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  updateSearch() {
    console.debug('modal > updateSearch > query ', this.query);
    if (this.query.trim() == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      types: ['(cities)'],
      input: this.query
    };
    this.acService.getPlacePredictions(config, (predictions, status) => {
      console.debug('modal > getPlacePredictions > status > ', status);
      self.zone.run(() => {
        self.autocompleteItems = predictions ? predictions : [];
      });
    });
  }

  chooseItem(item) {
    let self = this;
    let request = {
      placeId: item.place_id
    };
    let response: Location;
    let placesService = new google.maps.places.PlacesService(document.createElement('div'));
    placesService.getDetails(request, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        self.locationObj.lat = place.geometry.location.lat();
        self.locationObj.lng = place.geometry.location.lng();
        let obj = _.find(place.address_components, ['types[0]', 'locality']);
        if (obj) {
          self.locationObj.name = obj['short_name'];
        }
        response = self.locationObj;
      } else {
        console.debug('page > getPlaceDetail > status > ', status);
      }
      self.zone.run(() => {
        self.viewCtrl.dismiss(response);
      });
    });
  }

  savebtnclick() {
    let self = this;
    let response: Location;
    this.geolocation.getCurrentPosition().then(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      self.locationObj['lat'] = pos.coords.latitude;
      self.locationObj['lng'] = pos.coords.longitude;
      self.locationObj['name'] = self.query;
      self.viewCtrl.dismiss(self.locationObj);
    }).catch(error => {
      alert('google maps service error');
    });


    //
    // let placesService = new google.maps.places.PlacesService(document.createElement('div'));
    // placesService.getDetails(request, (place, status) => {
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     self.locationObj.lat = place.geometry.location.lat();
    //     self.locationObj.lng = place.geometry.location.lng();
    //     let obj = _.find(place.address_components, ['types[0]', 'locality']);
    //     if (obj) {
    //       self.locationObj.name = obj['short_name'];
    //     }
    //     response = self.locationObj;
    //   } else {

    //     console.debug('page > getPlaceDetail > status > ', status);
    //   }
    //   self.zone.run(() => {
    //     self.viewCtrl.dismiss(response);
    //   });
    // });

  }
}