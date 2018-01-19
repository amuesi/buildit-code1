import { Component, OnInit, Input, Output } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ToastController, AlertController, ModalController, PopoverController,
  Platform, Events, LoadingController
} from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { Badge } from '@ionic-native/badge';

import { UsernameServiceProvider } from '../../providers/username-service/username-service';

import { ApplicationDataProvider } from '../../providers/application-data/application-data';

import { Storage } from '@ionic/storage';

// floclocation model
import { FlocLocation } from '../../models/floclocations';

import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { SubmissionsProvider } from '../../providers/submissions/submissions';

import { MediaCaptureProvider } from '../../providers/media-capture/media-capture';

import { ImageProvider } from '../../providers/image/image';

import { ReportTypeInterface } from '../../models/report-type.interface';
import { NetworkProvider } from '../../providers/network/network';

@IonicPage()
@Component({
  selector: 'page-safety-incident',
  templateUrl: 'safety-incident.html',
  animations: [

    // Define animations here.

  ]
})
export class SafetyIncidentPage implements OnInit {



  // main form
  public form: FormGroup;
  public date: any;
  public currentDate: any = new Date().toISOString();
  public currentTime: any = new Date().getHours() + ":" + new Date().getMinutes();

  //class member properties

  public isSearching: boolean = false;
  public selectedLocation: any;
  public searchInput: string;
  public flocs: FlocLocation[];
  public originalFlocs: FlocLocation[];
  public floclocation: FlocLocation[];

  public locationType: any;
  public email: any;
  public team: any;
  public user: any;
  public chosenLocationType: any;
  public location: any;

  public submissionImage1: any;
  public submittedImage1: any;

  public submissionImage2: any;
  public submittedImage2: any;

  public submissionImage3: any;
  public submittedImage3: any;

  public submissionImage4: any;
  public submittedImage4: any;

  public photoTaken1: boolean = false;
  public photoTaken2: boolean = false;
  public photoTaken3: boolean = false;
  public photoTaken4: boolean = false;

  public recordId: any;
  public revisionId: any;
  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;

  private showList: boolean;

  public selectedStandard: any;
  public standard: any;

  public locationTypeModel: any;
  public standardModel: any;

  public wasPersonInvolved: any;
  public personInjured: any;
  public wasSecurityConcern: any;
  incidentResultedInLostTimesVal: any;
  incidentResultedInRestrictedDutiesVal: any;


  public phoneNumber: any;
  public whoWasInvolved: any;
  public HomeAddress: any;

  public description: any;
  public searchLocations: any;

  public category: any = "Safety Incident";


  private isInstantiated: boolean;
  public success: boolean;

  public _DB: any;

  public immediateActionsTaken: any;

  public selectedLocationType: any = false;

  public selectedLocationTypeSTW: any = false;
  public selectedLocationTypeSTS: any = false;
  public selectedLocationTypeOther: any = false;
  public otherLocationTextArea: any;

  public submitAttempt: boolean = false;
  public item: any;

  public loading: any;



  public safeUnsafeAct: any;
  public submissionImage: any;
  public submittedImage: any;

  // validation error properties
  employeeNameError: string;
  teamNameError: string;



  isSaveSubmit: boolean = false;



  reportTypes: ReportTypeInterface[] = [
    { id: 1, description: 'Positive Behaviour', calculationValue: 10 },
    { id: 2, description: 'Unsafe Behaviour', calculationValue: 10 },
    { id: 3, description: 'Hazard', calculationValue: 10 },
    { id: 4, description: 'Wellbeing conversation', calculationValue: 10 },
    { id: 5, description: 'Something that happened', calculationValue: 10 },
    { id: 6, description: 'Security Incident', calculationValue: 10 },
    { id: 7, description: 'Security Good Practice', calculationValue: 10 },
    { id: 8, description: 'Security Non Compliance', calculationValue: 10 },
  ];


  // pouch stuff
  public referenceNumber: any;
  public formName: any;

  public FirstName: any;
  public LastName: any;

  TeamName: any;
  ReporterName: any;
  LocationVariable: any;
  DateOfOccurence: any;
  TimeOfOccurence: any;
  PreciseLocation: any;
  DateAbsenceStarted: any;
  ReturnToWork: any;
  AdditionalTime: any;
  AdditionalTimeComments: any;

  DateRestrictedDuties: any;
  ReturnToNormal: any;
  AdditionalRestricted: any;
  AdditionalRestrictedComments: any;
  // status ;
  // type ;
  DoYouWishToReport: any;
  ReasonForTheConversation: any;
  TypeOfSecurityConcern: any;
  IncidentDescription: any;
  PersonInvolved: any;
  RemovedHazard: any;

