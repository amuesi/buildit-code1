import { Component, OnInit, Input, Output } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, ModalController, PopoverController, Platform, AlertController,
  LoadingController} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

import { Badge } from '@ionic-native/badge';

import { UsernameServiceProvider } from '../../providers/username-service/username-service';

import { ApplicationDataProvider } from '../../providers/application-data/application-data';

import { Storage } from '@ionic/storage';

// floclocation model
import { FlocLocation } from '../../models/floclocations';

import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { SubmissionsProvider } from '../../providers/submissions/submissions';

import { MediaCaptureProvider } from '../../providers/media-capture/media-capture';
import { NetworkProvider } from '../../providers/network/network';


@IonicPage()
@Component({
  selector: 'page-security-good-practice',
  templateUrl: 'security-good-practice.html',
})
export class SecurityGoodPracticePage implements OnInit{

  // main form
  public form: FormGroup;
  public date: any;
  public currentDate: any = new Date().toISOString();
  public currentTime: any = new Date().getHours() + ":" + new Date().getMinutes();

   //class member properties
  public isSearching:boolean = false;
  public selectedLocation: any;
  public searchInput: string;
  public flocs: FlocLocation[];
  public originalFlocs: FlocLocation[];
  public floclocation: FlocLocation[];

  public locationType:any;
  public email: any;
  public team: any;
  public chosenLocationType:any;
  public location: any;

  public submissionImage1: any;
  public submittedImage1: any;

  public submissionImage2: any;
  public submittedImage2: any;

  public submissionImage3: any;
  public submittedImage3: any;

  public submissionImage4: any;
  public submittedImage4: any;

  public photoTaken1:boolean = false;
  public photoTaken2:boolean = false;
  public photoTaken3:boolean = false;
  public photoTaken4:boolean = false;

  public recordId: any;
  public revisionId: any;
  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;

  private showList: boolean;



  public locationTypeModel:any;
  public standardModel:any;



  public searchLocations:any;

  public category:any = "Security Good Practice";


  private isInstantiated: boolean;
  public success: boolean;

  public _DB : any;

  public immediateActionsTaken:any;

  public selectedLocationType:any = false;

  public selectedLocationTypeSTW:any = false;
  public selectedLocationTypeSTS:any = false;
  public selectedLocationTypeOther:any = false;
  public otherLocationTextArea: any;

  public submitAttempt: boolean = false;
  public item:any;

  public referenceNumber:any;
  public formName:any;

  public loading:any;

  xCoordinate:any;
  yCoordinate:any;
  XYCoordinate: any;
  incidentDescription: any;
  typeOfSecurityConcern:any;
  locationVariable: any;
  preciseLocation:any;
  correctiveActionTakenControl:any;

  isSaveSubmit:boolean = false;

  reportedToPolice: any ;
  policeForce: any;
  itemOwnership: any ;
  smartWaterSite: any ;
  seriousInjuryOrFatality: any ;
  estimateValueOfLossDamage: any;
  itemDescription: any;
  policeCrimeRefNo: any;

  // image1:any;
  // image2:any;
  // image3:any;
  // image4:any;
  image1 = '';
  image2 = '';
  image3 = '';
  image4 = '';
  DateOfOccurence: any;
  TimeOfOccurence: any;

  isVisible:boolean = false;

  isBusy = true;

  TeamName: any;
  ReporterName: any;
  EmployeeEmail: any;
  EmployeeNumber: any;

  public FirstName: any;
  public LastName: any;

  constructor(
    public colleaguesService: UsernameServiceProvider,
    public navCtrl: NavController,
    private storage: Storage,
    private mediaCapture: MediaCaptureProvider,
    public navParams: NavParams,
    private popOverCtrl: PopoverController,
    private fb: FormBuilder,
    public DB : SubmissionsProvider,
    private ga: GoogleAnalytics,
    private badge: Badge,
    private toastCtrl: ToastController,
    private platform: Platform,
    public Modal:ModalController,
    public ev:Events,
    private appDataProvider: ApplicationDataProvider,
    private alertCtrl: AlertController,
    private networkProvider: NetworkProvider,
    public loadingCtrl: LoadingController)

