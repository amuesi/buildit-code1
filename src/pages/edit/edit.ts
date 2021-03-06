import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { PopoverController, IonicPage, NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { SubmissionsProvider } from '../../providers/submissions/submissions';
import { Badge } from '@ionic-native/badge';
import { Storage } from '@ionic/storage';
import PouchDB from 'pouchdb';
// import * as PouchDBFind from 'pouchdb-find'
import PouchDBFind from 'pouchdb-find'
PouchDB.plugin(PouchDBFind);



declare function emit (val: any)


@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage implements OnInit{

  public hasIncidents: boolean = false;
  public incidents: any;
  public hasSubmissions 		: boolean = false;
  public submissions  			: any;
  public submissionMessage: any;
  public submission:any;
  isInstantiated:any;
  public _DB : any;
  public data =[];
  public selectedList = [];
  public success : boolean = true;
  public i: any;
  public item:any;
  loading:any;

  favourites = [];
  draftLength = 0;
  draftReorder = false;

  categories: any;
  categoriesitems: any;

  public selectededitButton: any = false;
  public selectedselectAll: boolean = false;


  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public DB : SubmissionsProvider,
                public toastCtrl  : ToastController,
              public loadingCtrl: LoadingController,
              private badge: Badge,
              private storage: Storage,
              public popOverCtrl: PopoverController
            ) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });


  }// end constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');



    this.data =[];
    this.listSubmissionSafetyData();
    this.listSubmissionHazardData();
    this.listSubmissionWellBeingData();
    this.listSubmissionPositiveBehaviourData();
    this.listSubmissionUnsafeBehaviourData();
    this.listSubmissionSecurityIncidentData();
    this.listSubmissionSecurityNonComplianceData();
    this.listSubmissionSecurityGoodPracticeData();

    console.log('ionViewDidLoad EditPage 2', this.data);
  }

  ionViewWillEnter()
  {
  }

  sort_by_date(){
    if(this.data.length > 1){
      this.data.sort(function (a, b) {
        var d1 = new Date(a.DateOfOccurence);
        var d2 = new Date(b.DateOfOccurence);
        return d1.valueOf() - d2.valueOf();
      });
    }
  }

  ngOnInit(){
    if(!this.isInstantiated) {
      this._DB = new PouchDB("submissions");
      console.log(this._DB);
      console.log('db created');
      this.isInstantiated = true;
    }
    else{
      console.log('db created');
      console.log('sb1 db created', this._DB);
    }
    console.log('sb1 db is', this._DB);
    console.log('sb1 db.find is', this._DB.find);
    console.log('sb1 PouchDBFind is', PouchDBFind);
  }


  listSubmissionSafetyData(){
   this._DB.find({
        selector: {DoYouWishToReport: {$eq: 'Safety Incident'}, Sent: {$eq: 'no sent'}},
        sort: ['_id']
      }).then(filtered => {

        filtered.docs.forEach(function (item) {
          this.data.push(item);
        }.bind(this));
        this.sort_by_date();
      });
    }

  listSubmissionHazardData(){
    this._DB.find({
      selector: {DoYouWishToReport: {$eq: 'Hazard'}, Sent: {$eq: 'no sent'}},
      sort: ['_id']
    }).then(filtered => {

      filtered.docs.forEach(function (item) {
        this.data.push(item);
      }.bind(this));
      this.sort_by_date();
    });
  }

  listSubmissionWellBeingData(){
    this._DB.find({
      selector: {DoYouWishToReport: {$eq: 'Wellbeing'}, Sent: {$eq: 'no sent'}},
      sort: ['_id']
    }).then(filtered => {

      filtered.docs.forEach(function (item) {
        this.data.push(item);
      }.bind(this));
      this.sort_by_date();
    });
  }

  listSubmissionUnsafeBehaviourData(){
    this._DB.find({
      selector: {DoYouWishToReport: {$eq: 'Unsafe Behaviour'}, Sent: {$eq: 'no sent'}},
      sort: ['_id']
    }).then(filtered => {

      filtered.docs.forEach(function (item) {
        this.data.push(item);
      }.bind(this));
      this.sort_by_date();
    });
  }

  listSubmissionSecurityIncidentData(){
    this._DB.find({
      selector: {DoYouWishToReport: {$eq: 'Security Incident'}, Sent: {$eq: 'no sent'}},
      sort: ['_id']
    }).then(filtered => {

      filtered.docs.forEach(function (item) {
        this.data.push(item);
      }.bind(this));
      this.sort_by_date();
    });
  }

  listSubmissionPositiveBehaviourData(){
    this._DB.find({
      selector: {DoYouWishToReport: {$eq: 'Positive Behaviour'}, Sent: {$eq: 'no sent'}},
      sort: ['_id']
    }).then(filtered => {

      filtered.docs.forEach(function (item) {
        this.data.push(item);
      }.bind(this));
      this.sort_by_date();
    });
  }

  listSubmissionSecurityGoodPracticeData(){
    this._DB.find({
      selector: {DoYouWishToReport: {$eq: 'Security Good Practice'}, Sent: {$eq: 'no sent'}},
      sort: ['_id']
    }).then(filtered => {

      filtered.docs.forEach(function (item) {
        this.data.push(item);
      }.bind(this));
      this.sort_by_date();
    });
  }

  listSubmissionSecurityNonComplianceData(){
    this._DB.find({
      selector: {DoYouWishToReport: {$eq: 'Security Non Compliance'}, Sent: {$eq: 'no sent'}},
      sort: ['_id']
    }).then(filtered => {

      filtered.docs.forEach(function (item) {
        this.data.push(item);
      }.bind(this));
      this.sort_by_date();
    });
  }

  displaySubmissions()
  {
    this.DB.retrieveSubmissions().then((data)=>
    {
      let existingData = Object.keys(data).length;
      if(existingData !== 0)
      {
        this.hasSubmissions 	= true;
        this.submissions 	= data;
      }
      else
      {
        console.log("none retrieved");
        this.submissionMessage = "No recorded data";
      }
    });
  }


 viewSubmission(param){
   // conditional check of submission type
   switch (param.category)
   {
     case 'Safety Incident':
       this.navCtrl.parent.parent.setRoot("SafetyIncidentPage", param);
       break;
     case 'Hazard':
       this.navCtrl.parent.parent.setRoot("HazardPage", param);
       break;
     case 'Wellbeing':
       this.navCtrl.parent.parent.setRoot("WellBeingPage", param);
       break;
     case 'Positive Behaviour':
       this.navCtrl.parent.parent.setRoot("PositiveBehaviourPage", param);
       break;
     case 'Unsafe Behaviour':
       this.navCtrl.parent.parent.setRoot("UnsafeBehaviourPage", param);
       break;
     case 'Security Incident':
       this.navCtrl.parent.parent.setRoot("SecurityIncidentPage", param);
       break;
     case 'Security Non Compliance':
       this.navCtrl.parent.parent.setRoot("SecurityNonCompliancePage", param);
       break;
     case 'Security Good Practice':
       this.navCtrl.parent.parent.setRoot("SecurityGoodPracticePage", param);
       break;
     default:
       this.navCtrl.parent.parent.setRoot("SafetyIncidentPage", param);
       break;
   }

    // this.navCtrl.push("SafetyIncidentPage", param)
  }


  getDataList(){

    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this._DB.allDocs({include_docs:true, descending: true})
        .then(result => {
        let existingData = Object.keys(result).length;
      //  console.log(existingData);
        this.data = [];
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
         // console.log(this.data.length);
          resolve(this.data);
        });
      }).catch((error) => {
        console.log(error);
      });
    });
  }


