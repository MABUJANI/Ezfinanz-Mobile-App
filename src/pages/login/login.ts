import { Component } from "@angular/core";
import { NavController, LoadingController, ToastController } from "ionic-angular";
import { SignUpPage } from "../signup/signup";
import { UserProvider } from "../../providers/user";
import { PreEnq1Page } from "../preenq1/preenq1";
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  submitted: boolean;
  wrongCredential: boolean;

  // userProvider:any={};

  constructor(public navctrl: NavController, public loading: LoadingController, public userProvider: UserProvider, public toast: ToastController) {
    this.submitted = false;
    this.wrongCredential = false;
  }
  signup() {
    this.navctrl.push(SignUpPage);

  }
  SignIn() {
    if (this.userProvider.userName == '' || this.userProvider.userName == null) {

      // alert("Enter Mobile Number");
      let toast = this.toast.create({
        message: 'Enter Mobile Number',
        duration: 3000,
        position: 'bottom',
        // cssClass:"toast"
      });
      toast.present();

    }
    else if (this.userProvider.userName.length != 10) {
      // alert("Enter 10 digit Valid Mobile Number");
      let toast = this.toast.create({
        message: 'Enter 10 digit Valid Mobile Number',
        duration: 3000,
        position: 'bottom',
        // cssClass:"toast"
      });
      toast.present();

    }

    else if (this.userProvider.password == '' || this.userProvider.password == null) {
      // alert("Enter Password");
      let toast = this.toast.create({
        message: 'Enter Password',
        duration: 3000,
        position: 'bottom',
        // cssClass:"toast"
      });
      toast.present();
    }

    else {
      // this.navctrl.push(HomePage);
      let loading = this.loading.create({
        content: "Authenticating...",
      });
      loading.present();

      this.userProvider.isSignedIn().subscribe(
        userData => {
          let USER = userData;

          console.log("user data", userData);
          var self = this;
          this.submitted = false;
          this.wrongCredential = false;
          this.navctrl.push(TabsPage);
          loading.dismiss();
        },
        err => {
          this.wrongCredential = true;
          loading.dismiss();
          console.log("error", err);
        },
        () => {
        }
      );
    }
  }
}