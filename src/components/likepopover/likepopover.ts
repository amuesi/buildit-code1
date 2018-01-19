import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { NavController, NavParams , ViewController} from 'ionic-angular';

@Component({
  selector: 'likepopover-page',
  templateUrl: 'likepopover.html'
})
export class likepopover {

    constructor(public viewCtrl: ViewController) {}

           close() {
             this.viewCtrl.dismiss({result: true});
          }

  }
