import {Injectable}             from    '@angular/core';
import { ToastController}    from    'ionic-angular';
 import {Http}          from    '@angular/http';

import {Observable}             from    "rxjs/Observable";
import {Observer}               from    "rxjs/Observer";
import 'rxjs/add/operator/map';

import {Config}                 from    './config';
import {UserProvider}                 from    './user';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http/';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class UtilityProvider {

    stackTrace = [];
   singleArray=[];
    constructor(
        //  private http            :   Http,
       // private httpclient         :   HttpClient,
        private config          :   Config,
        private userpro         :   UserProvider,
        private nativehttp : HTTP,
        private toast :ToastController
        ) {

    };

    getMobileAccess():any {
        let endPoint            =     'mbcrm_mobileaccess';
        let queryParams         =     "&_where=user=%27"+this.userpro.userid+"%27&_selectedProperties=mbcrmMobilemaster&_startRow=0&_endRow=10";
        return                        this.getOB3Object(endPoint,queryParams);
    }

    // getDataUsingAadharNumber(userinfo):any{

    //     var quotData:any        =    {
    //         data                :{}    
    //     };
    //     quotData.data.POI_number                 =    userinfo.aadhar;
        
 
    
    //     console.log(quotData);
    //      return this.getUserDataByAadhar("ws/com.saksham.loandetails.userdetails_callout",quotData);

    // // Webserviceforusercreation(utilityEndPoint, postPayload):any {


    // }

    getUserDataByAadhar(user):any {
       
        var mobile = user.aadhar;
        console.log("aadhar",user.aadhar);
        let endPoint            =   'ws/com.saksham.loandetails.userdetails_callout';
        let queryParams = "&POI_number="+user.aadhar;
    
        return                      this.getAAdhar(endPoint,queryParams);

    }
    getAAdhar(utilityEndPoint,queryParams, sortConfig?):any {
       
        var self = this;
        let utilityObservable   =   new Observable(observer => {

            let utilityURL      =   self.userpro.authenticateURLgettingData(self.config.apipoint + utilityEndPoint + "?");
            utilityURL          =   utilityURL + queryParams;
            console.log("------------------------------------>");
            console.log(utilityURL);
            console.log("------------------------------------->");
            //console.log('Utility Provider :: Get Utility :: ' + utilityURL);

           this.nativehttp.get(utilityURL, {}, {})
            .then(data => {
                console.log("Whole data"+data)
              console.log(data.status);
              console.log("res"+data.data); // data received by server
              console.log(data.headers);

              let result = JSON.parse(data.data);
              console.log("response"+result);

              var uRespJson               =   result;
                   
              
                  
                 

                  observer.next(uRespJson);
                         
            })
            

        
        });  

        return                      utilityObservable;
        //console.log(JSON.stringify(approversArr));

    }







    preenquiry(userinfo):any{
        var quotData:any        =    {
            data                :{}    
        };
        quotData.data.customername                 =    userinfo.customername;
        quotData.data.fathername                 =    userinfo.fathername;
        quotData.data.mothername                 =    userinfo.mothername;
        quotData.data.residentialstatus                  =   userinfo.residence;
        quotData.data.prooftypenumber = userinfo.aadhar;
        quotData.data.occupationtype                 =    userinfo.occupation;
        quotData.data.maritalstatus                 =    userinfo.marital;
        quotData.data.alternatenumber                 =    userinfo.mobile;
        quotData.data.panno                 =    userinfo.pan;
        quotData.data.nameonpan                 =    userinfo.panname;
        // quotData.data.shiptoaddress                 =    userinfo.mothername;
        
        
        
        
        
        
        // quotData.data.district                 =   userinfo.district.id;
        // quotData.data.mobile                  =   user.mobile;
        // quotData.data.emailid                  =   user.email;
        // quotData.data.passwd                  =   user.password;
        // quotData.data.clientid                  =   "D1B565840F95464DA296746768738853";
        // quotData.data.categorycode              =   "Customer";
        // quotData.data.defaultRole = "883776C2354D45B4BEBF1C4FE5493ABC";
    
        console.log(quotData);
         return this.postOB3Object("Lds_Preenquiryform",quotData);
    }
    preenquirylocation(userinfo):any{
        var quotData:any        =    {
            data                :{}    
        };
        quotData.data.addressLine1                 =    userinfo.address;
        quotData.data.country                 =    userinfo.country.id;
        quotData.data.region                 =    userinfo.state.id;
        quotData.data.slocDistrict                  =   userinfo.district.id;
        
       
       
        console.log(quotData);
         return this.postOB3Object("Location",quotData);
    }

    postLocation(locationid,recordid):any{
        var quotData:any        =    {
            data                :{}    
        };
        quotData.data.id                 =    recordid;
        quotData.data.location           =    locationid;
        
        
       
       
        console.log(quotData);
         return this.postOB3Object("Lds_Preenquiryform",quotData);
    }
    UploadFiles(fileinfo):any{
        console.log("Entered",fileinfo)
    }
    preenquiry2(userinfo,userid):any{
        var quotData:any        =    {
            data                :{}    
        };
        quotData.data.id                 =    userid;
        quotData.data.loanamount                =   parseInt(userinfo.loanamount) ;
        quotData.data.advemi = userinfo.advanceemi;
        quotData.data.lDSAgent                 =    userinfo.emiplan.id;
        quotData.data.bpagent                  =   userinfo.agent.id;
        
        quotData.data.agentbranch                 =    userinfo.agentlocation.id;
        // quotData.data.maritalstatus                 =    userinfo.marital;
        // quotData.data.alternatenumber                 =    userinfo.mobile;
        // quotData.data.panno                 =    userinfo.pan;
        // quotData.data.nameonpan                 =    userinfo.panname;
    
    
        console.log(quotData);
         return this.postOB3Object("Lds_Preenquiryform",quotData);
    }
    
    getOrganization():any {

        let endPoint            =   'RWS_UserOrganization';
        let queryParams         =   "&_where=user=%27"+this.userpro.userid + '%27';

        return                      this.getOB3Object(endPoint, queryParams);
    }

    getOB3Object(utilityEndPoint, queryParams, sortConfig?):any {
       
        var self = this;
        let utilityObservable   =   new Observable(observer => {

            let utilityURL      =   self.userpro.authenticateURLgettingData(self.config.apiBasePoint + utilityEndPoint + "?");
            utilityURL          =   utilityURL + queryParams;
            console.log("------------------------------------>");
            console.log(utilityURL);
            console.log("------------------------------------->");
            //console.log('Utility Provider :: Get Utility :: ' + utilityURL);

           this.nativehttp.get(utilityURL, {}, {})
            .then(data => {
                console.log("Whole data"+data)
              console.log(data.status);
              console.log("res"+data.data); // data received by server
              console.log(data.headers);

              let result = JSON.parse(data.data);
              console.log("response"+result.response.data[0]);

              var uRespJson               =   result.response;
                   
              if (uRespJson.status === 0) {
                  var utilityData         =   uRespJson.data;
                 
                  if (sortConfig) {
                     
                      if (sortConfig.type === 'string') {
                         
                          utilityData.sort(function(a,b) {
                              return a[sortConfig.fieldName].localeCompare(b[sortConfig.fieldName]);
                          });
                      } else if (sortConfig.type === 'number') {
                         
                          utilityData.sort(function(a,b) {
                              return a[sortConfig.fieldName] - b[sortConfig.fieldName];
                          });
                      } else if (sortConfig.type === 'date') {
                          utilityData.sort(function(a,b) {
                              var aa  =   new Date(a[sortConfig.fieldName]);
                              var bb  =   new Date(b[sortConfig.fieldName]);
                              return aa < bb;
                          });
                      }
                  }

                  observer.next(utilityData);
              } else {
                  
                  let errO                =   uRespJson.error || uRespJson.errors;
                  var errMsg  =   'ERROR: OB3 Error :: Utility Provider :: Get Utility :: \n' + JSON.stringify(errO);
                  self.stackTrace         =   ["Utility Provider :: Get Utility :: Utility Response ::",errO];
                  //console.log(errMsg);
                  observer.error(errMsg);
              }             
            })
            .catch(error => {
          
              console.log(error.status);
              console.log(error.error); // error message as string
              console.log(error.headers);
              console.log(error);
              observer.error(error.error);
            }); 

        
        });  

        return                      utilityObservable;
        //console.log(JSON.stringify(approversArr));

    }

 getOB3ObjectWithRecords(utilityEndPoint, queryParams, start,end,sortConfig?):any {
       
        var self = this;
        let utilityObservable   =   new Observable(observer => {

            let utilityURL      =   self.userpro.authenticateURL(self.config.apiBasePoint + utilityEndPoint + "?");
            utilityURL          =   utilityURL + queryParams;
            utilityURL          =   utilityURL + "&_startRow=" + start + "&_endRow=" + end;
            console.log("------------------------------------>");
            console.log(utilityURL);
            console.log("------------------------------------->");
            //console.log('Utility Provider :: Get Utility :: ' + utilityURL);
            let utilityWS       = null; // self.http.get(utilityURL);
            
            utilityWS.subscribe(

                utilityResponse =>  {
                   
                    var uRespJson               =   utilityResponse.json().response;
                   
                    if (uRespJson.status === 0) {
                        var utilityData         =   uRespJson.data;
                       
                        if (sortConfig) {
                           
                            if (sortConfig.type === 'string') {
                               
                                utilityData.sort(function(a,b) {
                                    return a[sortConfig.fieldName].localeCompare(b[sortConfig.fieldName]);
                                });
                            } else if (sortConfig.type === 'number') {
                               
                                utilityData.sort(function(a,b) {
                                    return a[sortConfig.fieldName] - b[sortConfig.fieldName];
                                });
                            } else if (sortConfig.type === 'date') {
                                utilityData.sort(function(a,b) {
                                    var aa  =   new Date(a[sortConfig.fieldName]);
                                    var bb  =   new Date(b[sortConfig.fieldName]);
                                    return aa < bb;
                                });
                            }
                        }

                        observer.next(utilityData);
                    } else {
                        
                        let errO                =   uRespJson.error || uRespJson.errors;
                        var errMsg  =   'ERROR: OB3 Error :: Utility Provider :: Get Utility :: \n' + JSON.stringify(errO);
                        self.stackTrace         =   ["Utility Provider :: Get Utility :: Utility Response ::",errO];
                        //console.log(errMsg);
                        observer.error(errMsg);
                    }
                },

                utilityErr      =>  {
                   
                    var errMsg  =   'ERROR: HTTP Error :: Utility Provider :: Get Utility :: \n' + JSON.stringify(utilityErr);
                    self.stackTrace = ["Utility Provider :: Get Utility :: Utility Observable ::",JSON.stringify(utilityErr)];
                   // console.log(errMsg);
                    observer.error(errMsg);
                },

                ()              =>  {
                }

            );
        });

        return                      utilityObservable;
        //console.log(JSON.stringify(approversArr));

    }


 getOB3ObjectFor(organizationID,customerID,grandtotal,orderid):any {
        console.log("getOB3ObjectFor");
        var self = this;
        let utilityObservable   =   new Observable(observer => {

            let utilityURL      =   this.config.apipoint+"ws/com.saksham.rwsales.docheck?";//l=manoj&p=123456&OrderID="+orderID+"&CustomerID="+customerID;
            let UtilURL = this.userpro.authenticateURL(utilityURL);

            UtilURL = UtilURL + "&OrgnizationID="+organizationID+"&CustomerID="+customerID+"&GrandTotal="+grandtotal+"&OrderID="+orderid;
            utilityURL = UtilURL;
           console.log("/**************url is-------------------->"+utilityURL);

            let utilityWS       =  null;// self.http.get(utilityURL);
            
            utilityWS.subscribe(

                utilityResponse =>  {
                   
                    var uRespJson               =   utilityResponse.json();

                 
                        var utilityData         =   uRespJson;
                       
                       

                        observer.next(utilityData);
                  
                },

                utilityErr      =>  {
                   
                    var errMsg  =   'ERROR: HTTP Error :: Utility Provider :: Get Utility :: \n' + JSON.stringify(utilityErr);
                    self.stackTrace = ["Utility Provider :: Get Utility :: Utility Observable ::",JSON.stringify(utilityErr)];
                   // console.log(errMsg);
                    observer.error(errMsg);
                },

                ()              =>  {
                }

            );
        });

        return                      utilityObservable;
        //console.log(JSON.stringify(approversArr));

    }

    putOB3Object(utilityEndPoint, putPayload):any {
          
        let utilityObservable   =   new Observable(observer => {
             
            let utilityURL      =   this.userpro.authenticateURL(this.config.apiBasePoint + utilityEndPoint + "?");

         
            let utilityWS       = null;  /*this.http.put(utilityURL, JSON.stringify(putPayload));*/
            console.log("_______________AZIZ SIR");
            console.log(utilityURL);
            console.log(putPayload);
            utilityWS.subscribe(

                utilityResponse =>  {
                  console.log("==================================> AZIZ sir");
                  console.log(utilityURL);
                  console.log(putPayload);
                  console.log(utilityResponse);
                    var uRespJson               =   utilityResponse.json().response;
                    if (uRespJson.status === 0) {
                     
                        var utilityData         =   uRespJson.data;
                        observer.next(utilityData);
                    } else {
                       
                        let errO               =   uRespJson.error || uRespJson.errors;
                       
                        this.stackTrace = ["Utility Provider ::  Put Utility :: Utility Response",JSON.stringify(errO)];
                        var errMsg  =   'ERROR: OB3 Error :: Utility Provider :: Put Utility :: \n' + JSON.stringify(errO);
                        //console.log(errMsg);
                        observer.error(errMsg);
                    }
                },

                utilityErr      =>  {
                   console.log("AZIZ SIR ERRROR");
                    this.stackTrace = ["Utility Provider :: Put Utility ::",JSON.stringify(utilityErr)];
                    var errMsg  =   'ERROR: HTTP Error :: Utility Provider :: Put Utility :: \n' + JSON.stringify(utilityErr);
                    //console.log(errMsg);
                    observer.error(errMsg);
                },

                ()              =>  {
                }

            );
        });

        return                      utilityObservable;

    }

    postOB3Object(utilityEndPoint, postPayload):any {
        console.log("+++++++++++-----===========>");
        console.log(postPayload);
        console.log(JSON.stringify(postPayload));
        console.log("++++++++++++-----------===========>");
        let utilityObservable   =   new Observable(observer => {

            let utilityURL      =   this.userpro.authenticateURL(this.config.apiBasePoint + utilityEndPoint + "?");

          this.nativehttp.setDataSerializer("json");
            this.nativehttp.post(utilityURL,postPayload,{'Content-Type': 'application/json' })
            .then(data => {
              console.log(data.status);
              console.log(data.data); // data received by server
              console.log(data.headers);

              let result = JSON.parse(data.data);
              var uRespJson     =   result.response;
          
                    if (uRespJson.status === 0) {
                        var utilityData         =   uRespJson.data;

                        observer.next(utilityData);
                    } else {
                       
                        let errO               =   uRespJson.error || uRespJson.errors;
                        this.stackTrace = ["Utility Provider :: Post Utility :: UtilityResponse",JSON.stringify(errO)];
                        
                        var errMsg  =   'ERROR: OB3 Error :: Utility Provider :: Post Utility :: \n' + JSON.stringify(errO);
                        //console.log(errMsg);
                        observer.error(errMsg);
                    }
            })
            .catch(error => {
          
              console.log(error.status);
              console.log(error.error); // error message as string
              console.log(error.headers);
              console.log("error"+error);
              observer.error(error.error);
            }); 

            
            //console.log('Utility Provider :: Post Utility :: ' + utilityURL);
        /*  let utilityWS       =   this.http.post(utilityURL, JSON.stringify(postPayload));
           
          
            utilityWS.subscribe(

                utilityResponse =>  {
                    var uRespJson               =   utilityResponse.json().response;
          
                    if (uRespJson.status === 0) {
                        var utilityData         =   uRespJson.data;

                        observer.next(utilityData);
                    } else {
                       
                        let errO               =   uRespJson.error || uRespJson.errors;
                        this.stackTrace = ["Utility Provider :: Post Utility :: UtilityResponse",JSON.stringify(errO)];
                        
                        var errMsg  =   'ERROR: OB3 Error :: Utility Provider :: Post Utility :: \n' + JSON.stringify(errO);
                        //console.log(errMsg);
                        observer.error(errMsg);
                    }
                },

                utilityErr      =>  {
                    this.stackTrace = ["Utility Provider :: Post  Utility :: UtilityObservable",JSON.stringify(utilityErr)];
                    var errMsg  =   'ERROR: HTTP Error :: Utility Provider :: Post Utility :: \n' + JSON.stringify(utilityErr);
                    //console.log(errMsg);
                    observer.error(errMsg);
                },

                ()              =>  {
                }

            ); */
        }); 
    
        return                      utilityObservable;

    }

    postOB3ObjectforWebservice(utilityEndPoint, postPayload):any {
        console.log("+++++++++++-----===========>");
        console.log(postPayload);
        console.log(JSON.stringify(postPayload));
        console.log("++++++++++++-----------===========>");
        let utilityObservable   =   new Observable(observer => {

           let utilityURL      =   this.userpro.authenticateURL(this.config.apipoint + utilityEndPoint + "?");

            //console.log('Utility Provider :: Post Utility :: ' + utilityURL);

         this.nativehttp.setDataSerializer("json");
            this.nativehttp.post(utilityURL,postPayload,{'Content-Type': 'application/json' })
            .then(data => {
              console.log(data.status);
              console.log(data.data); // data received by server
              console.log(data.headers);

              let result = JSON.parse(data.data);
              var uRespJson     =   result.response;
          
                    if (uRespJson.status === 0) {
                        var utilityData         =   uRespJson;

                        observer.next(utilityData);
                    } else {
                       
                        let errO               =   uRespJson.error || uRespJson.errors;
                        this.stackTrace = ["Utility Provider :: Post Utility :: UtilityResponse",JSON.stringify(errO)];
                        
                        var errMsg  =   'ERROR: OB3 Error :: Utility Provider :: Post Utility :: \n' + JSON.stringify(errO);
                        //console.log(errMsg);
                        observer.error(errMsg);
                    }
            })
            .catch(error => {
          
              console.log(error.status);
              console.log(error.error); // error message as string
              console.log(error.headers);
              console.log("error"+error);
              observer.error(error.error);
            });  
            

         /* let utilityWS       =   this.http.post(utilityURL, JSON.stringify(postPayload));
           
          
            utilityWS.subscribe(

                utilityResponse =>  {
                    var uRespJson               =   utilityResponse.json().response;
          
                    if (uRespJson.status === 0) {
                        var utilityData         =   uRespJson;

                        observer.next(utilityData);
                    } else {
                       
                        let errO               =   uRespJson.error || uRespJson.errors;
                        this.stackTrace = ["Utility Provider :: Post Utility :: UtilityResponse",JSON.stringify(errO)];
                        
                        var errMsg  =   'ERROR: OB3 Error :: Utility Provider :: Post Utility :: \n' + JSON.stringify(errO);
                        //console.log(errMsg);
                        observer.error(errMsg);
                    }
                },

                utilityErr      =>  {
                    this.stackTrace = ["Utility Provider :: Post  Utility :: UtilityObservable",JSON.stringify(utilityErr)];
                    var errMsg  =   'ERROR: HTTP Error :: Utility Provider :: Post Utility :: \n' + JSON.stringify(utilityErr);
                    //console.log(errMsg);
                    observer.error(errMsg);
                },

                ()              =>  {
                }

            );  */
        });
    
        return                      utilityObservable;

    }


    razorpayCaptureUpdate(Captureamountpaymentid):any{

        
        let utilityObservable   =   new Observable(observer => {

            let razorpayCaptureUpdateUrl = this.config.razorpayCapture + Captureamountpaymentid.id + "/capture";
            // let toast = this.toast.create({
            //     message:razorpayCaptureUpdateUrl,
            //     duration: 30000,
            //     position: 'bottom',
            //     cssClass:"toast"
            //   });
            

        var quotData:any        =    {
              
        };
        quotData.amount = Captureamountpaymentid.amount;
 
             //console.log('Utility Provider :: Post Utility :: ' + utilityURL);
 
          this.nativehttp.setDataSerializer("json");
             this.nativehttp.post(razorpayCaptureUpdateUrl,quotData,{'Content-Type': 'application/json','Authorization':'Basic cnpwX2xpdmVfc1V1bXJNN1poSXQya206NmZvc0xEUllMc2lSMExlNDdwZkpIY0dW' })
             .then(data => {
               console.log(data.status);
               console.log(data.data); // data received by server
               console.log(data.headers);
 
               let result = JSON.parse(data.data);
               console.log(result.id);
               console.log(result.amount);
               if(result.status=="captured"){
                // let toast = this.toast.create({
                //     message: 'Enter into setCapture to Update to Capture.',
                //     duration: 3000,
                //     position: 'bottom',
                //     cssClass:"toast"
                //   });
                //   toast.present(); 
                console.log("Captured Successfully.");
               }
               else{
                // let toast = this.toast.create({
                //     message: 'Not Enter into setCapture to Update to Capture.',
                //     duration: 3000,
                //     position: 'bottom',
                //     cssClass:"toast"
                //   });
                //   toast.present(); 
                console.log("Captured UnSuccessfully.");
               }
               
           
                     
             })
             .catch(error => {
           
               console.log(error.status);
               console.log(error.error); // error message as string
               console.log(error.headers);
               console.log("error"+error);
               observer.error(error.error);
             }); 
 
          
         });
     
         return                      utilityObservable;


    }

    Webserviceforusercreation(utilityEndPoint, postPayload):any {
        console.log("+++++++++++-----===========>");
        console.log(postPayload);
        console.log(JSON.stringify(postPayload));
        console.log("++++++++++++-----------===========>");
        let utilityObservable   =   new Observable(observer => {

           let utilityURL      =   this.userpro.authenticateURLgettingData(this.config.apipoint + utilityEndPoint + "?");
            console.log(utilityURL)
            //console.log('Utility Provider :: Post Utility :: ' + utilityURL);

         this.nativehttp.setDataSerializer("json");
            this.nativehttp.post(utilityURL,postPayload,{'Content-Type': 'application/json' })
            .then(data => {
              console.log(data.status);
              console.log(data.data); // data received by server
              console.log(data.headers);

              let result = JSON.parse(data.data);
              var uRespJson     =   result.response;
          
                    if (uRespJson.status === 0) {
                        var utilityData         =   uRespJson;

                        observer.next(utilityData);
                    } else {
                       
                        let errO               =   uRespJson.error || uRespJson.errors;
                        this.stackTrace = ["Utility Provider :: Post Utility :: UtilityResponse",JSON.stringify(errO)];
                        
                        var errMsg  =   'ERROR: OB3 Error :: Utility Provider :: Post Utility :: \n' + JSON.stringify(errO);
                        //console.log(errMsg);
                        observer.error(errMsg);
                    }
            })
            .catch(error => {
          
              console.log("status",error.status);
              console.log(error.error); // error message as string
              console.log(error.headers);
              console.log("error"+error);
              observer.error(error.error);
            }); 

          /*  let utilityWS       =   this.http.post(utilityURL, JSON.stringify(postPayload));
          
            utilityWS.subscribe(

                utilityResponse =>  {
                    console.log("useres"+utilityResponse.json());
                    var uRespJson               =   utilityResponse.json().response;
          
                    if (uRespJson.status === 0) {
                        var utilityData         =   uRespJson;

                        observer.next(utilityData);
                    } else {
                       
                        let errO               =   uRespJson.error || uRespJson.errors;
                        this.stackTrace = ["Utility Provider :: Post Utility :: UtilityResponse",JSON.stringify(errO)];
                        
                        var errMsg  =   'ERROR: OB3 Error :: Utility Provider :: Post Utility :: \n' + JSON.stringify(errO);
                        //console.log(errMsg);
                        observer.error(errMsg);
                    }
                },

                utilityErr      =>  {
                    this.stackTrace = ["Utility Provider :: Post  Utility :: UtilityObservable",JSON.stringify(utilityErr)];
                    var errMsg  =   'ERROR: HTTP Error :: Utility Provider :: Post Utility :: \n' + JSON.stringify(utilityErr);
                    //console.log(errMsg);
                    observer.error(errMsg);
                },

                ()              =>  {
                }

            ); */
        });
    
        return                      utilityObservable;

    }

    Webserviceforuserupdation(utilityEndPoint, postPayload):any {
        console.log("+++++++++++-----===========>");
        console.log(postPayload);
        console.log(JSON.stringify(postPayload));
        console.log("++++++++++++-----------===========>");
        let utilityObservable   =   new Observable(observer => {

           let utilityURL      =   this.userpro.authenticateURLgettingData(this.config.apiBasePoint + utilityEndPoint + "?");
            console.log(utilityURL)
            //console.log('Utility Provider :: Post Utility :: ' + utilityURL);

         this.nativehttp.setDataSerializer("json");
            this.nativehttp.post(utilityURL,postPayload,{'Content-Type': 'application/json' })
            .then(data => {
              console.log(data.status);
              console.log(data.data); // data received by server
              console.log(data.headers);

              let result = JSON.parse(data.data);
              var uRespJson     =   result.response;
          
                    if (uRespJson.status === 0) {
                        var utilityData         =   uRespJson;

                        observer.next(utilityData);
                    } else {
                       
                        let errO               =   uRespJson.error || uRespJson.errors;
                        this.stackTrace = ["Utility Provider :: Post Utility :: UtilityResponse",JSON.stringify(errO)];
                        
                        var errMsg  =   'ERROR: OB3 Error :: Utility Provider :: Post Utility :: \n' + JSON.stringify(errO);
                        //console.log(errMsg);
                        observer.error(errMsg);
                    }
            })
            .catch(error => {
          
              console.log("status",error.status);
              console.log(error.error); // error message as string
              console.log(error.headers);
              console.log("error"+error);
              observer.error(error.error);
            }); 

          /*  let utilityWS       =   this.http.post(utilityURL, JSON.stringify(postPayload));
          
            utilityWS.subscribe(

                utilityResponse =>  {
                    console.log("useres"+utilityResponse.json());
                    var uRespJson               =   utilityResponse.json().response;
          
                    if (uRespJson.status === 0) {
                        var utilityData         =   uRespJson;

                        observer.next(utilityData);
                    } else {
                       
                        let errO               =   uRespJson.error || uRespJson.errors;
                        this.stackTrace = ["Utility Provider :: Post Utility :: UtilityResponse",JSON.stringify(errO)];
                        
                        var errMsg  =   'ERROR: OB3 Error :: Utility Provider :: Post Utility :: \n' + JSON.stringify(errO);
                        //console.log(errMsg);
                        observer.error(errMsg);
                    }
                },

                utilityErr      =>  {
                    this.stackTrace = ["Utility Provider :: Post  Utility :: UtilityObservable",JSON.stringify(utilityErr)];
                    var errMsg  =   'ERROR: HTTP Error :: Utility Provider :: Post Utility :: \n' + JSON.stringify(utilityErr);
                    //console.log(errMsg);
                    observer.error(errMsg);
                },

                ()              =>  {
                }

            ); */
        });
    
        return                      utilityObservable;

    }

    getUserlocation() : any {
        let endPoint            =   'Warehouse';
        let queryParams         =   "&_where=organization=%27" + this.userpro.organization+"%27";

        return                      this.getOB3Object(endPoint, queryParams);
    }
    getCountry():any{
        let endPoint            =   'Country';
        let queryParams         =   "&_where=id=%27208%27"

        return                      this.getOB3Object(endPoint, queryParams);
    }
    getRegions(countryid) : any {
        let endPoint            =   'Region';
        let queryParams         =   "&_where=country=%27"+countryid+"%27&_sortBy=name&_selectedProperties=id,name";

        return                      this.getOB3Object(endPoint, queryParams);
    }
    getDistricts(regionid):any{
        let endPoint            =   'SLOC_District';
        let queryParams         =   "&_where=state=%27"+regionid+"%27&_sortBy=name";

        return                      this.getOB3Object(endPoint, queryParams);
    }
    getAgents():any{
        let endPoint            =   'BusinessPartner';
        let queryParams         =   "&_where=businessPartnerCategory='150916ED18AF477AA3E4D5EE76E576F7'&_selectedProperties=name,id&_sortBy=name";

        return                      this.getOB3Object(endPoint, queryParams);
    }

    getAgentLocation(agentid):any{
        console.log("agentid",agentid);
        let endPoint            =   'BusinessPartnerLocation';
        let queryParams         =   "&_where=businessPartner='" + agentid + "'";

        return                      this.getOB3Object(endPoint, queryParams);
    }
    getEMIPlan(agentid):any{
        console.log("agentid",agentid);
        let endPoint            =   'lds_emiplan';
        let queryParams         =   "&_where=bpartner='" + agentid + "'";

        return                      this.getOB3Object(endPoint, queryParams);
    }
    getEMIPlan1(emiid):any{
        console.log("emiid",emiid);
        let endPoint            =   'lds_emiplan';
        let queryParams         =   "&_where=id='" + emiid + "'";

        return                      this.getOB3Object(endPoint, queryParams);
    }
    getBpLocation() : any {
        let endPoint            =   'BusinessPartnerLocation';
        let queryParams         =   "&_where=businessPartner=%27"+this.userpro.bpartner+"%27&_selectedProperties=id,locationAddress";

        return                      this.getOB3Object(endPoint, queryParams);
    }

    getUserlocationdetails(locationid) : any {
        let endPoint            =   'Location';
        let queryParams         =   "&_where=id=%27" + locationid+"%27";

        return                      this.getOB3Object(endPoint, queryParams);
    }

    getUserState():any {

         let userstateObservable       =   new Observable(observer => {
            this.getUserlocation().subscribe(
                
                userlocation      =>  {
                    console.log("================userlocation",userlocation);
                        this.getUserlocationdetails(userlocation[0].locationAddress).subscribe(
                            userlocationdetails            =>  {
                               observer.next(userlocationdetails);
                               },
                               userlocationdetailsErr             =>  {
                                var errMsg  =   'ERROR: :: Utility Provider :: getTaxListCorrespondingToState :: while getting Zone :: \n' + JSON.stringify(userlocationdetailsErr);
                                console.log(errMsg);
                                observer.error(errMsg);
                            },
                        );
                    },
                userlocationError        =>  {
                var errMsg  =   'ERROR: :: Utility Provider :: getTaxListCorrespondingToState :: while getting Zone :: \n' + JSON.stringify(userlocationError);
                    console.log(errMsg);
                    observer.error(errMsg);
                },
            );

        });

        return    userstateObservable;
    };

    putfcmid():any {
        var quotData:any        =    {
            data                :    {
            }
        };
         quotData.data.id                 =    this.userpro.userid;
         quotData.data.description        =    this.userpro.fcmid; 

        console.log(quotData);
         return this.postOB3Object("ADUser",quotData);     
    }

    sendNotification(fcm,message,openpage,id,amount) 
        {  
        let body = {
            "notification":{
            "title":"Fortune",
            "body":message,
            "sound":"default",
            "click_action":"FCM_PLUGIN_ACTIVITY",
            "icon":"fcm_push_icon"
            },
            "data":{
            "open":openpage,
            "id":id,
            "amount":amount
            },
            "to":fcm,
            "priority":"high",
            "restricted_package_name":""
        }
        // let options = new HttpHeaders().set('Content-Type','application/json');
       // this.httpclient.post("https://fcm.googleapis.com/fcm/send",body,{
           // headers : options.set('Authorization', 'key=AIzaSyBMxa8HOJDZVd962i7z9id924ilHbScbBI'),
        //})
          //  .subscribe();
}

