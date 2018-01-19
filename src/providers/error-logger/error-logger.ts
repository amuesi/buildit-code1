import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import { IonicErrorHandler } from 'ionic-angular';


@Injectable()
export class ErrorLoggerProvider extends IonicErrorHandler {

    private _DB 	   : any;
    private success : boolean = true;
    public current_Id:any;
    public persist:any;




	handleError(error) {
		this.initialiseDB();

		try{
		   this.logTheError(error)
        }
        catch (e){
		    console.log("Logger Error: ", e)
        }
		// delegate to the default handler
		super.handleError(error);

	}


  initialiseDB()
  {
    this._DB = new PouchDB('errorLogs');
    console.log(this._DB);
  }

  logTheError(error){
	 // this._DB.put(error);
	  throw new Error(error);



  }

}
