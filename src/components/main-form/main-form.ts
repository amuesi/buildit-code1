import { Component } from '@angular/core';

/**
 * Generated class for the MainFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'main-form',
  templateUrl: 'main-form.html'
})
export class MainFormComponent {

  text: string;

  constructor() {
    console.log('Hello MainFormComponent Component');
    this.text = 'Hello World';
  }

}