Createuser(user):any {
    var quotData:any        =    {
        data                :{}    
    };
    quotData.data.firstname                 =    user.name;
    quotData.data.lastname                  =   user.name;
    quotData.data.mobile                  =   user.mobile;
    quotData.data.emailid                  =   user.email;
    quotData.data.passwd                  =   user.password;
    quotData.data.clientid                  =   "D1B565840F95464DA296746768738853";
    quotData.data.categorycode              =   "Customer";
    // quotData.data.defaultRole = "883776C2354D45B4BEBF1C4FE5493ABC";

    console.log(quotData);
     return this.Webserviceforusercreation("ws/com.saksham.uploadfile.AddUserPasswd",quotData);     
     
}
getUserId(user):any{
    var mobile = user.mobile;
    console.log("username",user.mobile);
    let endPoint            =   'ADUser';
    let queryParams         =   "&_where=username=%27" + mobile +"%27";

    return                      this.getOB3Object(endPoint, queryParams);

}
UpdateUserRecord(userid,user):any{
    var quotData:any        =    {           
        data                :{}    
    };
    quotData.data.id                 =    userid;
    quotData.data.defaultRole                  =  "883776C2354D45B4BEBF1C4FE5493ABC"; //"1E74CB816F1A45D7BAC64B59BE132A01";
    quotData.data.alternativePhone                  =   user.aadhar;
   
   
    // quotData.data.defaultRole = "883776C2354D45B4BEBF1C4FE5493ABC";

    console.log(quotData);
     return this.Webserviceforuserupdation("ADUser",quotData); 

}
// sendOTP(mobilenumber,otp):any {
       
