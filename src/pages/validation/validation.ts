import { Component } from "@angular/core";
import { UtilityProvider } from "../../providers/utility";
import { NavParams, NavController, ToastController } from "ionic-angular";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-validation',
  templateUrl: 'validation.html'

})
export class Validation {
  public number;
  public otp;
  public userdata1;
  private otpnumber;
  private OTPCheck: any = {};

  private upper = 999999;
  private lower = 100000;
  timeLeft: number = 300;
  interval;
  public hide: boolean;
  emailotp: any;
  resendemailotp: number;
  constructor(public utilityprovider: UtilityProvider, public navpar: NavParams, public navctrl: NavController, public toast: ToastController) {
    this.otp = navpar.get("OTP");
    this.userdata1 = navpar.get("userdata");
    this.emailotp = navpar.get("emailotp");
    this.startTimer();

  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }

      else if (this.timeLeft == 0) {
        this.timeLeft == 0;

      } else {
        this.timeLeft = 300;
      }
    }, 1000)
  }
  resendotp() {
    this.hide = false;
    this.timeLeft = 300;
    this.startTimer();

    console.log(this.number);
    this.otpnumber = Math.floor(Math.random() * (this.upper - this.lower + 1)) + this.lower;
    this.resendemailotp = Math.floor(Math.random() * (this.upper - this.lower + 1)) + this.lower;
    this.otp = this.otpnumber;
    this.emailotp = this.resendemailotp;
    console.log(this.otpnumber);
    this.utilityprovider.sendMessages(this.userdata1.mobile, this.otpnumber + " is+your+OTP+to+reset+password.").subscribe(
      success => {
        console.log("Success " + success);
      },
      error => {
        console.log("Failed " + error)
        // console.log("Failed "+ error)
        this.utilityprovider.sendEmailOTP(this.userdata1.email, this.resendemailotp).subscribe(
          success => {
            console.log("OTP Success " + success);
          },
          err => {
            console.log("Error email otp", err);
          }
        )
      }
    );
    // this.navCtrl.push(CreateaccountPage);
  }
  verifyaccount() {
    if (this.otp != this.OTPCheck.mobileotp) {
      // alert("Enter valid mobile OTP");
      let toast = this.toast.create({
        message: 'Enter valid mobile OTP',
        duration: 3000,
        position: 'bottom',
        // cssClass:"toast"
      });
      toast.present();
    }
    else if (this.emailotp != this.OTPCheck.emailotp) {
      // alert("Enter valid email OTP");
      let toast = this.toast.create({
        message: 'Enter valid email OTP',
        duration: 3000,
        position: 'bottom',
        // cssClass:"toast"
      });
      toast.present();

    }
    else {
      this.utilityprovider.Createuser(this.userdata1).subscribe(

        usersuccess => {
          console.log("User", this.userdata1);
          console.log("succes in usersuccess creation" + usersuccess);
          this.utilityprovider.getUserId(this.userdata1).subscribe(
            idsucsess => {
              console.log("Response Id", idsucsess);
              console.log("user id", idsucsess[0].id);
              this.utilityprovider.UpdateUserRecord(idsucsess[0].id, this.userdata1).subscribe(
                recordupdatesucess => {
                  console.log("Sucess", recordupdatesucess);
                  this.navctrl.push(LoginPage);

                },
                err => {
                  console.log(err)

                }
              )
            },
            err => {
              console.log("Error", err)
            }
          )
          // let alertBox = this.alert.create({
          //   title: usersuccess.message+' User Created Successfully',
          //   cssClass : 'alertDanger' ,
          //   buttons: [{
          //     text: 'OK',
          //     handler: data => {
          //         console.log('Ok clicked');
          //         this.navctrl.pop();
          //     }
          // }],enableBackdropDismiss: false 
          //   });
          // alertBox.setCssClass('alertDanger');
          // alertBox.present();
        },
        usererror => {
          console.log("error in customeraddress creation" + usererror);
        }
      )

    }
  }




}