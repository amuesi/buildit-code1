import { Component , Input} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { ImageProvider } from "../../providers/image/image";
import { Events, AlertController, ToastController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';




@Component({
  selector: 'image',
  templateUrl: 'image.html'
})
export class ImageComponent {
  
  
  // public submissionImage1: any;
  public submittedImage1: any;
  
  // public submissionImage2: any;
  public submittedImage2: any;
  
  // public submissionImage3: any;
  public submittedImage3: any;
  
  // public submissionImage4: any;
  public submittedImage4: any;
  
  public photoTaken:boolean = false;
  
  public photoTaken1:boolean = false;
  public photoTaken2:boolean = false;
  public photoTaken3:boolean = false;
  public photoTaken4:boolean = false;
  
  
  
  
  
  @Input()
  parent: FormGroup;

  @Input()
  cat: string;

  @Input()
  submissionImage1: string;
  @Input()
  submissionImage2: string;
  @Input()
  submissionImage3: string;
  @Input()
  submissionImage4: string;

  @Input()
  isNotEditable: boolean;

  cameraOptions: CameraOptions;



  constructor(
    public IMAGE : ImageProvider,
    public ev:Events,
    private alertCtrl: AlertController,
    private camera: Camera
  )
  
  {
    this.cameraOptions = {quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 0
    };

    console.log('Hello ImageComponent Component');
    if (this.submissionImage1 != null) this.photoTaken = true;
  }//  end constructor
  
  
  
  takePhotograph1()
  {
    let alert = this.alertCtrl.create({
      title: 'Question',
      message: 'Which do you want?',
      buttons:[
        {
          text: 'GALLERY',
          handler: data => {

            this.IMAGE.getImageFromGallery()
                .then((image)=>
                {
                  this.submissionImage1 	= image.toString();
                  // this.submittedImage1 	= this.img1;

                  console.log(image);
                  this.photoTaken = true;
                  this.photoTaken1 = true;
                  // this.autosave("image1", this.submissionImage1);
                })
                .catch((err)=>
                {
                  console.log(err);
                });
          }
        },
        {
          text: 'CAMERA',
          handler: data => {
            this.IMAGE.takePhotograph1()
                .then((image1)=>
                {
                  this.submissionImage1 	= image1.toString();
                  // this.submittedImage1 	= this.img1;

                  console.log(image1);
                  this.photoTaken = true;
                  this.photoTaken1 = true;
                  // this.autosave("image1", this.submissionImage1);
                })
                .catch((err)=>
                {
                  console.log(err);
                });
          }
        }
      ]
    });
    alert.present();

  }
  
  
  takePhotograph2()
  {
    let alert = this.alertCtrl.create({
      title: 'Question',
      message: 'Which do you want?',
      buttons:[
        {
          text: 'GALLERY',
          handler: data => {

            this.IMAGE.getImageFromGallery()
                .then((image)=>
                {
                  this.submissionImage2 	= image.toString();
                  this.submittedImage2 	= image.toString();

                  console.log(image);
                  this.photoTaken = true;
                  this.photoTaken1 = true;
                  // this.autosave("image1", this.submissionImage1);
                })
                .catch((err)=>
                {
                  console.log(err);
                });
          }
        },
        {
          text: 'CAMERA',
          handler: data => {
            this.IMAGE.takePhotograph2()
                .then((image2)=>
                {
                  this.submissionImage2 	= image2.toString();
                  this.submittedImage2 	= image2.toString();

                  console.log(image2);
                  this.photoTaken = true;
                  this.photoTaken2 = true;
                  // this.autosave("image2", this.submissionImage2);
                })
                .catch((err)=>
                {
                  console.log(err);
                });
          }
        }
      ]
    });
    alert.present();



  }
  
  
  takePhotograph3()
  {
    let alert = this.alertCtrl.create({
      title: 'Question',
      message: 'Which do you want?',
      buttons:[
        {
          text: 'GALLERY',
          handler: data => {

            this.IMAGE.getImageFromGallery()
                .then((image)=>
                {
                  this.submissionImage3 	= image.toString();
                  this.submissionImage3 	= image.toString();

                  console.log(image);
                  this.photoTaken = true;
                  this.photoTaken1 = true;
                  // this.autosave("image1", this.submissionImage1);
                })
                .catch((err)=>
                {
                  console.log(err);
                });
          }
        },
        {
          text: 'CAMERA',
          handler: data => {
            this.IMAGE.takePhotograph3()
                .then((image3)=>
                {
                  this.submissionImage3 	= image3.toString();
                  this.submittedImage3 	= image3.toString();

                  console.log(image3);
                  this.photoTaken = true;
                  this.photoTaken3 = true;
                  // this.autosave("image3", this.submissionImage3);
                })
                .catch((err)=>
                {
                  console.log(err);
                });
          }
        }
      ]
    });
    alert.present();


  }
  
  
  takePhotograph4()
  {
    let alert = this.alertCtrl.create({
      title: 'Question',
      message: 'Which do you want?',
      buttons:[
        {
          text: 'GALLERY',
          handler: data => {

            this.IMAGE.getImageFromGallery()
                .then((image)=>
                {
                  this.submissionImage4 	= image.toString();
                  this.submissionImage4 	= image.toString();

                  console.log(image);
                  this.photoTaken = true;
                  this.photoTaken1 = true;
                  // this.autosave("image1", this.submissionImage1);
                })
                .catch((err)=>
                {
                  console.log(err);
                });
          }
        },
        {
          text: 'CAMERA',
          handler: data => {
            this.IMAGE.takePhotograph4()
                .then((image4)=>
                {
                  this.submissionImage4 	= image4.toString();
                  this.submittedImage4 	= image4.toString();

                  console.log(image4);
                  this.photoTaken = true;
                  this.photoTaken4 = true;
                  // this.autosave("image4", this.submissionImage4);
                })
                .catch((err)=>
                {
                  console.log(err);
                });
          }
        }
      ]
    });
    alert.present();


  }

  submissionImage_clicked($event, imageNum){
    let alert = this.alertCtrl.create({
      title: 'Warning',
      message: 'Do you want to DELETE this image?',
      buttons:[
        {
          text: 'CANCEL',
          handler: data => {
            console.log('No clicked')
          }
        },
        {
          text: 'OK',
          handler: data => {
            switch (imageNum){
              case '1':
                this.submissionImage1 	= "";
                this.submittedImage1 	= "";
                this.photoTaken = false;
                this.photoTaken1 = false;
                break;
              case '2':
                this.submissionImage2 	= "";
                this.submittedImage2 	= "";
                this.photoTaken = false;
                this.photoTaken2 = false;
                break;
              case '3':
                this.submissionImage3 	= "";
                this.submittedImage3 	= "";
                this.photoTaken = false;
                this.photoTaken3 = false;
                break;
              case '4':
                this.submissionImage4 	= "";
                this.submittedImage4 	= "";
                this.photoTaken = false;
                this.photoTaken4 = false;
                break;
              default:
                break;
            }

          }
        }
      ]
    });
    alert.present();

  }


  // autosave(key, value){
  //   var data = {};
  //   data['key'] = key;
  //   data['value'] = value;
  //   // alert(key + "," + value)
  //   if (this.cat == "Incident"){
  //     this.ev.publish("autosave_incident", data);
  //   }
  //   else if (this.cat == "Hazard"){
  //     this.ev.publish("autosave_hazzard", data);
  //   }
  //   else if (this.cat == "Security Incident"){
  //     this.ev.publish("autosave_security_incident", data);
  //   }
  //   else if (this.cat == "Security Non Compliance"){
  //     this.ev.publish("autosave_security_incident", data);
  //   }
  //   else if (this.cat == "Security Good Practice"){
  //     this.ev.publish("autosave_security_incident", data);
  //   }
  //
  // }
  
  
  
} // end class