  EmailAddress: any;
  Postcode: any;
  SubCategoryApplicable: any;
  EventCategoryApplicable: any;
  ActionRequired;
  XCoordinate: any;
  YCoordinate: any;
  XYCoordinate: any;
  MostApplicable: any;
  TelephoneNumber: any;
  WhoWasInvolved: any;
  CorrectiveActionTaken: any;
  // IncidentReferenceNumber: any;
  // image1:any;
  // image2:any;
  // image3:any;
  // image4:any;
  image1 = '';
  image2 = '';
  image3 = '';
  image4 = '';
  WasInjuryWorkRelated: any;
  EnvironmentalImpact: any;
  Location: any;
  WhatWasEnvironmentalImpact: any;
  Employee: any;
  whatHappenedVehicleAsset: any;
  EmployeeName: any;
  DamageCompanyBusiness: any;
  DetailsOfActivityBeingDone: any;
  WeatherConditionsAtTime: any;
  EmployeeNotOnList: any;
  Company: any;
  JobTitle: any;
  Age: any;
  Gender: any;
  AddName: any;
  InjuryResultedInFatality: any;
  BodypartsGroup: any;
  BodypartsControl: any;
  BodyPart: any;
  ImmediateTreatmentGiven: any;
  TreatmentDetails: any;
  AdditionalTreatmentGiven: any;
  InvestigatingManager: any;
  PropertyVehicleDamage: any;
  isBusy = true;
  Return: any;
  PotentialToCauseSeriousInjury: any;
  WasAnyoneInjured: any;
  wasAnyoneInjured: any;
  WasMoreThanOnePersonInvolved: any;
  IncidentResultedInLostTime: any;
  IncidentResultedInRestrictedDuties: any;
  EmployeeEmail: any;
  EmployeeNumber: any;

  public maxDate = "2000-01-01";



  constructor(
    public colleaguesService: UsernameServiceProvider,
    public navCtrl: NavController,
    private storage: Storage,
    private mediaCapture: MediaCaptureProvider,
    private image: ImageProvider,
    public navParams: NavParams,
    private popOverCtrl: PopoverController,
    private fb: FormBuilder,
    public DB: SubmissionsProvider,
    private ga: GoogleAnalytics,
    private badge: Badge,
    private toastCtrl: ToastController,
    private platform: Platform,
    public Modal: ModalController,
    private ev: Events,
    private appDataProvider: ApplicationDataProvider,
    private alertCtrl: AlertController,
    private networkProvider: NetworkProvider,
    public loadingCtrl: LoadingController) {
    this.loading = navParams.get("loading");

    this.DB.getFirstName().then((data) => {
      this.FirstName = data;
    });
    this.DB.getLastName().then((data) => {
      this.LastName = data;
    });
    this.DB.getTeamName().then((data) => {
      this.TeamName = data;
    });
    // this.loading = this.loadingCtrl.create({
    //     content: 'Please wait...'
    // });
    // this.loading.present();

    this.formName = "SafetyIncident";
    if (this.DateOfOccurence == null) {
      this.DateOfOccurence = this.currentDate;
    }
    if (this.TimeOfOccurence == null) {
      let st_date = new Date(0).getHours()
      var date = st_date.toString();
      var st_time = new Date(0).getMinutes();
      var time = st_time.toString();
      if (st_date < 10) date = "0" + st_date;
      if (st_time < 10) time = "0" + st_time;
      this.TimeOfOccurence = date + ":" + time;
    }

    this.pageSetUp();
    if (navParams.get("key") && navParams.get("rev")) {
      this.recordId = navParams.get("key");
      this.revisionId = navParams.get("rev");
      this.isEdited = true;
      this.selectSubmission(this.recordId);
      this.pageTitle = 'Amend entry';
      this.isSaveSubmit = !navParams.get("isEditable");
    }
    else {
      this.recordId = ''; // new Date().toISOString();
      this.revisionId = '';
      this.isEdited = false;
      this.pageTitle = 'Create entry';
      this.referenceNumber = this.DB.STWReferenceNumber();
      // this.pageSetUp();
    }
    // this.ev.subscribe('autosave_incident', data => {
    //     this.DB.auto_save1(this.recordId, this.referenceNumber, this.category, this.DateOfOccurence, this.TimeOfOccurence, data);
    //     this.presentToastMessage("Data saved");
    //
    // });

  } // end constructor

  ionViewDidEnter() {
    this.isBusy = false;
    // this.loading.dismiss();
  }
  ionViewCanEnter() {

  }
  ionViewWillLeave() {
    this.ev.unsubscribe('autosave_incident');
    // this.ev.unsubscribe('functionCall:subcategory');
  }

  ionViewWillEnter() {
    // this.ev.subscribe('autosave_incident', data => {
    //     this.DB.auto_save1(this.recordId, this.referenceNumber, this.category, this.DateOfOccurence, this.TimeOfOccurence, data);
    //     this.presentToastMessage("Data saved");
    //
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafetyIncidentPage');
  }

  pageSetUp() {
    this.initForm();
  }

  ngOnInit() {
    console.log(this.form);

  }

