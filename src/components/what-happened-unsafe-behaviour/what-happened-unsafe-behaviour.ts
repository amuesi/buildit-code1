import { Component , Input} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'what-happened-unsafe-behaviour',
  templateUrl: 'what-happened-unsafe-behaviour.html'
})
export class WhatHappenedUnsafeBehaviourComponent {
  
  
  @Input()
  parent: FormGroup;

  @Input()
  isNotEditable: boolean;
  
  
  constructor(private fb: FormBuilder){
  
  }
  
}