  {
    this.loading = navParams.get("loading");

    this.DB.getFirstName().then((data) =>{
      this.FirstName = data;
    });
    this.DB.getLastName().then((data) =>{
      this.LastName = data;
    });
    this.DB.getTeamName().then((data) =>{
      this.TeamName = data;
    });
    // this.loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // this.loading.present();
    this.formName = "Security Good Practice";
    if (this.DateOfOccurence == null){
      this.DateOfOccurence = this.currentDate;
    }
    if (this.TimeOfOccurence == null){
      let st_date = new Date(0).getHours();
      var date = st_date.toString();
      var st_time = new Date(0).getMinutes();
      var time = st_time.toString();
      if (st_date < 10) date = "0"+ st_date;
      if (st_time < 10) time = "0"+ st_time;
      this.TimeOfOccurence = date + ":" + time;
    }
    this.pageSetUp();

    if(navParams.get("key") && navParams.get("rev"))
    {
      this.recordId 		= navParams.get("key");
      this.revisionId 		= navParams.get("rev");
      this.isEdited 			= true;
      this.selectSubmission(this.recordId);
      this.pageTitle 		= 'Amend entry';
      this.isSaveSubmit = !navParams.get("isEditable");
    }
    else
    {
      this.recordId 			= ''; // new Date().toISOString();
      this.revisionId 		= '';
      this.isEdited 			= false;
      this.pageTitle 		= 'Create entry';
      this.referenceNumber =  this.DB.STWReferenceNumber();
      // this.pageSetUp();
    }
    // this.ev.subscribe('autosave_security_incident', data => {
    //   this.DB.auto_save1(this.recordId, this.referenceNumber, this.category, this.DateOfOccurence, this.TimeOfOccurence, data);
    //   this.presentToastMessage("Data saved");
    //
    // });
  }

  ionViewDidEnter(){
    this.isBusy = false;
    // this.loading.dismiss();
  }

  ionViewWillLeave() {
    this.ev.unsubscribe('autosave_security_incident');
  }

  ionViewWillEnter() {
    // this.ev.subscribe('autosave_security_incident', data => {
    //   this.DB.auto_save1(this.recordId, this.referenceNumber, this.category, this.DateOfOccurence, this.TimeOfOccurence, data);
    //   this.presentToastMessage("Data saved");
    //
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafetyIncidentPage');
  }

  pageSetUp(){

    this.initForm();
  }

  ngOnInit(){
  }


  selectSubmission(id){

    this.DB.retrieveSubmission(id)
        .then((doc)=>{
          this.recordId = doc[0].id;
          this.referenceNumber = doc[0].ReferenceNumber;

          this.locationType = doc[0].locationType;
          this.locationVariable = doc[0].LocationVariable;
          this.location = doc[0].Location;
          this.preciseLocation = doc[0].PreciseLocation;
          this.DateOfOccurence = doc[0].DateOfOccurence;
          this.TimeOfOccurence = doc[0].TimeOfOccurence;

          this.typeOfSecurityConcern = doc[0].TypeOfSecurityConcern;
          this.incidentDescription = doc[0].IncidentDescription;

          this.correctiveActionTakenControl = doc[0].ActionTaken;

          this.xCoordinate = doc[0].XCoordinate;
          this.yCoordinate = doc[0].YCoordinate;
          this.XYCoordinate = doc[0].XYCoordinate;

          let dataURIPrefix	= 'data:image/jpeg;base64,';
          if (doc[0].image1 != dataURIPrefix) this.image1 = doc[0].image1;
          if (doc[0].image2 != dataURIPrefix) this.image2 = doc[0].image2;
          if (doc[0].image3 != dataURIPrefix) this.image3 = doc[0].image3;
          if (doc[0].image4 != dataURIPrefix) this.image4 = doc[0].image4;

          this.ReporterName = doc[0].ReporterName;
          this.TeamName = doc[0].TeamName;
          this.EmployeeEmail = doc[0].EmployeeEmail;
          this.EmployeeNumber = doc[0].EmployeeNumber;
          this.FirstName = doc[0].FirstName;
          this.LastName = doc[0].LastName;

          // if(doc[0].Sent == "no sent"){
          //   this.isSaveSubmit = false;
          // }
          // else
          // {
          //   this.isSaveSubmit = true;
          //
          // }
          // alert(doc[0].image2 + this.image2);
          this.initForm();
        });
  }

