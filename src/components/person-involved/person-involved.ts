import { Component , Input, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Events, NavParams, NavController} from "ionic-angular";
import {PersonSearchPage} from "../../pages/person_search/person-search";
import { ApplicationDataProvider } from '../../providers/application-data/application-data';


@Component({
  selector: 'person-involved',
  templateUrl: 'person-involved.html'
})
export class PersonInvolvedComponent implements OnInit {

  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;

  PeopleWhoWereInvolved: any;
  UsersWhoeWereInvolved: any;
  vehicleAsset: any;

  employeeNotOnList:any = false;
  firstname:any;
  surname:any;
  employeeName: any;
  

  public selectedPeopleWhoWereInvolved:boolean = false;
  public selectedUsersWhoWereInvolved:boolean = false;
  // public selectedMoreThanOne: any = false;
 


    constructor(private navController:NavController, private ev: Events, private fb: FormBuilder, private navParams:NavParams, private appDataProvider: ApplicationDataProvider){

      var data = navParams.get('loc_data');
      if (data != null)
      {
        this.firstname = data.FirstName;
        this.surname = data.Surname;
        this.employeeName = this.firstname + " " + this.surname;
      }

      this.ev.subscribe('goToPersonComponent', data => {
        this.firstname = data.FirstName;
        this.surname = data.Surname;
        this.employeeName = this.firstname + " " + this.surname;
      });
    }

    ngOnInit () {

     this.WhoWasInvolvedInit() ;
     this.vehicleAssetInit();

    }

    whoWasInvolved($event){
      console.log(`in here!!`); console.log(`${$event}`);console.dir($event)
      switch($event) {
        case "Agency": 
        case "Contractor": 
        case "Member of the Public": 
        {
          this.selectedPeopleWhoWereInvolved = true;
          console.log(`in here agency!!`)
          break;

        }

        default: {
          this.selectedPeopleWhoWereInvolved = false;
          break;
  
        }  
      }
    }

    usersWereInvolved($event){
      console.log(`in here!!`); console.log(`${$event}`);console.dir($event)
      switch($event) {
        case "STW/STS Employee":
        {
          this.selectedUsersWhoWereInvolved = true;
          console.log(`in here agency!!`)
          break;

        }

        default: {
          this.selectedUsersWhoWereInvolved = false;
          break;
  
        }  
      }
    }

    // WasMoreThanOnePersonInvolved($event){
    //   switch($event) {
    //     case "Yes": 
    //     {
    //       this.selectedMoreThanOne = true;
    //       break;

    //     }

    //     default: {
    //       this.selectedMoreThanOne = false;
    //       break;
  
    //     }
    //   }
    // }

  async WhoWasInvolvedInit(){
      try {
        await this.appDataProvider.getWhoWasInvolved()

          .subscribe(category =>{
            // console.log (whowasinvolved);
            this. PeopleWhoWereInvolved = category;
            error => console.log(error);
            // console.dir('appDataServicengOnInit=', this.InjuryType);
          });
      }
      catch (error) {
        console.warn(error);
      }
    }

    async vehicleAssetInit(){
      try {
        await this.appDataProvider.getVehicleAsset()
          .subscribe(category =>{
            this.vehicleAsset = category;
            // console.dir('appDataServicengOnInit=', this.InjuryType);
          });
      }
      catch (error) {
        console.warn(error);
      }
    }

  getEmplyeeOpen(){
    // this.ev.publish("previousPageName1", "SafetyIncidentPage");
    this.navController.push(PersonSearchPage);
  }

  autosave($event, key, control_name){
    var value;
    if($event.currentTarget == null){
      value = $event;
    }
    else{
      value = $event.currentTarget.value;
    }
    let key_name = key;
    var data = {};
    data['key'] = key_name;
    data['value'] = value;

    if (this.parent.controls.personInvolved.get(control_name).dirty){
      this.ev.publish("autosave_incident", data);
    }
  }
}
