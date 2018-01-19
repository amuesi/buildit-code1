import { Component, Input, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UsernameServiceProvider } from '../../providers/username-service/username-service';
import { ApplicationDataProvider } from '../../providers/application-data/application-data';
import { ModalController, Events, Config, Platform, NavController, NavParams, ViewController } from 'ionic-angular';
import { SubmissionsProvider } from '../../providers/submissions/submissions';
import { LocationType } from '../../models/locationType';
import { NetworkProvider } from '../../providers/network/network';
import { GeodesyService } from '../../providers/geodesy-service/geodesy-service';

@Component({
  selector: 'who-are-you',
  templateUrl: 'who-are-you.html'
})
export class WhoAreYouComponent implements OnInit {

  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;

  @Input()
  isNotVisible: boolean;

  public FirstName: any;
  public LastName: any;
  public TeamName: any;
  public ReporterName: any;
  public username: any;
  public locationType:any;
  public searchControl: FormControl;
  public colUsername:string;
  public isMyProfile: boolean = false;
  public employee: any;
  public employees: any;
  public statusConditions:any;

  public StatusTypes:any;

  public data: any;
  public _DB: any;
  public chcekbox: boolean;


  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private appDataProvider: ApplicationDataProvider,
    public viewCtrl: ViewController,
    private DB: SubmissionsProvider,
    public storage: Storage, 
    public config: Config, 
    public colleaguesService: UsernameServiceProvider,
      public Modal:ModalController,
      private ev: Events,
      private networkProvider: NetworkProvider,
      private geodesyService: GeodesyService) {
    console.log('WhoAreYou');
    console.log('------------------------------')
  }

  ngOnInit() {
    console.log('\tWhoAreYou: ionViewDidLoad')
    this.username = this.config.get('username');
    this.colUsername = this.config.get('username');


    console.log(`\tWhoAreYou: Fetched username ${this.username}`);
    this.getUserDetails();
    if (this.colUsername != null) {
      this.isMyProfile = this.username == this.colUsername.toLowerCase();
    
    // this.formInit();
    this.StatusTypeInit();
    
    }

    console.log('\tWhoAreYou: Loaded Page');
    console.log('\t\tthis.employee: ', this.employee);
    console.log('\t\tthis.employee: ', this.username);

  }

  // async formInit(){
  //   try {
  //     await this.appDataProvider.getLocationType()
  //         .subscribe(locationType =>{
  //           this.locationType = locationType;
  //           console.dir('appDataServicengOnInit=', this.locationType);
  //         });
  //   }
  //   catch (error) {
  //     console.warn(error);
  //   }
  // }

    async StatusTypeInit(){
      try {
        await this.appDataProvider.getStatus()
            .subscribe(category =>{
              this.StatusTypes = category;
              console.dir('appDataServicengOnInit=', this.StatusTypes);
            });
      }
      catch (error) {
        console.warn(error);
  
      }
    }

  getUserDetails(){
    console.log('\tWhoAreYou: getUserDetails');
    
    this.employee = this.config.get('employee');
    console.log('\tWhoAreYou: Found Employee ', this.employee);
    //   this.DB.getFirstName().then((data) =>{
    //   this.firstName = data;
    // });
    // this.DB.getLastName().then((data) =>{
    //   this.lastName = data;
    // });
    // this.DB.getTeamName().then((data) =>{
    //   this.teamName = data;
    // });

    //  this.colleaguesService.search(query,1)
    //      .then(data => {this.navCtrl.push(this.resultsPage, {colleagues:(<any>data).Items, count:(<any>data).TotalAvailable, backText: this.colleagueDetails.FirstName, query})})
  }

  // updateCheckbox() {
  //   console.log('Cucumbers new state:' + this.updateCheckbox);
  // }
  

  autosave($event, key, control_name){
    var data = {};
    data['key'] = key;
    data['value'] = this.parent.controls.whoAreYou.get(control_name).value;

    if (this.parent.controls.whoAreYou.get(control_name).dirty){
      this.ev.publish("autosave_who_are_you", data);
    }
}// end class

  // ngOnInit(){
  //   this.DB.getFirstName().then((data) =>{
  //     this.FirstName = data;
  //   });
  //   this.DB.getLastName().then((data) =>{
  //     this.LastName = data;
  //   });
  //   this.DB.getTeamName().then((data) =>{
  //     this.TeamName = data;
  //   });
  // this.FirstName = this.DB.getFirstName();
  //  this.LastName = this.DB.getLastName();
  //   this.TeamName = this.DB.getTeamName();

}
