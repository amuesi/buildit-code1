import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { FlocSTW } from '../../models/floclocations';

@Injectable()
export class FlocSTWProvider {

  flocLocations:FlocSTW[];
  items:any;
  flocLocationsUrl = "assets/data/flocSTW.json";

  constructor(private http: Http) {
    // if(!flag)
    // {
    //   this.flocLocationsUrl = "assets/data/flocSTS.json";
    // }
  }

  load(): Observable<FlocSTW[]>{
    return this.http.get(this.flocLocationsUrl)
      .map(res => <FlocSTW[]>res.json());
  }

  filterItems(searchTerm){

    this.items = this.load().subscribe(data => {
      this.flocLocations = data;
      console.log(data);
    })
    return this.items.filter((item) => {
      item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  searchFlocLocations(searchParam: string): Observable<FlocSTW[]> {
    return this.http.get(this.flocLocationsUrl)
      .map(res => <FlocSTW[]>(res.json().items))
  }


}// end class
