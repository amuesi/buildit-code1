import { Component , Input} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'immediate-corrective-action-security',
  templateUrl: 'immediate-corrective-action-security.html'
})
export class ImmediateCorrectiveActionSecurityComponent {
 @Input()
  parent: FormGroup;

  constructor() {
    console.log('Hello ImmediateCorrectiveActionsComponent Component');
  }

}