  saveSubmission($event, showType = ""){

    $event.preventDefault();

    var form_result = {};
    form_result['TeamName'] = this.form.controls.whoAreYou.get("teamName").value ? this.form.controls.whoAreYou.get("teamName").value : '';
    form_result['ReporterName'] = this.form.controls.whoAreYou.get("reportersName").value ? this.form.controls.whoAreYou.get("reportersName").value : '';
    form_result['EmployeeEmail'] = this.form.controls.whoAreYou.get("employeeEmail").value ? this.form.controls.whoAreYou.get("employeeEmail").value : '';
    form_result['EmployeeNumber'] = this.form.controls.whoAreYou.get("employeeNumber").value ? this.form.controls.whoAreYou.get("employeeNumber").value : '';


    form_result['FirstName'] = this.FirstName?this.FirstName:'';
    form_result['LastName'] = this.LastName?this.LastName:'';

    form_result['TypeOfSecurityConcern'] = this.form.controls.whatHappened.get("securityCategory").value?this.form.controls.whatHappened.get("securityCategory").value:'';
    form_result['IncidentDescription'] = this.form.controls.whatHappened.get("incidentDescription").value?this.form.controls.whatHappened.get("incidentDescription").value:'';

    form_result['DateOfOccurence'] = this.form.controls.whereAndWhen.get("date").value?this.form.controls.whereAndWhen.get("date").value:'';
    form_result['TimeOfOccurence'] = this.form.controls.whereAndWhen.get("time").value?this.form.controls.whereAndWhen.get("time").value:'';
    form_result['LocationVariable'] = this.form.controls.whereAndWhen.get("locationType").value?this.form.controls.whereAndWhen.get("locationType").value:'';
    if (this.form.controls.whereAndWhen.get("locationType").value == "Severn Trent Water (STW)")
    {
      form_result['locationType'] = "STW";
    }
    else if (this.form.controls.whereAndWhen.get("locationType").value == "Severn Trent Services (STS)")
    {
      form_result['locationType'] = "STS";
    }
    else {
      form_result['locationType'] = "Other";
    }
    form_result['PreciseLocation'] = this.form.controls.whereAndWhen.get("preciseLocation").value?this.form.controls.whereAndWhen.get("preciseLocation").value:'';
    form_result['location'] = this.form.controls.whereAndWhen.get("Address").value?this.form.controls.whereAndWhen.get("Address").value:'';
    let coordinate = this.form.controls.whereAndWhen.get("Coordinate").value;
    if (coordinate != null)
    {
      form_result['XCoordinate'] = coordinate.split(",")[0];
      form_result['YCoordinate'] = coordinate.split(",")[1];
    }else{
      form_result['XCoordinate'] = "";
      form_result['YCoordinate'] = "";
    }

    form_result['RefrerenceNumber'] = this.referenceNumber?this.referenceNumber:'';


    form_result['ActionTaken'] = this.form.controls.immediatediateCorrectiveAction.get("correctiveActionTakenControl").value?this.form.controls.immediatediateCorrectiveAction.get("correctiveActionTakenControl").value:'';

    form_result["image1"] = this.form.controls.imageMediaGroup.get("image1").value;
    form_result["image2"] = this.form.controls.imageMediaGroup.get("image2").value;
    form_result["image3"] = this.form.controls.imageMediaGroup.get("image3").value;
    form_result["image4"] = this.form.controls.imageMediaGroup.get("image4").value;

    if(showType != ""){
      form_result["Sent"] = "sending";
    }
    else{
      if(this.isSaveSubmit){
        form_result["Sent"] = "sent";
      }
      else{
        form_result["Sent"] = "no sent";
      }
    }

    // alert(form_result["image2"]);
    let id: any = this.recordId,
        category: any = this.category,
        revision: string = this.revisionId;

    if(this.recordId != ''){

      // update
      this.DB. updateSubmission(id, revision, category, form_result, this.isSaveSubmit)
          .then((data) =>{

            this.hideForm = true;
            if(showType == ""){
              if(this.isSaveSubmit){
                this.navCtrl.setRoot("TabsPage",{tab: 1});
                this.presentToastMessage("Sent");
              }
              else{
                this.navCtrl.setRoot('HomePage');
                this.presentToastMessage("Updated");
              }
            }
            else{
              this.navCtrl.setRoot('HomePage');
              this.presentToastMessage("Updated");
            }
            this.isSaveSubmit = false;
          });
    }

    // new record
    else{
      this.DB.addSubmission(category, form_result, this.isSaveSubmit).then((data) =>{
        console.log("Security Good Practice: "+ data);
        this.hideForm = true;
        this.presentToastMessage("Added");
        if(showType == ""){
          if(this.isSaveSubmit){
            this.navCtrl.setRoot("TabsPage",{tab: 1});
            this.presentToastMessage("Sent");
          }
          else{
            this.navCtrl.setRoot('HomePage');
          }
        }
        else{
          this.navCtrl.setRoot('HomePage');
        }
        this.isSaveSubmit = false;
      });
    }


    // this.badge.increase(1);
    // this.presentToastMessage("Data saved");
    // this.navCtrl.setRoot("HomePage");
    // • Category of the event
    // • Action taken or the event name
    // • Label for the event
    // • Numeric value assigned to the event
    // this.ga.trackEvent("Security Good Practice", "Save Btn", this.form.value, 1);
  }

