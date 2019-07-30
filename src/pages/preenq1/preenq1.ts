import { Component } from "@angular/core";
import { UtilityProvider } from "../../providers/utility";
import { NavController, LoadingController, ToastController } from "ionic-angular";
import { PreEnq2Page } from "../preenq2/preenq2";
import {Camera} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { UserProvider } from "../../providers/user";
import { Config } from "../../providers/config";
import { LoginPage } from "../login/login";
declare let cordova: any;
@Component({
    selector:'page-preenq1',
    templateUrl:'preenq1.html'

})
export class PreEnq1Page{

    public prescriptionImage : string = null;
    lastImage: string = null;
    base64Image:string;
    public userinfo:any={};
    public district:any = [];
    public country:any =[];
    public state:any = [];
    constructor(public utilityprovider:UtilityProvider,
      public camera:Camera,
      public navctrl:NavController,
      public file:File,
      public userProvider:UserProvider,
      public config:Config,
      public loading:LoadingController,
      public toast:ToastController,
      private transfer: FileTransfer,

      ){
        // this.userinfo.district =null;
        this.get();
    }
    get() {
        //console.log('ionViewDidLoad CustomerpagePage');
        this.utilityprovider.getCountry().subscribe(
          d => {
              console.log("====>orde",d);
              console.log("====>orde",d[0].id);
              this.country = d;
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



      aadharCheck(){
        this.utilityprovider.getUserDataByAadhar(this.userinfo).subscribe(

          success =>{
            console.log("aadhar data",success);
            
            console.log("father name2",success.fathername);
           
            this.userinfo.fathername = success.fathername;
            this.userinfo.mothername = success.mothername;
            this.userinfo.mobile = success.alternate_mblnumber;
            this.userinfo.pan = success.Panno;
            this.userinfo.panname = success.nameofpan;
            this.userinfo.address = success.address;
            this.userinfo.pincode = success.pincode;

            this.userinfo.residence = success.type_of_residence;
            this.userinfo.occupation = success.occupation_type;
            this.userinfo.marital = success.maritial_status;
            this.userinfo.country = success.country;
            this.userinfo.state = success.state;
            this.userinfo.district = success.district;
          
            

          },
          err =>{
            console.log("aadhar data error",err);
            console.log("aadhar data father",err.fathername);
          }

        )
      }
      countryChanged(){
        this.utilityprovider.getRegions(this.userinfo.country.id).subscribe(
            success =>{
              console.log("Agent Id",this.userinfo.country.id);
            //   console.log()
              this.state = success;
              console.log("state data",success);
  
              
            },
            err =>{
              console.log("Error",err);
            }
        )

      }
      stateChanged(){
        this.utilityprovider.getDistricts(this.userinfo.state.id).subscribe(
            sucess =>{
              console.log(sucess);
              console.log("state Id",this.userinfo.country.id);
              this.district = sucess;
            },
            err =>{
              console.log("Error",err);
            }
          )
      }
    // districts() {
    //     console.log('ionViewDidLoad CustomerpagePage');
    //     this.utilityprovider.getDistricts().subscribe(
    //       d => {
    //           console.log("====>orde",d);
    //           this.district = d;
    //       },
    //       err => {
    //           var l = err.stackTrace.length;
    //           //console.error(err);
    //           alert('Error: Creating Sales Order :: Getting Organizations :: ' + JSON.stringify(err));
    //       },
    //       () => {}
    //   );
    //   //this.utilityprovider.sendNotification(this.userprovider.fcmid);
    //   }
    pre(){
        this.utilityprovider.preenquiry(this.userinfo).subscribe(
            success=>{
                console.log("success",success);
                console.log(success[0].id)
                this.utilityprovider.preenquirylocation(this.userinfo).subscribe(
                  sucess =>{
                    console.log(sucess)
                    console.log("image id",sucess[0].id)
                    this.utilityprovider.postLocation(sucess[0].id,success[0].id).subscribe(
                      suc=>{
                        console.log("location",suc)

                        // this.utilityprovider.UploadFiles(this.userinfo).subscribe(
                        //   uploaded =>{
                        //     console.log("UploadSuccess",uploaded)
                        //   },
                        //   uploaderr =>{
                        //     console.log("UploadError",uploaderr);
                        //   }
                        // )
                      },
                      er=>{
                        console.log(er)
                      }
                    )
                    // this.uploadImage(success[0].id);
                    this.navctrl.push(PreEnq2Page,{"userid":success[0].id});
                  },
                  err =>{
                    console.log("Erroe",err)
                  }
                )
               
                // this.navctrl.push(Validation,{"OTP":this.random,"userdata":this.user});
            },
            err =>{
            console.log("Error",err)
            }
        )
    }
    
    fromGallery(){
      this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
    }
    
    fromCamera(){
      this.takePicture(this.camera.PictureSourceType.CAMERA);
    }
      takePicture(sourceType){
        console.log("***");
        var self = this;
        this.camera.getPicture({
            //destinationType: this.camera.DestinationType.DATA_URL,
            //destinationType: this.camera.DestinationType.FILE_URI,
            sourceType : sourceType,
            targetWidth:1200,
            targetHeight:1000,
            saveToPhotoAlbum: true,
            }).then((imagePath) => {      
              if(sourceType === this.camera.PictureSourceType.PHOTOLIBRARY){
                let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
              }else{
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);  
                    console.log("imagepath"+correctPath);
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
              }
                }, (err) => {
                console.log(err);
            });
        }
    
        private createFileName() {
            var d = new Date(),
            n = d.getTime(),
            newFileName =  n + ".jpg";
            return newFileName;
          }
           
          // Copy the image to a local folder
          private copyFileToLocalDir(namePath, currentName, newFileName) {
            this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
              this.lastImage = newFileName;
              var targetPath = this.pathForImage(this.lastImage);
              this.prescriptionImage = this.lastImage;
              console.log("targetpath"+targetPath);
              // this.uploadImage();
            }, error => {
                
            });
          }
  
