import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera } from '@ionic-native/camera';


@Injectable()
export class ImageProvider {
  
  
  public cameraImage : String;
  
  public cameraImage1 : String;
  public cameraImage2 : String;
  public cameraImage3 : String;
  public cameraImage4 : String;
  
  
  
  public images: Array<string>;
  public multipleImagesUri:any;
  
  constructor(public http: Http,
              public camera:Camera,
  ) {
  }
  
  
  takePhotograph()
  {
    return new Promise(resolve =>
    {
      this.camera.getPicture(
        {
          destinationType 	 : this.camera.DestinationType.DATA_URL,
          targetWidth 	     : 320,
          targetHeight	     : 240
        })
        .then((data) =>
        {
          // imageData is a base64 encoded string
          this.cameraImage 	= "data:image/jpeg;base64," + data;
          resolve(this.cameraImage);
        });
    });
  }

  getImageFromGallery(){
    return new Promise(resolve =>
    {
      this.camera.getPicture(
          {
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            sourceType: 0,
            targetWidth 	     : 320,
            targetHeight	     : 240
          })
          .then((data) =>
          {
            // imageData is a base64 encoded string
            this.cameraImage1 	= "data:image/jpeg;base64," + data;
            resolve(this.cameraImage1);
          });
    });
  }
  
  
  takePhotograph1()
  {
    return new Promise(resolve =>
    {
      this.camera.getPicture(
        {
          destinationType 	 : this.camera.DestinationType.DATA_URL,
          targetWidth 	     : 320,
          targetHeight	     : 240
        })
        .then((data) =>
        {
          // imageData is a base64 encoded string
          this.cameraImage1 	= "data:image/jpeg;base64," + data;
          resolve(this.cameraImage1);
        });
    });
  }
  
  takePhotograph2()
  {
    return new Promise(resolve =>
    {
      this.camera.getPicture(
        {
          destinationType 	 : this.camera.DestinationType.DATA_URL,
          targetWidth 	     : 320,
          targetHeight	     : 240
        })
        .then((data) =>
        {
          // imageData is a base64 encoded string
          this.cameraImage2 	= "data:image/jpeg;base64," + data;
          resolve(this.cameraImage2);
        });
    });
  }
  
  takePhotograph3()
  {
    return new Promise(resolve =>
    {
      this.camera.getPicture(
        {
          destinationType 	 : this.camera.DestinationType.DATA_URL,
          targetWidth 	     : 320,
          targetHeight	     : 240
        })
        .then((data) =>
        {
          // imageData is a base64 encoded string
          this.cameraImage3 	= "data:image/jpeg;base64," + data;
          resolve(this.cameraImage3);
        });
    });
  }
  
  takePhotograph4()
  {
    return new Promise(resolve =>
    {
      this.camera.getPicture(
        {
          destinationType 	 : this.camera.DestinationType.DATA_URL,
          targetWidth 	     : 320,
          targetHeight	     : 240
        })
        .then((data) =>
        {
          // imageData is a base64 encoded string
          this.cameraImage4 	= "data:image/jpeg;base64," + data;
          resolve(this.cameraImage4);
        });
    });
  }
  
  
  
  
  
  selectPhotograph()
  {
    return new Promise(resolve =>
    {
      let cameraOptions = {
        sourceType         : this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType    : this.camera.DestinationType.DATA_URL,
        quality            : 100,
        targetWidth        : 320,
        targetHeight       : 240,
        encodingType       : this.camera.EncodingType.JPEG,
        correctOrientation : true
      };
      
      this.camera.getPicture(cameraOptions)
        .then((data) =>
        {
          this.cameraImage 	= "data:image/jpeg;base64," + data;
          resolve(this.cameraImage);
        });
      
    });
  }
  
  // openGallery (){
    
  //   return new Promise(resolve => {
  //     let options = {
  //       maximumImagesCount: 8,
  //       width: 500,
  //       height: 500,
  //       quality: 75
  //     };
      
  //     this.imagePicker.getPictures(options)
  //       .then((file_uris) => {
  //         this.images = file_uris;
  //         console.log(file_uris);
  //         resolve(this.images);
  //       }).catch(error => {
  //       console.log(error);
  //     });
  //   });
    
  // }
  
  // multipleImages(){
    
  //   return new Promise(resolve => {
      
  //     let options = {
  //       maximumImagesCount: 8,
  //       width: 500,
  //       height: 500,
  //       quality: 75
  //     };
      
  //     this.imagePicker.getPictures(options)
  //       .then(data => {
          
          
  //         this.multipleImagesUri = data;
  //         alert(data);
          
          
          
  //         resolve(this.multipleImagesUri);
  //       })
      
  //   });
    
  // }
  
  
  
  
} // end class
