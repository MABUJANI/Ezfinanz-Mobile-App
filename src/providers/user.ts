import {Injectable}             from    "@angular/core";
 import {Http}          from    "@angular/http";
import {Observable}             from    "rxjs/Observable";
import {Config}                 from    "./config";
import { HTTP } from '@ionic-native/http';



export interface UserType {
    businessPartner             :   string;
    id                          :   string;
    name                        :   string;
    username                    :   string;
    client                      :   string;
    organization                :   string;
}
@Injectable()
export class UserProvider {
    database                    : any;
    User                        : any;
    UserAccess                  = [];

    userName                    :   string;
    password                    :   string;
    userid                    :   string;
    client                    :   string;
    organization                :   string;
    bpartner                  :   string;
    defaultrole                  :   string;
    organizationname                :   string;
    fcmid                       : string ;
    email                       : string;
    userData                    :   UserType;
    stackTrace                  =   [];
    profilename               :   string;

    public pushTokenSaved       :   boolean;
    public pushToken            :   string;
    public navcon : any ;

 constructor(
        //  private http:Http,
          private config:Config,
          private nativehttp : HTTP
        ) {

        this.userName           =   localStorage.getItem('userName') || '';
        this.password           =   localStorage.getItem('password') || '';
        this.userid           =   localStorage.getItem('userid') || '';
        this.client           =   localStorage.getItem('client') || '';
        this.organization           =   localStorage.getItem('organization') || '';
        this.bpartner           =   localStorage.getItem('bpartner') || '';
        this.defaultrole           =   localStorage.getItem('defaultrole') || '';
        this.organizationname           =   localStorage.getItem('organizationname') || '';
        this.profilename           =   localStorage.getItem('profilename') || '';
        this.email           =   localStorage.getItem('email') || '';
        this.fcmid           =   localStorage.getItem('fcmid') || '';
        this.userData           =   null;
 
    };
    authenticateURL(urlString) {
        return urlString + 'l='+ this.userName + '&p='+this.password;
        //return urlString + 'l=MobileApp'  + '&p=123456';
    };
    authenticateURLgettingData(urlString) {
        return urlString + 'l=Jani'  + '&p=123';
    };
    getCompleteURL(serviceName) {
        return                      this.config.apiBasePoint + serviceName;
    };
     IsSignedIn() {
        var self                =   this;
        this.userData           =   null;
        let loginObservable     =   new Observable(observer => {
            var LoginURL = self.authenticateURL(self.config.apiBasePoint + 'Country?');
            LoginURL = LoginURL+'&_startRow=0&_endRow=1';
            /*var loginURL    =   self.authenticateURLgettingData(self.config.apiBasePoint + 'ADUser?');
            loginURL        =   loginURL + '&_where=username=%27' + this.userName + '%27';
            console.log(LoginURL);
            console.log(loginURL);*/
            let UserWS      =  null;//self.http.get(LoginURL);
            
            UserWS.subscribe(
                    WSResposonse => {
                           
                           observer.next(WSResposonse.json().response.data[0]);
                            observer.complete();
                        },
                    err        =>{
                    
                            observer.error(err);
                    },
                     ()   =>{
                        observer.complete();
                    });
        });
        return                      loginObservable;
}
 isSignedIn() {
        //this.logProvider.info({"logMessage":"User Provider :: isSignedIn ::"});
        //console.log('check for sign in');
        localStorage.setItem('userName', this.userName); 
        localStorage.setItem('password', this.password);

        var self                =   this;
        this.userData           =   null;
        let loginObservable     =   new Observable(observer => {
           
            var loginURL    =   self.authenticateURL(self.config.apiBasePoint + 'ADUser?');
            loginURL        =   loginURL + '&_where=username=%27' + this.userName + '%27%20and%20password!=null%20and%20defaultRole!=null&_startRow=0&_endRow=1';
           //%20and%20defaultRole!=null';
            console.log(loginURL);
          
            let userWS      =   self.nativehttp.get(loginURL,{},{});
            console.log("http");

            if ((this.userName.length != 0) && (this.password.length != 0)) {
               console.log("if condition")
            this.nativehttp.get(loginURL, {}, {})
            .then(data => {
              console.log(data.status);
              console.log("res"+data.data); // data received by server
              console.log(data.headers);

              let result = JSON.parse(data.data);
              console.log("response"+result.response.data[0].name+result.response.data.name);
              self.userData           =   result.response.data[0];
                           
              this.userid           =   result.response.data[0].id;
              this.client           =   result.response.data[0].client;
              this.organization     =   result.response.data[0].organization;
              this.bpartner         =   result.response.data[0].businessPartner;
              this.defaultrole           =   result.response.data[0].defaultRole$_identifier;
              this.profilename          =   result.response.data[0].firstName+" "+result.response.data[0].lastName;
              this.email          =   result.response.data[0].email;
              this.organizationname =   result.response.data[0].organization$_identifier;
              localStorage.setItem('userid',this.userid) ;
              localStorage.setItem('client',this.client) ;
              localStorage.setItem('organization',this.organization);     
              localStorage.setItem('bpartner',this.bpartner);
              localStorage.setItem('defaultrole',this.defaultrole);
              localStorage.setItem('profilename',this.profilename);
              localStorage.setItem('email',this.email);
              localStorage.setItem('organizationname',this.organizationname);             
            console.log("OnLogin  local ===",this.userid);

              observer.next(self.userData);
              observer.complete();
            })
            .catch(error => {
          
              console.log(error.status);
              console.log(error.error); // error message as string
              console.log(error.headers);
              console.log(error);
              observer.error(error.error);
            });  
                //console.log('User Provider :: isSignedIn :: ' + loginURL);
                /*UserWS.subscribe(
                    WSResposonse => {*/
                
          /*  userWS.subscribe(
                        wsResponse  =>  {
                            console.log("OnLogin  userData ===",wsResponse);
                            console.log("OnLogin  pushToken ===",self.pushToken + this.userid);
                            //console.log('check for sign in - complete');
                            self.userData           =   wsResponse.json().response.data[0];
                           
                            this.userid           =   wsResponse.json().response.data[0].id;
                            this.client           =   wsResponse.json().response.data[0].client;
                            this.organization     =   wsResponse.json().response.data[0].organization;
                            this.bpartner         =   wsResponse.json().response.data[0].businessPartner;
                            this.defaultrole         =   wsResponse.json().response.data[0].defaultRole$_identifier;
                            this.organizationname     =   wsResponse.json().response.data[0].organization$_identifier;
                            localStorage.setItem('userid',this.userid) ;
                            localStorage.setItem('client',this.client) ;
                            localStorage.setItem('organization',this.organization);   
                            localStorage.setItem('bpartner',this.bpartner);
                            localStorage.setItem('defaultrole',this.defaultrole);
                            localStorage.setItem('organizationname',this.organizationname);        
                          console.log("OnLogin  local ===",this.userid);

                            observer.next(self.userData);
                            observer.complete();
                            
                            //self.savePushToken(self.pushToken);
                        },

                        err         =>  {
                            this.stackTrace = ["User Provider :: isSignedIn",loginURL];
                            //console.log('ERR: User Provider :: isSignedIn :: ' , err);
                            err.stackTrace = this.stackTrace;
                            observer.error(err);
                        },

                        ()          =>  {
                            observer.complete();
                        }
            );  */
                
            } else {

                observer.error('User Credentials Not Available');
            }

        });  

        return                      loginObservable;
     };