  presentToastMessage(msg){
    let toast = this.toastCtrl.create({
      message:msg,
      duration:3000,
      position:'bottom'
    });
    toast.present();
  }


  initForm(){
    if (this.xCoordinate != null && this.yCoordinate != null && this.xCoordinate != "" && this.yCoordinate != "")
    {
      this.XYCoordinate = this.xCoordinate +"," +this.yCoordinate;
    }


    this.form = this.fb.group({

      whoAreYou: this.fb.group({
        reportersName: [{ value: this.ReporterName, disabled: false}],  // this.PersonInvolved,
        teamName: [{ value: this.TeamName, disabled: false}],
        employeeEmail: [{ value: this.EmployeeEmail, disabled: false }],
        employeeNumber: [{ value: this.EmployeeNumber, disabled: false }],
      }),


      whatHappened:this.fb.group({
        securityCategory:[{value: this.typeOfSecurityConcern, disabled: false}],  // this.typeOfSecurityConcern,
        incidentDescription:[{value: this.incidentDescription, disabled: false}],  // this.incidentDescription
        reportedToPolice:[{value: this.reportedToPolice, disabled: false}],
        policeForce:[{value: this.policeForce, disabled: false}],
        itemOwnership:[{value: this.itemOwnership, disabled: false}],
        smartWaterSite:[{value: this.smartWaterSite, disabled: false}],
        seriousInjuryOrFatality:[{value: this.seriousInjuryOrFatality, disabled: false}],
        estimateValueOfLossDamage:[{value: this.estimateValueOfLossDamage, disabled: false}],
        itemDescription:[{value: this.itemDescription, disabled: false}],
        policeCrimeRefNo:[{value: this.policeCrimeRefNo, disabled: false}],
      }),

      whereAndWhen: this.fb.group({
        date:[{value: this.DateOfOccurence, disabled: false}],  // this.DateOfOccurence,
        time: [{value: this.TimeOfOccurence, disabled: false}],  // this.TimeOfOccurence,
        locationType:[{value: this.locationVariable, disabled: false}],  // this.locationVariable,
        location:'',
        Address:this.location,
        preciseLocation:this.preciseLocation,
        Coordinate:[{value: this.XYCoordinate, disabled: false}],  // this.XYCoordinate
      }),

      imageMediaGroup: this.fb.group({
        "image1" : this.image1,
        "image2" : this.image2,
        "image3" : this.image3,
        "image4" : this.image4,
      }),

      immediatediateCorrectiveAction: this.fb.group({
        correctiveActionTakenControl:[{value: this.correctiveActionTakenControl, disabled: false}],  // this.correctiveActionTakenControl,
      }),
    })
  }

  presentPopover(myEvent){
    let popover = this.popOverCtrl.create('PopOverPage');
    popover.present({
      ev: myEvent
    });
  }

  goHome(){
    if(this.isSaveSubmit){
      this.navCtrl.setRoot("HomePage", {
        // navParams here, if you want 'em
      }, {
        animate: true,
        direction: "backward" // or "forward"
      });
      return;
    }

    let alert = this.alertCtrl.create({
      title: 'Warning',
      message: 'You are about to EXIT without SAVING?',
      buttons:[
        {
          text: 'RETURN',
          handler: data => {
            console.log('No clicked')
          }
        },
        {
          text: 'EXIT',
          handler: data => {
            this.navCtrl.setRoot("HomePage", {
              // navParams here, if you want 'em
            }, {
              animate: true,
              direction: "backward" // or "forward"
            });
          }
        }
      ]
    })

    alert.present();

  }

  submitFunction($event){
    var me = this;
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: 'Are you sure you want to SAVE & SUBMIT the data?',
      buttons:[
        {
          text: 'No',
          handler: data => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            if(this.networkProvider.obtainNetworkConnection()){
              this.isSaveSubmit = true;
              this.saveSubmission($event);
            }
            else{
              this.isSaveSubmit = false;
              this.saveSubmission($event, "sending");
            }
          }
        }
      ]
    });

    alert.present();

  }

}