//     var self = this;
//     let utilityObservable   =   new Observable(observer => {

//         let utilityURL      =  " http://182.18.160.225/index.php/api/customized-sms?username=Medicineshoppee&password=Medicine$123&from=MEDSHP&mobile_msg="+mobilenumber+"^M-+"+otp+"+is+your+medicineshoppee+verification+code.&sms_type=2"
        
//         console.log("------------------------------------>");
//         console.log(utilityURL);
//         console.log("------------------------------------->");
//         //console.log('Utility Provider :: Get Utility :: ' + utilityURL);

//        this.nativehttp.get(utilityURL, {}, {})
//         .then(data => {
//           console.log(data.status);
//           console.log("res"+data.data); // data received by server
//           console.log(data.headers);

//           let result = JSON.parse(data.data);
//           console.log("response"+result);

//           var uRespJson               =   result;
               
//           if (uRespJson.NoOfSMS=== 1) {
//               var utilityData         =   uRespJson;
             
              

//               observer.next(utilityData);
//           } else {
              
//               let errO                =   uRespJson.error || uRespJson.errors;
//               var errMsg  =   'ERROR: OB3 Error :: Utility Provider :: Get Utility :: \n' + JSON.stringify(errO);
//               self.stackTrace         =   ["Utility Provider :: Get Utility :: Utility Response ::",errO];
//               //console.log(errMsg);
//               observer.error(errMsg);
//           }             
//         })
//         .catch(error => {
      