    savePushToken(deviceToken) {
        
         console.log("!!!!!!!!!!!!!!!!!!@@@@@@@@@#################1 in save push token");
        var self        =   this;
        var loginURL    =   self.authenticateURL(self.config.apiBasePoint + 'ADUser?');
        var data        =   {
                                "data"              :   {
                                    "id"            :   self.userData.id,
                                    "description"   :   deviceToken
                                }
                            };
        let userWS      =   null;//self.http.put(loginURL, JSON.stringify(data));

        //console.log('User Provider :: Save Push Token :: ' + loginURL);

        userWS.subscribe(
            wsResponse  =>  {
                let uRespJson                       =   wsResponse.json().response;
                console.log("Successfully saved Push Token: ", uRespJson);
               
                if (uRespJson.status === 0) {
                    console.log("Successfully saved Push Token: ", uRespJson);
                } else {
                    let errO                        =   uRespJson.error || uRespJson.errors;
                    //var errMsg                      =   'ERROR: OB3 Error :: User Provider :: Save Push Token :: \n' + JSON.stringify(errO);
                    this.stackTrace                 =    ["User Provider :: Save Push Token",loginURL];
                    console.log("ERRORTTTTT");
                }
            },

            err         =>  {

                    this.stackTrace                 =    ["User Provider :: Save Push Token",loginURL];
                    err.stackTrace = this.stackTrace;
               // console.log('ERR: User Provider :: Save Push Token :: ' , err);
            },

            () => {
            }
        );

    };



    signOut() {
        console.log("*****************signout");
                  
                    this.userName           =   '';
                    this.password           =   '';
                    this.userid           =   '';
                    this.client           =   '';
                    this.organization       =   '';
                    this.bpartner         =   '';
                    this.defaultrole         =   '';
                    this.organizationname       =   '';
                    this.profilename       =   '';
                    this.email       =   '';

                    //console.log(this.userName);
                    localStorage.setItem('userName', this.userName);
                    localStorage.setItem('password', this.password);
                    localStorage.setItem('userid',this.userid) ;
                    localStorage.setItem('client',this.client) ;
                    localStorage.setItem('profilename',this.profilename) ;
                    localStorage.setItem('email',this.email) ;
                    localStorage.setItem('organization',this.organization);
                    localStorage.setItem('bpartner',this.bpartner);
                    localStorage.setItem('defaultrole',this.defaultrole);
                    localStorage.setItem('organizationname',this.organizationname);
    }
    // active(){

    // }

}

