import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
import { NavController, ToastController } from 'ionic-angular';
import {Subscription} from 'rxjs/Subscription';
declare var navigator: any;
declare var Connection: any;

@Injectable()
export class NetworkProvider {

  connected: Subscription;
  disconnected: Subscription;

  constructor(public http: Http,
              public network: Network,
              public toast:ToastController
  ) {
    console.log('Hello Network Provider');
  } // end constructor



  ionViewDidEnter() {
    this.connected = this.network.onConnect().subscribe(data => {
      console.log(data);
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));

   this.disconnected = this.network.onDisconnect().subscribe(data => {

      console.log(data);
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }

  // displayNetworkUpdate(connectionState: string){
  //   let networkType = this.network.type
  //   this.toast.create({
  //     message: `You are now ${connectionState} via ${networkType}`,
  //     duration: 3000
  //   }).present();
  // }



  checkConnectionStatus(){
    this.network.onConnect().subscribe(data => {
      this.displayNetworkUpdate(data.type);
      console.info(data.type);
      console.debug(data.type);
      alert(data.type);

    }, error => {
      console.warn(error)
    });


    this.network.onDisconnect().subscribe(data => {
      this.displayNetworkUpdate(data.type);
      console.log(data.type);
    }, error => console.warn(error.message));
  }




  //displayNetworkUpdateProv(connectionState: string){
  //   let networkType = this.network.type;
  //  alert(`You are now ${connectionState} via ${networkType}`);
  // }

  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
      message: `You are now ${connectionState} via ${networkType}`,
      duration: 3000
    }).present();
  }


  leavingView(){
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }

  obtainNetworkConnection() {
    // this.platform.ready().then(() => {
    if (navigator.connection != null)
    {
      var networkState = navigator.connection.type;

      var states = {};
      // states[Connection.UNKNOWN]  = 'Unknown connection';
      // states[Connection.ETHERNET] = 'Ethernet connection';
      // states[Connection.WIFI]     = 'WiFi connection';
      // states[Connection.CELL_2G]  = 'Cell 2G connection';
      // states[Connection.CELL_3G]  = 'Cell 3G connection';
      // states[Connection.CELL_4G]  = 'Cell 4G connection';
      // states[Connection.CELL]     = 'Cell generic connection';
      // states[Connection.NONE]     = 'No network connection';


      if ( networkState == 'none') {
        // this.loading_ctrl.dismiss();
        // alert('Connection type: ' + 'No network connection');
        return false;
      }
    }

    return true;
    // });
  }




} // end class