getDataListByCategory() {

    this._DB.query(function (doc, emit) {
      emit(doc.category);
    }, {key: 'Incident'}).then(function (result) {
      // found docs with name === 'foo'
      console.log(result);
    }).catch(function (err) {
      // handle any errors
      console.log(err);
    });

  }// end method

  sendNotification(message) : void
  {
    let notification = this.toastCtrl.create({
      message: message,
      duration : 3000
    });
    notification.present();
  }

  removeItem(_id, _rev, item){
    let submission  = {
      _id: _id,
      _rev: _rev
    };
    console.log("id:"+_id);
    console.log("rev:"+_rev);

    //this.remove(item);
    this._DB.remove(submission)
      .catch((err)=> {
        console.log("error: "+ err);
        this.success = false;
      });
    if(this.success){
      for (var i = 0 ; i < this.data.length ; i++)
      {
        if(this.data[i]._id == _id)
        {
          this.data.splice(i, 1);
          break;
        }
      }
      for (var i = 0 ; i < this.selectedList.length ; i++)
      {
        if(this.selectedList[i]._id == _id)
        {
          this.selectedList.splice(i, 1);
          break;
        }
      }
      this.sendNotification("Deleted");
     // this.navCtrl.setRoot(HomePage);

      console.log('Deleted');
      this.decreaseBadges();
    }
  }

  removeItems() {
    let selectedListCopy = []
    this.selectedList.forEach(element => {
      selectedListCopy.push(element)
    });
    selectedListCopy.forEach(element => {
      console.log('remove item',element._id)
      this.removeItem(element._id,element._rev,element)
    });
  }

  // reorderItems(indexes) {
  //   let element = this.favourites[indexes.from];
  //   this.favourites.splice(indexes.from, 1);
  //   this.favourites.splice(indexes.to, 0, element);
  //   this.storage.set('favouritesList', this.favourites)
  // }

  DraftReorder($event){

  this.selectededitButton = !this.selectededitButton;

  }

  DeselectAll() {
    this.selectedList = [];
  }

  SelectAll(){
    this.selectedList = [];
    this.data.forEach(element => {
      this.selectedList.push(element)
    });
  }

  ngIfCtrl(item){
    if (this.selectedList.indexOf(item) == -1) {
      this.selectedList.push(item)
      console.log('selectedList',this.selectedList)
    } else {
      this.selectedList.splice(this.selectedList.indexOf(item),1)
    }
  }

  isCheckboxSelected(item) {
    if (this.selectedList.indexOf(item) != -1) {
      return true
    } else {
      return false
    }
  }


  remove(submission){
    for (this.i =0; this.i < this.submission.length; this.i++){
      if(this.submission[this.i] == submission){
        this.submission.splice(this.i,1);
        this.sendNotification("Deleted");
        this.decreaseBadges();
      }
    }
  }

  allClickedCategories() {
    this.categories = [];
    for (var i = 0; i < this.categoriesitems.length; i++) {
      this.categories.push(this.categoriesitems[i].name)
    }
  }

  async decreaseBadges() {
    try {
      let badge = await this.badge.decrease(1);
      console.log(badge);
    } catch (e) {
      console.error(e);
    }
  }


      presentPopover(myEvent){
    let popover = this.popOverCtrl.create('PopOverEditPage');
    popover.present({
      ev: myEvent
    })
  }

  // var app = angular.module("app", ["checklist-model"]);
  // app.controller('Ctrl1', function($scope) {
  //   $scope.draft = [
  //     'guest', 
  //     'user', 
  //     'customer', 
  //     'admin'
  //   ];
  //   $scope.draft = {
  //     roles: ['draft']
  //   };
  //   $scope.checkAll = function() {
  //     $scope.draft.page = angular.copy($scope.draft);
  //   };
  //   $scope.uncheckAll = function() {
  //     $scope.draft.page = [];
  //   };
  //   $scope.checkFirst = function() {
  //     $scope.draft.page.splice(0, $scope.draft.page.length); 
  //     $scope.draft.page.push('guest');
  //   };
  // });
}// end class
