import { NgModule } from '@angular/core';
import { PegComponent } from './peg/peg';
import { HanoiSimComponent } from './hanoi-sim/hanoi-sim';
@NgModule({
	declarations: [PegComponent,
    HanoiSimComponent],
	imports: [],
	exports: [PegComponent,
    HanoiSimComponent]
})
export class ComponentsModule {}
