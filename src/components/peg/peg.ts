import { Component } from '@angular/core';

/**
 * Generated class for the PegComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'peg',
  templateUrl: 'peg.html'
})
export class PegComponent {

  text: string;

  constructor() {
    this.text = 'Peg here';
  }

}
