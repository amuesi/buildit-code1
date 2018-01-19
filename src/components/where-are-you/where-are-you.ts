import { Component } from '@angular/core';

/**
 * Generated class for the WhereAreYouComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'where-are-you',
  templateUrl: 'where-are-you.html'
})
export class WhereAreYouComponent {

  text: string;

  constructor() {
    console.log('Hello WhereAreYouComponent Component');
    this.text = 'Hello World';
  }

}
