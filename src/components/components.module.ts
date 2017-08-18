import { NgModule } from '@angular/core';
import { PegComponent } from './peg/peg';
import { HanoiSimComponent } from './hanoi-sim/hanoi-sim';
import { JasonComponent } from './jason/jason';
@NgModule({
	declarations: [PegComponent,
    HanoiSimComponent,
    JasonComponent],
	imports: [],
	exports: [PegComponent,
    HanoiSimComponent,
    JasonComponent]
})
export class ComponentsModule {}
