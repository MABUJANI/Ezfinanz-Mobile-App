import { Component } from "@angular/core";
import { NavController,AlertController,ToastController } from "ionic-angular";
import { LoginPage } from "../login/login";
import { UtilityProvider } from "../../providers/utility";
import { Validation } from "../validation/validation";

@Component({
    selector:'page-signup',
    templateUrl:'signup.html'
})
export class SignUpPage{
    private user:any={};

    private random;
    private upper = 999999;
    private lower = 100000;
  emailotp: number;
    constructor(public navctrl:NavController,public alert:AlertController,public utilityprovider:UtilityProvider,public toast:ToastController){

    }
    signin(){
        this.navctrl.push(LoginPage);
    }
    Signup(){

      if(this.user.name == '' || this.user.name == null){
        let toast = this.toast.create({
          message: 'Enter Name',
          duration: 3000,
          position: 'bottom',
          // cssClass:"toast"
        });
        toast.present();
      }
      else if(this.user.aadhar == '' || this.user.aadhar == null){
        let toast = this.toast.create({
          message: 'Enter Aadhar Number',
          duration: 3000,
          position: 'bottom',
          // cssClass:"toast"
        });
        toast.present();
      }
      else if(this.user.aadhar.length != 12){
        let toast = this.toast.create({
          message: 'Enter 12 digit valid Aadhar Number',
          duration: 3000,
          position: 'bottom',
          // cssClass:"toast"
        });
        toast.present();

      }
      else if(this.user.mobile == '' || this.user.mobile == null){
        let toast = this.toast.create({
          message: 'Enter Mobile Number',
          duration: 3000,
          position: 'bottom',
          // cssClass:"toast"
        });
        toast.present();

      }
      else if(this.user.mobile.length != 10){
        let toast = this.toast.create({
          message: 'Enter 10 digit valid Mobile Number',
          duration: 3000,
          position: 'bottom',
          // cssClass:"toast"
        });
        toast.present();

      }
      else if(this.user.password == '' || this.user.password == null){
        let toast = this.toast.create({
          message: 'Enter Password',
          duration: 3000,
          position: 'bottom',
          // cssClass:"toast"
        });
        toast.present();

      }
      else if(this.user.email == '' || this.user.email == null){
        let toast = this.toast.create({
          message: 'Enter Email',
          duration: 3000,
          position: 'bottom',
          // cssClass:"toast"
        });
        toast.present();

      }
      
      // else if(this.user.gender == '' || this.user.gender == null){
      //   let toast = this.toast.create({
      //     message: 'Select Gender',
      //     duration: 3000,
      //     position: 'bottom',
      //     // cssClass:"toast"
      //   });
      //   toast.present();

      // }

      else{
      
      this.random =Math.floor(Math.random() * (this.upper- this.lower +1)) + this.lower;
      this.emailotp = Math.floor(Math.random() * (this.upper- this.lower +1)) + this.lower;
    console.log(this.random);
    console.log(this.emailotp);
    console.log("User data",this.user);
    console.log("Mobile",this.user.mobile);
    console.log("Email",this.user.email);
    this.navctrl.push(Validation,{"OTP":this.random,"userdata":this.user,"emailotp":this.emailotp});
    this.utilityprovider.sendMessages(this.user.mobile,this.random +" is+your+OTP.").subscribe(
      success =>{
        console.log("Success "+success);
        this.utilityprovider.sendEmailOTP(this.user.email,this.emailotp).subscribe(
          success=>{
            console.log("OTP Success "+success);
          },
          err=>{

          }
        )
      },
      error =>{
        console.log("Failed "+ error)
        this.utilityprovider.sendEmailOTP(this.user.email,this.emailotp).subscribe(
          success=>{
            console.log("OTP Success "+success);
          },
          err=>{
            console.log("Error email otp",err);
          }
        )
      }
    );
    }
  }
        // this.utilityprovider.Createuser(this.user).subscribe(
          
        //     usersuccess => {
        //       console.log("User",this.user);
        //       console.log("succes in usersuccess creation"+usersuccess);
        //         this.utilityprovider.getUserId(this.user).subscribe(
        //           idsucsess =>{
        //             console.log("Response Id",idsucsess);
        //             console.log("user id",idsucsess[0].id);
        //             this.utilityprovider.UpdateUserRecord(idsucsess[0].id,this.user).subscribe(
        //               recordupdatesucess =>{
        //                 console.log("Sucess",recordupdatesucess);

        //               },
        //               err =>{
        //                 console.log(err)

        //               }
        //             )
        //           },
        //           err =>{
        //             console.log("Error",err)
        //           }
        //         )
        //       // let alertBox = this.alert.create({
        //       //   title: usersuccess.message+' User Created Successfully',
        //       //   cssClass : 'alertDanger' ,
        //       //   buttons: [{
        //       //     text: 'OK',
        //       //     handler: data => {
        //       //         console.log('Ok clicked');
        //       //         this.navctrl.pop();
        //       //     }
        //       // }],enableBackdropDismiss: false 
        //       //   });
        //       // alertBox.setCssClass('alertDanger');
        //       // alertBox.present();
        //     },
        //     usererror => {
        //       console.log("error in customeraddress creation"+usererror);
        //     }
        //   )
          
        // }
    }