  selectSubmission(id) {

    this.DB.retrieveSubmission(id)
      .then((doc) => {
        this.recordId = doc[0].id;
        this.standard = doc[0].MostApplicable,
          this.referenceNumber = doc[0].ReferenceNumber;
        this.ReporterName = doc[0].ReporterName;
        this.TeamName = doc[0].TeamName;
        this.EmployeeEmail = doc[0].EmployeeEmail;
        this.EmployeeNumber = doc[0].EmployeeNumber;
        this.WasInjuryWorkRelated = doc[0].WasInjuryWorkRelated;
        this.PersonInvolved = doc[0].WasPersonInvolved;
        this.wasAnyoneInjured = doc[0].wasAnyoneInjured;
        this.whatHappenedVehicleAsset = doc[0].WhatHappenedVehicleAsset;
        this.IncidentResultedInLostTime = doc[0].IncidentResultedInLostTime
        this.IncidentResultedInRestrictedDuties = doc[0].IncidentResultedInRestrictedDuties


        this.EnvironmentalImpact = doc[0].EnvironmentalImpact;
        this.WhatWasEnvironmentalImpact = doc[0].WhatWasEnvironmentalImpact;
        this.PropertyVehicleDamage = doc[0].PropertyVehicleDamage;
        // this.form.controls.whatHappened.get("wasPersonInvolved").setValue(doc[0].PersonInvolved);
        this.PersonInvolved = doc[0].WasPersonInvolved;
        this.locationType = doc[0].locationType;
        this.LocationVariable = doc[0].LocationVariable;
        this.Location = doc[0].Location;
        this.DateOfOccurence = doc[0].DateOfOccurence;
        this.TimeOfOccurence = doc[0].TimeOfOccurence;
        this.DateAbsenceStarted = doc[0].DateAbsenceStarted;
        this.ReturnToWork = doc[0].ReturnToWork;
        this.AdditionalTime = doc[0].AdditionalTime;
        this.AdditionalTimeComments = doc[0].AdditionalTimeComments;
        this.DateRestrictedDuties = doc[0].DateRestrictedDuties;
        this.ReturnToNormal = doc[0].ReturnToNormal;
        this.AdditionalRestricted = doc[0].AdditionalRestricted;
        this.AdditionalRestrictedComments = doc[0].AdditionalRestrictedComments;
        this.PreciseLocation = doc[0].PreciseLocation;
        this.DetailsOfActivityBeingDone = doc[0].DetailsOfActivityBeingDone;
        this.WeatherConditionsAtTime = doc[0].WeatherConditionsAtTime;
        // this.status = doc[0].status;
        // this.type = doc[0].type;
        this.DoYouWishToReport = doc[0].DoYouWishToReport;
        this.WasAnyoneInjured = doc[0].WasAnyoneInjured;
        this.ReasonForTheConversation = doc[0].ReasonForTheConversation;
        this.TypeOfSecurityConcern = doc[0].TypeOfSecurityConcern;
        this.IncidentDescription = doc[0].IncidentDescription;
        this.PersonInvolved = doc[0].PersonInvolved;
        this.RemovedHazard = doc[0].RemovedHazard;
        // this.TeamName = doc[0].TeamName;
        this.FirstName = doc[0].FirstName;
        this.LastName = doc[0].LastName;
        this.EmailAddress = doc[0].EmailAddress;
        this.Postcode = doc[0].Postcode;
        this.EmployeeNotOnList = doc[0].EmployeeNotOnList;
        this.Company = doc[0].Company;
        this.JobTitle = doc[0].JobTitle;
        this.Age = doc[0].Age;
        this.Gender = doc[0].Gender;
        this.AddName = doc[0].AddName;
        this.EmployeeName = doc[0].EmployeeName;
        this.WasMoreThanOnePersonInvolved = doc[0].WasMoreThanOnePersonInvolved;
        // this.IncidentReferenceNumber = doc[0].IncidentReferenceNumber;
        this.CorrectiveActionTaken = doc[0].CorrectiveActionTaken;

        this.SubCategoryApplicable = doc[0].SubCategoryApplicable;
        this.EventCategoryApplicable = doc[0].EventCategoryApplicable;
        this.PotentialToCauseSeriousInjury = doc[0].PotentialToCauseSeriousInjury;
        if (this.EventCategoryApplicable != null) {
          this.ev.publish('functionCall:subcategory', this.EventCategoryApplicable);
        }
        // this.ActionRequired = doc[0].ActionRequired;
        this.XCoordinate = doc[0].XCoordinate;
        this.YCoordinate = doc[0].YCoordinate;
        this.XYCoordinate = doc[0].XYCoordinate;
        this.MostApplicable = doc[0].MostApplicable;
        this.Employee = doc[0].Employee;
        this.TelephoneNumber = doc[0].TelephoneNumber;
        this.WhoWasInvolved = doc[0].WhoWasInvolved;
        this.HomeAddress = doc[0].HomeAddress;

        let dataURIPrefix = 'data:image/jpeg;base64,';
        if (doc[0].image1 != dataURIPrefix) this.image1 = doc[0].image1;
        if (doc[0].image2 != dataURIPrefix) this.image2 = doc[0].image2;
        if (doc[0].image3 != dataURIPrefix) this.image3 = doc[0].image3;
        if (doc[0].image4 != dataURIPrefix) this.image4 = doc[0].image4;

        this.InjuryResultedInFatality = doc[0].InjuryResultedInFatality;
        this.IncidentResultedInRestrictedDuties = doc[0].IncidentResultedInRestrictedDuties;
        this.IncidentResultedInLostTime = doc[0].IncidentResultedInLostTime;
        this.BodypartsControl = doc[0].BodypartsControl;
        this.BodypartsGroup = doc[0].BodypartsGroup;
        this.ImmediateTreatmentGiven = doc[0].ImmediateTreatmentGiven;
        this.TreatmentDetails = doc[0].TreatmentDetails;
        this.AdditionalTreatmentGiven = doc[0].AdditionalTreatmentGiven;
        this.InvestigatingManager = doc[0].InvestigatingManager;
        this.BodyPart = doc[0].BodyPart;

        // if(doc[0].Sent == "no sent"){
        //     this.isSaveSubmit = false;
        // }
        // else
        // {
        //     this.isSaveSubmit = true;
        //
        // }

        // this.user = doc[0].user;
        // // this.locationType = doc[0].locationType;
        // this.location = doc[0].location;
        // // this.standards = doc[0].standards;
        // this.safeUnsafeAct = doc[0].safeUnsafeAct;
        // this.description = doc[0].description;
        // this.submissionImage = doc[0].image;
        // this.submittedImage = doc[0].image;
        // this.recordId = doc[0].id;
        // this.revisionId = doc[0].rev;
        // this.phoneNumber = doc[0].phoneNumber;
        this.immediateActionsTaken = doc[0].immediateActionsTaken;
        this.initForm();
      });
  }

