import {Injectable} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import Geodesy from 'geodesy';
import { Storage } from '@ionic/storage';





@Injectable()
export class GeodesyService {

      locateMeMessage;
      locateMeMessageError
      location
      geoX
      geoY
      inX
      inY
      LatLonEllipsoidal
      OsGridRef
     

constructor(private geolocation: Geolocation,
private storage: Storage,){}

getLocation():any {
  this.locateMeMessage = "Locating...";
    return new Promise(resolve => {
        this.geolocation.getCurrentPosition()
            .then(
                (position) => {
                    this.locateMeMessage = "";
                    this.locateMeMessageError = "";
                    console.log(`position object ${position}`);
                    this.location = position;
                    this.geoX = position.coords.latitude;
                    this.geoY = position.coords.longitude;

                    this.inX = this.geoX;
                    this.inY = this.geoY;

                    //covert latitude longitude to eastings and northings
                    // var geodesy = new Geodesy();
                    var p1 = new Geodesy.LatLonEllipsoidal(this.geoX, this.geoY);
                    console.log(`latlon = ${p1}`);

                    var pWgs84 = Geodesy.OsGridRef.latLonToOsGrid(p1);
                    console.log(`converts to easting/northing ${pWgs84.easting}/${pWgs84.northing}`);

                    this.inX = Math.round(pWgs84.easting);
                    this.inY = Math.round(pWgs84.northing);

                    resolve([this.inX, this.inY]);

                },
                (err) => {
                    console.log(err);
                    this.locateMeMessage = "";
                    this.locateMeMessageError = "Unable to locate - please retry or enter values";
                }
            );
    });

}


getLocationX():any {
//  this.locateMeMessage = "Locating...";
this.storage.ready().then(() => {
      
       this.geolocation.getCurrentPosition()
    .then(
      (position) => {
        this.locateMeMessage = "";
        this.locateMeMessageError = "";
        console.log(`position object ${position}`);
        this.location = position;
        this.geoX = position.coords.latitude;
        //this.geoY = position.coords.longitude;

        this.inX = this.geoX;
      //  this.inY = this.geoY;

        //covert latitude longitude to eastings and northings
        // var geodesy = new Geodesy();
        var p1 = new Geodesy.LatLonEllipsoidal(this.geoX, this.geoY);
        console.log(`latlon = ${p1}`);

        var pWgs84 = Geodesy.OsGridRef.latLonToOsGrid(p1);
        console.log(`converts to easting/northing ${pWgs84.easting}/${pWgs84.northing}`);

        this.inX = Math.round(pWgs84.easting);
        this.inY = Math.round(pWgs84.northing);
      
        console.log("X: ", pWgs84.easting);
        this.storage.set("PointX", pWgs84.easting);    
        return  pWgs84.easting;
                 
      },
      (err) => {
        console.log(err);
        this.locateMeMessage = "";
        this.locateMeMessageError = "Unable to locate - please retry or enter values";
      }
    );
})
}

getLocationY():any {
//  this.locateMeMessage = "Locating...";
this.storage.ready().then(() => {
      
       this.geolocation.getCurrentPosition()
    .then(
      (position) => {
        this.locateMeMessage = "";
        this.locateMeMessageError = "";
        console.log(`position object ${position}`);
        this.location = position;
       // this.geoX = position.coords.latitude;
        this.geoY = position.coords.longitude;

      //  this.inX = this.geoX;
        this.inY = this.geoY;

        //covert latitude longitude to eastings and northings
        // var geodesy = new Geodesy();
        var p1 = new Geodesy.LatLonEllipsoidal(this.geoX, this.geoY);
        console.log(`latlon = ${p1}`);

        var pWgs84 = Geodesy.OsGridRef.latLonToOsGrid(p1);
        console.log(`converts to easting/northing ${pWgs84.easting}/${pWgs84.northing}`);

        this.inX = Math.round(pWgs84.easting);
        this.inY = Math.round(pWgs84.northing);
      
        console.log("Y: ", pWgs84.northing);
        this.storage.set("PointY", pWgs84.northing);    
        return  pWgs84.northing;
                 
      },
      (err) => {
        console.log(err);
        this.locateMeMessage = "";
        this.locateMeMessageError = "Unable to locate - please retry or enter values";
      }
    );
})
}



}