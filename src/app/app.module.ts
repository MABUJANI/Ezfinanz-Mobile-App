import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, SegmentButton } from 'ionic-angular';
import { DatePickerModule } from 'ionic-calendar-date-picker';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';

import { HttpModule} from '@angular/http';
import { SignUpPage } from '../pages/signup/signup';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Validation } from '../pages/validation/validation';
import { PreEnq2Page } from '../pages/preenq2/preenq2';
import { PreEnq1Page } from '../pages/preenq1/preenq1';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    
    LoginPage,
    SignUpPage,
    HomePage,
    Validation,
    PreEnq2Page,
    PreEnq1Page,
    TabsPage,
    AboutPage
    
    
  ],
  imports: [
    BrowserModule,
    DatePickerModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
    LoginPage,
    SignUpPage,
    HomePage,
    Validation,
    PreEnq2Page,
    PreEnq1Page,
    TabsPage,
    AboutPage
    
 

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