//           console.log(error.status);
//           console.log(error.error); // error message as string
//           console.log(error.headers);
//           console.log(error);
//           observer.error(error.error);
//         }); 

   
//     });  

//     return                      utilityObservable;
//     //console.log(JSON.stringify(approversArr));
 
// }
sendEmailOTP(email,otp):any{
    var quotData:any        =    {           
        data                :{}    
    };
    quotData.data.useremail                 =    email;
    quotData.data.OTP                  =   otp;

    console.log(quotData);
     return this.Webserviceforusercreation("ws/com.saksham.loandetails.sendusrOTP",quotData); 

}



sendMessages(mobilenumber,message):any {
       
    var self = this;
    let utilityObservable   =   new Observable(observer => {

        // let utilityURL      =  " http://182.18.160.225/index.php/api/customized-sms?username=Medicineshoppee&password=Medicine$123&from=MEDSHP&mobile_msg="+mobilenumber+"^"+message+"&sms_type=2";
        let utilityURL = "http://api.smscountry.com/SMSCwebservice_bulk.aspx?User=SRCPL&passwd=north123&mobilenumber="+mobilenumber+"&message="+message+"&sid=SMSCntry&mtype=N&DR=Y";
        
        console.log("------------------------------------>");
        console.log(utilityURL);
        console.log("------------------------------------->");
        //console.log('Utility Provider :: Get Utility :: ' + utilityURL);

       this.nativehttp.get(utilityURL, {}, {})
        .then(data => {
          console.log(data.status);
          console.log("res"+data.data); // data received by server
          console.log(data.headers);

          let result = data.data;
          console.log("response"+result);

          var uRespJson               =   result;
               
          if (uRespJson == "OK:2146320706") {
              var utilityData         =   uRespJson;
             
              

              observer.next(utilityData);
          } else {
              
              let errO                =   uRespJson.error || uRespJson.errors;
              var errMsg  =   'ERROR: OB3 Error :: Utility Provider :: Get Utility :: \n' + JSON.stringify(errO);
              self.stackTrace         =   ["Utility Provider :: Get Utility :: Utility Response ::",errO];
              //console.log(errMsg);
              observer.error(errMsg);
          }             
        })
        .catch(error => {
      
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
          console.log(error);
          observer.error(error.error);
        }); 

   
    });  

    return                      utilityObservable;
    //console.log(JSON.stringify(approversArr));

}

}

