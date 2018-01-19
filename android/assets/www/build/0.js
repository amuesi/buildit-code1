webpackJsonp([0],{

/***/ 726:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopOverSharePageModule", function() { return PopOverSharePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pop_over_share__ = __webpack_require__(727);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PopOverSharePageModule = (function () {
    function PopOverSharePageModule() {
    }
    return PopOverSharePageModule;
}());
PopOverSharePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__pop_over_share__["a" /* PopOverSharePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__pop_over_share__["a" /* PopOverSharePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__pop_over_share__["a" /* PopOverSharePage */]
        ]
    })
], PopOverSharePageModule);

//# sourceMappingURL=pop-over-share.module.js.map

/***/ }),

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopOverSharePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_alert_service__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the PopOverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PopOverSharePage = (function () {
    function PopOverSharePage(navCtrl, navParams, sharingVar, viewCtrl, alertService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sharingVar = sharingVar;
        this.viewCtrl = viewCtrl;
        this.alertService = alertService;
        this.text1 = "GH informer App";
        this.file_url = '';
        this.share_url = "https://play.google.com/store/apps/details?id=com.ghananews.sarchitech";
        this.subject = null;
        this.text1 = navParams.get("text1");
        // alert(this.text1);
        if (navParams.get("file_url")) {
            this.file_url = navParams.get("file_url");
        }
        if (navParams.get("share_url")) {
            this.share_url = navParams.get("share_url");
        }
        if (navParams.get("subject")) {
            this.subject = navParams.get("subject");
        }
    }
    PopOverSharePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PopOverSharePage');
    };
    PopOverSharePage.prototype.whatsappShare = function () {
        var _this = this;
        this.sharingVar.shareViaWhatsApp(this.text1, this.file_url /*Image*/, this.share_url /* url */)
            .then(function () {
            // alert("Success");
            _this.viewCtrl.dismiss({ result: true });
        }, function (error) {
            _this.alertService.presentAlert('Information', 'Sorry, please install WhatsApp on your phone to share needed content.');
            _this.viewCtrl.dismiss({ result: false });
        });
    };
    PopOverSharePage.prototype.twitterShare = function () {
        var _this = this;
        this.sharingVar.shareViaTwitter(this.text1, this.file_url /*Image*/, this.share_url)
            .then(function () {
            // alert("Success");
            _this.viewCtrl.dismiss({ result: true });
        }, function (error) {
            // alert("failed: " + error);
            _this.viewCtrl.dismiss({ result: false });
        });
    };
    PopOverSharePage.prototype.facebookShare = function () {
        var _this = this;
        this.sharingVar.shareViaFacebook(this.text1, this.file_url /*Image*/, this.share_url)
            .then(function () {
            // alert("Success");
            _this.viewCtrl.dismiss({ result: true });
        }, function (error) {
            // alert("then: " + error);
            _this.alertService.presentAlert('Information', 'Sorry, please install FacebookApp on your phone to share needed content.');
            _this.viewCtrl.dismiss({ result: false });
        }).catch(function (error) {
            // alert("failed: " + error);
            _this.viewCtrl.dismiss({ result: false });
        });
    };
    PopOverSharePage.prototype.otherShare = function () {
        var _this = this;
        this.sharingVar.share(this.text1, this.subject /*Subject*/, this.file_url /*File*/, this.share_url)
            .then(function () {
            // alert("Success");
            _this.viewCtrl.dismiss({ result: true });
        }, function () {
            // alert("failed");
            _this.viewCtrl.dismiss({ result: false });
        });
    };
    return PopOverSharePage;
}());
PopOverSharePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-pop-over-share',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/pop-over-share/pop-over-share.html"*/'<ion-content padding>\n  <h6 class="header-pop-up">Share</h6>\n  <!--<div class="pop-text">-->\n    <!--<span class="invalidText">*</span> Please share this content.-->\n  <!--</div>-->\n\n  <ion-icon name="logo-whatsapp" (click)="whatsappShare()" icon-only class="share-whatsapp-btn"></ion-icon>\n  <ion-icon name="logo-facebook"  (click)="facebookShare()" icon-only end class="share-facebook-btn"></ion-icon>\n  <ion-icon name="mail"  (click)="otherShare()" icon-only end class="share-mail-btn"></ion-icon>\n\n  <!--<button ion-button (click)="whatsappShare()" icon-only class="share-whatsapp-btn">-->\n    <!--&lt;!&ndash;<img src="assets/icon/whatsapp.png">&ndash;&gt;-->\n    <!--<ion-icon name="logo-whatsapp"></ion-icon>-->\n  <!--</button>-->\n  <!--&lt;!&ndash;<button ion-button (click)="twitterShare()" icon-only>&ndash;&gt;-->\n  <!--&lt;!&ndash;<img src="assets/icon/twitter.png">&ndash;&gt;-->\n  <!--&lt;!&ndash;</button>&ndash;&gt;-->\n\n  <!--<button ion-button (click)="facebookShare()" icon-only end class="share-facebook-btn">-->\n    <!--&lt;!&ndash;<img src="assets/icon/facebook.png">&ndash;&gt;-->\n    <!--<ion-icon name="logo-facebook"></ion-icon>-->\n  <!--</button>-->\n  <!--<button ion-button (click)="otherShare()" icon-only end class="share-mail-btn">-->\n    <!--&lt;!&ndash;<img src="assets/icon/flattr.png">&ndash;&gt;-->\n    <!--<ion-icon name="mail"></ion-icon>-->\n  <!--</button>-->\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/pop-over-share/pop-over-share.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_util_alert_service__["a" /* AlertService */]])
], PopOverSharePage);

//# sourceMappingURL=pop-over-share.js.map

/***/ })

});
//# sourceMappingURL=0.js.map