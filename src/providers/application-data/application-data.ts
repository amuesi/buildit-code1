import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CacheService } from "ionic-cache";


import { FlocLocation } from '../../models/floclocations';
import {LocationType} from  '../../models/locationType';
import {Standards} from  '../../models/standards';
import {
  GeneralType, bodypartsInjuredMultiselectType, SecurityIncidentType,
  SubCategoryType, TreatmentType, LocationsType, person
} from "../../models/comboboxDataType";

@Injectable()
export class ApplicationDataProvider {


  email: any;
  profile:any[];
  url:any;
  response:any;
  _body:any;
  items:any;


  // data files
  flocDataUrl = "assets/data/flocLocations.json";
  asset: any = "assets/data/asset.json";
  wellbeingConversations:any = "assets/data/wellbeingConversations.json";
  wellbeingConversationReasons:any = "assets/data/wellbeingConversationReasons.json";
  standards:any = "assets/data/standards.json";
  security_incidents:any = "assets/data/security_incidents.json";
  safety_incidents:any = "assets/data/safety_incidents.json";
  locationType:any = "assets/data/locationType.json";
  status:any = "assets/data/status.json";
  event_category: any = "assets/data/EventCategory.json";
  event_subcategory: any = "assets/data/EventSubCategory.json";
  securityCategory: any = "assets/data/securityCategory.json";
  securityIncident: any = "assets/data/securityIncidentTypes.json";
  bodypartsInjuredMultiselect: any = "assets/data/InjuryList-New.json";
  bodypart: any = "assets/data/bodypart.json";
  CopyofEventReportType: any = "assets/data/CopyofEventReportType.json";
  InjuryTypes: any = "assets/data/InjuryTypes.json";
  weather: any = "assets/data/weather.json";
  wellbeingActions: any = "assets/data/WellbeingActions.json";
  treatment: any = "assets/data/treatment.json";
  eventReportType: any = "assets/data/eventReportType.json";
  persons: any = "assets/data/persons.json";
  incidentResultedInLostTimesList: any = "assets/data/incidentResultedInLostTimes.json";
  incidentResultedInRestrictedDutiesList: any = "assets/data/incidentResultedInRestrictedDuties.json";
  whoWasInvolved: any = "assets/data/whoWasInvolved.json";
  waterQuality: any = "assets/data/waterQuality.json";
  environmentalHazard: any = "assets/data/environmentalHazard.json";
  hazard: any = "assets/data/hazard.json";
  vehicleAsset: any = "assets/data/vehicleAsset.json";

  reportedToPolice: any = "assets/data/reportedToPolice.json";
  policeForce: any = "assets/data/policeForce.json";
  itemOwnership: any = "assets/data/itemOwnership.json";
  smartWaterSite: any = "assets/data/smartWaterSite.json";
  seriousInjuryOrFatality: any = "assets/data/seriousInjuryOrFatality.json";

  constructor(public http: Http,
              public cache: CacheService) {
    console.log('Hello Application Data Provider');
  }

  getreportedToPolice():Observable<GeneralType[]>
  {
    return this.http.get(this.reportedToPolice)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }

  getpoliceForce():Observable<GeneralType[]>
  {
    return this.http.get(this.policeForce)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }

  getitemOwnership():Observable<GeneralType[]>
  {
    return this.http.get(this.itemOwnership)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }

  getsmartWaterSite():Observable<GeneralType[]>
  {
    return this.http.get(this.smartWaterSite)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }

  getseriousInjuryOrFatality():Observable<GeneralType[]>
  {
    return this.http.get(this.seriousInjuryOrFatality)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }




  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    // console.error(errMsg);
    return Observable.throw(errMsg);
  }

  // get location type
  getLocationType():Observable<LocationType[]>{
    return this.http.get(this.locationType)
      .map(res => <LocationType[]>res.json()).catch(this.handleError);
  }

  getCategory():Observable<GeneralType[]>
  {
    return this.http.get(this.event_category)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);

  }

  getSubCategory():Observable<SubCategoryType[]>
  {
    return this.http.get(this.event_subcategory)
      .map(res => <SubCategoryType[]>res.json()).catch(this.handleError);

  }

  getbodypartsInjuredMultiselectType():Observable<bodypartsInjuredMultiselectType[]>
  {
    return this.http.get(this.bodypartsInjuredMultiselect)
      .map(res => <bodypartsInjuredMultiselectType[]>res.json()).catch(this.handleError);
  }

  getbodypart():Observable<GeneralType[]>
  {
    return this.http.get(this.bodypart)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }

  getasset():Observable<GeneralType[]>
  {
    return this.http.get(this.asset)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }

  getCopyofEventReportType():Observable<GeneralType[]>
  {
    return this.http.get(this.CopyofEventReportType)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }
  getVehicleAsset():Observable<GeneralType[]>
  {
    return this.http.get(this.vehicleAsset)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }
  getIncidentResultedInLostTimes():Observable<GeneralType[]>
  {
    return this.http.get(this.incidentResultedInLostTimesList)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }

  getInjuryTypes():Observable<GeneralType[]>
  {
    return this.http.get(this.InjuryTypes)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }

  getIncidentResultedInRestrictedDuties():Observable<GeneralType[]>
  {
    return this.http.get(this.incidentResultedInRestrictedDutiesList)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }

  getStandards():Observable<GeneralType[]>
  {
    return this.http.get(this.standards)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }
  getHazard():Observable<GeneralType[]>
  {
    return this.http.get(this.hazard)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }
  getWaterQuality():Observable<GeneralType[]>
  {
    return this.http.get(this.waterQuality)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }
  getEnvironmentalHazard():Observable<GeneralType[]>
  {
    return this.http.get(this.environmentalHazard)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }
  getWeather():Observable<GeneralType[]>
  {
    return this.http.get(this.weather)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }
  getStatus():Observable<GeneralType[]>
  {
    return this.http.get(this.status)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }
  getWellbeingActions():Observable<GeneralType[]>
  {
    return this.http.get(this.wellbeingActions)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }
  getWellbeingConversationReasons():Observable<GeneralType[]>
  {
    return this.http.get(this.wellbeingConversationReasons)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }
  getWhoWasInvolved():Observable<GeneralType[]>
  {
    return this.http.get(this.whoWasInvolved)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }
  getTreatment():Observable<TreatmentType[]>
  {
    return this.http.get(this.treatment)
      .map(res => <TreatmentType[]>res.json()).catch(this.handleError);
  }
  getSecurityCategory():Observable<GeneralType[]>
  {
    return this.http.get(this.securityCategory)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }

  getSecurityIncidentType():Observable<SecurityIncidentType[]>
  {
    return this.http.get(this.securityIncident)
      .map(res => <SecurityIncidentType[]>res.json()).catch(this.handleError);
  }

  getEventReportType():Observable<GeneralType[]>
  {
    return this.http.get(this.eventReportType)
      .map(res => <GeneralType[]>res.json()).catch(this.handleError);
  }

  getLocationType1():Observable<LocationsType[]>{
    return this.http.get("assets/data/locations.json")
      .map(res => <LocationsType[]>res.json()).catch(this.handleError);
  }


  getTreatmentType():Observable<TreatmentType[]>{
    return this.http.get(this.treatment)
      .map(res => <TreatmentType[]>res.json()).catch(this.handleError);
  }

  getPersons():Observable<person[]>{
    return this.http.get(this.persons)
        .map(res => <person[]>res.json()).catch(this.handleError);
  }
  

  // getPersons(){
  //   let key = 'personsData';
  //   return new Promise(resolve => {
  //     var me = this;
  //     this.cache.getItem(key).catch(() => {
  //       // fall here if item is expired or doesn't exist
  //       let result = me.http.get(me.persons).map(res => <person[]>res.json()).catch(me.handleError);
  //
  //       me.cache.saveItem(key, result);
  //
  //       resolve(result);
  //     }).then((data) => {
  //       resolve(data);
  //     });
  //   });
  // }
}
