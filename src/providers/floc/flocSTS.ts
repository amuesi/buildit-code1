import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { FlocSTS } from '../../models/floclocations';

@Injectable()
export class FlocSTSProvider {

    flocLocations:FlocSTS[];
    items:any;
    flocLocationsUrl = "assets/data/flocSTS.json";

    constructor(private http: Http) {
        // if(!flag)
        // {
        //     this.flocLocationsUrl = "assets/data/flocSTS.json";
        // }
    }

    load(): Observable<FlocSTS[]>{
        return this.http.get(this.flocLocationsUrl)
            .map(res => <FlocSTS[]>res.json());
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

    searchFlocLocations(searchParam: string): Observable<FlocSTS[]> {
        return this.http.get(this.flocLocationsUrl)
            .map(res => <FlocSTS[]>(res.json().items))
    }


}// end class
