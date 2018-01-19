import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {FormControl} from '@angular/forms'
/*
  Generated class for the ValidationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ValidationProvider {

  constructor(public http: Http) {
    console.log('Hello ValidationProvider Provider');
  }

  isValidName(control: FormControl) : Promise <any>
  {
    return new Promise (resolve =>{
      let pattern = /[0-9]/;
      if(pattern.test(control.value))
      {
        resolve({InvalidName : true});
      }
      resolve(null);
    });
  }

  isValidEmail(control: FormControl) : Promise <any>
  {
    return new Promise (resolve =>{
      let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!emailPattern.test(control.value))
      {
        resolve({url_check : true});
      }
      resolve(null);
    });
  }

  isValidString(control: FormControl) : Promise <any>
  {
    return new Promise (resolve =>{
      let emailPattern = /(span|h[0-6]|p|ul|strong|li|a|script|iframe|img|object|embed)/;
      if(!emailPattern.test(control.value))
      {
        resolve({InvalidString : true});
      }
      resolve(null);
    });
  }

}
