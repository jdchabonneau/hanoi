import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ApplicationRef } from '@angular/core';
import p5 from 'p5';
var that;
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
export class HanoiSimComponent implements OnInit {
  angle: number = 0;
  pegs: Peg[] = [];
  text: string;
  numDisks: number = 5;
  private _size = 150;
  context: CanvasRenderingContext2D;
  @ViewChild("theCanvas") theCanvas: ElementRef;

  constructor(private applicationRef: ApplicationRef) {
    this._size = 150;
    this.text = 'Hello Hanoi-Sim Component';
    this.pegs.push(new Peg(1, 50));
    this.pegs.push(new Peg(2, 140));
    this.pegs.push(new Peg(3, 230));
    that = this;
    this.resetDisks();
  }

  resetDisks(){
    let peg1 = that.pegs[0];
    for (let i = 0; i < that.numDisks; i++) {
      peg1.addDisk(new Disk(i + 1));
    }
  }

  get size() {
    return this._size;
  }
  @Input() set size(newValue: number) {
    this._size = Math.floor(newValue);
  }
  ngAfterViewInit() { // wait for the view to init before using the element

    this.context = this.theCanvas.nativeElement.getContext("2d");
    // happy drawing from here on
    //this.context.fillStyle = 'blue';
    //this.context.fillRect(0, 10, 299, 150);
    this.drawCircle();
  }
  x4 = 0;
  drawCircle() {
    let x1 = 50;
    that.drawBackground();
    //that.context.fillStyle = "#FF0000";
    that.context.fillStyle = "#0000FF";
    for (let i = 0; i < that.pegs.length; i++) {
      for (let v = 0; v < that.pegs[i].disks.length; v++) {
        that.pegs[i].disks[v].draw(i, v, that.context);
      }
    }
    // if (that.x4++ < 1) { 
    //   Peg.moveTopDisk(that.pegs[0], that.pegs[2]);
    //   Peg.moveTopDisk(that.pegs[0], that.pegs[1]);
    //   Peg.moveTopDisk(that.pegs[2], that.pegs[1]);
    // }else{
      Peg.move(that.context);
//    }
    //that.pegs[0].disks[0].move(that.context)
    // that.context.fillRect(x1 - 25, 130, 60, 10);
    // that.context.fillRect(x1 - 22, 119, 54, 10);
    // that.context.fillRect(x1 - 19, 108, 48, 10);
    // that.context.fillRect(x1 - 16, 97, 42, 10);
    // that.context.fillRect(x1 - 13, 86, 36, 10);

    //    that.context.fillRect(that.x4++, 70, 36, 10);
    //    console.log(that.x4)

    // draw the circle
    that.context.beginPath();

    var radius = 25 + 50 * Math.abs(Math.cos(that.angle));
    that.context.arc(225, 225, radius, 0, Math.PI * 2, false);
    that.context.closePath();

    // color in the circle
    that.context.fillStyle = "#006699";
    that.context.fill();

    that.angle += Math.PI / 64;

    requestAnimationFrame(that.drawCircle);
  }

  drawBackground() {
    that.context.clearRect(0, 0, that._size * 2, that._size);

    let x1 = 50;
    let x2 = 140;
    let x3 = 230;

    that.context.fillStyle = "#EEEEEE";
    that.context.fillRect(0, 0, that._size * 2, that._size);
    that.context.fillStyle = "#EEBB00";
    that.context.fillRect(x1, 40, 10, 100);
    that.context.fillRect(x1 - 25, 140, 60, 10);

    //that.context.fillStyle = "#00BB00";
    that.context.fillRect(x2, 40, 10, 100);
    that.context.fillRect(x2 - 25, 140, 60, 10);

    //that.context.fillStyle = "#FF0000";
    that.context.fillRect(x3 - 25, 140, 60, 10);
    that.context.fillRect(x3, 40, 10, 100);


  }

  ngOnInit() {
    const s = (p) => {
      let canvas;
      p.setup = () => {
        alert(98);
        canvas = p.createCanvas(595, 100);
        p.background(0);
      }
    }
  }

  onStart() {
    this.show(); //
    this.hanoi(this.pegs[0], 0, this.pegs[1], this.pegs[2]);
    this.pegs[2].disks = [];
    this.resetDisks();
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
    //console.log("oo",startPeg);
    Peg.moveTopDisk(startPeg, destPeg);
    // this.text += startPeg.num + "->" + destPeg.num + ", ";
    // this.applicationRef.tick();
    // this.show();
  }
}

class Disk {
  widths = [60, 54, 48, 42, 36];
  x = 50;
  y = 141;
  destX: number;
  goneUp = false;
  constructor(public num: number) { }
  draw(pegNum, vert, context: CanvasRenderingContext2D) {
    let width = this.widths[this.num - 1];
    //context.fillRect(this.x - (width / 2 - 5), 141 - 11 * (5 - vert),
    context.fillRect(this.x - (width / 2 - 5), this.y, width, 10);
  }

  move(context: CanvasRenderingContext2D) {
    let width = this.widths[this.num - 1];
    if (!this.goneUp && this.y > 17) this.y--;
    else {
      this.goneUp = true;
      if (this.x != this.destX){ 
        this.x += this.x < this.destX ? 1 : -1;
      }
      else if (this.y < 100) this.y++;
      else{
        this.goneUp = false;
        return true;
      }
    }
    context.fillRect(this.x - (width / 2 - 5), this.y, width, 10);
    //console.log(this.y);
    return false;
  }
}

class Peg {
  static movingDisk: Disk;
  static destPeg: Peg;
  constructor(public num: number, private xLoc) { }
  disks: Disk[] = [];
  static from = [];
  static to = [];

  static moveTopDisk(from:Peg, to:Peg){
    Peg.from.push(from);
    Peg.to.push(to);
  }

  mvTopDisk(destination: Peg) {
    //console.log("pp",this);
    Peg.movingDisk = this.disks.pop();
    Peg.destPeg = destination;
    Peg.movingDisk.destX = destination.xLoc;
  }

  static move(context: CanvasRenderingContext2D) {
    if (Peg.movingDisk) {
      if (Peg.movingDisk.move(context)) {
        Peg.destPeg.addDisk(Peg.movingDisk);
        Peg.movingDisk= null;
        Peg.destPeg=null;
      }
    }else if(Peg.from.length > 0){
      let f:Peg = Peg.from[0];
      let t:Peg = Peg.to[0];
      let len = Peg.from.length;
      Peg.from = Peg.from.slice(1, len);
      Peg.to = Peg.to.slice(1, len);
      //console.log("qq",t,f);
      f.mvTopDisk(t);
    }
  }

  addDisk(disk: Disk) {
    this.disks.push(disk);
    disk.x = this.xLoc;
    disk.y = 141 - 11 * this.disks.length;
  }
  show() {
    //console.log(this.num, this.disks);
  }
}

