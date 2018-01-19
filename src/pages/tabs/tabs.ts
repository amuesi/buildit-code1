import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = "EditPage";
  tab2Root: any = "SubmissionsPage"
  tab3Root: any = "OutboxPage"
  activeTab:any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.activeTab = navParams.get("tab")?navParams.get("tab"):0;

    // this.selectTab(this.activeTab);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  // selectTab(index: number) {
  //   var t: Tabs = this.navCtrl.parent;
  //   t.select(index);
  // }

}