          public pathForImage(img) {
            if (img === null) {
              return '';
            } else {
              return cordova.file.dataDirectory + img;
            }
          }
          public uploadImage(recordid) {
            // Destination URL
            //var url = "http://94.130.127.19:8080/drainvac/CRM_UploadFile?l=muni1&p=123";
            var url = this.userProvider.authenticateURL(this.config.apipoint+"UploadFile?");
            // File for Upload
            // var targetPath = this.pathForImage(this.lastImage);
          
            // File name only
           
            // var filename = this.navparams.get("image");
            var targetPath = this.pathForImage(this.prescriptionImage);
          
            // console.log("targetpath"+filename+"gg--"+targetPath);
            var options = {
              fileKey: "file",
              fileName: this.prescriptionImage,
              chunkedMode: false,
              mimeType: "multipart/form-data",
              params : {'recordid': recordid,
                "tableid" : "259",
                "clientid" : this.userProvider.client,
                "orgid" : this.userProvider.organization}
            };
          
            const fileTransfer: FileTransferObject = this.transfer.create();
        
                let loading = this.loading.create({
                    content: 'Uploading...',
                });
                loading.present();
                
                // Use the FileTransfer to upload the image
                fileTransfer.upload(targetPath, url, options).then(data => {
                    loading.dismissAll()
                    let toast = this.toast.create({
                      message: 'Image Uploaded Successfully',
                      duration: 3000,
                      position: 'bottom',
                      cssClass:"toast"
                    });
                    toast.present();      
                                console.log("image options"+options.params);
                }, err => {
                    loading.dismissAll()
                    let toast = this.toast.create({
                      message: 'Error while uploading file.',
                      duration: 3000,
                      position: 'bottom',
                      cssClass:"toast"
                    });
                    toast.present();      
                 });
          }
          signOut(){
            this.navctrl.push(LoginPage);
          }
    reset(){
        this.userinfo.customername = null;
        this.userinfo.fathername = null;
        this.userinfo.mothername = null;
        this.userinfo.residence = null;
        this.userinfo.occupation = null;
        this.userinfo.marital = null;
        this.userinfo.mobile = null;
        this.userinfo.pan = null;
        this.userinfo.panname = null;
        this.userinfo.address = null;
        this.userinfo.district = null;
        this.userinfo.state = null;
        this.userinfo.country = null;
    }
}