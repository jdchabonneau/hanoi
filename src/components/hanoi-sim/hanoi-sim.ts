import { Component } from '@angular/core';
import { ApplicationRef } from '@angular/core';

/**
 * Generated class for the HanoiSimComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'hanoi-sim',
  templateUrl: 'hanoi-sim.html'
})
export class HanoiSimComponent {

  pegs: Peg[] = [];
  text: string;
  numDisks: number = 3;

  constructor(private applicationRef : ApplicationRef) {
    this.text = 'Hello Hanoi-Sim Component';
    this.pegs.push(new Peg(1));
    this.pegs.push(new Peg(2));
    this.pegs.push(new Peg(3));
    let peg1 = this.pegs[0];
    for (let i = 0; i < this.numDisks; i++) {
      peg1.disks.push(new Disk(5 - i));
    }
  }

  onStart() {
    this.show(); //
    this.hanoi(this.pegs[0], 0, this.pegs[1], this.pegs[2]);
  }

  show() {
    for (let peg of this.pegs) {
      peg.show();
    }
  }

  hanoi(startPeg: Peg, leaveOnPeg: number, extraPeg: Peg, destPeg: Peg) {
    if (startPeg.disks.length === 1 + leaveOnPeg) {
      this.moveOneDisk(startPeg, destPeg);
    } else {
      let o = extraPeg.disks.length;
      this.hanoi(startPeg, leaveOnPeg + 1, destPeg, extraPeg);
      this.moveOneDisk(startPeg, destPeg);
      this.hanoi(extraPeg, o, startPeg, destPeg);
    }
  }

  moveOneDisk(startPeg: Peg, destPeg: Peg) {
    destPeg.disks.push(startPeg.disks.pop());
    this.text += startPeg.num + "->" + destPeg.num + ", ";
    this.applicationRef.tick();
    this.show();
  }
}

class Disk {
  constructor(public num: number) { }
}

class Peg {
  constructor(public num: number) { }
  disks: Disk[] = [];

  show() {
    console.log(this.num, this.disks);
  }
}

