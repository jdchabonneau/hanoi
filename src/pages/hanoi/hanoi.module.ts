import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HanoiPage } from './hanoi';

@NgModule({
  declarations: [
    HanoiPage,
  ],
  imports: [
    IonicPageModule.forChild(HanoiPage),
  ],
})
export class HanoiPageModule {}