  onRecordCreated(event) {
    console.log(event);
  }

  validateForm() {

  }

  saveSubmission($event, showType = "") {
    // this.badge.increase(1);
    //  this.presentToastMessage("Data saved");
    //  this.navCtrl.setRoot("HomePage");
    // • Category of the event
    // • Action taken or the event name
    // • Label for the event
    // • Numeric value assigned to the event
    // this.ga.trackEvent("Safety Incident", "Save Btn", this.form.value, 1);

    console.log($event);
    this.submitAttempt = true;

    $event.preventDefault();
    var safeUnsafeAct: string = "";
    if (this.form.controls["safeUnsafeAct"]) {
      safeUnsafeAct = this.form.controls["safeUnsafeAct"].value;
    }
    var form_result = {};
    form_result['TeamName'] = this.form.controls.whoAreYou.get("teamName").value ? this.form.controls.whoAreYou.get("teamName").value : '';
    form_result['ReporterName'] = this.form.controls.whoAreYou.get("reportersName").value ? this.form.controls.whoAreYou.get("reportersName").value : '';
    form_result['EmployeeEmail'] = this.form.controls.whoAreYou.get("employeeEmail").value ? this.form.controls.whoAreYou.get("employeeEmail").value : '';
    form_result['EmployeeNumber'] = this.form.controls.whoAreYou.get("employeeNumber").value ? this.form.controls.whoAreYou.get("employeeNumber").value : '';


    form_result['PersonInvolved'] = this.form.controls.whatHappened.get("wasPersonInvolved").value ? this.form.controls.whatHappened.get("wasPersonInvolved").value : '';
    form_result['WasAnyoneInjured'] = this.form.controls.whatHappened.get("wasAnyOneInjured").value ? this.form.controls.whatHappened.get("wasAnyOneInjured").value : '';
    form_result['WasInjuryWorkRelated'] = this.form.controls.whatHappened.get("wasInjuryWorkRelated").value ? this.form.controls.whatHappened.get("wasInjuryWorkRelated").value : '';
    // form_result['wasAnyoneInjured'] = this.form.controls.whatHappened.get("wasAnyoneInjured").value ? this.form.controls.whatHappened.get("wasAnyoneInjured").value : '';
    // form_result['WasInjuryWorkRelated'] = this.form.controls.whatHappened.get("wasInjuryWorkRelated").value;
    form_result['EnvironmentalImpact'] = this.form.controls.whatHappened.get("environmentalImpact").value ? this.form.controls.whatHappened.get("environmentalImpact").value : '';
    form_result['WhatWasEnvironmentalImpact'] = this.form.controls.whatHappened.get("whatWasEnvironmentalImpact").value ? this.form.controls.whatHappened.get("whatWasEnvironmentalImpact").value : '';
    form_result['PropertyVehicleDamage'] = this.form.controls.whatHappened.get("propertyVehicleDamage").value ? this.form.controls.whatHappened.get("propertyVehicleDamage").value : '';
    form_result['DamageCompanyBusiness'] = this.form.controls.whatHappened.get("damageCompanyBusiness").value ? this.form.controls.whatHappened.get("damageCompanyBusiness").value : '';

    // TypeOfSecurityConcern: string = this.form.controls.
    // ReasonForTheConversation: string = this.form.controls.

    form_result['IncidentDescription'] = this.form.controls.whatHappened.get("incidentDescription").value ? this.form.controls.whatHappened.get("incidentDescription").value : '';
    form_result['WhatHappenedVehicleAsset'] = this.form.controls.whatHappened.get("whatHappenedVehicleAsset").value ? this.form.controls.whatHappened.get("whatHappenedVehicleAsset").value : '';



    form_result['DateOfOccurence'] = this.form.controls.whereAndWhen.get("date").value ? this.form.controls.whereAndWhen.get("date").value : '';
    form_result['TimeOfOccurence'] = this.form.controls.whereAndWhen.get("time").value ? this.form.controls.whereAndWhen.get("time").value : '';

    form_result['LocationVariable'] = this.form.controls.whereAndWhen.get("locationType").value ? this.form.controls.whereAndWhen.get("locationType").value : '';
    if (this.form.controls.whereAndWhen.get("locationType").value == "Severn Trent Water (STW)") {
      form_result['locationType'] = "STW";
    }
    else if (this.form.controls.whereAndWhen.get("locationType").value == "Severn Trent Services (STS)") {
      form_result['locationType'] = "STS";
    }
    else {
      form_result['locationType'] = "Other";
    }
    form_result['PreciseLocation'] = this.form.controls.whereAndWhen.get("preciseLocation").value ? this.form.controls.whereAndWhen.get("preciseLocation").value : '';
    form_result['location'] = this.form.controls.whereAndWhen.get("Address").value ? this.form.controls.whereAndWhen.get("Address").value : '';
    form_result['DetailsOfActivityBeingDone'] = this.form.controls.whereAndWhen.get("detailsOfActivityBeingDone").value ? this.form.controls.whereAndWhen.get("detailsOfActivityBeingDone").value : '';
    form_result['WeatherConditionsAtTime'] = this.form.controls.whereAndWhen.get("weatherConditionsAtTime").value ? this.form.controls.whereAndWhen.get("weatherConditionsAtTime").value : '';
    // RemovedHazard: string = this.form.controls.whatHappened.get("wasPersonInvolved").value,
    form_result['CorrectiveActionTaken'] = this.form.controls.immediateCorrectiveActions.get("correctiveActionTaken").value ? this.form.controls.immediateCorrectiveActions.get("correctiveActionTaken").value: '';
    form_result['WhoWasInvolved'] = this.form.controls.personInvolved.get("whoWasInvolved").value ? this.form.controls.personInvolved.get("whoWasInvolved").value : '';
    form_result['Employee'] = this.form.controls.personInvolved.get("employee").value ? this.form.controls.personInvolved.get("employee").value : '';
    // form_result['TeamName'] = this.TeamName ? this.TeamName : '';
    form_result['FirstName'] = this.FirstName ? this.FirstName : '';
    form_result['LastName'] = this.LastName ? this.LastName : '';
    form_result['TelephoneNumber'] = this.form.controls.personInvolved.get("telephoneNumber").value ? this.form.controls.personInvolved.get("telephoneNumber").value : '';
    form_result['EmailAddress'] = this.form.controls.personInvolved.get("emailAddress").value ? this.form.controls.personInvolved.get("emailAddress").value : '';
    form_result['HomeAddress'] = this.form.controls.personInvolved.get("homeAddress").value ? this.form.controls.personInvolved.get("homeAddress").value : '';
    form_result['Postcode'] = this.form.controls.personInvolved.get("postCode").value ? this.form.controls.personInvolved.get("postCode").value : '';
    form_result['EmployeeNotOnList'] = this.form.controls.personInvolved.get("employeeNotOnList").value ? this.form.controls.personInvolved.get("employeeNotOnList").value : '';
    form_result['Company'] = this.form.controls.personInvolved.get("company").value ? this.form.controls.personInvolved.get("company").value : '';
    form_result['JobTitle'] = this.form.controls.personInvolved.get("jobTitle").value ? this.form.controls.personInvolved.get("jobTitle").value : '';
    form_result['Age'] = this.form.controls.personInvolved.get("age").value ? this.form.controls.personInvolved.get("age").value : '';
    form_result['Gender'] = this.form.controls.personInvolved.get("gender").value ? this.form.controls.personInvolved.get("gender").value : '';
    form_result['AddName'] = this.form.controls.personInvolved.get("addName").value ? this.form.controls.personInvolved.get("addName").value : '';
    form_result['EmployeeName'] = this.form.controls.personInvolved.get("employeeName").value ? this.form.controls.personInvolved.get("employeeName").value : '';

    form_result['WasMoreThanOnePersonInvolved'] = this.form.controls.personInvolved.get("wasMoreThanOnePersonInvolved").value ? 
    this.form.controls.personInvolved.get("wasMoreThanOnePersonInvolved").value : '';
    // form_result['IncidentReferenceNumber'] = this.form.controls.personInvolved.get("incidentReferenceNumber").value ? 
    // this.form.controls.personInvolved.get("incidentReferenceNumber").value : '';


    // MostApplicable: sting = this.form.controls.personInvolved.get("postCode").value,
    form_result['EventCategoryApplicable'] = this.form.controls.eventCategoryGroup.get("eventTypeControl").value ? this.form.controls.eventCategoryGroup.get("eventTypeControl").value : '';
    form_result['SubCategoryApplicable'] = this.form.controls.eventCategoryGroup.get("eventSubTypeControl").value ? this.form.controls.eventCategoryGroup.get("eventSubTypeControl").value : '';
    form_result['PotentialToCauseSeriousInjury'] = this.form.controls.eventCategoryGroup.get("potentialToCauseSeriousInjury").value ? this.form.controls.eventCategoryGroup.get("potentialToCauseSeriousInjury").value : '';
    // form_result['ActionRequired'] = this.form.controls.immediateCorrectiveAction.get("actionsRequired").value;
    // form_result['ActionRequired'] = this.form.controls.immediateCorrectiveAction.get("actionsRequired").value ? this.form.controls.personInvolvedGroup.get("actionsRequired").value : '';
    let coordinate = this.form.controls.whereAndWhen.get("Coordinate").value;
    if (coordinate != null) {
      form_result['XCoordinate'] = coordinate.split(",")[0];
      form_result['YCoordinate'] = coordinate.split(",")[1];
    } else {
      form_result['XCoordinate'] = "";
      form_result['YCoordinate'] = "";
    }

    form_result['RefrerenceNumber'] = this.referenceNumber ? this.referenceNumber : '';
    form_result["image1"] = this.form.controls.imageMediaGroup.get("image1").value;
    form_result["image2"] = this.form.controls.imageMediaGroup.get("image2").value;
    form_result["image3"] = this.form.controls.imageMediaGroup.get("image3").value;
    form_result["image4"] = this.form.controls.imageMediaGroup.get("image4").value;

    form_result['InjuryResultedInFatality'] = this.form.controls.bodypartsGroup.get("injuryResultedInFatality").value ? this.form.controls.bodypartsGroup.get("injuryResultedInFatality").value : '';
    form_result['IncidentResultedInRestrictedDuties'] = this.form.controls.bodypartsGroup.get("incidentResultedInRestrictedDuties").value ? this.form.controls.bodypartsGroup.get("incidentResultedInRestrictedDuties").value : '';
    form_result['IncidentResultedInLostTime'] = this.form.controls.bodypartsGroup.get("incidentResultedInLostTime").value ? this.form.controls.bodypartsGroup.get("incidentResultedInLostTime").value : '';

    form_result['BodypartsGroup'] = this.form.controls.bodypartsGroup.get("bodypartsControl").value ? this.form.controls.bodypartsGroup.get("bodypartsControl").value : '';
    form_result ['BodypartsControl'] = this.form.controls.bodypartsGroup.get("bodypartsControl").value ? this.form.controls.bodypartsGroup.get("bodypartsControl").value : '';
    form_result ['bodypartsGroup'] = this.form.controls.bodypartsGroup.get("bodypartsControl").value ? this.form.controls.bodypartsGroup.get("bodypartsControl").value : '';
    form_result ['bodypartsControl'] = this.form.controls.bodypartsGroup.get("bodypartsControl").value ? this.form.controls.bodypartsGroup.get("bodypartsControl").value : '';

    form_result ['BodyPart'] = this.form.controls.bodypartsGroup.get("bodyPart").value ? this.form.controls.bodypartsGroup.get("bodyPart").value : '';


    form_result['ImmediateTreatmentGiven'] = this.form.controls.bodypartsGroup.get("immediateTreatmentGiven").value ? this.form.controls.bodypartsGroup.get("immediateTreatmentGiven").value : '';
    form_result['TreatmentDetails'] = this.form.controls.bodypartsGroup.get("treatmentDetails").value ? this.form.controls.bodypartsGroup.get("treatmentDetails").value : '';
    form_result['AdditionalTreatmentGiven'] = this.form.controls.bodypartsGroup.get("additionalTreatmentGiven").value ? this.form.controls.bodypartsGroup.get("additionalTreatmentGiven").value : '';
    // form_result['InvestigatingManager'] = this.form.controls.investigator.get("investigatingManager").value?this.form.controls.investigator.get("investigatingManager").value:'';
    form_result['DateAbsenceStarted'] = this.form.controls.bodypartsGroup.get("date").value ? this.form.controls.bodypartsGroup.get("date").value : '';
    form_result['ReturnToWork'] = this.form.controls.bodypartsGroup.get("date").value ? this.form.controls.bodypartsGroup.get("date").value : '';
    form_result['AdditionalTime'] = this.form.controls.bodypartsGroup.get("additionalTime").value ? this.form.controls.bodypartsGroup.get("additionalTime").value : '';
    form_result['AdditionalTimeComments'] = this.form.controls.bodypartsGroup.get("additionalTimeComments").value ? this.form.controls.bodypartsGroup.get("additionalTimeComments").value : '';

    form_result['DateRestrictedDuties'] = this.form.controls.bodypartsGroup.get("date").value ? this.form.controls.bodypartsGroup.get("date").value : '';
    form_result['ReturnToNormal'] = this.form.controls.bodypartsGroup.get("date").value ? this.form.controls.bodypartsGroup.get("date").value : '';
    form_result['AdditionalRestricted'] = this.form.controls.bodypartsGroup.get("additionalRestricted").value ? this.form.controls.bodypartsGroup.get("additionalRestricted").value : '';
    form_result['AdditionalRestrictedComments'] = this.form.controls.bodypartsGroup.get("additionalRestrictedComments").value ? this.form.controls.bodypartsGroup.get("additionalRestrictedComments").value : '';

    if (showType != "") {
      form_result["Sent"] = "sending";
    }
    else {
      if (this.isSaveSubmit) {
        form_result["Sent"] = "sent";
      }
      else {
        form_result["Sent"] = "no sent";
      }
    }

    // image: string = this.form.controls["image"].value,

    // image1: string = this.form.controls["image1"].value,
    // image2: string = this.form.controls["image2"].value,
    // image3: string = this.form.controls["image3"].value,
    // image4: string = this.form.controls["image4"].value,

    let id: any = this.recordId,
      category: any = this.category,
      revision: string = this.revisionId;


    if (this.recordId !== '') {
      // update
      this.DB.updateSubmission(id, revision, category, form_result, this.isSaveSubmit)

        .then((data) => {

          this.hideForm = true;
          // this.sendNotification("Updated");
          if (showType == "") {
            if (this.isSaveSubmit) {
              this.navCtrl.setRoot("TabsPage", { tab: 1 });
              this.presentToastMessage("Sent");
            }
            else {
              this.navCtrl.setRoot('HomePage');
              this.presentToastMessage("Updated");
            }
          }
          else {
            this.navCtrl.setRoot('HomePage');
            this.presentToastMessage("Updated");
          }
          this.isSaveSubmit = false;
        });
    }

    // new record
    else {
      this.DB.addSubmission(category, form_result, this.isSaveSubmit)
        .then((data) => {
          console.log(data);
          this.hideForm = true;
          this.sendNotification("Added");
          if (showType == "") {
            if (this.isSaveSubmit) {
              this.navCtrl.setRoot("TabsPage", { tab: 1 });
              this.presentToastMessage("Sent");
            }
            else {
              this.navCtrl.setRoot('HomePage');
            }
          }
          else {
            this.navCtrl.setRoot('HomePage');
          }
          this.isSaveSubmit = false;
        });
    }




  }



