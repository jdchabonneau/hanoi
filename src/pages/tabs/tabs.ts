import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HanoiPage } from '../hanoi/hanoi';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HanoiPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
