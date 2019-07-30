import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {UserProvider}           from    '../providers/user';
import { LoginPage } from '../pages/login/login';
import { HTTP } from '@ionic-native/http';
import { Http } from '@angular/http';
import {Config} from '../providers/config';
import { PreEnq1Page } from '../pages/preenq1/preenq1';
import { UtilityProvider } from '../providers/utility';
import { HomePage } from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import { Camera } from '@ionic-native/camera';
import {File} from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
@Component({
  templateUrl: 'app.html',
  providers :[UserProvider,HTTP,Config,UtilityProvider,File,FileTransfer]

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{icon:any,title: string, component: any}>;
  pages1: Array<{icon:any,title: string, component: any}>;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // {icon:"contact", title: 'Profile', component: ProfilePage },
      // { icon:"create",title: 'Milk Plan', component: MilkPlan },
      // { icon:"card",title: 'My Wallet', component: Wallet },
      // { icon:"document",title: 'View Bill', component: ListPage },
      // {icon:"car", title: 'Vacations', component: Vacation },
      // { icon:"pricetags",title: 'Offers', component: ListPage },
      // { icon:"share",title: 'Refer and Earn', component: ListPage },
      // {icon:"call", title: 'Contact Us', component: ListPage },
      // { icon:"text",title: 'Feedback', component: ListPage }
    ];
    this.pages1 = [
      // {icon:"contact", title: 'Profile', component: HomePage },
      // { icon:"create",title: 'Milk Plan', component: ListPage },
      // { icon:"card",title: 'My Wallet', component: ListPage },
      // { icon:"document",title: 'View Bill', component: ListPage },
      // {icon:"car", title: 'Vacations', component: ListPage },
      // { icon:"pricetags",title: 'Offers', component: ListPage },
      // { icon:"share",title: 'Refer and Earn', component: ListPage },
      // {icon:"call", title: 'Contact Us', component: ListPage },
      // { icon:"text",title: 'Feedback', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  openPage1(page){
    this.nav.setRoot(page.component)
  }
}
