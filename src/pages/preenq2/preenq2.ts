import { Component } from "@angular/core";
import { UtilityProvider } from "../../providers/utility";
import { NavParams, NavController } from "ionic-angular";
import { HomePage } from "../home/home";

@Component({
selector:'page-preenq2',
templateUrl:'preenq2.html'
})

export class PreEnq2Page{

    public userinfo:any={};
    public agent:any = [];
    public agentlocation:any =[];
    public emiplan:any = [];
    public useridforpreenquiry;
    public emidetails: any=[];
  emi: any;
  roi: any;
  advanemi: any;
    constructor(public utilityprovider:UtilityProvider,
      public navctrl:NavController,public navpar:NavParams){
      this.useridforpreenquiry = navpar.get("userid");

    }
    ionViewDidLoad() {
        //console.log('ionViewDidLoad CustomerpagePage');
        this.utilityprovider.getAgents().subscribe(
          d => {
              console.log("====>orde",d);
              console.log("====>orde",d[0].id);
              this.agent = d;
              // console.log("agent ID",this.agent.id)
              // console.log(this.userinfo.agent)
              // console.log(this.userinfo.agent.id)
              // console.log(this.userinfo.id)
              
          },
          err => {
              var l = err.stackTrace.length;
              //console.error(err);
              alert('Error: Creating Sales Order :: Getting Organizations :: ' + JSON.stringify(err));
          },
          () => {}
      );
      //this.utilityprovider.sendNotification(this.userprovider.fcmid);
      }
      agentChanged(){

        this.utilityprovider.getAgentLocation(this.userinfo.agent.id).subscribe(
          success =>{
            console.log("Agent Id",this.userinfo.agent.id);
            this.agentlocation = success;

            this.utilityprovider.getEMIPlan(this.userinfo.agent.id).subscribe(
              sucess =>{
                console.log(sucess);
                this.emiplan = sucess;
                
              },
              err =>{
                console.log("Error",err);
              }
            )
          },
          err =>{
            console.log("Error",err);
          }
      )

      }
      emiChanged(){
        this.utilityprovider.getEMIPlan1(this.userinfo.emiplan.id).subscribe(
          s=>{
            console.log("emidetails",s);
            this.emidetails = s;
            console.log("emi",s[0].tenureinmonths);
                console.log("ad emi",s[0].tenureinmonths);
                console.log("roi",s[0].rateofinterest);
                this.emi = s[0].tenureinmonths;
                this.advanemi = s[0].downpaymentemi;
                this.roi = s[0].rateofinterest;

          },
          e=>{
            console.log(e);

          }
        )

      }
      preenquiry(){
        this.utilityprovider.preenquiry2(this.userinfo,this.useridforpreenquiry).subscribe(
          sucess=>{
              console.log("success",sucess)
              this.navctrl.push(HomePage);
          },
          err =>{
          console.log("Error",err)
          }
      )
      }

      reset(){
        this.userinfo.loanamount = null;
        this.userinfo.agent = null;
        this.userinfo.agentlocation = null;
        this.userinfo.emiplan = null;
        this.userinfo.noofemi = null;
        this.userinfo.advanceemi = null;
        this.userinfo.roi = null;
        this.userinfo.dop = null;
        this.userinfo.date = null;
        this.userinfo.note = null;
       
      }
}