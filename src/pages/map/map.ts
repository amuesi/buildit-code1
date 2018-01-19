import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  ToastController, Platform, NavController, AlertController, LoadingController, NavParams, ViewController,
  IonicPage, Events
} from 'ionic-angular';
import { EsriLoaderService } from 'angular2-esri-loader';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Geolocation } from '@ionic-native/geolocation';
// import {error} from "util";
import {ApplicationDataProvider} from "../../providers/application-data/application-data";
import { Network } from '@ionic-native/network';
declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnInit {

 @ViewChild('map') mapEl: ElementRef;
  map: any;
  loading_ctrl: any;
  response: any;
  iconUrl: any;
  locationText = "Where am I?";
  address = "";
  cord_x = "";
  cord_y = "";
  add: any;
  selectedAddress :any;
  firstFlag = true;


  constructor(public navCtrl: NavController,
              private esriLoader: EsriLoaderService,
              public alertCtrl: AlertController,
              public http: Http,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public params: NavParams,
              private geolocation: Geolocation,
              public platform: Platform,
              public toastCtrl: ToastController,
              private network: Network,
              private ev: Events
  ) {
      this.loading_ctrl = this.loadingCtrl.create({
          content: "Getting location...",
      });
      // this.obtainNetworkConnection()
  }// end constructor

  ngOnInit(){

      if (this.obtainNetworkConnection())
      {

          this.mapOnInit();
      }
      else{
          setTimeout(() => {
              alert('Connection type: ' + 'No network connection');
              this.loading_ctrl.dismiss();
              this.navCtrl.pop();
          }, 1000);

      }

  }

  mapOnInit() {
    this.loading_ctrl.present();
    try{
      var me = this;
      // if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                me.esriLoader.load({
                    url: 'https://js.arcgis.com/3.19/'
                }).then(() => {
                    me.esriLoader.loadModules(['esri/map']).then(([Map]) => {
                        // create the map at the DOM element in this component
                        me.map = new Map(me.mapEl.nativeElement, {
                            center: [position.coords.longitude, position.coords.latitude ],
                            zoom: 15,
                            basemap: "topo"
                        })
                        //   loading_ctrl.dismiss();
                        me.showPosition(position, true);
                        me.configureMap(me.map);
                        me.loading_ctrl.dismiss();
                    });
                });
                setTimeout(function(){
                    if (me.map == null)
                    {
                        me.loading_ctrl.dismiss();
                        alert("map unavailable");
                        me.navCtrl.pop();
                    }
                   }, 10000);
            },
            function () {
              // failed to get a GPS location before timeout!
              me.loading_ctrl.dismiss();
              alert('failed to get a GPS location before timeout!');
              me.navCtrl.pop();
            }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000000 });

      // } else {
      //   // no support for geolocation
      //   this.loading_ctrl.dismiss();
      //   this.navCtrl.pop();
      //   alert("no geo location support");
      // }
    }
    catch (error){
      this.loading_ctrl.dismiss();
      console.warn(error.message)
    }
  }

  configureMap(map)
  {
    try {
      var me = this;
      //   me.loading_ctrl.dismiss();
      this.esriLoader.require([
        "esri/tasks/locator", "esri/graphic", "esri/geometry/webMercatorUtils", "esri/symbols/SimpleMarkerSymbol",
        "esri/tasks/GeometryService", "esri/tasks/ProjectParameters",
        "esri/SpatialReference", "esri/InfoTemplate", "dojo/dom", "dojo/on",
        "dojo/domReady!"
      ], function (
          Locator, Graphic, webMercatorUtils, SimpleMarkerSymbol,
          GeometryService, ProjectParameters,
          SpatialReference, InfoTemplate, dom, on
      ) {
        var locator = new Locator("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
        var gsvc = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

        locator.on("location-to-address-complete", function (evt) {
          if (evt.address.address) {
            me.address = evt.address.address.Match_addr;
          }
        });

        me.map.on("click", projectToWebMercator);
        function projectToWebMercator(evt) {
            me.map.graphics.clear();
            var point = evt.mapPoint;
            var symbol = new SimpleMarkerSymbol().setStyle("diamond");
            var graphic = new Graphic(point, symbol);
            var outSR = new SpatialReference(102100);

            me.map.graphics.add(graphic);

            locator.locationToAddress(webMercatorUtils.webMercatorToGeographic(evt.mapPoint), 100);

            gsvc.project([point], outSR, function (projectedPoints) {
              var pt = projectedPoints[0];
              graphic.setInfoTemplate(new InfoTemplate("Coordinates",
                  "<span>X:</span>" + pt.x.toFixed() + "<br>" +
                  "<span>Y:</span>" + pt.y.toFixed() + "<br>" +
                  "<input type='button' value='Convert back to LatLong' id='convert'>" +
                  "<div id='latlong'></div>"));


              projectToLatLong(pt, me);
              // me.map.infoWindow.setTitle(graphic.getTitle());
              // me.map.infoWindow.setContent(graphic.getContent());
              // me.map.infoWindow.show(evt.screenPoint, me.map.getInfoWindowAnchor(evt.screenPoint));
              // on.once(dom.byId("convert"), "click", projectToLatLong);
            });

        }

        function projectToLatLong(pt, me) {
          var outSR = new SpatialReference(4326);
          var params = new ProjectParameters();
          params.geometries = [pt.normalize()];
          params.outSR = outSR;
          gsvc.project(params, function (projectedPoints) {

            var pt_lat_long = projectedPoints[0];
            localStorage.setItem("latitude", pt_lat_long.y.toFixed(3));
            localStorage.setItem("longitude", pt_lat_long.x.toFixed(3));

            // dom.byId("latlong").innerHTML = "<span>Latitude: </span> " +
            //     pt_lat_long.y.toFixed(3) + "<br><span>Longitude:</span>" + pt_lat_long.x.toFixed(3) +
            //     "<br><span>Adress:</span>" + me.address;
            me.locationText = "Latitude=" + pt_lat_long.y.toFixed(3) + " " + "Logitude=" + pt_lat_long.x.toFixed(3);

            let prompt = me.alertCtrl.create({
              title: 'Choose Cooridantes',
              message: "X: " + pt.x + "</br> Y: " + pt.y + "<br> Address: " + me.address,
              buttons: [
                {
                  text: 'No',
                  handler: data => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Yes',
                  handler: data => {
                    me.cord_x = pt.x;
                    me.cord_y = pt.y;
                    me.dismissModal();
                  }
                }
              ]
            });
            prompt.present();
          });
        }
      });
    }
    catch (err){
      this.loading_ctrl.dismiss();
    }
  }


  dismissModal() {
    var data = {
      'location': this.address,
      'X': this.cord_x,
      'Y': this.cord_y
      // 'selectedAddress': this.selectedAddress
    };

    this.ev.publish("goToWhere", data);
    this.navCtrl.pop();
  }



  async loadMyLocation() {
    try{
      var me = this;
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(
          function (position) {
            me.showPosition(position, false);
            // success!
          },
          function () {
            // failed to get a GPS location before timeout!
            alert('failed to get a GPS location before timeout!');
          }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000000 });

      } else {
        // no support for geolocation
        alert("no geo location support");
      }
    }
    catch (error){
      console.warn(error.message)
    }


  }

  showPosition(position, firstFlag) {

    localStorage.setItem("latitude", position.coords.latitude);
    localStorage.setItem("longitude", position.coords.longitude);

    this.setPosition(position.coords.latitude, position.coords.longitude, this.map, "", firstFlag);
  }


  setPosition(lat, lon, map, iconUrl, firstFlag) {
    try{
      var me = this;
      me.esriLoader.require([
        "esri/geometry/Point",
        "esri/symbols/PictureMarkerSymbol", "esri/graphic", "esri/symbols/SimpleMarkerSymbol",
        "esri/Color", "esri/symbols/SimpleLineSymbol", "dojo/dom", "dojo/on", "dojo/domReady!"
      ], function (
         Point, PictureMarkerSymbol, Graphic, SimpleMarkerSymbol, Color, SimpleLineSymbol, dom, on
      ) {
        if (firstFlag)
        {
          me.map.on('load', add_marker);
        }
        else{
          add_marker();
        }
        function add_marker(){
          var pt = new Point(lon, lat);
          if (iconUrl == "") {
            var symbol = new SimpleMarkerSymbol(
                SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color([210, 105, 30, 0.5]),
                    8
                ),
                new Color([210, 105, 30, 0.9])
            );
            var graphic = new Graphic(pt, symbol);
            if (map != null) map.graphics.add(graphic);
          }
          else {
            var symbol = PictureMarkerSymbol({
              "url": iconUrl,
              "height": 20,
              "width": 20,
              "type": "esriPMS"

            });
            var graphic = new Graphic(pt, symbol);
            map.graphics.add(graphic);

          }
          map.centerAndZoom(pt, 15);
          if(!me.firstFlag){
              me.getCurrentLocationAndAddress(pt);

          }
           me.firstFlag = false;


        }

      })
    }
    catch (err){
      this.loading_ctrl.dismiss()
    }

  }

  getCurrentLocationAndAddress(inputPointLatLon){
      var me = this;
      //   me.loading_ctrl.dismiss();
      this.esriLoader.require([
          "esri/tasks/locator", "esri/graphic", "esri/geometry/webMercatorUtils", "esri/symbols/SimpleMarkerSymbol",
          "esri/tasks/GeometryService", "esri/tasks/ProjectParameters",
          "esri/SpatialReference", "esri/InfoTemplate", "dojo/dom", "dojo/on",
          "dojo/domReady!"
      ], function (
          Locator, Graphic, webMercatorUtils, SimpleMarkerSymbol,
          GeometryService, ProjectParameters,
          SpatialReference, InfoTemplate, dom, on
      ) {
          var locator = new Locator("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
          var gsvc = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");



          // locator.on("location-to-address-complete", function (evt) {
          //     if (evt.address.address) {
          //         me.address = evt.address.address.Match_addr;
          //     }
          // });


          var point = inputPointLatLon;
          var symbol = new SimpleMarkerSymbol().setStyle("diamond");
          var graphic = new Graphic(point, symbol);
          var outSR = new SpatialReference(102100);

          me.map.graphics.add(graphic);

          locator.locationToAddress(point).then(function(resolvedVal){
              console.log(resolvedVal);
              if (resolvedVal.address) {
                  me.address = resolvedVal.address.Match_addr;
              }
          });

          // locator.locationToAddress(webMercatorUtils.webMercatorToGeographic(evt.mapPoint), 100);

          gsvc.project([point], outSR, function (projectedPoints) {
              var pt = projectedPoints[0];
              graphic.setInfoTemplate(new InfoTemplate("Coordinates",
                  "<span>X:</span>" + pt.x.toFixed() + "<br>" +
                  "<span>Y:</span>" + pt.y.toFixed() + "<br>" +
                  "<input type='button' value='Convert back to LatLong' id='convert'>" +
                  "<div id='latlong'></div>"));


              projectToLatLong(pt, me);
              // me.map.infoWindow.setTitle(graphic.getTitle());
              // me.map.infoWindow.setContent(graphic.getContent());
              // me.map.infoWindow.show(evt.screenPoint, me.map.getInfoWindowAnchor(evt.screenPoint));
              // on.once(dom.byId("convert"), "click", projectToLatLong);
          });

          function projectToLatLong(pt, me) {
              var outSR = new SpatialReference(4326);
              var params = new ProjectParameters();
              params.geometries = [pt.normalize()];
              params.outSR = outSR;
              gsvc.project(params, function (projectedPoints) {

                  var pt_lat_long = projectedPoints[0];
                  localStorage.setItem("latitude", pt_lat_long.y.toFixed(3));
                  localStorage.setItem("longitude", pt_lat_long.x.toFixed(3));

                  // dom.byId("latlong").innerHTML = "<span>Latitude: </span> " +
                  //     pt_lat_long.y.toFixed(3) + "<br><span>Longitude:</span>" + pt_lat_long.x.toFixed(3) +
                  //     "<br><span>Adress:</span>" + me.address;
                  me.locationText = "Latitude=" + pt_lat_long.y.toFixed(3) + " " + "Logitude=" + pt_lat_long.x.toFixed(3);

                  let prompt = me.alertCtrl.create({
                      title: 'Choose Cooridantes',
                      message: "X: " + pt.x + "</br> Y: " + pt.y + "<br> Address: " + me.address,
                      buttons: [
                          {
                              text: 'No',
                              handler: data => {
                                  console.log('Cancel clicked');
                              }
                          },
                          {
                              text: 'Yes',
                              handler: data => {
                                  me.cord_x = pt.x;
                                  me.cord_y = pt.y;
                                  me.dismissModal();
                              }
                          }
                      ]
                  });
                  prompt.present();
              });
          }
      });
  }

    obtainNetworkConnection() {
        // this.platform.ready().then(() => {
        if (navigator.connection != null)
        {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';


            if (Connection.NONE == networkState) {
                // this.loading_ctrl.dismiss();
                // alert('Connection type: ' + 'No network connection');
                return false;
            }
        }

            return true;
        // });
    }


}
