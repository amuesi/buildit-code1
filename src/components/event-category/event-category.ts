import { Component , Input} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ApplicationDataProvider} from "../../providers/application-data/application-data";
import {Events} from "ionic-angular";
@Component({
  selector: 'event-category',
  templateUrl: 'event-category.html'
})
export class EventCategoryComponent {

  @Input()
  parent: FormGroup;

    @Input()
    isNotEditable: boolean;

  eventType:any;
  eventSubType: any;

  constructor(private appDataProvider: ApplicationDataProvider,
                private ev:Events) {
      this.ev.subscribe('functionCall:subcategory', eventData => {
          this.eventTypeCategoryChange(eventData);
      });
    console.log('Hello EventCategoryComponent Component');
    
  }
  ngOnInit(){
    this.formInit();
  }

  async formInit(){
    try {
      await this.appDataProvider.getCategory()
          .subscribe(category =>{
            this.eventType = category;
            console.dir('appDataServicengOnInit=', this.eventType);
          });
    }
    catch (error) {
      console.warn(error);
    }

  }
  async eventTypeCategoryChange(value){
    try {
      await this.appDataProvider.getSubCategory()
          .subscribe(subcategory =>{
            let items = [];
            for (var i = 0 ; i < subcategory.length; i++)
            {
              if (subcategory[i].EventCategory == value)
              {
                items.push(subcategory[i]);
              }
            }
            this.eventSubType = items;
            console.dir('appDataServicengOnInit=', this.eventType);
          });
      this.autosave(value, "EventCategoryApplicable", "eventTypeControl");
    }
    catch (error) {
      console.warn(error);
    }
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

        if (this.parent.controls.eventCategoryGroup.get(control_name).dirty){
            this.ev.publish("autosave_incident", data);
        }
    }

}