import { Component , Input} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Events} from 'ionic-angular';
import { ApplicationDataProvider } from "../../providers/application-data/application-data";

@Component({
  selector: 'standards-behaviour',
  templateUrl: 'standards-behaviour.html'
})
export class StandardsBehaviourComponent {
 @Input()
  parent: FormGroup;

    @Input()
    isNotEditable: boolean;

    public StandardType:any;
  
  constructor(private fb: FormBuilder,
              private ev: Events,
              private appDataProvider: ApplicationDataProvider){
  
  }

  ngOnInit(){
    this.StandardTypeInit();
   
   }
   
   async StandardTypeInit(){
     try {
       await this.appDataProvider.getStandards()
         .subscribe(category =>{
           this.StandardType = category;
           console.dir('appDataServicengOnInit=', this.StandardType);
         });
     }
     catch (error) {
       console.warn(error);
     }
   }

    consideredTheFollowingChange($event){
        if(this.parent.controls.furtherInformation.get("consideredTheFollowing").dirty){
            var data = {
                'key': "MostApplicable",
                'value': this.parent.controls.furtherInformation.get("consideredTheFollowing").value
            };

            this.ev.publish("positive_behaviour_data_update_event", data);
        }

    }
    autosave($event, key, control_name){
        var data = {};
        data['key'] = key;
        data['value'] = this.parent.controls.furtherInformation.get(control_name).value;

        if (this.parent.controls.furtherInformation.get(control_name).dirty){
            this.ev.publish("autosave_positive_behaviour", data);
        }
    }
  
}