  presentToastMessage(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  initForm() {
    if (this.XCoordinate != null && this.YCoordinate != null && this.XCoordinate != "" && this.YCoordinate != "") {
      this.XYCoordinate = this.XCoordinate + "," + this.YCoordinate;
    }
    this.form = this.fb.group({

      whoAreYou: this.fb.group({
        reportersName: this.ReporterName,  // this.PersonInvolved,
        teamName: this.TeamName,
        employeeEmail: [{ value: this.EmployeeEmail, disabled: false }],
        employeeNumber: [{ value: this.EmployeeNumber, disabled: false }],
      }),


      whatHappened: this.fb.group({
        wasPersonInvolved: [{ value: this.PersonInvolved, disabled: false }],  // this.PersonInvolved,
        wasAnyOneInjured: [{ value: this.WasAnyoneInjured, disabled: false }],
        wasInjuryWorkRelated: [{ value: this.WasInjuryWorkRelated, disabled: false }],
        propertyVehicleDamage: [{ value: this.PropertyVehicleDamage, disabled: false }],
        whatHappenedVehicleAsset: [{ value: this.whatHappenedVehicleAsset, disabled: false }],
        damageCompanyBusiness: [{ value: this.DamageCompanyBusiness, disabled: false }],
        environmentalImpact: [{ value: this.EnvironmentalImpact, disabled: false }],
        whatWasEnvironmentalImpact: [{ value: this.WhatWasEnvironmentalImpact, disabled: false }],
        incidentDescription: [{ value: this.IncidentDescription, disabled: false }],  // this.IncidentDescription

      }),
      whereAndWhen: this.fb.group({
        date: [{ value: this.DateOfOccurence, disabled: false }],  // this.DateOfOccurence,
        time: [{ value: this.TimeOfOccurence, disabled: false }],  // this.TimeOfOccurence,
        locationType: [{ value: this.LocationVariable, disabled: false }],  // this.LocationVariable,
        whatHappenedVehicleAsset: [{ value: this.LocationVariable, disabled: false }],
        location: '',
        preciseLocation: this.PreciseLocation,
        detailsOfActivityBeingDone: this.DetailsOfActivityBeingDone,
        weatherConditionsAtTime: [{ value: this.WeatherConditionsAtTime, disabled: false }],
        Address: this.Location,
        Coordinate: [{ value: this.XYCoordinate, disabled: false }],  // this.XYCoordinate

      }),
      immediateCorrectiveActions: this.fb.group({
        correctiveActionTaken:[{value: this.CorrectiveActionTaken, disabled: false}],   // this.ActionTaken,
        // actionsRequired:[{value: this.ActionRequired, disabled: false}, Validators.required],  // this.ActionRequired

      }),
      eventCategoryGroup: this.fb.group({
        eventTypeControl: this.EventCategoryApplicable,
        eventSubTypeControl: this.SubCategoryApplicable,
        potentialToCauseSeriousInjury: this.PotentialToCauseSeriousInjury

      }),

      personInvolved: this.fb.group({
        whoWasInvolved: [{ value: this.WhoWasInvolved, disabled: false }],  // this.WhoWasInvolved,
        wasMoreThanOnePersonInvolved: [{ value: this.WasMoreThanOnePersonInvolved, disabled: false }],
        // incidentReferenceNumber: [{ value: this.IncidentReferenceNumber, disabled: false}],
        employee: this.Employee,
        employeeName: this.EmployeeName,
        employeeNotOnList: this.EmployeeNotOnList,
        company: this.Company,
        jobTitle: this.JobTitle,
        whatHappenedVehicleAsset: this.JobTitle,


        telephoneNumber: [{ value: this.TelephoneNumber, disabled: false }],  // this.TelephoneNumber,
        emailAddress: [{ value: this.EmailAddress, disabled: false }],  // this.EmailAddress,
        homeAddress: [{ value: this.HomeAddress, disabled: false }],  // this.HomeAddress,
        postCode: [{ value: this.Postcode, disabled: false }],  // this.Postcode,
        age: this.Age,
        gender: this.Gender,
        addname: [{ value: this.AddName, disabled: false }],

      }),

      imageMediaGroup: this.fb.group({
        "image1": this.image1,
        "image2": this.image2,
        "image3": this.image3,
        "image4": this.image4,
      }),

      bodypartsGroup: this.fb.group({
        injuryResultedInFatality: this.InjuryResultedInFatality,
        incidentResultedInRestrictedDuties: this.IncidentResultedInRestrictedDuties,
        incidentResultedInLostTime: this.IncidentResultedInLostTime,
        date: [{ value: this.DateOfOccurence, disabled: false }],
        return: [{ value: this.Return, disabled: false }],
        bodypartsControl: [{value: this.BodypartsControl, disabled: false}],
        bodypartsGroup: [{value: this.BodypartsGroup, disabled: false}],

        bodyPart: [{value: this.BodyPart, disabled: false}],
        // bodypartsInjuredMultiselectTypeControl:'',
        // InjuryTypeControl:'',
        // illnessDetails:'',
        immediateTreatmentGiven: [{ value: this.ImmediateTreatmentGiven, disabled: false }],
        treatmentDetails: this.TreatmentDetails,
        additionalTreatmentGiven: this.AdditionalTreatmentGiven,
        dateAbsenceStarted: [{ value: this.DateAbsenceStarted, disabled: false }],
        returnToWork: [{ value: this.ReturnToWork, disabled: false }],
        additionalTime: [{ value: this.AdditionalTime, disabled: false }],
        additionalTimeComments: [{ value: this.AdditionalTimeComments, disabled: false }],

        dateRestrictedDuties: [{ value: this.DateRestrictedDuties, disabled: false }],
        returnToNormal: [{ value: this.ReturnToNormal, disabled: false }],
        additionalRestricted: [{ value: this.AdditionalRestricted, disabled: false }],
        additionalRestrictedComments: [{ value: this.AdditionalRestrictedComments, disabled: false }],

      }),
      // investigator: this.fb.group({
      //   investigatingManager:this.InvestigatingManager
    })
  }

  presentPopover(myEvent) {
    let popover = this.popOverCtrl.create('PopOverPage');
    popover.present({
      ev: myEvent
    });
  }


  goHome() {
    if (this.isSaveSubmit) {
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
      buttons: [
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

  takePhotograph1() {
    this.image.takePhotograph1()
      .then((image1) => {
        this.submissionImage1 = image1.toString();
        this.submittedImage1 = image1.toString();

        console.log(image1);
        this.photoTaken1 = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  takePhotograph2() {
    this.image.takePhotograph2()
      .then((image2) => {
        this.submissionImage2 = image2.toString();
        this.submittedImage2 = image2.toString();

        console.log(image2);
        this.photoTaken2 = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  takePhotograph3() {
    this.image.takePhotograph3()
      .then((image3) => {
        this.submissionImage3 = image3.toString();
        this.submittedImage3 = image3.toString();

        console.log(image3);
        this.photoTaken3 = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  takePhotograph4() {
    this.image.takePhotograph4()
      .then((image4) => {
        this.submissionImage4 = image4.toString();
        this.submittedImage4 = image4.toString();

        console.log(image4);
        this.photoTaken4 = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteSubmission() {

    let submission;

    this.DB.retrieveSubmission(this.recordId)
      .then((doc) => {
        submission = doc[0].submission;
        return this.DB.removeSubmission(this.recordId, this.revisionId)
      })
      .then((data) => {
        this.hideForm = true;
        console.log(data);
        this.sendNotification("Deleted");
        this.navCtrl.push("HomePage");
      })
      .catch((err) => {
        console.log(err);
      })
  }


  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

  getUserEmail() {
    return this.storage.get('email')
      .then((email) => {
        this.email = email;
        console.log('Your email is', email);
      }).catch(err => {
        console.log(err);
      });
  }

  getUserTeam() {
    return this.storage.get('team')
      .then((team) => {
        this.team = team;
        console.log('Your team is', team);
      }).catch(err => {
        console.log(err);
      });
  }

  // redux stuff


  submitFunction($event) {
    var me = this;
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: 'Are you sure you want to SAVE & SUBMIT the data?',
      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            if (this.networkProvider.obtainNetworkConnection()) {
              this.isSaveSubmit = true;
              this.saveSubmission($event);
            }
            else {
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
