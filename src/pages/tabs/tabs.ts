import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { PreEnq1Page } from '../preenq1/preenq1';
import { PreEnq2Page } from '../preenq2/preenq2';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PreEnq1Page;
  tab2Root = HomePage;
  tab3Root = AboutPage;

  constructor() {

  }
}
