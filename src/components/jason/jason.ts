import { Component } from '@angular/core';

/**
 * Generated class for the JasonComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'jason',
  templateUrl: 'jason.html'
})
export class JasonComponent {

  text: string;

  constructor() {
    console.log('Hello JasonComponent Component');
    this.text = 'Hello World';
  }

}
