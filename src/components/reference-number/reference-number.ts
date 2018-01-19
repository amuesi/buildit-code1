import { Component , Input, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';



import { SubmissionsProvider } from '../../providers/submissions/submissions';

@Component({
  selector: 'reference-number',
  templateUrl: 'reference-number.html'
})
export class ReferenceNumberComponent  implements OnInit{

  // public referenceNumber: any;

  @Input()
  parent: FormGroup;
  @Input()
  referenceNum: string;

  constructor(private DB: SubmissionsProvider) {
 
  }

  ngOnInit(){
  // this.referenceNumber =  this.DB.STWReferenceNumber();

  }

}
