webpackJsonp([1],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseHomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__firebase_login_firebase_login_component__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__firebase_sign_up_firebase_sign_up_component__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__firebase_reset_password_firebase_reset_password_component__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var FirebaseHomeComponent = (function () {
    function FirebaseHomeComponent(navController, toastController, angularFireAuth, firebaseDB, platform, fb) {
        this.navController = navController;
        this.toastController = toastController;
        this.angularFireAuth = angularFireAuth;
        this.firebaseDB = firebaseDB;
        this.platform = platform;
        this.fb = fb;
    }
    FirebaseHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.angularFireAuth.authState.subscribe(function (data) {
            if (data) {
                _this.auth = data;
            }
            else {
                _this.auth = null;
            }
            _this.loading = false;
        });
    };
    FirebaseHomeComponent.prototype.loginWithFacebook = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            return this.fb.login(['email', 'public_profile']).then(function (res) {
                var facebookCredential = __WEBPACK_IMPORTED_MODULE_8_firebase_app__["auth"].FacebookAuthProvider.credential(res.authResponse.accessToken);
                return __WEBPACK_IMPORTED_MODULE_8_firebase_app__["auth"]().signInWithCredential(facebookCredential).then(function (data) {
                    _this.auth = data.auth;
                }).catch(function (error) {
                    var errorMessage = error;
                    if (errorMessage && errorMessage.message) {
                        var message = errorMessage.message.replace(/<(?:.|\n)*?>/gm, '');
                        var toast = _this.toastController.create({
                            message: message,
                            duration: 6000,
                            position: 'bottom'
                        });
                        toast.present();
                    }
                });
            });
        }
        else {
            return this.angularFireAuth.auth
                .signInWithPopup(new __WEBPACK_IMPORTED_MODULE_8_firebase_app__["auth"].FacebookAuthProvider()).then(function (data) {
                _this.auth = data.auth;
            }).catch(function (error) {
                var errorMessage = error;
                if (errorMessage && errorMessage.message) {
                    var message = errorMessage.message.replace(/<(?:.|\n)*?>/gm, '');
                    var toast = _this.toastController.create({
                        message: message,
                        duration: 6000,
                        position: 'bottom'
                    });
                    toast.present();
                }
            });
        }
    };
    FirebaseHomeComponent.prototype.login = function () {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_5__firebase_login_firebase_login_component__["a" /* FirebaseLoginComponent */]);
    };
    FirebaseHomeComponent.prototype.logout = function () {
        this.angularFireAuth.auth.signOut();
    };
    FirebaseHomeComponent.prototype.signUp = function () {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_6__firebase_sign_up_firebase_sign_up_component__["a" /* FirebaseSignUpComponent */]);
    };
    FirebaseHomeComponent.prototype.resetPassword = function () {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_7__firebase_reset_password_firebase_reset_password_component__["a" /* FirebaseResetPasswordComponent */]);
    };
    return FirebaseHomeComponent;
}());
FirebaseHomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/firebase/firebase-home/firebase-home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Firebase</ion-title>\n    <ion-buttons *ngIf="auth" end>\n        <button (click)="logout()" ion-button icon-only>\n          <ion-icon name="log-out"></ion-icon>\n          Logout\n        </button>\n      </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding text-center>\n  <div *ngIf="!auth || (auth && !auth.photoURL)" class="logo" padding-bottom>\n      <img src="assets/img/firebase.png" />\n  </div>\n\n  <div *ngIf="auth && !loading">\n    <div *ngIf="auth.photoURL" margin-bottom class="user-logo" [ngStyle]="{\'background-image\': \'url(\' + auth.photoURL + \')\'}"></div>\n    <div padding-bottom>Welcome <span *ngIf="auth.displayName">{{auth.displayName}}</span> <span *ngIf="auth.email">({{auth.email}})</span></div>\n    <button ion-button icon-left block color="light" (click)="logout()">\n      <ion-icon name="log-out"></ion-icon>\n      {{ \'LOGOUT\' | translate }}\n    </button>\n  </div>\n\n  <div *ngIf="!auth && !loading">\n    <button ion-button icon-left block outline class="facebook-btn" (click)="loginWithFacebook()">\n      <ion-icon name="logo-facebook"></ion-icon>\n      Log In with Facebook\n    </button>\n    <button ion-button icon-left block color="light" class="login-btn" (click)="login()">\n      <ion-icon name="contact"></ion-icon>\n      {{ \'LOGIN\' | translate }}\n    </button>\n    <button ion-button icon-left block clear color="dark" class="action-btn" (click)="signUp()">\n      <ion-icon name="add"></ion-icon>\n      {{ \'SIGN_UP\' | translate }}\n    </button>\n    <button ion-button icon-left block clear color="dark" class="action-btn" (click)="resetPassword()">\n      <ion-icon name="send"></ion-icon>\n      {{ \'RESET_PASSWORD\' | translate }}\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/firebase/firebase-home/firebase-home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__["a" /* Facebook */]])
], FirebaseHomeComponent);

//# sourceMappingURL=firebase-home.component.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertService = (function () {
    function AlertService(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    AlertService.prototype.presentAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        return alert.present();
    };
    AlertService.prototype.presentErrorAlert = function (message) {
        return this.presentAlert("An error has occurred.", message);
    };
    AlertService.prototype.presentAlertWithCallback = function (title, message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var confirm = _this.alertCtrl.create({
                title: title,
                message: message,
                buttons: [{
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            confirm.dismiss().then(function () { return resolve(false); });
                        }
                    }, {
                        text: 'Yes',
                        handler: function () {
                            confirm.dismiss().then(function () { return resolve(true); });
                        }
                    }]
            });
            return confirm.present();
        });
    };
    return AlertService;
}());
AlertService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], AlertService);

//# sourceMappingURL=alert.service.js.map

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_social_sharing__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_email_composer__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_google_analytics__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_cache__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_network__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_app_rate__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_geolocation__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_keyboard__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_admob_free__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ng2_translate__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pipes_truncate_pipe__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pipes_trim_html_pipe__ = __webpack_require__(631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__app_config__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















// import { OneSignal } from '@ionic-native/onesignal';







function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_18_ng2_translate__["d" /* TranslateStaticLoader */](http, './assets/translations', '.json');
}
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_19__pipes_truncate_pipe__["a" /* TruncatePipe */],
            __WEBPACK_IMPORTED_MODULE_20__pipes_trim_html_pipe__["a" /* TrimHtmlPipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["d" /* JsonpModule */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_18_ng2_translate__["b" /* TranslateModule */].forRoot({
                provide: __WEBPACK_IMPORTED_MODULE_18_ng2_translate__["a" /* TranslateLoader */],
                useFactory: (createTranslateLoader),
                deps: [__WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */]]
            })
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */],
            __WEBPACK_IMPORTED_MODULE_18_ng2_translate__["b" /* TranslateModule */],
            __WEBPACK_IMPORTED_MODULE_19__pipes_truncate_pipe__["a" /* TruncatePipe */],
            __WEBPACK_IMPORTED_MODULE_20__pipes_trim_html_pipe__["a" /* TrimHtmlPipe */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_21__app_config__["a" /* Config */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_admob_free__["a" /* AdMobFree */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_google_analytics__["a" /* GoogleAnalytics */],
            // OneSignal,
            __WEBPACK_IMPORTED_MODULE_12_ionic_cache__["a" /* CacheService */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_app_rate__["a" /* AppRate */]
        ]
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailValidator; });
var EmailValidator = (function () {
    function EmailValidator() {
    }
    EmailValidator.isValid = function (control) {
        var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(control.value);
        if (re) {
            return null;
        }
        return {
            "invalidEmail": true
        };
    };
    return EmailValidator;
}());

//# sourceMappingURL=email.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_email__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__password_reset_password_reset__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_loading_modal_loading_modal__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = (function () {
    function LoginPage(viewCtrl, navCtrl, loadingCtrl, alertCtrl, formBuilder, authProvider, modalCtrl, afAuth, events) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.authProvider = authProvider;
        this.modalCtrl = modalCtrl;
        this.afAuth = afAuth;
        this.events = events;
        this.backgrounds = [
            "assets/img/background/background-1.jpg",
            "assets/img/background/background-2.jpg",
            "assets/img/background/background-3.jpg",
            "assets/img/background/background-4.jpg"
        ];
        this.isSignup = false;
        this.acceptButtonName = "Login";
        this.username = "test";
        this.fullname = "test";
        this.loginForm = formBuilder.group({
            fullname: ['test', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            username: ['test', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validators_email__["a" /* EmailValidator */].isValid])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    LoginPage.prototype.loginUser = function () {
        // this.loading = this.loadingCtrl.create();
        // this.loading.present();
        var _this = this;
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__components_loading_modal_loading_modal__["a" /* LoadingModal */], { 'text': 'Please wait...' });
            this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
                .then(function (authData) {
                var menuObject = {
                    "isLogin": true,
                    "currentUser": authData1.username,
                };
                _this.events.publish('loginEvent', menuObject);
                var authData1 = authData;
                localStorage.setItem("isLogin", "true");
                localStorage.setItem("userUID", authData1.key);
                localStorage.setItem("currentUser", authData1.username);
                // this.loading.dismiss().then( () => {
                var data = { 'email': _this.loginForm.value.email, 'login_status': 'true' };
                _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_6__components_loading_modal_loading_modal__["a" /* LoadingModal */]);
                _this.viewCtrl.dismiss(data);
                // });
            }, function (error) {
                var err = error;
                _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_6__components_loading_modal_loading_modal__["a" /* LoadingModal */]);
                var errMsg = error.message;
                if (err.code == "auth/wrong-password") {
                    errMsg = "The password is incorrect.";
                }
                else if (err.code == "auth/user-not-found") {
                    errMsg = "The user does not exist.";
                }
                // this.loading.dismiss().then( () => {
                var alert = _this.alertCtrl.create({
                    message: errMsg,
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();
                // });
            });
        }
    };
    LoginPage.prototype.loginCancel = function () {
        this.viewCtrl.dismiss({ login_status: 'false' });
    };
    LoginPage.prototype.goToSignup = function () {
        var _this = this;
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__components_loading_modal_loading_modal__["a" /* LoadingModal */], { 'text': 'Please wait...' });
            var user = {};
            user.email = this.loginForm.value.email;
            user.password = this.loginForm.value.password;
            user.fullname = this.loginForm.value.fullname;
            user.username = this.loginForm.value.username;
            this.authProvider.signupUser(user)
                .then(function (newUser) {
                if (newUser) {
                    var menuObject = {
                        "isLogin": true,
                        "currentUser": newUser.username,
                    };
                    _this.events.publish('loginEvent', menuObject);
                    localStorage.setItem("userUID", _this.afAuth.auth.currentUser.uid);
                    localStorage.setItem("currentUser", newUser.username);
                    var data = { 'email': _this.loginForm.value.email,
                        'login_status': 'true'
                    };
                    localStorage.setItem("isLogin", "true");
                    // this.navCtrl.pop(LoadingModal);
                    _this.viewCtrl.dismiss(data);
                    _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_6__components_loading_modal_loading_modal__["a" /* LoadingModal */]);
                }
                else {
                    _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_6__components_loading_modal_loading_modal__["a" /* LoadingModal */]);
                    // this.loading.dismiss().then( () => {
                    var errorMessage = "Sorry Sign up failed. Please check network connection state.";
                    var alert_1 = _this.alertCtrl.create({
                        message: errorMessage,
                        buttons: [{ text: "Ok", role: 'cancel' }]
                    });
                    alert_1.present();
                }
                // });
            }, function (error) {
                _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_6__components_loading_modal_loading_modal__["a" /* LoadingModal */]);
                // this.loading.dismiss().then( () => {
                var errorMessage = error.message;
                var alert = _this.alertCtrl.create({
                    message: errorMessage,
                    buttons: [{ text: "Ok", role: 'cancel' }]
                });
                alert.present();
                // });
            });
        }
    };
    LoginPage.prototype.goToResetPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__password_reset_password_reset__["a" /* PasswordResetPage */]);
        // let modal = this.modalCtrl.create(PasswordResetPage);
        // modal.onDidDismiss(val => {
        //   let data = { 'email': val.email, 'login_status': 'false'};
        //   // localStorage.setItem("isLogin", "true");
        //   this.viewCtrl.dismiss(data);
        // });
        // modal.present();
        // this.navCtrl.push('PasswordResetPage');
    };
    LoginPage.prototype.slideNext = function () {
        this.innerSlider.slideNext();
    };
    LoginPage.prototype.slidePrevious = function () {
        this.innerSlider.slidePrev();
    };
    LoginPage.prototype.loginSegmentButtonClicked = function () {
        this.isSignup = false;
        this.loginForm.controls['username'].setValue("test");
        this.loginForm.controls['fullname'].setValue("test");
        this.acceptButtonName = "Login";
    };
    LoginPage.prototype.registerSegmentButtonClicked = function () {
        this.acceptButtonName = "SignUp";
        this.loginForm.controls['username'].setValue("");
        this.loginForm.controls['fullname'].setValue("");
        this.isSignup = true;
    };
    LoginPage.prototype.startSign = function () {
        if (this.isSignup) {
            this.goToSignup();
        }
        else {
            this.loginUser();
        }
    };
    return LoginPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('slider'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Slides */])
], LoginPage.prototype, "slider", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('innerSlider'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Slides */])
], LoginPage.prototype, "innerSlider", void 0);
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/login/login.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-segment color="dark">\n      <ion-segment-button (click)="loginSegmentButtonClicked()">\n        Login\n        <!--<ion-icon name="camera"></ion-icon>-->\n      </ion-segment-button>\n      <ion-segment-button (click)="registerSegmentButtonClicked()">\n        Register\n        <!--<ion-icon name="bookmark"></ion-icon>-->\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="login">\n\n\n\n    <ion-slides pager="false" autoplay="2000" loop="true" speed="1500" effect="fade">\n      <ion-slide class="slide-background swiper-no-swiping" *ngFor="let background of backgrounds" [ngStyle]="{\'background-image\': \'url(\' + background +\')\'}">\n      </ion-slide>\n    </ion-slides>\n  <!--<img src="assets/img/background/background-1.jpg">-->\n    <div class="login-container">\n      <!--<img class="logo" src="assets/img/logo/logo-canon.png" />-->\n      <form [formGroup]="loginForm" novalidate>\n        <!--<strong>Login:</strong>-->\n\n          <ion-item *ngIf="isSignup">\n            <ion-input (value)="fullname" formControlName="fullname" type="text" placeholder="Full Name"\n                       [class.invalid]="isSignup && !loginForm.controls.fullname.valid && loginForm.controls.fullname.dirty"></ion-input>\n          </ion-item>\n          <ion-item class="error-message"\n                    *ngIf="isSignup && !loginForm.controls.fullname.valid  && loginForm.controls.fullname.dirty">\n            <p>Please enter a user full name.</p>\n          </ion-item>\n\n        <ion-item *ngIf="isSignup">\n          <ion-input formControlName="username" type="text" placeholder="User Name" (value)="username"\n                     [class.invalid]="isSignup && !loginForm.controls.username.valid && loginForm.controls.username.dirty"></ion-input>\n        </ion-item>\n        <ion-item class="error-message"\n                  *ngIf="isSignup && !loginForm.controls.username.valid  && loginForm.controls.username.dirty">\n          <p>Please enter a user name.</p>\n        </ion-item>\n\n        <ion-item class="login_email">\n          <ion-input formControlName="email" type="email" placeholder="Your email address"\n                     [class.invalid]="!loginForm.controls.email.valid && loginForm.controls.email.dirty"></ion-input>\n        </ion-item>\n\n        <ion-item class="error-message"\n                  *ngIf="!loginForm.controls.email.valid  && loginForm.controls.email.dirty">\n          <p>Please enter a valid email.</p>\n        </ion-item>\n\n        <ion-item>\n          <ion-input formControlName="password" type="password" placeholder="Your password"\n                     [class.invalid]="!loginForm.controls.password.valid && loginForm.controls.password.dirty"></ion-input>\n        </ion-item>\n\n        <ion-item class="error-message"\n                  *ngIf="!loginForm.controls.password.valid  && loginForm.controls.password.dirty">\n          <p>Your password needs more than 6 characters.</p>\n        </ion-item>\n\n        <button ion-button margin color="danger" (click)="startSign()"><ion-icon ios="ios-person-add" md="md-person-add"></ion-icon>{{acceptButtonName}}</button>\n        <button ion-button margin color="blue" (click)="loginCancel()"><ion-icon ios="ios-home" md="md-home"></ion-icon><span>BACK</span></button>\n        <!--<button ion-button margin color="danger" (click)="goToSignup()">REGISTER</button>-->\n        <!--<p (click)="goToSignup()"><strong><ins>Sign Up</ins></strong></p>-->\n        <p *ngIf="!isSignup" (click)="goToResetPassword()"><strong><ins>Forgot your password?</ins></strong></p>\n\n      </form>\n    </div>\n\n\n  <!--</form>-->\n</ion-content>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MetricTemp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MetricLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MetricDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MetricPressure; });
/* harmony export (immutable) */ __webpack_exports__["e"] = collapse;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_animations__ = __webpack_require__(583);

var MetricTemp;
(function (MetricTemp) {
    MetricTemp[MetricTemp["F"] = 0] = "F";
    MetricTemp[MetricTemp["C"] = 1] = "C";
})(MetricTemp || (MetricTemp = {}));
var MetricLength;
(function (MetricLength) {
    MetricLength[MetricLength["IN"] = 0] = "IN";
    MetricLength[MetricLength["CM"] = 1] = "CM";
})(MetricLength || (MetricLength = {}));
var MetricDistance;
(function (MetricDistance) {
    MetricDistance[MetricDistance["MI"] = 0] = "MI";
    MetricDistance[MetricDistance["KM"] = 1] = "KM";
})(MetricDistance || (MetricDistance = {}));
var MetricPressure;
(function (MetricPressure) {
    MetricPressure[MetricPressure["MBAR"] = 0] = "MBAR";
    MetricPressure[MetricPressure["HPA"] = 1] = "HPA";
})(MetricPressure || (MetricPressure = {}));
//https://github.com/FuelInteractive/fuel-ui/tree/master/src/animations/Collapse
function collapse(duration) {
    if (duration === void 0) { duration = 200; }
    return Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["f" /* trigger */])('collapse', [
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["c" /* state */])('collapsed, true, void', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["d" /* style */])({
            height: '0',
            opacity: '0',
            overflow: 'hidden'
        })),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["c" /* state */])('expanded, false', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["d" /* style */])({
            height: '*',
            opacity: '1',
            overflow: 'hidden'
        })),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["e" /* transition */])('true => false, collapsed => expanded', [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["a" /* animate */])(duration + 'ms ease', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["b" /* keyframes */])([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["d" /* style */])({ opacity: '1' }),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["d" /* style */])({ height: '*' })
            ]))
        ]),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["e" /* transition */])('false => true, expanded => collapsed', [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["a" /* animate */])(duration + 'ms ease', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["d" /* style */])({ height: '0' }))
        ])
    ]);
}
//# sourceMappingURL=model.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weather_list_weather_list__ = __webpack_require__(589);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    return ComponentsModule;
}());
ComponentsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__weather_list_weather_list__["a" /* WeatherListComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__weather_list_weather_list__["a" /* WeatherListComponent */]
        ]
    })
], ComponentsModule);

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_global__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AboutComponent = (function () {
    function AboutComponent(navCtrl, global, iab) {
        // throw new Error('I am a bug... 🐛');
        this.navCtrl = navCtrl;
        this.global = global;
        this.iab = iab;
    }
    AboutComponent.prototype.goToSite = function () {
        var browser = this.iab.create('https://sarchitech.com/privacy-policy/');
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-about',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/about/about-component/about.html"*/'<ion-header>\n  <ion-navbar  color="primary">\n	  <button ion-button menuToggle icon-only>\n		  <img src="assets/icon/menu-icon-dark.png">\n		  <!--<ion-icon name=\'menu\'></ion-icon>-->\n	  </button>\n    <ion-title>\n      <ion-title>{{\'ABOUT\' | translate}}</ion-title>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div class="img">\n		<img class="app-logo" src = "assets/img/icon_mark.png">\n	</div>\n\n	<ion-card class="{{global.state[\'theme\']}}">\n	  <ion-card-content>\n		  <p>GH Informer is the one and only news app a Ghanaian interested in news back home needs!<br/> An app by Ghanaians for the Ghanaians.</p>\n\n		  <p class="link" (click)="goToSite()">Privacy Policy </p>\n	  </ion-card-content>\n	</ion-card>\n\n	<!--<ion-card>-->\n\n\n	<!--<ion-card-content>-->\n	  	<!--<h1>Build apps with the Ionic 2 App</h1>-->\n	  	<!--<p>Use the Ionic 2 App to get you up and running with mobile apps faster than ever before.</p>-->\n	  <!--</ion-card-content>-->\n	<!--</ion-card>-->\n\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/about/about-component/about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_global__["a" /* AppState */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], AboutComponent);

//# sourceMappingURL=about.component.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressHome; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_analytics_analytics__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wordpress_login_wordpress_login_component__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wordpress_posts_wordpress_posts_component__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wordpress_categories_wordpress_categories_component__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wordpress_favorites_wordpress_favorites_component__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__wordpress_pages_wordpress_pages_component__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__wordpress_menus_wordpress_menus_component__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var WordpressHome = (function () {
    function WordpressHome(navController, _ANALYTICS, navParams, storage) {
        this.navController = navController;
        this._ANALYTICS = _ANALYTICS;
        this.navParams = navParams;
        this.storage = storage;
        this.user = navParams.get('user');
    }
    WordpressHome.prototype.ngOnInit = function () {
        this.getUser();
        this.pages = [
            { title: 'MENUS', component: __WEBPACK_IMPORTED_MODULE_9__wordpress_menus_wordpress_menus_component__["a" /* WordpressMenus */], icon: 'menu', note: 'Wordpress' },
            { title: 'POSTS', component: __WEBPACK_IMPORTED_MODULE_5__wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */], icon: 'logo-wordpress', note: 'Wordpress' },
            { title: 'CATEGORIES', component: __WEBPACK_IMPORTED_MODULE_6__wordpress_categories_wordpress_categories_component__["a" /* WordpressCategories */], icon: 'pricetags', note: 'Wordpress' },
            { title: 'FAVORITES', component: __WEBPACK_IMPORTED_MODULE_7__wordpress_favorites_wordpress_favorites_component__["a" /* WordpressFavorites */], icon: 'heart', note: 'Wordpress (Storage)' },
            { title: 'PAGES', component: __WEBPACK_IMPORTED_MODULE_8__wordpress_pages_wordpress_pages_component__["a" /* WordpressPages */], icon: 'document', note: 'Wordpress' }
        ];
    };
    WordpressHome.prototype.getUser = function () {
        var _this = this;
        this.storage.get('wordpress.user')
            .then(function (data) {
            if (data) {
                _this.user = data;
            }
        });
    };
    WordpressHome.prototype.login = function () {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_4__wordpress_login_wordpress_login_component__["a" /* WordpressLogin */]);
    };
    WordpressHome.prototype.logout = function () {
        this.user = undefined;
        this.storage.remove('wordpress.user');
    };
    WordpressHome.prototype.openPage = function (page) {
        this.navController.push(page.component);
    };
    return WordpressHome;
}());
WordpressHome = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-home/wordpress-home.html"*/'<ion-content scroll="false" class="page-welcome">\n  <div class="splash-bg"></div>\n  <div class="splash-info">\n    <div class="splash-logo"></div>\n    <div class="splash-intro">\n      <span *ngIf="!user">{{ \'LOGIN\' | translate }}</span>\n      <span *ngIf="user">Hello {{ user.user_nicename }}</span>\n    </div>\n    <div class="splash-email" *ngIf="user">{{ user.user_email }}</div>\n  </div>\n  <ion-list *ngIf="user">\n    <ion-item *ngFor="let page of pages" (click)="openPage(page)">\n      <ion-icon [name]="page.icon" item-left></ion-icon>\n      {{page.title | translate}}\n      <ion-note item-right>\n      {{page.note}}\n      </ion-note>\n    </ion-item>\n  </ion-list>\n  <div padding>\n    <button *ngIf="!user" ion-button block (click)="login()">{{ \'LOGIN\' | translate }}</button>\n    <button *ngIf="user" ion-button block (click)="logout()">{{ \'LOGOUT\' | translate }}</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-home/wordpress-home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_analytics_analytics__["a" /* AnalyticsProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], WordpressHome);

//# sourceMappingURL=wordpress-home.component.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressFavorites; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wordpress_post_wordpress_post_component__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WordpressFavorites = (function () {
    function WordpressFavorites(navParams, navController, storage) {
        this.navParams = navParams;
        this.navController = navController;
        this.storage = storage;
        this.hideSearchbar = true;
        this.favoritePosts = [];
    }
    WordpressFavorites.prototype.ionViewWillEnter = function () {
        this.getPosts();
    };
    WordpressFavorites.prototype.getPosts = function () {
        var _this = this;
        this.storage.get('wordpress.favorite')
            .then(function (data) {
            if (data) {
                _this.favoritePosts = JSON.parse(data);
            }
        });
    };
    WordpressFavorites.prototype.loadPost = function (post) {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_3__wordpress_post_wordpress_post_component__["a" /* WordpressPost */], {
            post: post
        });
    };
    WordpressFavorites.prototype.removeFavoritePost = function (post) {
        var index = this.favoritePosts.findIndex(function (item) { return item.id === post.id; });
        this.favoritePosts.splice(index, 1);
        this.storage.set('wordpress.favorite', JSON.stringify(this.favoritePosts));
    };
    WordpressFavorites.prototype.removeAllFavoritePosts = function () {
        this.favoritePosts = [];
        this.storage.remove('wordpress.favorite');
    };
    return WordpressFavorites;
}());
WordpressFavorites = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-favorites/wordpress-favorites.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-buttons start>\n			<button menuToggle>\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title>{{\'FAVORITES\' | translate}} ({{favoritePosts.length}})</ion-title>\n		<ion-buttons end>\n	      <button (click)="removeAllFavoritePosts()" ion-button icon-only>\n	        <ion-icon name="trash"></ion-icon>\n	      </button>\n	    </ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n        <ion-item-sliding *ngFor="let post of favoritePosts">\n            <ion-item (click)="loadPost(post)">\n                {{post.title.rendered}}\n                <button ion-button item-right outline>Read</button>\n            </ion-item>\n            <ion-item-options>\n                <button primary (click)="removeFavoritePost(post)">Remove</button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-favorites/wordpress-favorites.html"*/,
        providers: []
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], WordpressFavorites);

//# sourceMappingURL=wordpress-favorites.component.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressPages; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wordpress_page_wordpress_page_component__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WordpressPages = (function () {
    function WordpressPages(wordpressService, navController, loadingController) {
        this.wordpressService = wordpressService;
        this.navController = navController;
        this.loadingController = loadingController;
    }
    WordpressPages.prototype.ngOnInit = function () {
        this.getPages();
    };
    WordpressPages.prototype.getPages = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.wordpressService.getPages()
            .subscribe(function (result) {
            _this.pages = result;
        }, function (error) { return console.log(error); }, function () { return loader.dismiss(); });
    };
    WordpressPages.prototype.loadPage = function (page) {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_3__wordpress_page_wordpress_page_component__["a" /* WordpressPage */], {
            page: page
        });
    };
    return WordpressPages;
}());
WordpressPages = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-pages/wordpress-pages.html"*/'<ion-header>\n	<ion-navbar>\n		<button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>{{\'PAGES\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list>\n		<ion-item *ngFor="let page of pages" (click)="loadPage(page)">\n			<h2>{{page.title.rendered}}</h2>\n		</ion-item>\n	</ion-list>\n</ion-content>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-pages/wordpress-pages.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__shared_services_wordpress_service__["a" /* WordpressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__shared_services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
], WordpressPages);

//# sourceMappingURL=wordpress-pages.component.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedCategoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feeds_feeds_component__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_feed_service__ = __webpack_require__(182);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FeedCategoryComponent = (function () {
    function FeedCategoryComponent(feedService, navParams, navController, loadingController) {
        this.feedService = feedService;
        this.navParams = navParams;
        this.navController = navController;
        this.loadingController = loadingController;
        this.category = navParams.get('category');
        if (!this.category) {
            this.getCategory();
        }
    }
    FeedCategoryComponent.prototype.getCategory = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.feedService.getCategory()
            .subscribe(function (result) {
            _this.category = result;
            loader.dismiss();
        });
    };
    FeedCategoryComponent.prototype.loadFeeds = function (feedUrl) {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_2__feeds_feeds_component__["a" /* FeedsComponent */], {
            feedUrl: feedUrl
        });
    };
    return FeedCategoryComponent;
}());
FeedCategoryComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/feeds/feed-category/feed-category.html"*/'<ion-header>\n	<ion-navbar>\n		<button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title *ngIf="category">{{category.title}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content *ngIf="category">\n	<section padding>\n		<h2>{{category.title}}</h2>\n		<p>{{category.description}}</p>\n	</section>\n	<ion-list>\n		<ion-item *ngFor="let item of category.items" (click)="loadFeeds(item.url)">\n			<h2>{{item.title}}</h2>\n			<p>{{item.description}}</p>\n			<button ion-button item-right outline>Read</button>\n		</ion-item>\n	</ion-list>\n</ion-content>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/feeds/feed-category/feed-category.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__shared_services_feed_service__["a" /* FeedService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__shared_services_feed_service__["a" /* FeedService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
], FeedCategoryComponent);

//# sourceMappingURL=feed-category.component.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FeedService = (function () {
    function FeedService(http, config) {
        this.http = http;
        this.config = config;
    }
    FeedService.prototype.getCategories = function () {
        var url = this.config.feedsUrl;
        return this.http.get(url)
            .map(function (result) {
            return result.json();
        });
    };
    FeedService.prototype.getCategory = function () {
        var url = this.config.feedsCategoryUrl;
        return this.http.get(url)
            .map(function (result) {
            return result.json();
        });
    };
    FeedService.prototype.getFeeds = function (source) {
        var url = 'https://query.yahooapis.com/v1/public/yql?q=select * from xml where url ="' + encodeURIComponent(source) + '"&format=json';
        return this.http.get(url)
            .map(function (result) {
            return result.json();
        });
    };
    return FeedService;
}());
FeedService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__app_app_config__["a" /* Config */]])
], FeedService);

//# sourceMappingURL=feed.service.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wordpress_post_wordpress_post_component__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_firebase_use_firebase_use__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_global__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_cache__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_analytics__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_network_network__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_util_toast_service__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_analytics_analytics__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var HomeComponent = (function () {
    function HomeComponent(navController, menuController, events, wordpressService, toastController, storage, firebaseUseProvider, global, ga, cache, networkProvider, toastService, _ANALYTICS) {
        // this._options = {
        // 	slidesPerView:2,
        // 	pager: true,
        // 	nextButton: ".swiper-button-next",
        // 	prevButton: ".swiper-button-prev",
        // 	onInit:()=>{
        // 	}
        // }
        this.navController = navController;
        this.menuController = menuController;
        this.events = events;
        this.wordpressService = wordpressService;
        this.toastController = toastController;
        this.storage = storage;
        this.firebaseUseProvider = firebaseUseProvider;
        this.global = global;
        this.ga = ga;
        this.cache = cache;
        this.networkProvider = networkProvider;
        this.toastService = toastService;
        this._ANALYTICS = _ANALYTICS;
        this.categories = ["1", '2', '3', '4', '5'];
        this.isBusy = false;
        this.isBusyMore = false;
        this.showDetail = false;
        this.isBusyScroll = false;
        this.shouldShowCancel = true;
        this.most_posts = [];
        this.hideSearchbar = true;
        this.menu_icon_name = 'assets/icon/menu-icon-default.png';
        this.comment_count = 0;
        this.timeInterval = null;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._ANALYTICS.trackPageView('Home page view');
        // this.category = this.navParams.get('category');
        // this.tag = this.navParams.get('tag');
        // this.author = this.navParams.get('author');
        this.hideSearchbar = true;
        this.search = '';
        this.favoritePosts = [];
        this.storage.get('wordpress.favorite')
            .then(function (data) {
            if (data) {
                _this.favoritePosts = JSON.parse(data);
            }
        });
        // this.googleAnalyticsSetup();
        // this.cache.saveItem('savedPosts', []);
        this.loadPostData();
    };
    HomeComponent.prototype.pageReload = function () {
        clearInterval(this.persist0);
        this.loadPostData();
    };
    HomeComponent.prototype.loadPostData = function () {
        var _this = this;
        this.cache.getItem('savedPosts').catch(function () {
            _this.getPosts(true);
        }).then(function (data) {
            if (data != null && data.length > 0) {
                _this.posts = data;
                for (var _i = 0, _a = _this.posts; _i < _a.length; _i++) {
                    var post = _a[_i];
                    var s = post.title.rendered.replace('&#8216;', "'");
                    post.title.rendered = s;
                    s = post.title.rendered.replace('&#8217;', "'");
                    post.title.rendered = s;
                    s = post.title.rendered.replace('&#8211;', "-");
                    post.title.rendered = s;
                    post['comment_count'] = _this.comment_count;
                    // this.getCommentDataByID(post);
                }
                _this.pageCount = 1;
                _this.getPosts(false);
                _this.loadMore(null);
            }
            else {
                if (!_this.networkProvider.obtainNetworkConnection()) {
                    alert("Please check network connection state.");
                    return;
                }
                _this.getPosts(true);
            }
        });
    };
    // googleAnalyticsSetup(){
    // 	this.ga.startTrackerWithId('UA-96166653-4')
    //        .then(() => {
    // 			alert('Google analytics is ready now');
    // 			this.ga.trackView('Home');
    // 			// Tracker is ready
    // 			// You can now track pages or set additional information such as AppVersion or UserId
    // 		})
    //        .catch(e => alert('Error starting GoogleAnalytics'+e));
    // 	// this.ga.enableUncaughtExceptionReporting(true).then((_success) => {
    // 	// 	alert("Successful enabling of uncaught exception reporting "+_success)
    // 	// }).catch((_error) => {
    // 	// 	alert("error occured "+_error)
    // 	// });
    //
    // 	this.ga.trackEvent('form', 'vote', 'Hours online', 1)
    //        .then(() => {
    // 			alert('Google analytics Event is ready now');
    // 		});
    // }
    HomeComponent.prototype.getPosts = function (showFlag) {
        var _this = this;
        this.pageCount = 1;
        var query = this.createQuery();
        // let loader = this.loadingController.create({
        // 	content: "Please wait",
        // // duration: 10000
        // });
        // loader.present();
        // if (showFlag)
        // {
        // 	if(!this.networkProvider.obtainNetworkConnection()){
        // 		console.log('Sorry, network is unavailable. Please make sure status of network.');
        // 		// alert('Sorry, network is unavailable. Please make sure status of network.');
        // 		this.toastService.create('Sorry, network is unavailable. Please make sure status of network.', false, 3000);
        // 		// this.toastService.present()
        // 		// this.platform.exitApp();
        // 	}
        // }
        this.isBusy = showFlag;
        this.isBusyMore = false;
        // alert(this.networkProvider.obtainNetworkConnection());
        if (!this.networkProvider.obtainNetworkConnection()) {
            // alert(this.networkProvider.obtainNetworkConnection());
            if (this.timeInterval == null) {
                // alert("start");
                this.timeInterval = setInterval((function () {
                    this.toggleRefresh();
                }).bind(this), 2000);
            }
            return;
        }
        else {
            if (this.timeInterval != null) {
                // alert("end");
                clearInterval(this.timeInterval);
                this.timeInterval = null;
            }
        }
        this.wordpressService.getPosts(query)
            .subscribe(function (result) {
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var post = result_1[_i];
                var s = post.title.rendered.replace('&#8216;', "'");
                post.title.rendered = s;
                s = post.title.rendered.replace('&#8217;', "'");
                post.title.rendered = s;
                s = post.title.rendered.replace('&#8211;', "-");
                post.title.rendered = s;
                post['comment_count'] = _this.comment_count;
                _this.getCommentDataByID(post);
            }
            if (showFlag) {
                _this.posts = result;
                _this.loadMore(null);
            }
            else {
                var i = 0;
                for (var _a = 0, result_2 = result; _a < result_2.length; _a++) {
                    var post = result_2[_a];
                    _this.posts[i] = result[i];
                    i++;
                }
            }
            _this.isBusy = false;
            _this.cache.saveItem('savedPosts', result);
        }, function (err) {
            // alert('getPost error');
            // alert(JSON.stringify(err));
        });
    };
    HomeComponent.prototype.getCommentDataByID = function (post) {
        // if(this.firebaseUseProvider.getCommentData(post.id.toLocaleString())) {
        // 	this.firebaseUseProvider.getCommentData(post.id.toLocaleString()).subscribe(snapshots => {
        // 		this.comment_count = 0;
        // 		snapshots.forEach(snapshot1 => {
        // 			var snapshot :any = snapshot1;
        // 			var item = snapshot.val();
        // 			if (item.comment_post_ID == String(post.id)) {
        // 				this.comment_count = this.comment_count + 1;
        // 				post['comment_count'] = this.comment_count;
        // 			}
        // 			console.log(snapshot.key, snapshot.val());
        // 		});
        //
        // 	});
        // }
    };
    HomeComponent.prototype.getDate = function (post) {
        return post.date.split('T')[0];
    };
    HomeComponent.prototype.getAuthorPosts = function (author) {
        this.author = author;
        this.getPosts(true);
    };
    HomeComponent.prototype.searchPosts = function () {
        this.posts = [];
        this.getPosts(true);
    };
    HomeComponent.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        if (this.pageCount > 10) {
            return;
        }
        // alert("loadMore");
        if (!this.networkProvider.obtainNetworkConnection()) {
            if (this.timeInterval == null) {
                // alert("start");
                this.timeInterval = setInterval((function () {
                    this.toggleRefresh();
                }).bind(this), 2000);
            }
            return;
        }
        else {
            if (this.timeInterval != null) {
                // alert("end");
                clearInterval(this.timeInterval);
                this.timeInterval = null;
            }
        }
        this.pageCount++;
        var query = this.createQuery();
        // let loader = this.loadingController.create({
        // 	content: "Please wait"
        // });
        var toast = this.toastController.create({
            message: "There are no more posts.",
            duration: 2000
        });
        // loader.present();
        this.isBusyMore = true;
        this.wordpressService.getPosts(query)
            .subscribe(function (result) {
            // infiniteScroll.complete();
            if (result.length < 1) {
                // infiniteScroll.complete();
                // infiniteScroll.enable(false);
                toast.present();
            }
            else {
                for (var _i = 0, result_3 = result; _i < result_3.length; _i++) {
                    var post = result_3[_i];
                    post['comment_count'] = _this.comment_count;
                    _this.getCommentDataByID(post);
                }
                _this.posts = _this.posts.concat(result);
            }
            _this.isBusyMore = false;
            _this.loadMore(null);
        }, function (err) {
            // alert(JSON.stringify(err));
            if (!_this.networkProvider.obtainNetworkConnection()) {
                // alert(this.networkProvider.obtainNetworkConnection());
                if (_this.timeInterval == null) {
                    // alert("start");
                    _this.timeInterval = setInterval((function () {
                        this.toggleRefresh();
                    }).bind(_this), 2000);
                }
            }
            _this.isBusyMore = false;
        });
    };
    HomeComponent.prototype.loadMoreScroll = function (infiniteScroll) {
        var _this = this;
        if (this.pageCount <= 10) {
            return;
        }
        this.pageCount++;
        var query = this.createQuery();
        // let loader = this.loadingController.create({
        // 	content: "Please wait"
        // });
        var toast = this.toastController.create({
            message: "There are no more posts.",
            duration: 2000
        });
        // loader.present();
        this.isBusyMore = true;
        this.wordpressService.getPosts(query)
            .subscribe(function (result) {
            // infiniteScroll.complete();
            if (result.length < 1) {
                infiniteScroll.complete();
                infiniteScroll.enable(false);
                toast.present();
            }
            else {
                for (var _i = 0, result_4 = result; _i < result_4.length; _i++) {
                    var post = result_4[_i];
                    var s = post.title.rendered.replace('&#8216;', "'");
                    post.title.rendered = s;
                    s = post.title.rendered.replace('&#8217;', "'");
                    post.title.rendered = s;
                    s = post.title.rendered.replace('&#8211;', "-");
                    post.title.rendered = s;
                    post['comment_count'] = _this.comment_count;
                    _this.getCommentDataByID(post);
                }
                _this.posts = _this.posts.concat(result);
            }
            _this.isBusyMore = false;
        }, function () { return _this.isBusyMore = false; });
    };
    HomeComponent.prototype.loadPost = function (post) {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_4__wordpress_post_wordpress_post_component__["a" /* WordpressPost */], {
            post: post, firebaseUseProvider: this.firebaseUseProvider
        });
    };
    HomeComponent.prototype.favoritePost = function (post) {
        var newPost = true;
        var message;
        this.favoritePosts.forEach(function (favPost) {
            if (JSON.stringify(favPost) === JSON.stringify(post)) {
                newPost = false;
            }
        });
        if (newPost) {
            this.favoritePosts.push(post);
            this.storage.set('wordpress.favorite', JSON.stringify(this.favoritePosts));
            message = "This post has been saved to your list";
        }
        else {
            message = "This post is already in your list";
        }
        var toast = this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    };
    HomeComponent.prototype.toggleSearchbar = function () {
        this.hideSearchbar = !this.hideSearchbar;
    };
    HomeComponent.prototype.createQuery = function () {
        var query = {};
        query['page'] = this.pageCount;
        if (this.search) {
            query['search'] = this.search;
        }
        if (this.category) {
            query['categories'] = null; //this.category.id;
        }
        if (this.tag) {
            query['tags'] = this.tag.id;
        }
        if (this.author) {
            query['author'] = this.author;
        }
        return query;
    };
    HomeComponent.prototype.toggleRefresh = function () {
        var _this = this;
        this.storage.get('wordpress.favorite')
            .then(function (data) {
            if (data) {
                _this.favoritePosts = JSON.parse(data);
            }
        });
        this.posts = [];
        this.getPosts(true);
    };
    HomeComponent.prototype.get_menu_icon_name = function () {
        alert(this.global.state['theme']);
        if (this.global.state['theme'] == 'dark') {
            this.menu_icon_name = 'assets/icon/menu-icon-dark.png';
        }
        else {
            this.menu_icon_name = 'assets/icon/menu-icon-default.png';
        }
    };
    HomeComponent.prototype.ionViewWillLeave = function () {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
        }
    };
    return HomeComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Slides */])
], HomeComponent.prototype, "slides", void 0);
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/home-component/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle  clear no-padding no-margin>\n      <img src="assets/icon/menu-icon-dark.png">\n    </button>\n\n    <!--<ion-buttons start menuToggle clear>-->\n      <!--&lt;!&ndash;<button ion-button icon-only>&ndash;&gt;-->\n        <!--&lt;!&ndash;<img src="assets/icon/GH Informer-App-Icon-192x192px.png" style="zoom: 0.14;">&ndash;&gt;-->\n        <!--&lt;!&ndash;&lt;!&ndash;<ion-icon name=\'menu\'></ion-icon>&ndash;&gt;&ndash;&gt;-->\n      <!--&lt;!&ndash;</button>&ndash;&gt;-->\n      <!--<button ion-button  clear>-->\n        <!--<img src="assets/icon/menu-icon-dark.png">-->\n      <!--</button>-->\n    <!--</ion-buttons>-->\n\n    <ion-title>{{\'HOME\' | translate}}</ion-title>\n\n    <ion-buttons end>\n      <button (tap)="toggleRefresh()" ion-button icon-only>\n        <ion-icon name="refresh"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons end>\n      <button (tap)="toggleSearchbar()" ion-button icon-only>\n        <ion-icon name="search"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <!--<ion-buttons end>-->\n      <!--<button ion-button icon-only>-->\n        <!--<img src="assets/icon/GH Informer-App-Icon-192x192px.png" style="zoom: 0.14;">-->\n        <!--&lt;!&ndash;<ion-icon name=\'menu\'></ion-icon>&ndash;&gt;-->\n      <!--</button>-->\n    <!--</ion-buttons>-->\n\n\n  </ion-navbar>\n  <ion-toolbar [hidden]="hideSearchbar">\n    <ion-searchbar [(ngModel)]="search" [showCancelButton]="shouldShowCancel" (ionInput)="searchPosts()" (ionCancel)="toggleSearchbar()"> debounce=500></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<!--<ion-content padding class="home">-->\n\n  <!--<div class="container" *ngIf="isBusy">-->\n    <!--<div class="spinner">-->\n      <!--<div class="backdrop"></div>-->\n      <!--<p>&#9733;</p>-->\n    <!--</div>-->\n    <!--<p text-center="true">Loading...</p>-->\n  <!--</div>-->\n\n  <!--&lt;!&ndash;<div class="top-div-content">&ndash;&gt;-->\n    <!--<ion-card *ngIf="!isBusy">-->\n      <!--<ion-slides (ionSlideDidChange)="slideChanged()" (ionSlideDrag)="slideDrag()" pager="true">-->\n\n        <!--<ion-slide  *ngFor="let post of most_posts">-->\n          <!--<h1>{{category_name}}</h1>-->\n          <!--&lt;!&ndash;<h3 [innerHTML]="get_current_most_post_title(category)"></h3>&ndash;&gt;-->\n          <!--<wordpress-feature-media [id]="post.featured_media" (click)="loadPost(post)"></wordpress-feature-media>-->\n        <!--</ion-slide>-->\n\n      <!--</ion-slides>-->\n    <!--</ion-card>-->\n  <!--&lt;!&ndash;</div>&ndash;&gt;-->\n\n  <!--<div class="container0" *ngIf="isBusyMore">-->\n    <!--<div class="spinner0">-->\n      <!--<div class="backdrop0"></div>-->\n      <!--<p>&#9733;</p>-->\n    <!--</div>-->\n    <!--<p text-center="true" class="loading0">Loading...</p>-->\n  <!--</div>-->\n\n  <!--&lt;!&ndash;<div class="bottom-div-content">&ndash;&gt;-->\n  <!--<ion-scroll style="height: 46vh;" scrollY="true" no-padding >-->\n  <!--<ion-list *ngIf="showDetail" scroll="true" no-padding>-->\n    <!--<ion-card *ngFor="let post of selected_posts" no-padding>-->\n      <!--<ion-item class="aticle1" text-wrap (click)="loadPost(post)" float-right="true">-->\n\n        <!--&lt;!&ndash; <h4 class="date">{{post.date | date: \'fullDate\'}}</h4> &ndash;&gt;-->\n\n        <!--<wordpress-feature-media class="home-media1" *ngIf="post.featured_media" [id]="post.featured_media" (click)="loadPost(post)"></wordpress-feature-media>-->\n        <!--&lt;!&ndash;<p [innerHTML]="post.title.rendered"></p>&ndash;&gt;-->\n        <!--<h2>{{post.title.rendered}}</h2>-->\n      <!--</ion-item>-->\n      <!--&lt;!&ndash;<ion-item *ngIf="post[\'_embedded\'] && post[\'_embedded\'].author && post[\'_embedded\'].author[0] && post[\'_embedded\'].author[0].avatar_urls">&ndash;&gt;-->\n        <!--&lt;!&ndash;<ion-avatar item-left>&ndash;&gt;-->\n        <!--&lt;!&ndash;<img [src]="post[\'_embedded\'].author[0].avatar_urls[96]">&ndash;&gt;-->\n        <!--&lt;!&ndash;</ion-avatar>&ndash;&gt;-->\n        <!--&lt;!&ndash;<h2 (click)="getAuthorPosts(post.author)">{{post[\'_embedded\'].author[0].name}}</h2>&ndash;&gt;-->\n      <!--&lt;!&ndash;</ion-item>&ndash;&gt;-->\n      <!--<ion-card-content>-->\n        <!--&lt;!&ndash;<p>{{post.content.rendered | trimHTML | truncate: 100 }}</p>&ndash;&gt;-->\n        <!--<p text-right style="color: blue;">{{getDate(post)}}</p>-->\n      <!--</ion-card-content>-->\n\n      <!--<ion-row no-padding>-->\n        <!--<ion-col text-left>-->\n          <!--<button ion-button icon-left clear (click)="favoritePost(post)">-->\n            <!--<ion-icon name=\'heart\'></ion-icon>-->\n            <!--Favorite-->\n          <!--</button>-->\n        <!--</ion-col>-->\n        <!--<ion-col text-right>-->\n          <!--<button ion-button clear (click)="loadPost(post)">-->\n            <!--Read-->\n          <!--</button>-->\n        <!--</ion-col>-->\n      <!--</ion-row>-->\n    <!--</ion-card>-->\n\n    <!--<div class="container0" *ngIf="isBusyScroll">-->\n      <!--<div class="spinner0">-->\n        <!--<div class="backdrop0"></div>-->\n        <!--<p>&#9733;</p>-->\n      <!--</div>-->\n      <!--<p text-center="true" class="loading0">Loading...</p>-->\n    <!--</div>-->\n\n\n\n\n  <!--</ion-list>-->\n  <!--</ion-scroll>-->\n  <!--<ion-infinite-scroll *ngIf="!isBusyScroll" (ionInfinite)="loadMore($event)">-->\n    <!--<ion-infinite-scroll-content></ion-infinite-scroll-content>-->\n  <!--</ion-infinite-scroll>-->\n\n\n  <!--&lt;!&ndash;</div>&ndash;&gt;-->\n  <!--&lt;!&ndash;<h2>{{\'HOME_TITLE\' | translate}}</h2>&ndash;&gt;-->\n  <!--&lt;!&ndash;<p>&ndash;&gt;-->\n    <!--&lt;!&ndash;{{\'HOME_MESSAGE\' | translate}}&ndash;&gt;-->\n  <!--&lt;!&ndash;</p>&ndash;&gt;-->\n  <!--&lt;!&ndash;<ion-list>&ndash;&gt;-->\n    <!--&lt;!&ndash;<ion-item *ngFor="let page of pages" (tap)="openPage(page)">&ndash;&gt;-->\n      <!--&lt;!&ndash;<ion-icon [name]="page.icon" item-left></ion-icon>&ndash;&gt;-->\n      <!--&lt;!&ndash;{{page.title | translate}}&ndash;&gt;-->\n      <!--&lt;!&ndash;<ion-note item-right>&ndash;&gt;-->\n      <!--&lt;!&ndash;{{page.note}}&ndash;&gt;-->\n      <!--&lt;!&ndash;</ion-note>&ndash;&gt;-->\n    <!--&lt;!&ndash;</ion-item>&ndash;&gt;-->\n  <!--&lt;!&ndash;</ion-list>&ndash;&gt;-->\n<!--</ion-content>-->\n\n\n<ion-content  class="card-background-page">\n  <div class="container" *ngIf="isBusy">\n    <div class="spinner">\n      <div class="backdrop"></div>\n      <p>&#9733;</p>\n    </div>\n    <p text-center="true">Loading...</p>\n  </div>\n  <ion-card *ngFor="let post of posts">\n    <!--<ion-item text-wrap (click)="loadPost(post)">-->\n    <!--<h1 [innerHTML]="post.title.rendered"></h1>-->\n    <!--</ion-item>-->\n    <wordpress-feature-media *ngIf="post.featured_media" [id]="post.featured_media" (click)="loadPost(post)"></wordpress-feature-media>\n    <!--<img src="assets/img/placeholder.png" *ngIf="!post.featured_media">-->\n    <!--<img src=\'assets/img/avatar/cosima-avatar.jpg\'-->\n    <!--/>-->\n\n    <div class="card-subtitle">\n      <!--<ion-item text-wrap (click)="loadPost(post)">-->\n      <!--<h2 [innerHTML]="post.title.rendered"></h2>-->\n      <!--</ion-item>-->\n      <h2 (click)="loadPost(post)" [innerHTML]="post.title.rendered">\n      </h2>\n\n      <button ion-button icon-left clear (click)="favoritePost(post)" small>\n        <ion-icon name=\'heart\'></ion-icon>\n        Favorite\n      </button>\n\n      <!--<button clear  icon-left ion-button small>-->\n      <!--<span class="button-inner">-->\n      <!--<ion-icon name="eye" ></ion-icon>-->\n      <!--333-->\n      <!--</span>-->\n      <!--</button>-->\n\n      <button ion-button clear (click)="loadPost(post)" small>\n        <ion-icon name=\'eye\' class=\'ion-icon-eye\'></ion-icon>\n        Read\n      </button>\n      <!--<button clear  icon-left ion-button small >-->\n      <!--<span class="button-inner">-->\n      <!--<ion-icon name="heart" ></ion-icon>-->\n      <!--222-->\n      <!--</span>-->\n      <!--</button>-->\n      <span class="datetype">\n				{{getDate(post)}}\n			  </span>\n    </div>\n\n    <!--<ion-card-content *ngIf="!post.featured_media">-->\n      <!--&lt;!&ndash;<ion-item text-wrap (click)="loadPost(post)" class="no-image-ion-item">&ndash;&gt;&ndash;&gt;-->\n      <!--&lt;!&ndash;&lt;!&ndash;<h2 [innerHTML]="post.title.rendered"></h2>&ndash;&gt;&ndash;&gt;-->\n      <!--&lt;!&ndash;</ion-item>&ndash;&gt;-->\n      <!--<div class="no-image-card-subtitle">-->\n\n        <!--<h2 (click)="loadPost(post)">-->\n          <!--{{post.title.rendered}}-->\n        <!--</h2>-->\n\n        <!--<button ion-button icon-left clear (click)="favoritePost(post)" small class="no-image-fav-btn">-->\n          <!--<ion-icon name=\'heart\'></ion-icon>-->\n          <!--Favorite-->\n        <!--</button>-->\n\n        <!--<button ion-button clear (click)="loadPost(post)" small padding  class="no-image-read-btn">-->\n          <!--<ion-icon name=\'eye\' class=\'ion-icon-eye\'></ion-icon>-->\n          <!--Read-->\n        <!--</button>-->\n        <!--<span class="no-image-datetype" padding>{{getDate(post)}}-->\n			  <!--</span>-->\n      <!--</div>-->\n    <!--</ion-card-content>-->\n\n\n    <!--<ion-item *ngIf="post[\'_embedded\'] && post[\'_embedded\'].author && post[\'_embedded\'].author[0] && post[\'_embedded\'].author[0].avatar_urls && !post.featured_media">-->\n    <!--</ion-item>-->\n    <!--<ion-card-content *ngIf="!post.featured_media">-->\n    <!--<ion-item text-wrap (click)="loadPost(post)">-->\n    <!--<h2 [innerHTML]="post.title.rendered"></h2>-->\n    <!--</ion-item>-->\n    <!--<p>{{post.content.rendered | trimHTML | truncate: 100 }}</p>-->\n    <!--<p text-right style="color: blue;">{{getDate(post)}}</p>-->\n    <!--</ion-card-content>-->\n\n    <!--<ion-row no-padding *ngIf="!post.featured_media">-->\n    <!--<ion-col text-left>-->\n    <!--<button ion-button  clear (click)="favoritePost(post)" small>-->\n    <!--<ion-icon name=\'heart\'></ion-icon>-->\n    <!--Favorite-->\n    <!--</button>-->\n    <!--</ion-col>-->\n    <!--<ion-col text-right>-->\n    <!--<button ion-button clear (click)="loadPost(post)" small>-->\n    <!--Read-->\n    <!--</button>-->\n    <!--</ion-col>-->\n    <!--</ion-row>-->\n  </ion-card>\n  <div class="container0" *ngIf="isBusyMore">\n    <div class="spinner0">\n      <div class="backdrop0"></div>\n      <p>&#9733;</p>\n    </div>\n    <p text-center="true" class="loading0">Loading...</p>\n  </div>\n  <ion-infinite-scroll *ngIf="!isBusyMore" (ionInfinite)="loadMoreScroll($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/home-component/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__providers_firebase_use_firebase_use__["a" /* FirebaseUseProvider */],
        __WEBPACK_IMPORTED_MODULE_6__app_app_global__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_analytics__["a" /* GoogleAnalytics */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_cache__["a" /* CacheService */],
        __WEBPACK_IMPORTED_MODULE_9__providers_network_network__["a" /* NetworkProvider */],
        __WEBPACK_IMPORTED_MODULE_10__providers_util_toast_service__["a" /* ToastService */],
        __WEBPACK_IMPORTED_MODULE_11__providers_analytics_analytics__["a" /* AnalyticsProvider */]])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_network_network__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WordpressService = (function () {
    function WordpressService(http, config, network) {
        this.http = http;
        this.config = config;
        this.network = network;
    }
    WordpressService.prototype.login = function (data) {
        var url = this.config.wordpressApiUrl + '/jwt-auth/v1/token';
        return this.http.post(url, data)
            .map(function (result) {
            return result.json();
        });
    };
    WordpressService.prototype.getPosts = function (query) {
        query = this.transformRequest(query);
        // let url = `https://tuelqwv229.execute-api.eu-west-1.amazonaws.com/prod/posts?${query}&_embed`;
        var url = this.config.wordpressApiUrl + ("/wp/v2/posts?" + query);
        return this.http.get(url)
            .map(function (result) {
            return result.json();
        });
    };
    // public getPosts(query) {
    // 	query = this.transformRequest(query);
    // 	let url = this.config.wordpressApiUrl + `/wp/v2/posts?${query}&_embed`;
    // 	return Observable.create(observer => {
    // 		this.http.get(url)
    //            .map(res => res.json())
    //            .subscribe(data => {
    // 				console.log("Your data : " , data);
    // 				observer.next(data);
    // 			},(err) => {
    // 				console.log("Your error : ", err);
    // 				observer.error(err);
    // 				// if(err.status == 400){
    // 				// 	this.presentToast('Validation error');
    // 				// }else if(err.status == 403){
    // 				// 	this.presentToast('Authorization error'):
    // 				// }else if(err.status == 500){
    // 				// 	this.presentToast('Something wrong with server');
    // 				// }else ...
    // 			});
    // 	});
    // }
    WordpressService.prototype.getPost = function (id) {
        return this.http.get(this.config.wordpressApiUrl + ("/wp/v2/posts/" + id + "?_embed"))
            .map(function (result) {
            return result.json();
        });
    };
    WordpressService.prototype.getMedia = function (id) {
        // return this.http.get(this.config.wordpressApiUrl + `/wp/v2/media/${id}`).subscribe(r => {
        // 	console.log("sdf")
        // });
        return this.http.get(this.config.wordpressApiUrl + ("/wp/v2/media/" + id))
            .map(function (result) {
            return result.json();
        });
    };
    WordpressService.prototype.getCategories = function () {
        return this.http.get(this.config.wordpressApiUrl + '/wp/v2/categories?per_page=100')
            .map(function (result) {
            return result.json();
        });
    };
    WordpressService.prototype.getTags = function () {
        return this.http.get(this.config.wordpressApiUrl + '/wp/v2/tags?per_page=100')
            .map(function (result) {
            return result.json();
        });
    };
    WordpressService.prototype.getPages = function () {
        return this.http.get(this.config.wordpressApiUrl + '/wp/v2/pages?per_page=100')
            .map(function (result) {
            return result.json();
        });
    };
    WordpressService.prototype.getPage = function (id) {
        return this.http.get(this.config.wordpressApiUrl + ("/wp/v2/pages/" + id))
            .map(function (result) {
            return result.json();
        });
    };
    WordpressService.prototype.getMenus = function () {
        return this.http.get(this.config.wordpressApiUrl + '/wp-api-menus/v2/menus')
            .map(function (result) {
            return result.json();
        });
    };
    WordpressService.prototype.getMenu = function (id) {
        return this.http.get(this.config.wordpressApiUrl + ("/wp-api-menus/v2/menus/" + id))
            .map(function (result) {
            return result.json();
        });
    };
    WordpressService.prototype.transformRequest = function (obj) {
        var p, str;
        str = [];
        for (p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
    };
    WordpressService.prototype.postComment = function (data) {
        var url = this.config.wordpressApiUrl + '/wp/v2/comments';
        return this.http.post(url, data)
            .map(function (result) {
            return result.json();
        });
    };
    return WordpressService;
}());
WordpressService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__app_app_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_4__providers_network_network__["a" /* NetworkProvider */]])
], WordpressService);

//# sourceMappingURL=wordpress.service.js.map

/***/ }),

/***/ 199:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 199;

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../components/loading-modal/loading-modal.module": [
		255
	],
	"../pages/feedback/feedback.module": [
		270
	],
	"../pages/login/login.module": [
		257
	],
	"../pages/password-reset/password-reset.module": [
		253
	],
	"../pages/pop-over-share/pop-over-share.module": [
		726,
		0
	],
	"../pages/profile/profile-one/profile-one.module": [
		398
	],
	"../pages/profile/profile-settings/profile-settings.module": [
		399
	],
	"../pages/profile/profile.module": [
		258
	],
	"../pages/signup/signup.module": [
		242
	],
	"../pages/weather/city-weather/city-weather.module": [
		397
	],
	"../pages/weather/home-weather/home-weather.module": [
		278
	],
	"../pages/weather/location/location.module": [
		390
	],
	"../pages/weather/settings/settings.module": [
		392
	],
	"../pages/weather/tabs/tabs.module": [
		393
	],
	"../pages/weather/weather-detail/weather-detail.module": [
		394
	],
	"../pages/weather/world-city-list/world-city-list.module": [
		395
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 241;

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup__ = __webpack_require__(531);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SignupPageModule = (function () {
    function SignupPageModule() {
    }
    return SignupPageModule;
}());
SignupPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */]
        ]
    })
], SignupPageModule);

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordResetPageModule", function() { return PasswordResetPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__password_reset__ = __webpack_require__(254);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PasswordResetPageModule = (function () {
    function PasswordResetPageModule() {
    }
    return PasswordResetPageModule;
}());
PasswordResetPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__password_reset__["a" /* PasswordResetPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__password_reset__["a" /* PasswordResetPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__password_reset__["a" /* PasswordResetPage */]
        ]
    })
], PasswordResetPageModule);

//# sourceMappingURL=password-reset.module.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordResetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_email__ = __webpack_require__(140);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PasswordResetPage = (function () {
    function PasswordResetPage(viewCtrl, navCtrl, alertCtrl, formBuilder, authProvider, loadingCtrl) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.authProvider = authProvider;
        this.loadingCtrl = loadingCtrl;
        this.resetPasswordForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validators_email__["a" /* EmailValidator */].isValid])]
        });
    }
    PasswordResetPage.prototype.resetPassword = function () {
        var _this = this;
        if (!this.resetPasswordForm.valid) {
            console.log(this.resetPasswordForm.value);
        }
        else {
            this.authProvider.resetPassword(this.resetPasswordForm.value.email)
                .then(function (user) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: "We just sent you a reset link to your email",
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel',
                                handler: function () {
                                    var data = { 'email': _this.resetPasswordForm.value.email };
                                    _this.viewCtrl.dismiss(data);
                                    localStorage.setItem("currentUser", "");
                                    localStorage.setItem("isLogin", "false");
                                    // this.navCtrl.pop();
                                }
                            }
                        ]
                    });
                    alert.present();
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var errorMessage = error.message;
                    var errorAlert = _this.alertCtrl.create({
                        message: errorMessage,
                        buttons: [{ text: "Ok", role: 'cancel' }]
                    });
                    errorAlert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    return PasswordResetPage;
}());
PasswordResetPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-password-reset',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/password-reset/password-reset.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Reset your Password\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="reset-password">\n  <!--<img src="http://placehold.it/300x100">-->\n  <form [formGroup]="resetPasswordForm" (submit)="resetPassword()" novalidate>\n\n    <ion-item>\n      <ion-label stacked>Email</ion-label>\n      <ion-input formControlName="email" type="email" placeholder="Your email address"\n        [class.invalid]="!resetPasswordForm.controls.email.valid && resetPasswordForm.controls.email.dirty"></ion-input>\n    </ion-item>\n    <ion-item class="error-message" *ngIf="!resetPasswordForm.controls.email.valid  && resetPasswordForm.controls.email.dirty">\n      <p>Please enter a valid email.</p>\n    </ion-item>\n\n    <button ion-button block type="submit">\n      Reset your Password\n    </button>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/password-reset/password-reset.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
], PasswordResetPage);

//# sourceMappingURL=password-reset.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingModalModule", function() { return LoadingModalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loading_modal__ = __webpack_require__(256);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoadingModalModule = (function () {
    function LoadingModalModule() {
    }
    return LoadingModalModule;
}());
LoadingModalModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__loading_modal__["a" /* LoadingModal */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__loading_modal__["a" /* LoadingModal */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__loading_modal__["a" /* LoadingModal */]
        ]
    })
], LoadingModalModule);

//# sourceMappingURL=loading-modal.module.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoadingModal = (function () {
    function LoadingModal(navParams, viewController, navController) {
        this.navParams = navParams;
        this.viewController = viewController;
        this.navController = navController;
        this.message = 'Loading...';
        this.isLoading = navParams.get("isLoading");
        if (navParams.get("text")) {
            this.message = navParams.get("text");
        }
        this.isBusy = true;
        var me = this;
        // this.persist0 = setInterval(function() {
        //   me.timeClose();
        // }, 200);
    }
    // timeClose(){
    //   clearInterval(this.persist0);
    //   if(!this.isLoading){
    //     // this.viewController.dismiss();
    //     this.navController.pop();
    //   }
    // }
    LoadingModal.prototype.show = function () {
        this.isBusy = true;
    };
    LoadingModal.prototype.hide = function () {
        this.isBusy = false;
    };
    return LoadingModal;
}());
LoadingModal = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-loading-modal',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/components/loading-modal/loading-modal.html"*/'\n\n<!--<ion-header>-->\n  <!--<ion-navbar>-->\n    <!--<ion-title>-->\n    <!--</ion-title>-->\n  <!--</ion-navbar>-->\n<!--</ion-header>-->\n\n<ion-content padding class="login">\n\n  <div class="container" [ngClass]="{\'busy\': isBusy}">\n    <div class="spinner">\n      <div class="backdrop"></div>\n      <p>&#9733;</p>\n    </div>\n    <p text-center="true">{{message}}</p>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/components/loading-modal/loading-modal.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */]])
], LoadingModal);

//# sourceMappingURL=loading-modal.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    return LoginPageModule;
}());
LoginPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]
        ]
    })
], LoginPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileListPageModule", function() { return ProfileListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfileListPageModule = (function () {
    function ProfileListPageModule() {
    }
    return ProfileListPageModule;
}());
ProfileListPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__profile__["a" /* ProfileListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__profile__["a" /* ProfileListPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__profile__["a" /* ProfileListPage */]
        ]
    })
], ProfileListPageModule);

;
//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileListPage = (function () {
    function ProfileListPage(navCtrl, menu, alertCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.rootPage = 'ProfileListPage';
        this.menu.enable(true, 'menu-profile');
        this.items = [
            // {
            //   title: 'Type One',
            //   page: 'ProfileOnePage'
            // },
            // {
            //   title: 'Type Two',
            //   page: ProfileTwoPage
            // },
            // {
            //   title: 'Type Three',
            //   page: 'ProfileThreePage'
            // },
            // {
            //   title: 'Type Four',
            //   page: 'ProfileFourPage'
            // },
            {
                title: 'Profile Settings',
                page: 'ProfileSettingsPage'
            },
        ];
    }
    ProfileListPage.prototype.itemTapped = function (event, item) {
        var _this = this;
        if (item.page == 'ProfileSettingsPage') {
            var unsubscribe_1 = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().onAuthStateChanged(function (user) {
                if (!user) {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Information',
                        message: "Please login.",
                        buttons: [
                            {
                                text: "Ok",
                                handler: function (data) {
                                    unsubscribe_1();
                                    // let modal = this.modalCtrl.create(LoginPage);
                                    // modal.onDidDismiss(val => {
                                    //   if(val.login_status == 'true'){
                                    //     this.navCtrl.push(item.page, {'user': user});
                                    //   }
                                    //
                                    // });
                                    // modal.present();
                                }
                            },
                            {
                                text: "Cancel",
                                handler: function (data) {
                                }
                            }
                        ]
                    });
                    alert_1.present();
                    unsubscribe_1();
                }
                else {
                    _this.navCtrl.push(item.page);
                    unsubscribe_1();
                }
            });
        }
        else {
            this.navCtrl.push(item.page);
        }
    };
    return ProfileListPage;
}());
ProfileListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-profile',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/profile/profile.html"*/'<ion-header>\n	<ion-navbar  color="primary">\n		<button ion-button menuToggle>\n			<img src="assets/icon/menu-icon-dark.png">\n		  <!--<ion-icon name="menu"></ion-icon>-->\n		</button>\n		<ion-title>Profiles</ion-title>\n	</ion-navbar>\n</ion-header>\n<!--<ion-menu [content]="profilecontent" id="menu-profile">\n\n	<ion-content>\n		<ion-list>\n			<button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n        {{item.title}}\n      </button>\n		</ion-list>\n	</ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="root" #profilecontent swipeBackEnabled="false"></ion-nav>-->\n\n<ion-content>\n	<ion-list>\n		<button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      {{item.title}}\n    </button>\n	</ion-list>\n</ion-content>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/profile/profile.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */]])
], ProfileListPage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedbackPageModule", function() { return FeedbackPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feedback__ = __webpack_require__(271);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by kang on 28/09/2017.
 */



var FeedbackPageModule = (function () {
    function FeedbackPageModule() {
    }
    return FeedbackPageModule;
}());
FeedbackPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__feedback__["a" /* FeedbackPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__feedback__["a" /* FeedbackPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__feedback__["a" /* FeedbackPage */]
        ]
    })
], FeedbackPageModule);

//# sourceMappingURL=feedback.module.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_analytics_analytics__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_messaging_messaging__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_preloader_preloader__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utilities_utilities__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_validation_validation__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database_database__ = __webpack_require__(139);
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
 * Generated class for the FeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FeedbackPage = (function () {
    function FeedbackPage(navCtrl, navParams, viewCtrl, _FB, _ANALYTICS, _HTTP, _MESSAGE, _PRELOAD, _UTILS, _VAL, database) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._FB = _FB;
        this._ANALYTICS = _ANALYTICS;
        this._HTTP = _HTTP;
        this._MESSAGE = _MESSAGE;
        this._PRELOAD = _PRELOAD;
        this._UTILS = _UTILS;
        this._VAL = _VAL;
        this.database = database;
        this.baseURI = 'remote-url.php?';
        this.form = this._FB.group({
            "name": ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, this._VAL.isValidName],
            "email": ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, this._VAL.isValidEmail],
            "message": ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    }
    FeedbackPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedbackPage');
        this._ANALYTICS.trackPageView('Ghana news app Feedback view');
    };
    FeedbackPage.prototype.sendMessage = function () {
        var _this = this;
        this._PRELOAD.displayPreloader('Sending your message...');
        var startTiming = new Date().getTime(), totalTime, name = this.form.controls["name"].value, email = this.form.controls["email"].value, message = this.form.controls["message"].value;
        var profileObject = this.database.object('/Feedbacks/' + name);
        var feedback = { 'name': name, 'email': email, 'message': message };
        profileObject.set(feedback).then(function (result) {
            _this._PRELOAD.hidePreloader();
            _this._MESSAGE.displayNotification('Congratulations! Your message was successfully delivered');
            _this._ANALYTICS.trackPageEvent('User sent a message from the feedback page', 'Click');
            _this.clearForm();
        }).catch(function (error) {
            _this._PRELOAD.hidePreloader();
            _this._MESSAGE.displayNotification('Whoops! Your message was NOT delivered at this time. Please try again');
            _this._ANALYTICS.trackException(error.message, true);
        });
    };
    FeedbackPage.prototype.clearForm = function () {
        this.formName = "";
        this.formEmail = "";
        this.formMessage = "";
    };
    FeedbackPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    FeedbackPage.prototype.URL_check = function (control) {
        // return (control: AbstractControl): {[key: string]: any} => {
        //   var re = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
        //   let input = control.value;
        //   let isValid=re.test(input);
        //   if(!isValid)
        //     return { 'url_check': {isValid} }
        //   else
        //     return null;
        // };
        return new Promise(function (resolve) {
            var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailPattern.test(control.value)) {
                resolve({ url_check: true });
            }
            resolve(null);
        });
    };
    return FeedbackPage;
}());
FeedbackPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])({ name: "app-feedback" }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-feedback',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/feedback/feedback.html"*/'<!--\n  Generated template for the FeedbackPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton>\n    <ion-title>Get In Touch</ion-title>\n    <ion-buttons start >\n      <button ion-button (click)="dismiss()" icon-only>\n        <ion-icon name="ios-close-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="page-wrapper">\n  <img class="app-logo" src = "assets/img/icon_mark.png">\n  <section class="wrapper quote">\n    <form class="app-form" [formGroup] = "form" (ngSubmit) = "sendMessage()">\n      <h1>\n        Get In Touch\n      </h1>\n\n      <p>\n        Drop us a line - we don\'t spam or share your details with others and would love to hear from you !\n\n      </p>\n      <ion-item style="border-top-left-radius: 10px; border-top-right-radius: 10px;">\n        <ion-label stacked>Your Name *</ion-label>\n        <ion-input type="text" formControlName="name" [(ngModel)]="formName"></ion-input>\n      </ion-item>\n      <ion-item no-lines *ngIf="( form.get(\'name\').hasError(\'required\') || form.get(\'name\').hasError(\'InvalidName\') ) && form.get(\'name\').touched">\n        <div class="error" *ngIf="form.get(\'name\').hasError(\'required\') && form.get(\'name\').touched">\n          Name is required\n        </div>\n        <div class="error" *ngIf="form.get(\'name\').hasError(\'InvalidName\') && form.get(\'name\').touched">\n          Please enter valid name\n        </div>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>Your e-mail address*</ion-label>\n        <ion-input type="email" formControlName="email" [(ngModel)]="formEmail"></ion-input>\n      </ion-item>\n      <ion-item no-lines *ngIf="( form.get(\'email\').hasError(\'required\') || form.get(\'email\').hasError(\'url_check\') ) && form.get(\'email\').touched">\n        <div class="error" *ngIf="form.get(\'email\').hasError(\'required\') && form.get(\'email\').touched">\n          email is required\n        </div>\n        <div class="error" *ngIf="form.get(\'email\').hasError(\'url_check\') && form.get(\'email\').touched">\n          Please enter valid email\n        </div>\n      </ion-item>\n\n      <ion-item style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">\n        <ion-label stacked>Message *</ion-label>\n        <ion-textarea rows="6" formControlName="message" [(ngModel)] = "formMessage"></ion-textarea>\n      </ion-item>\n      <ion-item no-lines *ngIf="( form.get(\'message\').hasError(\'required\') ) && form.get(\'message\').touched">\n        <div class="error" *ngIf="form.get(\'message\').hasError(\'required\') && form.get(\'message\').touched">\n          Message is required\n        </div>\n        <!--<div class="error" *ngIf="form.get(\'message\').touched">-->\n          <!--Please enter valid message-->\n        <!--</div>-->\n      </ion-item>\n\n      <button ion-button block color = "primary" text-center padding-top padding-bottom [disabled]="!form.valid">\n        Send\n      </button>\n    </form>\n  </section>\n\n</ion-content>\n<style type="text/css">\n  .error\n  {\n    color:red;\n    font-size: small;\n  }\n\n</style>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/feedback/feedback.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_4__providers_analytics_analytics__["a" /* AnalyticsProvider */],
        __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_5__providers_messaging_messaging__["a" /* MessagingProvider */],
        __WEBPACK_IMPORTED_MODULE_6__providers_preloader_preloader__["a" /* PreloaderProvider */],
        __WEBPACK_IMPORTED_MODULE_7__providers_utilities_utilities__["a" /* UtilitiesProvider */],
        __WEBPACK_IMPORTED_MODULE_8__providers_validation_validation__["a" /* ValidationProvider */],
        __WEBPACK_IMPORTED_MODULE_9_angularfire2_database_database__["a" /* AngularFireDatabase */]])
], FeedbackPage);

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the MessagingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var MessagingProvider = (function () {
    function MessagingProvider(http, _ALERT, _TOAST) {
        this.http = http;
        this._ALERT = _ALERT;
        this._TOAST = _TOAST;
        console.log('Hello MessagingProvider Provider');
    }
    MessagingProvider.prototype.displayMessageWindow = function (title, message) {
        var alert = this._ALERT.create({
            title: title,
            subTitle: message,
            buttons: ['Got It!']
        });
        alert.present();
    };
    MessagingProvider.prototype.displayNotification = function (message) {
        var toast = this._TOAST.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    return MessagingProvider;
}());
MessagingProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["s" /* ToastController */]])
], MessagingProvider);

//# sourceMappingURL=messaging.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreloaderProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the PreloaderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var PreloaderProvider = (function () {
    function PreloaderProvider(http, _LOADING) {
        this.http = http;
        this._LOADING = _LOADING;
        console.log('Hello PreloaderProvider Provider');
    }
    PreloaderProvider.prototype.displayPreloader = function (message) {
        this.loading = this._LOADING.create({
            content: message
        });
        this.loading.present();
    };
    PreloaderProvider.prototype.hidePreloader = function () {
        this.loading.dismiss();
    };
    return PreloaderProvider;
}());
PreloaderProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* LoadingController */]])
], PreloaderProvider);

//# sourceMappingURL=preloader.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilitiesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the UtilitiesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var UtilitiesProvider = (function () {
    function UtilitiesProvider(http, _INAPP) {
        this.http = http;
        this._INAPP = _INAPP;
        console.log('Hello UtilitiesProvider Provider');
    }
    UtilitiesProvider.prototype.debugLogger = function (message, isLog) {
        if (isLog) {
            console.log(message);
        }
        else {
            console.dir(message);
        }
    };
    UtilitiesProvider.prototype.openExternalWebsiteLinks = function (href) {
        var options = 'location=no,toolbar=yes,hidden=no';
        this.browser = this._INAPP.create(href, '_blank', options);
        this.browser.show();
    };
    UtilitiesProvider.prototype.returnRandomAssociativeArrayElement = function (arrayName) {
        var a = [], k;
        for (k in arrayName) {
            if (arrayName.hasOwnProperty(k)) {
                a.push(k);
            }
        }
        if (a.length == 0) {
            return null;
        }
        else {
            return arrayName[a[Math.floor(Math.random() * a.length)]];
        }
    };
    UtilitiesProvider.prototype.filterArrays = function (arr1, arr2) {
        var remoteValues, localValues, returnedValues;
        remoteValues = arr1.map(function (val) {
            return val.quoteID;
        });
        localValues = arr2.map(function (val) {
            return val.quoteID;
        });
        returnedValues = remoteValues.filter(function (val) {
            return localValues.indexOf(val) === -1;
        });
        return returnedValues;
    };
    UtilitiesProvider.prototype.filterByMostRecentTimestamp = function (arr) {
        var timestamps = [], maxTimestamp, key;
        for (key in arr) {
            timestamps.push(parseInt(arr[key].timestamp));
        }
        maxTimestamp = Math.max.apply(null, timestamps);
        return maxTimestamp;
    };
    UtilitiesProvider.prototype.addLeadingZerosToDateValueRequired = function (digit) {
        var num = digit;
        if (num < 10) {
            num = '0' + num;
        }
        return num;
    };
    UtilitiesProvider.prototype.returnCurrentDate = function () {
        var currdate = new Date(), currYear = currdate.getFullYear(), currMonth = this.addLeadingZerosToDateValueRequired((currdate.getMonth() + 1)), currDay = this.addLeadingZerosToDateValueRequired(currdate.getDate()), currDateValue = currYear + '-' + currMonth + '-' + currDay;
        return currDateValue;
    };
    UtilitiesProvider.prototype.returnCurrentDateAndTime = function () {
        var currDate = new Date(), currYear = currDate.getFullYear(), currMonth = this.addLeadingZerosToDateValueRequired((currDate.getMonth() + 1)), currDay = this.addLeadingZerosToDateValueRequired(currDate.getDate()), currHour = this.addLeadingZerosToDateValueRequired(currDate.getHours()), currMins = this.addLeadingZerosToDateValueRequired(currDate.getMinutes()), currSecs = this.addLeadingZerosToDateValueRequired(currDate.getSeconds()), currDateValue = currYear + '-' + currMonth + '-' + currDay + ' ' + currHour + ':' + currMins + ':' + currSecs;
        return currDateValue;
    };
    UtilitiesProvider.prototype.returnCurrentTimestamp = function () {
        var currentTimestamp = Math.floor(Date.now() / 1000);
        return currentTimestamp;
    };
    UtilitiesProvider.prototype.determineTiming = function (startTime) {
        var startTiming = startTime, endTiming = new Date().getTime();
        return endTiming - startTiming;
    };
    return UtilitiesProvider;
}());
UtilitiesProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], UtilitiesProvider);

//# sourceMappingURL=utilities.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ValidationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var ValidationProvider = (function () {
    function ValidationProvider(http) {
        this.http = http;
        console.log('Hello ValidationProvider Provider');
    }
    ValidationProvider.prototype.isValidName = function (control) {
        return new Promise(function (resolve) {
            var pattern = /[0-9]/;
            if (pattern.test(control.value)) {
                resolve({ InvalidName: true });
            }
            resolve(null);
        });
    };
    ValidationProvider.prototype.isValidEmail = function (control) {
        return new Promise(function (resolve) {
            var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailPattern.test(control.value)) {
                resolve({ url_check: true });
            }
            resolve(null);
        });
    };
    ValidationProvider.prototype.isValidString = function (control) {
        return new Promise(function (resolve) {
            var emailPattern = /(span|h[0-6]|p|ul|strong|li|a|script|iframe|img|object|embed)/;
            if (!emailPattern.test(control.value)) {
                resolve({ InvalidString: true });
            }
            resolve(null);
        });
    };
    return ValidationProvider;
}());
ValidationProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], ValidationProvider);

//# sourceMappingURL=validation.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeWeatherPageModule", function() { return HomeWeatherPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_weather__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__(389);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomeWeatherPageModule = (function () {
    function HomeWeatherPageModule() {
    }
    return HomeWeatherPageModule;
}());
HomeWeatherPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__home_weather__["a" /* HomeWeatherPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__components__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home_weather__["a" /* HomeWeatherPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__home_weather__["a" /* HomeWeatherPage */]
        ]
    })
], HomeWeatherPageModule);

//# sourceMappingURL=home-weather.module.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__(282);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DatabaseService = (function () {
    function DatabaseService(_db) {
        this._db = _db;
        this.table_forecast = 'forecast';
        this.table_world_location = 'world_location';
    }
    //
    // table_forecast queries
    //
    DatabaseService.prototype.addForecast = function (name, forecast) {
        var lastUpdated = Date.now();
        var insertQuery = "INSERT OR REPLACE INTO " + this.table_forecast + " (name, forecast, lastUpdated) VALUES (?, ?, ?)";
        var createTableQuery = "CREATE TABLE IF NOT EXISTS " + this.table_forecast + " (name TEXT PRIMARY KEY, forecast TEXT, lastUpdated TEXT)";
        var self = this;
        return self._db.query(createTableQuery)
            .then(function () { return self._db.query(insertQuery, [name, JSON.stringify(forecast), '' + lastUpdated]); })
            .then(function (data) {
            console.debug(name + ' > Inserted with id -> ' + data.res.insertId);
            return true;
        })
            .catch(function (error) {
            console.error('Saving forecast error -> ' + error.err.message);
            return false;
        });
    };
    DatabaseService.prototype.getForecast = function (name) {
        var getQuery = "SELECT forecast, lastUpdated FROM " + this.table_forecast + " WHERE name = ?";
        return this._db.query(getQuery, [name])
            .then(function (data) {
            if (data.res.rows.length > 0) {
                var obj = data.res.rows.item(0);
                return {
                    forecast: JSON.parse(obj.forecast),
                    lastUpdated: +obj.lastUpdated
                };
            }
            return null;
        })
            .catch(function (error) {
            console.error('Getting forecast error -> ' + error.err.message);
            return null;
        });
    };
    //
    // table_world_location queries
    //
    DatabaseService.prototype.addWorldLocation = function (location) {
        var insertQuery = "INSERT OR REPLACE INTO " + this.table_world_location + " (name, lat, lng) VALUES (?, ?, ?)";
        var createTableQuery = "CREATE TABLE IF NOT EXISTS " + this.table_world_location + " (name TEXT PRIMARY KEY, lat TEXT, lng TEXT)";
        var self = this;
        return self._db.query(createTableQuery)
            .then(function () { return self._db.query(insertQuery, [location.name, location.lat, location.lng]); })
            .then(function (data) {
            console.debug(location.name + ' > Inserted with id -> ' + data.res.insertId);
            return true;
        })
            .catch(function (error) {
            console.error('Saving world location error -> ' + error.err.message);
            return false;
        });
    };
    DatabaseService.prototype.getWorldLocation = function (name) {
        var getQuery = "SELECT name, lat, lng FROM " + this.table_world_location + " WHERE name = ?";
        return this._db.query(getQuery, [name])
            .then(function (data) {
            if (data.res.rows.length > 0) {
                var obj = data.res.rows.item(0);
                return {
                    name: obj.name,
                    lat: +obj.lat,
                    lng: +obj.lng
                };
            }
            return null;
        })
            .catch(function (error) {
            console.error('Getting world location error -> ' + error.err.message);
            return null;
        });
    };
    DatabaseService.prototype.removeWorldLocation = function (name) {
        var query = "DELETE FROM " + this.table_world_location + " WHERE name = ?";
        var self = this;
        return self._db.query(query, [name])
            .then(function () { return true; })
            .catch(function (error) {
            console.error('Removing world location error -> ' + error.err.message);
            return false;
        });
    };
    DatabaseService.prototype.getAllWorldLocations = function () {
        var getQuery = "SELECT name, lat, lng FROM " + this.table_world_location;
        var resultArray = [];
        return this._db.query(getQuery)
            .then(function (data) {
            for (var i = 0; i < data.res.rows.length; i++) {
                var obj = data.res.rows.item(i);
                resultArray.push({
                    name: obj.name,
                    lat: +obj.lat,
                    lng: +obj.lng
                });
            }
            return resultArray;
        })
            .catch(function (error) {
            console.error('Getting all world locations error -> ' + error.err.message);
            return resultArray;
        });
    };
    //
    // Shared getter setter
    //
    DatabaseService.prototype.set = function (key, value) {
        return this._db.set(key, value)
            .then(function () { return true; })
            .catch(function (err) {
            console.error('[Error] Saving ' + key + ' - ' + err);
            return false;
        });
    };
    DatabaseService.prototype.get = function (key) {
        return this._db.get(key)
            .then(function (value) {
            if (value) {
                return value;
            }
            else {
                throw new Error('Undefined value');
            }
        })
            .catch(function (err) {
            console.error('[Error] Getting ' + key + ' - ' + err);
            return null;
        });
    };
    DatabaseService.prototype.remove = function (key) {
        return this._db.remove(key)
            .then(function () { return true; })
            .catch(function (err) {
            console.error('[Error] Removing ' + key + ' - ' + err);
            return false;
        });
    };
    DatabaseService.prototype.getJson = function (key) {
        return this.get(key).then(function (value) {
            try {
                return JSON.parse(value);
            }
            catch (err) {
                console.error('[Error] getJson(): unable to parse value for key', key, ' as JSON');
                return null;
            }
        });
    };
    DatabaseService.prototype.setJson = function (key, value) {
        try {
            return this.set(key, JSON.stringify(value));
        }
        catch (err) {
            return Promise.resolve(false);
        }
    };
    return DatabaseService;
}());
DatabaseService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__sql__["a" /* Sql */]])
], DatabaseService);

//# sourceMappingURL=database.service.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sql; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DB_NAME = '__sunshine';
var win = window;
var Sql = (function () {
    function Sql(platform) {
        var _this = this;
        this.platform = platform;
        this._dbPromise = new Promise(function (resolve, reject) {
            try {
                var _db_1;
                _this.platform.ready().then(function () {
                    if (_this.platform.is('cordova') && win.sqlitePlugin) {
                        _db_1 = win.sqlitePlugin.openDatabase({
                            name: DB_NAME,
                            location: 'default'
                        });
                    }
                    else {
                        console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
                        _db_1 = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
                    }
                    resolve(_db_1);
                });
            }
            catch (err) {
                reject({ err: err });
            }
        });
        this._tryInit();
    }
    // Initialize the DB with our required tables
    Sql.prototype._tryInit = function () {
        this.query('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)').catch(function (err) {
            console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
        });
    };
    /**
     * Perform an arbitrary SQL operation on the database. Use this method
     * to have full control over the underlying database through SQL operations
     * like SELECT, INSERT, and UPDATE.
     *
     * @param {string} query the query to run
     * @param {array} params the additional params to use for query placeholders
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.query = function (query, params) {
        var _this = this;
        if (params === void 0) { params = []; }
        return new Promise(function (resolve, reject) {
            try {
                _this._dbPromise.then(function (db) {
                    db.transaction(function (tx) {
                        tx.executeSql(query, params, function (tx, res) { return resolve({ tx: tx, res: res }); }, function (tx, err) { return reject({ tx: tx, err: err }); });
                    }, function (err) { return reject({ err: err }); });
                });
            }
            catch (err) {
                reject({ err: err });
            }
        });
    };
    /**
     * Get the value in the database identified by the given key.
     * @param {string} key the key
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.get = function (key) {
        return this.query('select key, value from kv where key = ? limit 1', [key]).then(function (data) {
            if (data.res.rows.length > 0) {
                return data.res.rows.item(0).value;
            }
        });
    };
    /**
     * Set the value in the database for the given key. Existing values will be overwritten.
     * @param {string} key the key
     * @param {string} value The value (as a string)
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.set = function (key, value) {
        return this.query('insert or replace into kv(key, value) values (?, ?)', [key, value]);
    };
    Sql.prototype.getJson = function (key) {
        return this.get(key).then(function (value) {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                throw e; // rethrowing exception so it can be handled with .catch()
            }
        });
    };
    Sql.prototype.setJson = function (key, value) {
        try {
            return this.set(key, JSON.stringify(value));
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    /**
     * Remove the value in the database for the given key.
     * @param {string} key the key
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.remove = function (key) {
        return this.query('delete from kv where key = ?', [key]);
    };
    /**
     * Clear all keys/values of your database.
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.clear = function () {
        return this.query('delete from kv');
    };
    return Sql;
}());
Sql = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */]])
], Sql);

//# sourceMappingURL=sql.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DEFAULT_METRICS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FORECAST_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return REFRESH_THRESHOLD; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(149);

var DEFAULT_METRICS = {
    temp: __WEBPACK_IMPORTED_MODULE_0__model__["d" /* MetricTemp */].F,
    length: __WEBPACK_IMPORTED_MODULE_0__model__["b" /* MetricLength */].IN,
    distance: __WEBPACK_IMPORTED_MODULE_0__model__["a" /* MetricDistance */].MI,
    time: 12,
    pressure: __WEBPACK_IMPORTED_MODULE_0__model__["c" /* MetricPressure */].MBAR
};
var FORECAST_CONFIG = {
    API_ENDPOINT: 'https://api.darksky.net/forecast/',
    API_KEY: '11471c56c5c16eedc5f1b4a714010a4f'
};
var CONFIG = {
    METRICS: 'metrics',
    HOME_LOCATION: 'homeLocation'
};
var REFRESH_THRESHOLD = 3 * 60 * 60 * 1000; //3 hours
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppState = (function () {
    function AppState() {
        this._state = {};
    }
    Object.defineProperty(AppState.prototype, "state", {
        // already return a clone of the current state
        get: function () {
            return this._state = this._clone(this._state);
        },
        // never allow mutation
        set: function (value) {
            throw new Error('do not mutate the `.state` directly');
        },
        enumerable: true,
        configurable: true
    });
    AppState.prototype.get = function (prop) {
        // use our state getter for the clone
        var state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    };
    AppState.prototype.set = function (prop, value) {
        // internally mutate our state
        return this._state[prop] = value;
    };
    AppState.prototype._clone = function (object) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    };
    return AppState;
}());
AppState = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], AppState);

//# sourceMappingURL=app.global.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressPosts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_cache__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wordpress_post_wordpress_post_component__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_firebase_use_firebase_use__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var WordpressPosts = (function () {
    function WordpressPosts(navParams, wordpressService, navController, loadingController, toastController, storage, firebaseUseProvider, cache) {
        this.navParams = navParams;
        this.wordpressService = wordpressService;
        this.navController = navController;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.storage = storage;
        this.firebaseUseProvider = firebaseUseProvider;
        this.cache = cache;
        this.shouldShowCancel = true;
    }
    WordpressPosts.prototype.ngOnInit = function () {
        var _this = this;
        this.category = this.navParams.get('category');
        this.tag = this.navParams.get('tag');
        this.author = this.navParams.get('author');
        this.hideSearchbar = true;
        this.search = '';
        this.favoritePosts = [];
        this.storage.get('wordpress.favorite')
            .then(function (data) {
            if (data) {
                _this.favoritePosts = JSON.parse(data);
            }
        });
        this.cache.getItem('savedPosts' + this.category.id).catch(function () {
            _this.getPosts(true);
        }).then(function (data) {
            if (data != null && data.length > 0) {
                _this.posts = data;
                for (var _i = 0, _a = _this.posts; _i < _a.length; _i++) {
                    var post = _a[_i];
                    var s = post.title.rendered.replace('&#8216;', "'");
                    post.title.rendered = s;
                    s = post.title.rendered.replace('&#8217;', "'");
                    post.title.rendered = s;
                    s = post.title.rendered.replace('&#8211;', "-");
                    post.title.rendered = s;
                }
                _this.pageCount = 1;
                _this.getPosts(false);
                _this.loadMore(null);
            }
            else {
                _this.getPosts(true);
            }
        });
    };
    WordpressPosts.prototype.getPosts = function (showFlag) {
        var _this = this;
        this.pageCount = 1;
        var query = this.createQuery();
        // let loader = this.loadingController.create({
        // 	content: "Please wait",
        // // duration: 10000
        // });
        // loader.present();
        this.isBusy = showFlag;
        this.isBusyMore = false;
        this.wordpressService.getPosts(query)
            .subscribe(function (result) {
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var post = result_1[_i];
                var s = post.title.rendered.replace('&#8216;', "'");
                post.title.rendered = s;
                s = post.title.rendered.replace('&#8217;', "'");
                post.title.rendered = s;
                s = post.title.rendered.replace('&#8211;', "-");
                post.title.rendered = s;
            }
            if (showFlag) {
                _this.posts = result;
                _this.loadMore(null);
            }
            else {
                var i = 0;
                for (var _a = 0, result_2 = result; _a < result_2.length; _a++) {
                    var post = result_2[_a];
                    _this.posts[i] = result[i];
                    i++;
                }
            }
            _this.isBusy = false;
            _this.cache.saveItem('savedPosts' + _this.category.id, result);
        });
    };
    // getPosts() {
    // 	this.pageCount = 1;
    //
    // 	let query = this.createQuery();
    // 	// let loader = this.loadingController.create({
    // 	// 	content: "Please wait",
    //  // // duration: 10000
    // 	// });
    //
    // 	// loader.present();
    // 	this.isBusy = true;
    // 	this.isBusyMore = false;
    //
    // 	this.wordpressService.getPosts(query)
    // 	.subscribe(result => {
    // 		this.posts = result;
    // 		for(var post of this.posts){
    // 			let s = post.title.rendered.replace('&#8216;', "'");
    // 			post.title.rendered = s;
    // 			s = post.title.rendered.replace('&#8217;', "'");
    // 			post.title.rendered = s;
    // 			s = post.title.rendered.replace('&#8211;', "-");
    // 			post.title.rendered = s;
    // 		}
    // 		this.isBusy = false;
    // 	});
    // }
    WordpressPosts.prototype.getDate = function (post) {
        return post.date.split('T')[0];
    };
    WordpressPosts.prototype.getAuthorPosts = function (author) {
        this.author = author;
        this.getPosts(true);
    };
    WordpressPosts.prototype.searchPosts = function () {
        this.posts = [];
        this.getPosts(true);
    };
    WordpressPosts.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        if (this.pageCount > 10) {
            return;
        }
        this.pageCount++;
        var query = this.createQuery();
        // let loader = this.loadingController.create({
        // 	content: "Please wait"
        // });
        var toast = this.toastController.create({
            message: "There are no more posts.",
            duration: 2000
        });
        // loader.present();
        this.isBusyMore = true;
        this.wordpressService.getPosts(query)
            .subscribe(function (result) {
            // infiniteScroll.complete();
            if (result.length < 1) {
                // infiniteScroll.complete();
                // infiniteScroll.enable(false);
                toast.present();
            }
            else {
                for (var _i = 0, result_3 = result; _i < result_3.length; _i++) {
                    var post = result_3[_i];
                    var s = post.title.rendered.replace('&#8216;', "'");
                    post.title.rendered = s;
                    s = post.title.rendered.replace('&#8217;', "'");
                    post.title.rendered = s;
                    s = post.title.rendered.replace('&#8211;', "-");
                    post.title.rendered = s;
                }
                _this.posts = _this.posts.concat(result);
                _this.loadMore(null);
            }
            _this.isBusyMore = false;
        }, function () { return _this.isBusyMore = false; });
    };
    WordpressPosts.prototype.loadMoreScroll = function (infiniteScroll) {
        var _this = this;
        if (this.pageCount <= 10) {
            return;
        }
        this.pageCount++;
        var query = this.createQuery();
        // let loader = this.loadingController.create({
        // 	content: "Please wait"
        // });
        var toast = this.toastController.create({
            message: "There are no more posts.",
            duration: 2000
        });
        // loader.present();
        this.isBusyMore = true;
        this.wordpressService.getPosts(query)
            .subscribe(function (result) {
            // infiniteScroll.complete();
            if (result.length < 1) {
                infiniteScroll.complete();
                infiniteScroll.enable(false);
                toast.present();
            }
            else {
                for (var _i = 0, result_4 = result; _i < result_4.length; _i++) {
                    var post = result_4[_i];
                    var s = post.title.rendered.replace('&#8216;', "'");
                    post.title.rendered = s;
                    s = post.title.rendered.replace('&#8217;', "'");
                    post.title.rendered = s;
                    s = post.title.rendered.replace('&#8211;', "-");
                    post.title.rendered = s;
                }
                _this.posts = _this.posts.concat(result);
            }
            _this.isBusyMore = false;
        }, function () { return _this.isBusyMore = false; });
    };
    WordpressPosts.prototype.loadPost = function (post) {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_5__wordpress_post_wordpress_post_component__["a" /* WordpressPost */], {
            post: post, firebaseUseProvider: this.firebaseUseProvider
        });
    };
    WordpressPosts.prototype.favoritePost = function (post) {
        var newPost = true;
        var message;
        this.favoritePosts.forEach(function (favPost) {
            if (JSON.stringify(favPost) === JSON.stringify(post)) {
                newPost = false;
            }
        });
        if (newPost) {
            this.favoritePosts.push(post);
            this.storage.set('wordpress.favorite', JSON.stringify(this.favoritePosts));
            message = "This post has been saved to your list";
        }
        else {
            message = "This post is already in your list";
        }
        var toast = this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    };
    WordpressPosts.prototype.toggleSearchbar = function () {
        this.hideSearchbar = !this.hideSearchbar;
    };
    WordpressPosts.prototype.createQuery = function () {
        var query = {};
        query['page'] = this.pageCount;
        if (this.search) {
            query['search'] = this.search;
        }
        if (this.category) {
            query['categories'] = this.category.id;
        }
        if (this.tag) {
            query['tags'] = this.tag.id;
        }
        if (this.author) {
            query['author'] = this.author;
        }
        return query;
    };
    WordpressPosts.prototype.toggleRefresh = function () {
        var _this = this;
        this.storage.get('wordpress.favorite')
            .then(function (data) {
            if (data) {
                _this.favoritePosts = JSON.parse(data);
            }
        });
        this.posts = [];
        this.getPosts(true);
    };
    return WordpressPosts;
}());
WordpressPosts = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-wordpress-posts',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-posts/wordpress-posts.html"*/'<ion-header>\n	<ion-navbar  color="primary">\n		<button ion-button menuToggle icon-only>\n			<img src="assets/icon/menu-icon-dark.png">\n			<!--<ion-icon name=\'menu\'></ion-icon>-->\n		</button>\n		<!--<ion-buttons start>-->\n			<!--<button menuToggle>-->\n				<!--<ion-icon name="menu"></ion-icon>-->\n			<!--</button>-->\n		<!--</ion-buttons>-->\n		<ion-title *ngIf="!category">{{\'POSTS\' | translate}}</ion-title>\n		<ion-title *ngIf="category">{{category.name}}</ion-title>\n		<!--<ion-title *ngIf="category">{{category.name}} <span *ngIf="category.count">({{category.count}})</span></ion-title>-->\n		<ion-buttons end>\n			<button (tap)="toggleRefresh()" ion-button icon-only>\n				<ion-icon name="refresh"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-buttons end>\n	      <button (tap)="toggleSearchbar()" ion-button icon-only>\n	        <ion-icon name="search"></ion-icon>\n	      </button>\n	    </ion-buttons>\n	</ion-navbar>\n	<ion-toolbar [hidden]="hideSearchbar">\n		<ion-searchbar [(ngModel)]="search" [showCancelButton]="shouldShowCancel" (ionInput)="searchPosts()" (ionCancel)="toggleSearchbar()"> debounce=500></ion-searchbar>\n	</ion-toolbar>\n</ion-header>\n\n<ion-content  class="card-background-page">\n	<div class="container" *ngIf="isBusy">\n		<div class="spinner">\n			<div class="backdrop"></div>\n			<p>&#9733;</p>\n		</div>\n		<p text-center="true">Loading...</p>\n	</div>\n	<ion-card *ngFor="let post of posts">\n        <!--<ion-item text-wrap (click)="loadPost(post)">-->\n            <!--<h1 [innerHTML]="post.title.rendered"></h1>-->\n        <!--</ion-item>-->\n		<wordpress-feature-media *ngIf="post.featured_media" [id]="post.featured_media" (click)="loadPost(post)"></wordpress-feature-media>\n		<img src="assets/img/placeholder.png" *ngIf="!post.featured_media">\n		<!--<img src=\'assets/img/avatar/cosima-avatar.jpg\'-->\n		<!--/>-->\n\n		<div class="card-subtitle">\n			<!--<ion-item text-wrap (click)="loadPost(post)">-->\n				<!--<h2 [innerHTML]="post.title.rendered"></h2>-->\n			<!--</ion-item>-->\n			<h2 (click)="loadPost(post)" [innerHTML]="post.title.rendered">\n				<!--{{post.title.rendered}}-->\n			</h2>\n\n			<button ion-button icon-left clear (click)="favoritePost(post)" small>\n				<ion-icon name=\'heart\'></ion-icon>\n				Favorite\n			</button>\n\n			<!--<button clear  icon-left ion-button small>-->\n          <!--<span class="button-inner">-->\n          <!--<ion-icon name="eye" ></ion-icon>-->\n          <!--333-->\n        <!--</span>-->\n			<!--</button>-->\n\n			<button ion-button clear (click)="loadPost(post)" small>\n				<ion-icon name=\'eye\' class=\'ion-icon-eye\'></ion-icon>\n				Read\n			</button>\n			<!--<button clear  icon-left ion-button small >-->\n          <!--<span class="button-inner">-->\n          <!--<ion-icon name="heart" ></ion-icon>-->\n          <!--222-->\n        <!--</span>-->\n			<!--</button>-->\n			<span class="datetype">\n				{{getDate(post)}}\n			  </span>\n		</div>\n\n		<!--<ion-card-content *ngIf="!post.featured_media">-->\n			<!--&lt;!&ndash;<ion-item text-wrap (click)="loadPost(post)" class="no-image-ion-item">&ndash;&gt;&ndash;&gt;-->\n				<!--&lt;!&ndash;&lt;!&ndash;<h2 [innerHTML]="post.title.rendered"></h2>&ndash;&gt;&ndash;&gt;-->\n			<!--&lt;!&ndash;</ion-item>&ndash;&gt;-->\n			<!--<div class="no-image-card-subtitle">-->\n\n				<!--<h2 (click)="loadPost(post)">-->\n					<!--{{post.title.rendered}}-->\n				<!--</h2>-->\n\n				<!--<button ion-button icon-left clear (click)="favoritePost(post)" small class="no-image-fav-btn">-->\n					<!--<ion-icon name=\'heart\'></ion-icon>-->\n					<!--Favorite-->\n				<!--</button>-->\n\n				<!--<button ion-button clear (click)="loadPost(post)" small padding  class="no-image-read-btn">-->\n					<!--<ion-icon name=\'eye\' class=\'ion-icon-eye\'></ion-icon>-->\n					<!--Read-->\n				<!--</button>-->\n				<!--<span class="no-image-datetype" padding>{{getDate(post)}}-->\n			  <!--</span>-->\n			<!--</div>-->\n		<!--</ion-card-content>-->\n\n\n		<!--<ion-item *ngIf="post[\'_embedded\'] && post[\'_embedded\'].author && post[\'_embedded\'].author[0] && post[\'_embedded\'].author[0].avatar_urls && !post.featured_media">-->\n		<!--</ion-item>-->\n		<!--<ion-card-content *ngIf="!post.featured_media">-->\n			<!--<ion-item text-wrap (click)="loadPost(post)">-->\n			<!--<h2 [innerHTML]="post.title.rendered"></h2>-->\n			<!--</ion-item>-->\n			<!--<p>{{post.content.rendered | trimHTML | truncate: 100 }}</p>-->\n			<!--<p text-right style="color: blue;">{{getDate(post)}}</p>-->\n		<!--</ion-card-content>-->\n\n		<!--<ion-row no-padding *ngIf="!post.featured_media">-->\n			<!--<ion-col text-left>-->\n				<!--<button ion-button  clear (click)="favoritePost(post)" small>-->\n					<!--<ion-icon name=\'heart\'></ion-icon>-->\n					<!--Favorite-->\n				<!--</button>-->\n			<!--</ion-col>-->\n			<!--<ion-col text-right>-->\n				<!--<button ion-button clear (click)="loadPost(post)" small>-->\n					<!--Read-->\n				<!--</button>-->\n			<!--</ion-col>-->\n		<!--</ion-row>-->\n	</ion-card>\n	<div class="container0" *ngIf="isBusyMore">\n		<div class="spinner0">\n			<div class="backdrop0"></div>\n			<p>&#9733;</p>\n		</div>\n		<p text-center="true" class="loading0">Loading...</p>\n	</div>\n	<ion-infinite-scroll *ngIf="!isBusyMore" (ionInfinite)="loadMoreScroll($event)">\n	   <ion-infinite-scroll-content></ion-infinite-scroll-content>\n	 </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-posts/wordpress-posts.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4__shared_services_wordpress_service__["a" /* WordpressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__shared_services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6__providers_firebase_use_firebase_use__["a" /* FirebaseUseProvider */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_cache__["a" /* CacheService */]])
], WordpressPosts);

//# sourceMappingURL=wordpress-posts.component.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_module__ = __webpack_require__(150);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__components_module__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationPageModule", function() { return LocationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__location__ = __webpack_require__(590);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LocationPageModule = (function () {
    function LocationPageModule() {
    }
    return LocationPageModule;
}());
LocationPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__location__["a" /* LocationPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__location__["a" /* LocationPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__location__["a" /* LocationPage */]
        ]
    })
], LocationPageModule);

//# sourceMappingURL=location.module.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SettingsPageModule = (function () {
    function SettingsPageModule() {
    }
    return SettingsPageModule;
}());
SettingsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__settings__["a" /* SettingsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__settings__["a" /* SettingsPage */])
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_1__settings__["a" /* SettingsPage */]
        ]
    })
], SettingsPageModule);

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageModule", function() { return TabsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tabs__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TabsPageModule = (function () {
    function TabsPageModule() {
    }
    return TabsPageModule;
}());
TabsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__tabs__["a" /* TabsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__tabs__["a" /* TabsPage */])
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_1__tabs__["a" /* TabsPage */]
        ]
    })
], TabsPageModule);

//# sourceMappingURL=tabs.module.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeatherDetailPageModule", function() { return WeatherDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weather_detail__ = __webpack_require__(593);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WeatherDetailPageModule = (function () {
    function WeatherDetailPageModule() {
    }
    return WeatherDetailPageModule;
}());
WeatherDetailPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__weather_detail__["a" /* WeatherDetailPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__weather_detail__["a" /* WeatherDetailPage */])
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_2__weather_detail__["a" /* WeatherDetailPage */]
        ]
    })
], WeatherDetailPageModule);

//# sourceMappingURL=weather-detail.module.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorldCityListPageModule", function() { return WorldCityListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__world_city_list__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives__ = __webpack_require__(595);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var WorldCityListPageModule = (function () {
    function WorldCityListPageModule() {
    }
    return WorldCityListPageModule;
}());
WorldCityListPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__world_city_list__["a" /* WorldCityListPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__directives__["a" /* DirectivesModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__world_city_list__["a" /* WorldCityListPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__world_city_list__["a" /* WorldCityListPage */]
        ]
    })
], WorldCityListPageModule);

//# sourceMappingURL=world-city-list.module.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectivesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animate_item_sliding_animate_item_sliding__ = __webpack_require__(596);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DirectivesModule = (function () {
    function DirectivesModule() {
    }
    return DirectivesModule;
}());
DirectivesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__animate_item_sliding_animate_item_sliding__["a" /* AnimateItemSliding */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__animate_item_sliding_animate_item_sliding__["a" /* AnimateItemSliding */]
        ]
    })
], DirectivesModule);

//# sourceMappingURL=directives.module.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CityWeatherPageModule", function() { return CityWeatherPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__city_weather__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__(389);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CityWeatherPageModule = (function () {
    function CityWeatherPageModule() {
    }
    return CityWeatherPageModule;
}());
CityWeatherPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__city_weather__["a" /* CityWeatherPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__components__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__city_weather__["a" /* CityWeatherPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__city_weather__["a" /* CityWeatherPage */]
        ]
    })
], CityWeatherPageModule);

//# sourceMappingURL=city-weather.module.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileOnePageModule", function() { return ProfileOnePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_one__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfileOnePageModule = (function () {
    function ProfileOnePageModule() {
    }
    return ProfileOnePageModule;
}());
ProfileOnePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__profile_one__["a" /* ProfileOnePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__profile_one__["a" /* ProfileOnePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__profile_one__["a" /* ProfileOnePage */]
        ]
    })
], ProfileOnePageModule);

;
//# sourceMappingURL=profile-one.module.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileSettingsPageModule", function() { return ProfileSettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_settings__ = __webpack_require__(599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfileSettingsPageModule = (function () {
    function ProfileSettingsPageModule() {
    }
    return ProfileSettingsPageModule;
}());
ProfileSettingsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__profile_settings__["a" /* ProfileSettingsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__profile_settings__["a" /* ProfileSettingsPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__profile_settings__["a" /* ProfileSettingsPage */]
        ]
    })
], ProfileSettingsPageModule);

;
//# sourceMappingURL=profile-settings.module.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__about_about_component_about_component__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wordpress_wordpress_home_wordpress_home_component__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wordpress_wordpress_posts_wordpress_posts_component__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wordpress_wordpress_categories_wordpress_categories_component__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wordpress_wordpress_tags_wordpress_tags_component__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wordpress_wordpress_favorites_wordpress_favorites_component__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__wordpress_wordpress_pages_wordpress_pages_component__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__wordpress_wordpress_page_wordpress_page_component__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__wordpress_wordpress_menus_wordpress_menus_component__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__google_maps_google_maps_component_google_maps_component__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__slides_slides_component_slides_component__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__feeds_feed_categories_feed_categories_component__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__feeds_feed_category_feed_category_component__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__youtube_youtube_videos_youtube_videos_component__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__youtube_youtube_channel_youtube_channel_component__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__charts_charts_component_charts_component__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__firebase_firebase_home_firebase_home_component__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















var HomeComponent = (function () {
    function HomeComponent(navController, menuController, events) {
        this.navController = navController;
        this.menuController = menuController;
        this.events = events;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pages = [
            { title: 'ABOUT', component: __WEBPACK_IMPORTED_MODULE_2__about_about_component_about_component__["a" /* AboutComponent */], icon: 'photos', note: '' },
            { title: 'LOGIN', component: __WEBPACK_IMPORTED_MODULE_3__wordpress_wordpress_home_wordpress_home_component__["a" /* WordpressHome */], icon: 'log-in', note: 'Wordpress' },
            { title: 'POSTS', component: __WEBPACK_IMPORTED_MODULE_4__wordpress_wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */], icon: 'logo-wordpress', note: 'Wordpress' },
            { title: 'CATEGORIES', component: __WEBPACK_IMPORTED_MODULE_5__wordpress_wordpress_categories_wordpress_categories_component__["a" /* WordpressCategories */], icon: 'pricetags', note: 'Wordpress' },
            { title: 'TAGS', component: __WEBPACK_IMPORTED_MODULE_6__wordpress_wordpress_tags_wordpress_tags_component__["a" /* WordpressTags */], icon: 'pricetags', note: 'Wordpress' },
            { title: 'CATEGORY', component: __WEBPACK_IMPORTED_MODULE_4__wordpress_wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */], icon: 'pricetags', note: 'Wordpress', params: { category: { name: 'Category Name', id: 16 } } },
            { title: 'FAVORITES', component: __WEBPACK_IMPORTED_MODULE_7__wordpress_wordpress_favorites_wordpress_favorites_component__["a" /* WordpressFavorites */], icon: 'heart', note: 'Wordpress (Storage)' },
            { title: 'PAGES', component: __WEBPACK_IMPORTED_MODULE_8__wordpress_wordpress_pages_wordpress_pages_component__["a" /* WordpressPages */], icon: 'document', note: 'Wordpress' },
            { title: 'PAGE', component: __WEBPACK_IMPORTED_MODULE_9__wordpress_wordpress_page_wordpress_page_component__["a" /* WordpressPage */], icon: 'document', note: 'Wordpress', params: { id: 2 } },
            { title: 'MENUS', component: __WEBPACK_IMPORTED_MODULE_10__wordpress_wordpress_menus_wordpress_menus_component__["a" /* WordpressMenus */], icon: 'menu', note: 'Wordpress' },
            { title: 'Firebase', component: __WEBPACK_IMPORTED_MODULE_18__firebase_firebase_home_firebase_home_component__["a" /* FirebaseHomeComponent */], icon: 'flame', note: 'Firebase' },
            { title: 'GOOGLE_MAPS', component: __WEBPACK_IMPORTED_MODULE_11__google_maps_google_maps_component_google_maps_component__["a" /* GoogleMapsComponent */], icon: 'map', note: '' },
            { title: 'SLIDES', component: __WEBPACK_IMPORTED_MODULE_12__slides_slides_component_slides_component__["a" /* SlidesComponent */], icon: 'images', note: 'Welcome Tour' },
            { title: 'FEEDS', component: __WEBPACK_IMPORTED_MODULE_13__feeds_feed_categories_feed_categories_component__["a" /* FeedCategoriesComponent */], icon: 'logo-rss', note: 'RSS (YQL)' },
            { title: 'FEED_CATEGORY', component: __WEBPACK_IMPORTED_MODULE_14__feeds_feed_category_feed_category_component__["a" /* FeedCategoryComponent */], icon: 'logo-rss', note: 'RSS (YQL)' },
            { title: 'YOUTUBE_VIDEOS', component: __WEBPACK_IMPORTED_MODULE_15__youtube_youtube_videos_youtube_videos_component__["a" /* YoutubeVideosComponent */], icon: 'logo-youtube', note: 'Youtube' },
            { title: 'YOUTUBE_CHANNEL', component: __WEBPACK_IMPORTED_MODULE_16__youtube_youtube_channel_youtube_channel_component__["a" /* YoutubeChannelComponent */], icon: 'logo-youtube', note: 'Youtube' },
            { title: 'CHARTS', component: __WEBPACK_IMPORTED_MODULE_17__charts_charts_component_charts_component__["a" /* ChartsComponent */], icon: 'pie', note: 'Chart.js' },
        ];
        this.events.subscribe('navigationEvent', function (object) {
            _this.menuController.close();
            if (object.component) {
                _this.navController.push(object.component, object.params);
            }
        });
    };
    HomeComponent.prototype.openPage = function (page) {
        this.navController.push(page.component, page.params);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/home/home-component/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>{{\'HOME\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="home">\n  <h2>{{\'HOME_TITLE\' | translate}}</h2>\n  <p>\n    {{\'HOME_MESSAGE\' | translate}}\n  </p>\n  <ion-list>\n    <ion-item *ngFor="let page of pages" (tap)="openPage(page)">\n      <ion-icon [name]="page.icon" item-left></ion-icon>\n      {{page.title | translate}}\n      <ion-note item-right>\n      {{page.note}}\n      </ion-note>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/home/home-component/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressLogin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wordpress_home_wordpress_home_component__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WordpressLogin = (function () {
    function WordpressLogin(navController, loadingController, toastController, storage, wordpressService) {
        this.navController = navController;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.storage = storage;
        this.wordpressService = wordpressService;
        this.account = {
            username: 'jin',
            password: 'S@rchitechDevel04ers17!'
        };
    }
    WordpressLogin.prototype.login = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.wordpressService.login(this.account).subscribe(function (result) {
            loader.dismiss();
            _this.storage.set('wordpress.user', result);
            _this.navController.push(__WEBPACK_IMPORTED_MODULE_4__wordpress_home_wordpress_home_component__["a" /* WordpressHome */], {
                user: result
            });
        }, function (error) {
            loader.dismiss();
            var errorMessage = error.json();
            if (errorMessage && errorMessage.message) {
                var message = errorMessage.message.replace(/<(?:.|\n)*?>/gm, '');
                var toast = _this.toastController.create({
                    message: message,
                    duration: 6000,
                    position: 'bottom'
                });
                toast.present();
            }
        });
    };
    return WordpressLogin;
}());
WordpressLogin = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-login/wordpress-login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'LOGIN\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <form (submit)="login()">\n    <ion-list>\n\n<!--       <ion-item>\n        <ion-label fixed>Email</ion-label>\n        <ion-input type="email" [(ngModel)]="account.email" name="email"></ion-input>\n      </ion-item> -->\n\n      <ion-item>\n        <ion-label fixed>Username</ion-label>\n        <ion-input type="text" [(ngModel)]="account.username" name="username"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label fixed>Password</ion-label>\n        <ion-input type="password" [(ngModel)]="account.password" name="password"></ion-input>\n      </ion-item>\n\n      <div padding>\n        <button ion-button color="primary" block>{{ \'LOGIN\' | translate }}</button>\n      </div>\n\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-login/wordpress-login.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__shared_services_wordpress_service__["a" /* WordpressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services_wordpress_service__["a" /* WordpressService */]])
], WordpressLogin);

//# sourceMappingURL=wordpress-login.component.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wordpress_menu_item_wordpress_menu_item_component__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wordpress_posts_wordpress_posts_component__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wordpress_post_wordpress_post_component__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wordpress_page_wordpress_page_component__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var WordpressMenu = (function () {
    function WordpressMenu(navParams, wordpressService, navController, loadingController, events, iab) {
        this.navParams = navParams;
        this.wordpressService = wordpressService;
        this.navController = navController;
        this.loadingController = loadingController;
        this.events = events;
        this.iab = iab;
    }
    WordpressMenu.prototype.ngOnInit = function () {
        this.title = this.navParams.get('title');
        this.id = this.navParams.get('id');
        this.getMenu(this.id);
    };
    WordpressMenu.prototype.getMenu = function (id) {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.wordpressService.getMenu(id)
            .subscribe(function (result) {
            _this.menu = result.items;
            loader.dismiss();
        });
    };
    WordpressMenu.prototype.loadMenuItem = function (item) {
        if (item.children) {
            this.navController.push(__WEBPACK_IMPORTED_MODULE_4__wordpress_menu_item_wordpress_menu_item_component__["a" /* WordpressMenuItem */], {
                title: item.title,
                item: item.children
            });
        }
        else {
            this.previewMenuItem(item);
        }
    };
    WordpressMenu.prototype.previewMenuItem = function (item) {
        var menuObject;
        // InApp Support Types: post, page, category
        if (item.object === 'category') {
            var category = void 0;
            category = {};
            category.id = item.object_id;
            category.name = item.title;
            menuObject = {
                "component": __WEBPACK_IMPORTED_MODULE_5__wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */],
                "params": {
                    category: category
                }
            };
        }
        else if (item.object === 'post_tag') {
            var tag = void 0;
            tag = {};
            tag.id = item.object_id;
            tag.name = item.title;
            menuObject = {
                "component": __WEBPACK_IMPORTED_MODULE_5__wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */],
                "params": {
                    tag: tag
                }
            };
        }
        else if (item.object === 'post') {
            menuObject = {
                "component": __WEBPACK_IMPORTED_MODULE_6__wordpress_post_wordpress_post_component__["a" /* WordpressPost */],
                "params": {
                    id: item.object_id
                }
            };
        }
        else if (item.object === 'page') {
            menuObject = {
                "component": __WEBPACK_IMPORTED_MODULE_7__wordpress_page_wordpress_page_component__["a" /* WordpressPage */],
                "params": {
                    id: item.object_id
                }
            };
        }
        else {
            var browser = this.iab.create(item.url, '_blank');
            browser.show();
        }
        this.events.publish('navigationEvent', menuObject);
    };
    return WordpressMenu;
}());
WordpressMenu = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-menu/wordpress-menu.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-buttons start>\n			<button menuToggle>\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title>{{title}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list>\n        <ion-item *ngFor="let item of menu" text-wrap (click)="loadMenuItem(item)">\n        	{{item.title}}\n        	<ion-icon *ngIf="item.children" name="more" item-right></ion-icon>\n        	<ion-icon *ngIf="!item.children" name="link" item-right></ion-icon>\n        </ion-item>\n	</ion-list>\n</ion-content>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-menu/wordpress-menu.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__shared_services_wordpress_service__["a" /* WordpressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], WordpressMenu);

//# sourceMappingURL=wordpress-menu.component.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressMenuItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wordpress_posts_wordpress_posts_component__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wordpress_post_wordpress_post_component__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wordpress_page_wordpress_page_component__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WordpressMenuItem = WordpressMenuItem_1 = (function () {
    function WordpressMenuItem(navParams, navController, loadingController, events, iab) {
        this.navParams = navParams;
        this.navController = navController;
        this.loadingController = loadingController;
        this.events = events;
        this.iab = iab;
    }
    WordpressMenuItem.prototype.ngOnInit = function () {
        this.title = this.navParams.get('title');
        this.menu = this.navParams.get('item');
    };
    WordpressMenuItem.prototype.loadMenuItem = function (item) {
        if (item.children) {
            this.navController.push(WordpressMenuItem_1, {
                title: item.title,
                item: item.children
            });
        }
        else {
            this.previewMenuItem(item);
        }
    };
    WordpressMenuItem.prototype.previewMenuItem = function (item) {
        var menuObject;
        // InApp Support Types: post, page, category
        if (item.object === 'category') {
            var category = void 0;
            category = {};
            category.id = item.object_id;
            category.name = item.title;
            menuObject = {
                "component": __WEBPACK_IMPORTED_MODULE_3__wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */],
                "params": {
                    "category": category
                }
            };
        }
        else if (item.object === 'post_tag') {
            var tag = void 0;
            tag = {};
            tag.id = item.object_id;
            tag.name = item.title;
            menuObject = {
                "component": __WEBPACK_IMPORTED_MODULE_3__wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */],
                "params": {
                    tag: tag
                }
            };
        }
        else if (item.object === 'post') {
            menuObject = {
                "component": __WEBPACK_IMPORTED_MODULE_4__wordpress_post_wordpress_post_component__["a" /* WordpressPost */],
                "params": {
                    "id": item.object_id
                }
            };
        }
        else if (item.object === 'page') {
            menuObject = {
                "component": __WEBPACK_IMPORTED_MODULE_5__wordpress_page_wordpress_page_component__["a" /* WordpressPage */],
                "params": {
                    "id": item.object_id
                }
            };
        }
        else {
            var browser = this.iab.create(item.url, '_blank');
            browser.show();
        }
        this.events.publish('navigationEvent', menuObject);
    };
    return WordpressMenuItem;
}());
WordpressMenuItem = WordpressMenuItem_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-menu-item/wordpress-menu-item.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-buttons start>\n			<button menuToggle>\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title>{{title}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list>\n        <ion-item *ngFor="let item of menu" text-wrap (click)="loadMenuItem(item)">\n        	{{item.title}}\n        	<ion-icon *ngIf="item.children" name="more" item-right></ion-icon>\n        	<ion-icon *ngIf="!item.children" name="link" item-right></ion-icon>\n        </ion-item>\n	</ion-list>\n</ion-content>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-menu-item/wordpress-menu-item.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], WordpressMenuItem);

var WordpressMenuItem_1;
//# sourceMappingURL=wordpress-menu-item.component.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressTags; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wordpress_posts_wordpress_posts_component__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WordpressTags = (function () {
    function WordpressTags(wordpressService, navController, loadingController) {
        this.wordpressService = wordpressService;
        this.navController = navController;
        this.loadingController = loadingController;
    }
    WordpressTags.prototype.ngOnInit = function () {
        this.getTags();
    };
    WordpressTags.prototype.getTags = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.wordpressService.getTags()
            .subscribe(function (result) {
            _this.tags = result;
        }, function (error) { return console.log(error); }, function () { return loader.dismiss(); });
    };
    WordpressTags.prototype.loadTag = function (tag) {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_3__wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */], {
            tag: tag
        });
    };
    return WordpressTags;
}());
WordpressTags = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-tags/wordpress-tags.html"*/'<ion-header>\n	<ion-navbar>\n		<button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>{{\'TAGS\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list>\n		<ion-item *ngFor="let tag of tags" (click)="loadTag(tag)">\n			<ion-icon name="pricetags" item-left></ion-icon>\n			<h2>{{tag.name}}</h2>\n			<ion-badge item-right primary>{{tag.count}}</ion-badge>\n		</ion-item>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-tags/wordpress-tags.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__shared_services_wordpress_service__["a" /* WordpressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__shared_services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
], WordpressTags);

//# sourceMappingURL=wordpress-tags.component.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GoogleMapsComponent = (function () {
    function GoogleMapsComponent() {
        // Google Map zoom level
        this.zoom = 8;
        // Google Map center
        this.latitude = 51.673858;
        this.longitude = 7.815982;
        this.markers = [
            {
                latitude: 51.673858,
                longitude: 7.815982,
                label: "A",
                description: "Description A"
            },
            {
                latitude: 51.373858,
                longitude: 7.215982,
                label: "B",
                description: "Description B"
            },
            {
                latitude: 51.723858,
                longitude: 7.895982,
                label: "C",
                description: "Description C"
            }
        ];
    }
    return GoogleMapsComponent;
}());
GoogleMapsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/google-maps/google-maps-component/google-maps.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Google Maps\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <sebm-google-map \n      [latitude]="latitude"\n      [longitude]="longitude"\n      [zoom]="zoom"\n      [disableDefaultUI]="false"\n      [zoomControl]="false">\n    \n      <sebm-google-map-marker \n          *ngFor="let marker of markers; let i = index"\n          [latitude]="marker.latitude"\n          [longitude]="marker.longitude"\n          [label]="marker.label">\n        <sebm-google-map-info-window>\n          <strong>{{marker.description}}</strong>\n        </sebm-google-map-info-window>\n      </sebm-google-map-marker>\n      \n      <sebm-google-map-circle [latitude]="latitude + 0.5" [longitude]="longitude" \n          [radius]="20000"\n          [fillColor]="\'red\'"\n          [circleDraggable]="true"\n          [editable]="true">\n      </sebm-google-map-circle>\n\n    </sebm-google-map>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/google-maps/google-maps-component/google-maps.html"*/
    })
], GoogleMapsComponent);

//# sourceMappingURL=google-maps.component.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SlidesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component_home_component__ = __webpack_require__(450);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SlidesComponent = (function () {
    function SlidesComponent(nav) {
        this.nav = nav;
        this.slides = [
            {
                title: "Welcome to the Ionic 2 App",
                description: "",
                image: "assets/img/ica-slidebox-img-1.png",
            },
            {
                title: "What is Ionic 2 App?",
                description: "",
                image: "assets/img/ica-slidebox-img-2.png",
            },
            {
                title: "What is Ionic 2 App Features?",
                description: "",
                image: "assets/img/ica-slidebox-img-3.png",
            }
        ];
    }
    SlidesComponent.prototype.openPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home_component_home_component__["a" /* HomeComponent */]);
    };
    return SlidesComponent;
}());
SlidesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/slides/slides-component/slides.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Slides</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="tutorial-page">\n\n  <ion-slides pager>\n    <ion-slide *ngFor="let slide of slides">\n      <ion-toolbar>\n        <ion-buttons end>\n          <button ion-button (click)=openPage()>Skip</button>\n        </ion-buttons>\n      </ion-toolbar>\n      <img [src]="slide.image" class="slide-image"/>\n      <h2 class="slide-title" [innerHTML]="slide.title"></h2>\n      <p [innerHTML]="slide.description"></p>\n    </ion-slide>\n    <ion-slide>\n      <ion-toolbar>\n      </ion-toolbar>\n      <img src="assets/img/ica-slidebox-img-4.png" class="slide-image"/>\n      <h2 class="slide-title">Ready to Play?</h2>\n      <button ion-button large clear icon-right (click)=openPage()>\n        Continue\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/slides/slides-component/slides.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */]])
], SlidesComponent);

//# sourceMappingURL=slides.component.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedCategoriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feed_category_feed_category_component__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_feed_service__ = __webpack_require__(182);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FeedCategoriesComponent = (function () {
    function FeedCategoriesComponent(feedService, navController, loadingController) {
        this.feedService = feedService;
        this.navController = navController;
        this.loadingController = loadingController;
    }
    FeedCategoriesComponent.prototype.ngOnInit = function () {
        this.getCategories();
    };
    FeedCategoriesComponent.prototype.getCategories = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.feedService.getCategories()
            .subscribe(function (result) {
            _this.categories = result.categories;
            loader.dismiss();
        });
    };
    FeedCategoriesComponent.prototype.loadCategory = function (category) {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_2__feed_category_feed_category_component__["a" /* FeedCategoryComponent */], {
            category: category
        });
    };
    return FeedCategoriesComponent;
}());
FeedCategoriesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/feeds/feed-categories/feed-categories.html"*/'<ion-header>\n	<ion-navbar>\n		<button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>{{\'CATEGORIES\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list>\n		<ion-item *ngFor="let category of categories" (click)="loadCategory(category)">\n			<ion-icon [name]="category.icon" item-left></ion-icon>\n			<h2>{{category.title}}</h2>\n			<p>{{category.description}}</p>\n			<button ion-button item-right outline>Read</button>\n		</ion-item>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/feeds/feed-categories/feed-categories.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__shared_services_feed_service__["a" /* FeedService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__shared_services_feed_service__["a" /* FeedService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
], FeedCategoriesComponent);

//# sourceMappingURL=feed-categories.component.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feed_feed_component__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_feed_service__ = __webpack_require__(182);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FeedsComponent = (function () {
    function FeedsComponent(feedService, navParams, navController, loadingController) {
        this.feedService = feedService;
        this.navParams = navParams;
        this.navController = navController;
        this.loadingController = loadingController;
        this.feedUrl = navParams.get('feedUrl');
    }
    FeedsComponent.prototype.ngOnInit = function () {
        this.getFeeds();
    };
    FeedsComponent.prototype.getFeeds = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.feedService.getFeeds(this.feedUrl)
            .subscribe(function (result) {
            _this.title = result.query.results.rss.channel.title;
            _this.description = result.query.results.rss.channel.description;
            _this.link = result.query.results.rss.channel.link;
            if (result.query.results.rss.channel.image) {
                _this.image = result.query.results.rss.channel.image.url;
            }
            _this.feeds = result.query.results.rss.channel.item;
            loader.dismiss();
        });
    };
    FeedsComponent.prototype.loadFeed = function (feed) {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_2__feed_feed_component__["a" /* FeedComponent */], {
            feed: feed
        });
    };
    return FeedsComponent;
}());
FeedsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/feeds/feeds/feeds.html"*/'<ion-header>\n	<ion-navbar>\n		<button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>{{title}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<section padding>\n		<h2>{{title}}</h2>\n		<p>{{description}}</p>\n		<div center text-center>\n			<img [src]="image" *ngIf="image" />\n		</div>\n	</section>\n	<ion-list>\n		<ion-item *ngFor="let feed of feeds" (click)="loadFeed(feed)">\n			<h2>{{feed.title}}</h2>\n			<p>{{feed.summary}}</p>\n			<button ion-button item-right outline>Read</button>\n		</ion-item>\n	</ion-list>\n</ion-content>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/feeds/feeds/feeds.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__shared_services_feed_service__["a" /* FeedService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__shared_services_feed_service__["a" /* FeedService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
], FeedsComponent);

//# sourceMappingURL=feeds.component.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FeedComponent = (function () {
    function FeedComponent(navParams, navController, iab, socialSharing) {
        this.navParams = navParams;
        this.navController = navController;
        this.iab = iab;
        this.socialSharing = socialSharing;
        this.feed = navParams.get('feed');
    }
    FeedComponent.prototype.previewFeed = function () {
        var browser = this.iab.create(this.feed.link, '_blank');
        browser.show();
    };
    FeedComponent.prototype.shareFeed = function () {
        var subject = this.feed.title;
        var message = this.feed.description;
        message = message.replace(/(<([^>]+)>)/ig, "");
        var url = this.feed.link;
        this.socialSharing.share(message, subject, '', url);
    };
    return FeedComponent;
}());
FeedComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/feeds/feed/feed.html"*/'<ion-header>\n	<ion-navbar>\n		<button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>{{feed.title}}</ion-title>\n		<ion-buttons end>\n	      <button (tap)="shareFeed()" ion-button icon-only>\n	        <ion-icon name="share"></ion-icon>\n	      </button>\n	    </ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<section padding>\n		<h1 [innerHtml]=feed.title></h1>\n		<!--<div>{{feed.pubDate | date}}</div>-->\n	</section>\n\n    <video id="video" [src]="feed.enclosure.url" controls autoplay *ngIf="feed.enclosure && feed.enclosure.type === \'video/mp4\' "></video>\n    <audio id="audio" [src]="feed.enclosure.url" controls autoplay *ngIf="feed.enclosure && feed.enclosure.type === \'audio/mpeg\' "></audio>\n	<img [src]="feed.enclosure.url" *ngIf="feed.enclosure && feed.enclosure.type === \'image/jpeg\' " />\n\n	<section padding [innerHtml]="feed.description"></section>\n\n	<button ion-button full (click)=previewFeed()>Preview</button>\n</ion-content>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/feeds/feed/feed.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */]])
], FeedComponent);

//# sourceMappingURL=feed.component.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubeVideosComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_youtube_service__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__youtube_video_youtube_video_component__ = __webpack_require__(462);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var YoutubeVideosComponent = (function () {
    function YoutubeVideosComponent(navParams, youtubeService, navController, loadingController) {
        this.navParams = navParams;
        this.youtubeService = youtubeService;
        this.navController = navController;
        this.loadingController = loadingController;
    }
    YoutubeVideosComponent.prototype.ngOnInit = function () {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.getPlaylistId();
    };
    YoutubeVideosComponent.prototype.getPlaylistId = function () {
        var _this = this;
        this.loader.present();
        this.youtubeService.getPlaylistId()
            .subscribe(function (result) {
            if (result.items.length && result.items[0].contentDetails.relatedPlaylists.uploads) {
                var playlistId = result.items[0].contentDetails.relatedPlaylists.uploads;
                _this.getVideos(playlistId);
            }
            else {
                _this.loader.dismiss();
            }
        }, function (error) {
            _this.loader.dismiss();
        });
    };
    YoutubeVideosComponent.prototype.getVideos = function (playlistId) {
        var _this = this;
        this.youtubeService.getVideos(playlistId)
            .subscribe(function (result) {
            _this.videos = result.items;
            _this.loader.dismiss();
        }, function (error) {
            _this.loader.dismiss();
        });
    };
    YoutubeVideosComponent.prototype.loadVideo = function (video) {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_3__youtube_video_youtube_video_component__["a" /* YoutubeVideoComponent */], {
            video: video
        });
    };
    return YoutubeVideosComponent;
}());
YoutubeVideosComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/youtube/youtube-videos/youtube-videos.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-buttons start>\n			<button menuToggle>\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title>{{\'YOUTUBE_VIDEOS\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list *ngFor="let video of videos" (click)="loadVideo(video)">\n		<ion-item text-wrap>\n			<ion-thumbnail item-left *ngIf="video.snippet.thumbnails.default.url">\n				<img [src]="video.snippet.thumbnails.default.url">\n			</ion-thumbnail>\n			<h2>{{video.snippet.title}}</h2>\n		</ion-item>\n	</ion-list>\n</ion-content>\n\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/youtube/youtube-videos/youtube-videos.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__shared_services_youtube_service__["a" /* YoutubeService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__shared_services_youtube_service__["a" /* YoutubeService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
], YoutubeVideosComponent);

//# sourceMappingURL=youtube-videos.component.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var YoutubeService = (function () {
    function YoutubeService(http, config) {
        this.http = http;
        this.config = config;
        this.youtubeKey = config.youtubeKey;
        this.apiUrl = config.youtubeApiUrl;
        this.username = config.youtubeUsername;
        this.channelId = config.youtubeChannelId;
        this.results = config.youtubeResults;
        this.videosUrl = this.apiUrl + 'playlistItems?part=snippet&key=' + this.youtubeKey + '&order=date&maxResults=' + this.results;
        this.playlistsUrl = this.apiUrl + 'channels?part=contentDetails&key=' + this.youtubeKey;
        this.channelsUrl = this.apiUrl + 'search?part=snippet&key=' + this.youtubeKey + '&order=date&maxResults=' + this.results + '&channelId=' + this.channelId;
    }
    YoutubeService.prototype.getPlaylistId = function () {
        var url = this.playlistsUrl + '&forUsername=' + this.username;
        return this.http.get(url)
            .map(function (result) {
            return result.json();
        });
    };
    YoutubeService.prototype.getVideos = function (playlistId) {
        var url = this.videosUrl + '&playlistId=' + playlistId;
        return this.http.get(url)
            .map(function (result) {
            return result.json();
        });
    };
    YoutubeService.prototype.getChannel = function () {
        var url = this.channelsUrl;
        return this.http.get(url)
            .map(function (result) {
            return result.json();
        });
    };
    return YoutubeService;
}());
YoutubeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__app_app_config__["a" /* Config */]])
], YoutubeService);

//# sourceMappingURL=youtube.service.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubeVideoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var YoutubeVideoComponent = (function () {
    function YoutubeVideoComponent(navParams, sanitizer, socialSharing) {
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.socialSharing = socialSharing;
        this.video = navParams.get('video');
        this.prepareResource();
    }
    YoutubeVideoComponent.prototype.prepareResource = function () {
        var url = 'http://www.youtube.com/embed/' + this.video.snippet.resourceId.videoId;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    YoutubeVideoComponent.prototype.shareVideo = function () {
        var _this = this;
        var subject = this.video.snippet.title;
        var message = this.video.snippet.description;
        message = message.replace(/(<([^>]+)>)/ig, "");
        var url = 'http://www.youtube.com/embed/' + this.video.snippet.resourceId.videoId;
        setTimeout(function () { return _this.socialSharing.share(message, subject, '', url); }, 250);
    };
    return YoutubeVideoComponent;
}());
YoutubeVideoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/youtube/youtube-video/youtube-video.html"*/'<ion-header>\n	<ion-navbar>\n		<button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>{{video.snippet.title}}</ion-title>\n        <ion-buttons end>\n          <button (tap)="shareVideo()" ion-button icon-only>\n            <ion-icon name="share"></ion-icon>\n          </button>\n        </ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="youtube-video">\n    <iframe *ngIf="video.snippet.resourceId.videoId" [src]="videoUrl" frameborder="0" allowfullscreen="true"></iframe>\n        \n    <div padding>\n        <h2>{{video.snippet.title}}</h2>\n        <p>Published by <strong>{{video.snippet.channelTitle}}</strong></p>\n        <p [innerHtml]="video.snippet.description"></p>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/youtube/youtube-video/youtube-video.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */]])
], YoutubeVideoComponent);

//# sourceMappingURL=youtube-video.component.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubeChannelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_youtube_service__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__youtube_channel_video_youtube_channel_video_component__ = __webpack_require__(464);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var YoutubeChannelComponent = (function () {
    function YoutubeChannelComponent(navParams, youtubeService, navController, loadingController) {
        this.navParams = navParams;
        this.youtubeService = youtubeService;
        this.navController = navController;
        this.loadingController = loadingController;
    }
    YoutubeChannelComponent.prototype.ngOnInit = function () {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.getChannel();
    };
    YoutubeChannelComponent.prototype.getChannel = function () {
        var _this = this;
        this.youtubeService.getChannel()
            .subscribe(function (result) {
            _this.videos = result.items;
            _this.loader.dismiss();
        }, function (error) {
            _this.loader.dismiss();
        });
    };
    YoutubeChannelComponent.prototype.loadVideo = function (video) {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_3__youtube_channel_video_youtube_channel_video_component__["a" /* YoutubeChannelVideoComponent */], {
            video: video
        });
    };
    return YoutubeChannelComponent;
}());
YoutubeChannelComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/youtube/youtube-channel/youtube-channel.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-buttons start>\n			<button menuToggle>\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title>{{\'YOUTUBE_CHANNEL\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list *ngFor="let video of videos" (click)="loadVideo(video)">\n		<ion-item text-wrap>\n			<ion-thumbnail item-left *ngIf="video.snippet.thumbnails.default.url">\n				<img [src]="video.snippet.thumbnails.default.url">\n			</ion-thumbnail>\n			<h2>{{video.snippet.title}}</h2>\n		</ion-item>\n	</ion-list>\n</ion-content>\n\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/youtube/youtube-channel/youtube-channel.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__shared_services_youtube_service__["a" /* YoutubeService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__shared_services_youtube_service__["a" /* YoutubeService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
], YoutubeChannelComponent);

//# sourceMappingURL=youtube-channel.component.js.map

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubeChannelVideoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var YoutubeChannelVideoComponent = (function () {
    function YoutubeChannelVideoComponent(navParams, sanitizer, socialSharing) {
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.socialSharing = socialSharing;
        this.video = navParams.get('video');
        this.prepareResource();
    }
    YoutubeChannelVideoComponent.prototype.prepareResource = function () {
        var url = 'http://www.youtube.com/embed/' + this.video.id.videoId;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    YoutubeChannelVideoComponent.prototype.shareVideo = function () {
        var _this = this;
        var subject = this.video.snippet.title;
        var message = this.video.snippet.description;
        message = message.replace(/(<([^>]+)>)/ig, "");
        var url = 'http://www.youtube.com/embed/' + this.video.id.videoId;
        setTimeout(function () { return _this.socialSharing.share(message, subject, '', url); }, 0);
    };
    return YoutubeChannelVideoComponent;
}());
YoutubeChannelVideoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/youtube/youtube-channel-video/youtube-channel-video.html"*/'<ion-header>\n	<ion-navbar>\n		<button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>{{video.snippet.title}}</ion-title>\n        <ion-buttons end>\n          <button (click)="shareVideo()" ion-button icon-only>\n            <ion-icon name="share"></ion-icon>\n          </button>\n        </ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="youtube-video">\n    <iframe *ngIf="video.id.videoId" [src]="videoUrl" frameborder="0" allowfullscreen="true"></iframe>\n        \n    <div padding>\n        <h2>{{video.snippet.title}}</h2>\n        <p>Published by <strong>{{video.snippet.channelTitle}}</strong></p>\n        <p [innerHtml]="video.snippet.description"></p>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/youtube/youtube-channel-video/youtube-channel-video.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */]])
], YoutubeChannelVideoComponent);

//# sourceMappingURL=youtube-channel-video.component.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(633);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChartsComponent = (function () {
    function ChartsComponent(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ChartsComponent.prototype.ionViewDidLoad = function () {
        this.barChart = this.getBarChart();
        this.doughnutChart = this.getDoughnutChart();
        this.lineChart = this.getLineChart();
        this.radarChart = this.getRadarChart();
        this.pieChart = this.getPieChart();
        this.polarAreaChart = this.getPolarAreaChart();
        this.bubbleChart = this.getBubbleChart();
        this.mixedChart = this.getMixedChart();
    };
    ChartsComponent.prototype.getChart = function (context, chartType, data, options) {
        return new __WEBPACK_IMPORTED_MODULE_2_chart_js___default.a(context, {
            type: chartType,
            data: data,
            options: options
        });
    };
    ChartsComponent.prototype.getMixedChart = function () {
        var data = {
            labels: ['Item 1', 'Item 2', 'Item 3'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Bar Component',
                    data: [10, 20, 30],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
                {
                    type: 'line',
                    label: 'Line Component',
                    data: [30, 20, 10],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                }
            ]
        };
        return this.getChart(this.mixedCanvas.nativeElement, "bar", data);
    };
    ChartsComponent.prototype.getPieChart = function () {
        var data = {
            labels: ["Red", "Blue", "Yellow"],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
                }
            ]
        };
        return this.getChart(this.pieCanvas.nativeElement, "pie", data);
    };
    ChartsComponent.prototype.getPolarAreaChart = function () {
        var data = {
            datasets: [{
                    data: [11, 16, 7, 3, 14],
                    backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"],
                    label: 'My dataset'
                }],
            labels: ["Red", "Green", "Yellow", "Grey", "Blue"]
        };
        var options = {
            elements: {
                arc: {
                    borderColor: "#000000"
                }
            }
        };
        return this.getChart(this.polarCanvas.nativeElement, "polarArea", data, options);
    };
    ChartsComponent.prototype.getBubbleChart = function () {
        var data = {
            datasets: [
                {
                    label: 'First Dataset',
                    data: [
                        { x: 20, y: 30, r: 15 },
                        { x: 40, y: 10, r: 10 },
                    ],
                    backgroundColor: "#FF6384",
                    hoverBackgroundColor: "#FF6384",
                }
            ]
        };
        var options = {
            elements: {
                points: {
                    borderWidth: 1,
                    borderColor: 'rgb(0, 0, 0)'
                }
            }
        };
        return this.getChart(this.bubbleCanvas.nativeElement, "bubble", data, options);
    };
    ChartsComponent.prototype.getRadarChart = function () {
        var data = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "My First dataset",
                    backgroundColor: "rgba(179,181,198,0.2)",
                    borderColor: "rgba(179,181,198,1)",
                    pointBackgroundColor: "rgba(179,181,198,1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(179,181,198,1)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    pointBackgroundColor: "rgba(255,99,132,1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(255,99,132,1)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };
        var options = {
            scale: {
                reverse: true,
                ticks: {
                    beginAtZero: true
                }
            }
        };
        return this.getChart(this.radarCanvas.nativeElement, "radar", data, options);
    };
    ChartsComponent.prototype.getDoughnutChart = function () {
        var data = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
                }]
        };
        return this.getChart(this.doughnutCanvas.nativeElement, "doughnut", data);
    };
    ChartsComponent.prototype.getBarChart = function () {
        var data = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
        };
        var options = {
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        };
        return this.getChart(this.barCanvas.nativeElement, "bar", data, options);
    };
    ChartsComponent.prototype.getLineChart = function () {
        var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40],
                    spanGaps: false,
                },
                {
                    label: "My Second dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(175,92,192,0.4)",
                    borderColor: "rgba(31,156,156,1)",
                    borderCapStyle: 'butt',
                    borderDash: [5, 8],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(31,156,156,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(31,156,156,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [15, 39, 50, 81, 51, 55, 30],
                    spanGaps: false,
                }
            ]
        };
        return this.getChart(this.lineCanvas.nativeElement, "line", data);
    };
    return ChartsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('barCanvas'),
    __metadata("design:type", Object)
], ChartsComponent.prototype, "barCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('doughnutCanvas'),
    __metadata("design:type", Object)
], ChartsComponent.prototype, "doughnutCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('lineCanvas'),
    __metadata("design:type", Object)
], ChartsComponent.prototype, "lineCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('radarCanvas'),
    __metadata("design:type", Object)
], ChartsComponent.prototype, "radarCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('polarCanvas'),
    __metadata("design:type", Object)
], ChartsComponent.prototype, "polarCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('pieCanvas'),
    __metadata("design:type", Object)
], ChartsComponent.prototype, "pieCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('bubbleCanvas'),
    __metadata("design:type", Object)
], ChartsComponent.prototype, "bubbleCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mixedCanvas'),
    __metadata("design:type", Object)
], ChartsComponent.prototype, "mixedCanvas", void 0);
ChartsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-charts',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/charts/charts-component/charts.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <ion-title>{{\'CHARTS\' | translate}}</ion-title>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card>\n    <ion-card-header>\n    	<h1>Bar Chart</h1>\n    </ion-card-header>\n    <ion-card-content>\n      <canvas #barCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n    	<h1>Doughnut Chart</h1>\n    </ion-card-header>\n    <ion-card-content>\n      <canvas #doughnutCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n    	<h1>Line Chart</h1>\n    </ion-card-header>\n    <ion-card-content>\n      <canvas #lineCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n    	<h1>Radar Chart</h1>\n    </ion-card-header>\n    <ion-card-content>\n      <canvas #radarCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n    	<h1>Polar Area Chart</h1>\n    </ion-card-header>\n    <ion-card-content>\n      <canvas #polarCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n    	<h1>Pie Chart</h1>\n    </ion-card-header>\n    <ion-card-content>\n      <canvas #pieCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n    	<h1>Bubble Chart</h1>\n    </ion-card-header>\n    <ion-card-content>\n      <canvas #bubbleCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n    	<h1>Mixed Chart</h1>\n    </ion-card-header>\n    <ion-card-content>\n      <canvas #mixedCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/charts/charts-component/charts.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */]])
], ChartsComponent);

//# sourceMappingURL=charts.component.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseLoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firebase_home_firebase_home_component__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FirebaseLoginComponent = (function () {
    function FirebaseLoginComponent(navController, loadingController, toastController, angularFireAuth) {
        this.navController = navController;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.angularFireAuth = angularFireAuth;
        this.account = {
            email: '',
            password: ''
        };
    }
    FirebaseLoginComponent.prototype.login = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.angularFireAuth.auth.signInWithEmailAndPassword(this.account.email, this.account.password).then(function (value) {
            loader.dismiss();
            _this.navController.pop(__WEBPACK_IMPORTED_MODULE_3__firebase_home_firebase_home_component__["a" /* FirebaseHomeComponent */]);
        }).catch(function (error) {
            loader.dismiss();
            var errorMessage = error;
            if (errorMessage && errorMessage.message) {
                var message = errorMessage.message.replace(/<(?:.|\n)*?>/gm, '');
                var toast = _this.toastController.create({
                    message: message,
                    duration: 6000,
                    position: 'bottom'
                });
                toast.present();
            }
        });
    };
    return FirebaseLoginComponent;
}());
FirebaseLoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/firebase/firebase-login/firebase-login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'LOGIN\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding text-center>\n  <div class="logo" padding-bottom>\n      <img src="assets/img/firebase.png" />\n  </div>\n  <form (submit)="login()">\n    <ion-list>\n\n      <ion-item>\n        <ion-label stacked>Email</ion-label>\n        <ion-input type="email" [(ngModel)]="account.email" name="email"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>Password</ion-label>\n        <ion-input type="password" [(ngModel)]="account.password" name="password"></ion-input>\n      </ion-item>\n\n      <div padding>\n        <button ion-button icon-left block color="light">\n          <ion-icon name="log-in"></ion-icon>\n          {{ \'LOGIN\' | translate }}\n        </button>\n      </div>\n\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/firebase/firebase-login/firebase-login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
], FirebaseLoginComponent);

//# sourceMappingURL=firebase-login.component.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseSignUpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firebase_home_firebase_home_component__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FirebaseSignUpComponent = (function () {
    function FirebaseSignUpComponent(navController, loadingController, toastController, angularFireAuth) {
        this.navController = navController;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.angularFireAuth = angularFireAuth;
        this.account = {
            email: '',
            password: ''
        };
    }
    FirebaseSignUpComponent.prototype.signUp = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.angularFireAuth.auth.createUserWithEmailAndPassword(this.account.email, this.account.password).then(function (value) {
            loader.dismiss();
            _this.login();
        }).catch(function (error) {
            loader.dismiss();
            var errorMessage = error;
            if (errorMessage && errorMessage.message) {
                var message = errorMessage.message.replace(/<(?:.|\n)*?>/gm, '');
                var toast = _this.toastController.create({
                    message: message,
                    duration: 6000,
                    position: 'bottom'
                });
                toast.present();
            }
        });
    };
    FirebaseSignUpComponent.prototype.login = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.angularFireAuth.auth.signInWithEmailAndPassword(this.account.email, this.account.password).then(function (value) {
            loader.dismiss();
            _this.navController.pop(__WEBPACK_IMPORTED_MODULE_3__firebase_home_firebase_home_component__["a" /* FirebaseHomeComponent */]);
        }).catch(function (error) {
            loader.dismiss();
            var errorMessage = error;
            if (errorMessage && errorMessage.message) {
                var message = errorMessage.message.replace(/<(?:.|\n)*?>/gm, '');
                var toast = _this.toastController.create({
                    message: message,
                    duration: 6000,
                    position: 'bottom'
                });
                toast.present();
            }
        });
    };
    return FirebaseSignUpComponent;
}());
FirebaseSignUpComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/firebase/firebase-sign-up/firebase-sign-up.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'SIGN_UP\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding text-center>\n  <div class="logo" padding-bottom>\n      <img src="assets/img/firebase.png" />\n  </div>\n  <form (submit)="signUp()">\n    <ion-list>\n\n      <ion-item>\n        <ion-label stacked>Email</ion-label>\n        <ion-input type="email" [(ngModel)]="account.email" name="email"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>Password</ion-label>\n        <ion-input type="password" [(ngModel)]="account.password" name="password"></ion-input>\n      </ion-item>\n\n      <div padding>\n        <button ion-button icon-left block color="light" [disabled]="!account.email || !account.password">\n          <ion-icon name="log-in"></ion-icon>\n          {{ \'SIGN_UP\' | translate }}\n        </button>\n      </div>\n\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/firebase/firebase-sign-up/firebase-sign-up.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
], FirebaseSignUpComponent);

//# sourceMappingURL=firebase-sign-up.component.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseResetPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate__ = __webpack_require__(95);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FirebaseResetPasswordComponent = (function () {
    function FirebaseResetPasswordComponent(navController, loadingController, toastController, angularFireAuth, translate) {
        this.navController = navController;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.angularFireAuth = angularFireAuth;
        this.translate = translate;
        this.account = {
            email: ''
        };
    }
    FirebaseResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.angularFireAuth.auth.sendPasswordResetEmail(this.account.email).then(function (value) {
            loader.dismiss();
            var message = _this.translate.instant('RESET_PASSWORD_EMAIL') + ' ' + _this.account.email;
            var toast = _this.toastController.create({
                message: message,
                duration: 6000,
                position: 'bottom'
            });
            toast.present();
        }).catch(function (error) {
            loader.dismiss();
            var errorMessage = error;
            if (errorMessage && errorMessage.message) {
                var message = errorMessage.message.replace(/<(?:.|\n)*?>/gm, '');
                var toast = _this.toastController.create({
                    message: message,
                    duration: 6000,
                    position: 'bottom'
                });
                toast.present();
            }
        });
    };
    return FirebaseResetPasswordComponent;
}());
FirebaseResetPasswordComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/firebase/firebase-reset-password/firebase-reset-password.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'RESET_PASSWORD\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding text-center>\n  <div class="logo" padding-bottom>\n      <img src="assets/img/firebase.png" />\n  </div>\n  <form (submit)="resetPassword()">\n    <ion-list>\n\n      <ion-item>\n        <ion-label stacked>Email</ion-label>\n        <ion-input type="email" [(ngModel)]="account.email" name="email"></ion-input>\n      </ion-item>\n\n      <div padding>\n        <button ion-button icon-left block color="light" [disabled]="!account.email">\n          <ion-icon name="log-in"></ion-icon>\n          {{ \'RESET_PASSWORD\' | translate }}\n        </button>\n      </div>\n\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/firebase/firebase-reset-password/firebase-reset-password.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_3_ng2_translate__["c" /* TranslateService */]])
], FirebaseResetPasswordComponent);

//# sourceMappingURL=firebase-reset-password.component.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wordpress_home_component_home_component__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact_component_contact_component__ = __webpack_require__(474);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TabsComponent = (function () {
    function TabsComponent() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__wordpress_home_component_home_component__["a" /* HomeComponent */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact_component_contact_component__["a" /* ContactComponent */];
    }
    return TabsComponent;
}());
TabsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/tabs/tabs-component/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="{{\'HOME\' | translate}}" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="{{\'CONTACT\' | translate}}" tabIcon="contacts"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/tabs/tabs-component/tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsComponent);

//# sourceMappingURL=tabs.component.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContactComponent = (function () {
    function ContactComponent(navCtrl, config, emailComposer) {
        this.navCtrl = navCtrl;
        this.config = config;
        this.emailComposer = emailComposer;
        this.email = {
            subject: '',
            body: ''
        };
    }
    ContactComponent.prototype.sendEmail = function () {
        var email = {
            to: this.config.emailTo,
            cc: '',
            bcc: '',
            attachments: [],
            subject: this.email.subject,
            body: this.email.body,
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    return ContactComponent;
}());
ContactComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-contact',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/contact/contact-component/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      {{\'CONTACT\' | translate}}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Contact us</ion-list-header>\n    <ion-item>\n      <ion-icon name="person" item-left></ion-icon>\n      George I. Tsopouridis\n    </ion-item>\n    <ion-item>\n      <ion-icon name="logo-twitter" item-left></ion-icon>\n      @AppsHybrid\n    </ion-item>\n    <ion-item>\n      <ion-icon name="mail" item-left></ion-icon>\n      gtsopour@gmail.com\n    </ion-item>\n    <ion-item>\n      <ion-icon name="leaf" item-left></ion-icon>\n      codecanyon.net/user/gtsopour\n    </ion-item>\n  </ion-list>\n\n  <form (submit)="sendEmail()">\n    <ion-list>\n      <ion-item>\n        <ion-label stacked>Subject</ion-label>\n        <ion-input type="text" [(ngModel)]="email.subject" name="subject"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>Message</ion-label>\n        <ion-textarea rows="3" [(ngModel)]="email.body" name="body"></ion-textarea>\n      </ion-item>\n\n      <div padding>\n        <button ion-button color="primary" block>Send email</button>\n      </div>\n\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/contact/contact-component/contact.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__app_app_config__["a" /* Config */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__["a" /* EmailComposer */]])
], ContactComponent);

//# sourceMappingURL=contact.component.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LikesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_likepopover_likepopover__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wordpress_post_wordpress_post_component__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_firebase_use_firebase_use__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LikesComponent = (function () {
    function LikesComponent(navCtrl, navParams, popoverCtrl, storage, firebaseUseProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.storage = storage;
        this.firebaseUseProvider = firebaseUseProvider;
        this.likes = [];
        this.storage.get('wordpress.favorite')
            .then(function (data) {
            if (data) {
                _this.likes = JSON.parse(data);
            }
        });
        // this.likes = [
        //       {img: 'assets/img/img_1.jpg' , subTitle: 'ipsum dolor sit amet, consecteturipsum dolor sit '},
        //       {img: 'assets/img/img_2.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit '},
        //       {img: 'assets/img/img_3.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit '},
        //       {img: 'assets/img/img_1.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit '},
        //       {img: 'assets/img/img_2.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit'},
        //       {img: 'assets/img/img_3.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit'},
        //       {img: 'assets/img/img_1.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit'},
        //       {img: 'assets/img/img_2.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit'},
        //       {img: 'assets/img/img_3.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit'},
        //       {img: 'assets/img/img_1.jpg' , subTitle: 'ipsum dolor sit amet, consectetur ipsum dolor sit'}
        //
        //
        //   ];
    }
    LikesComponent.prototype.presentPopover = function (myEvent, post) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__components_likepopover_likepopover__["a" /* likepopover */]);
        popover.onDidDismiss(function (val) {
            if (val) {
                if (val.result) {
                    var isPost_1 = false;
                    _this.likes.forEach(function (favPost) {
                        if (JSON.stringify(favPost) === JSON.stringify(post)) {
                            isPost_1 = true;
                        }
                    });
                    if (isPost_1) {
                        var index = _this.likes.indexOf(post);
                        if (index !== -1) {
                            _this.likes.splice(index, 1);
                            _this.storage.set('wordpress.favorite', JSON.stringify(_this.likes));
                        }
                    }
                }
            }
        });
        popover.present({
            ev: myEvent
        });
    };
    LikesComponent.prototype.loadPost = function (post) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__wordpress_post_wordpress_post_component__["a" /* WordpressPost */], {
            post: post, firebaseUseProvider: this.firebaseUseProvider
        });
    };
    return LikesComponent;
}());
LikesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'likes-page',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/likes/likes.html"*/'\n<ion-header no-border>\n  <ion-navbar  hideBackButton="false"  color="primary">\n    <button ion-button menuToggle>\n      <img src="assets/icon/menu-icon-dark.png">\n      <!--<ion-icon name="menu"></ion-icon>-->\n    </button>\n    <!--<ion-buttons start menuToggle clear>-->\n      <!--<button ion-button  clear>-->\n        <!--&lt;!&ndash;<img src="assets/img/menu_img.png">&ndash;&gt;-->\n      <!--</button>-->\n    <!--</ion-buttons>-->\n    <ion-title> Liked Articles</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="likesPage">\n  <ion-list class="likesList">\n    <ion-item *ngFor="let post of likes">\n      <wordpress-feature-media *ngIf="post.featured_media" [id]="post.featured_media" (click)="loadPost(post)"></wordpress-feature-media>\n      <img src="assets/img/placeholder.png" *ngIf="!post.featured_media">\n      <p (click)="loadPost(post)">\n        {{post.title.rendered}}\n      </p>\n      <!--<img src="{{item.img}}">-->\n      <!--<p text-left> {{post.title.rendered}} </p>-->\n      <button ion-button icon-only (click)="presentPopover($event, post)" class="popBtn">\n          <ion-icon name="md-more"></ion-icon>\n      </button>\n\n    </ion-item>\n\n  </ion-list>\n\n    \n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/likes/likes.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__providers_firebase_use_firebase_use__["a" /* FirebaseUseProvider */]])
], LikesComponent);

//# sourceMappingURL=likes.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return likepopover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var likepopover = (function () {
    function likepopover(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    likepopover.prototype.close = function () {
        this.viewCtrl.dismiss({ result: true });
    };
    return likepopover;
}());
likepopover = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'likepopover-page',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/components/likepopover/likepopover.html"*/'\n\n<ion-content class="popList">\n      <ion-list>\n        <button ion-item (click)="close()"> Remove\n          <ion-icon name="ios-trash-outline"></ion-icon>\n           </button>\n\n    </ion-list>\n    \n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/components/likepopover/likepopover.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */]])
], likepopover);

//# sourceMappingURL=likepopover.js.map

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_global__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SettingsComponent = (function () {
    function SettingsComponent(storage, translate, global) {
        this.storage = storage;
        this.translate = translate;
        this.global = global;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('language')
            .then(function (value) {
            if (value) {
                _this.language = value;
            }
            else {
                _this.language = 'en';
            }
        });
    };
    SettingsComponent.prototype.selectLanguage = function () {
        this.storage.set('language', this.language);
        this.translate.setDefaultLang(this.language);
        this.translate.use(this.language);
    };
    SettingsComponent.prototype.changeTheme = function (theme) {
        this.global.set('theme', theme);
        localStorage.setItem('theme', theme);
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/settings/settings-component/settings.html"*/'<ion-header>\n  <ion-navbar  color="primary">\n    <button ion-button menuToggle>\n      <img src="assets/icon/menu-icon-dark.png">\n      <!--<ion-icon name="menu"></ion-icon>-->\n    </button>\n    <ion-title>{{\'SETTINGS\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Setting theme</h3>\n  <button class="pop-in" ion-button (click)="changeTheme(\'\')">Default</button>\n  <button class="pop-in" ion-button color="dark" (click)="changeTheme(\'theme-dark\')">Dark</button>\n\n  <!--<ion-list>-->\n    <!--<ion-list-header>-->\n    <!--{{\'LANGUAGE\' | translate}}-->\n    <!--</ion-list-header>-->\n    <!--<ion-item>-->\n    <!--<ion-label>{{\'LANGUAGE\' | translate}}</ion-label>-->\n    <!--<ion-select [(ngModel)]="language" (ionChange)=selectLanguage()>-->\n      <!--<ion-option value="en">{{\'ENGLISH\' | translate}}</ion-option>-->\n      <!--<ion-option value="de">{{\'GERMAN\' | translate}}</ion-option>-->\n      <!--<ion-option value="fr">{{\'FRENCH\' | translate}}</ion-option>-->\n    <!--</ion-select>-->\n    <!--</ion-item>-->\n  <!--</ion-list>-->\n</ion-content>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/settings/settings-component/settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_2_ng2_translate__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_3__app_app_global__["a" /* AppState */]])
], SettingsComponent);

//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeatherComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WeatherComponent = (function () {
    function WeatherComponent(navController, menuController, events) {
        this.navController = navController;
        this.menuController = menuController;
        this.events = events;
        this.pages = [
            {
                heading: 'Weather',
                items: [
                    // { title: 'Current Location', name: 'TabsPage', tabName: 'HomeWeatherPage', index: 0, icon: 'home' },
                    // { title: 'World', name: 'TabsPage', tabName: 'WorldCityListPage', index: 1, icon: 'globe' }
                    { title: 'Current Location', name: 'HomeWeatherPage', icon: 'home' },
                    { title: 'World', name: 'WorldCityListPage', icon: 'globe' }
                ]
            },
            {
                heading: 'Settings',
                items: [
                    { title: 'Settings', name: 'SettingsPage', icon: 'settings' }
                ]
            }
        ];
    }
    WeatherComponent.prototype.ngOnInit = function () {
        // this.pages = [
        //   // { title: 'Edit Locations', component: LocationComponent, icon: 'create', note: 'Location' },
        //   { title: 'Current Location', component: WeatherCurrentComponent, icon: 'pin', note: 'Location' }
        // ];
        var _this = this;
        this.acService = null; // new google.maps.places.AutocompleteService();
        this.events.subscribe('navigationEvent', function (object) {
            _this.menuController.close();
            if (object.component) {
                _this.navController.push(object.component, object.params);
            }
        });
    };
    WeatherComponent.prototype.openPage = function (page) {
        // if (this.isActive(page)) {
        // 	return;
        // }
        var params = page.index ? { tabIndex: page.index } : {};
        this.navController.push(page.name).catch(function (err) { return console.error(err); });
        // if (this.navController.getActiveChildNav() && page.index != undefined) {
        // 	this.navController.getActiveChildNav().select(page.index);
        // } else {
        // 	this.navController.push(page.name, params).catch(err => console.error(err));
        // }
    };
    return WeatherComponent;
}());
WeatherComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-weather',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/weather-component/weather.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle icon-only>\n      <img src="assets/icon/menu-icon-dark.png">\n      <!--<ion-icon name=\'menu\'></ion-icon>-->\n    </button>\n    <ion-title>{{\'WEATHER\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<!--<ion-content padding class="home">-->\n  <!--<h2>{{\'WEATHER_TITLE\' | translate}}</h2>-->\n  <!--<p>-->\n    <!--{{\'WEATHER_MESSAGE\' | translate}}-->\n  <!--</p>-->\n  <!--<ion-list>-->\n    <!--<ion-item *ngFor="let page of pages" (tap)="openPage(page)">-->\n      <!--<ion-icon [name]="page.icon" item-left></ion-icon>-->\n      <!--{{page.title | translate}}-->\n      <!--<ion-note item-right>-->\n      <!--{{page.note}}-->\n      <!--</ion-note>-->\n    <!--</ion-item>-->\n  <!--</ion-list>-->\n<!--</ion-content>-->\n\n<ion-content>\n  <ion-list no-lines *ngFor="let page of pages">\n    <ion-list-header>{{page.heading}}</ion-list-header>\n    <ion-item detail-none\n            *ngFor="let pageItem of page.items" (click)="openPage(pageItem)">\n      <ion-icon item-left [name]="pageItem.icon" ></ion-icon>\n      <span ion-text >{{pageItem.title}}</span>\n    </ion-item>\n  </ion-list>\n  <!--<p class="powered-by" ion-text color="text3" (click)="poweredBy()">Powered by Dark Sky</p>-->\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/weather-component/weather.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], WeatherComponent);

//# sourceMappingURL=weather.component.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DailyScriptureComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_global__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { PopOverSharePage } from '../../pop-over-share/pop-over-share'
var DailyScriptureComponent = (function () {
    function DailyScriptureComponent(navCtrl, global, http, sharingVar, popOverCtrl, modalController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.global = global;
        this.http = http;
        this.sharingVar = sharingVar;
        this.popOverCtrl = popOverCtrl;
        this.modalController = modalController;
        this.biblle_name = '';
        this.book_name = '';
        this.chapter_number = '';
        this.verse_number = '';
        this.text = '';
        this.http.get("assets/scripture/kiv.json")
            .map(function (res) {
            var bibleContentJson = res.json();
            _this.biblle_name = bibleContentJson[0].bible.name;
            var book_data = bibleContentJson[0].bible.book;
            var book_count = book_data.length;
            var rand_book_number = Math.floor(Math.random() * book_count);
            var selected_book = book_data[rand_book_number];
            _this.book_name = selected_book.num;
            var chapter_data = selected_book.chapter;
            var chapter_count = chapter_data.length;
            var selected_chapter;
            if (!chapter_count) {
                selected_chapter = chapter_data;
                _this.chapter_number = '1';
            }
            else {
                var rand_chapter_number = Math.floor(Math.random() * chapter_count);
                selected_chapter = chapter_data[rand_chapter_number];
                _this.chapter_number = selected_chapter.num;
            }
            var verse_data = selected_chapter.verse;
            var verse_count = verse_data.length;
            var selected_verse;
            if (!verse_count) {
                selected_verse = verse_data;
                _this.verse_number = '1';
            }
            else {
                var rand_verse_number = Math.floor(Math.random() * verse_count);
                selected_verse = verse_data[rand_verse_number];
                _this.verse_number = selected_verse.num;
            }
            _this.text = selected_verse.text;
        }).subscribe(function (data) {
            var data1 = data;
        }, function (rej) {
            console.error("Could not load local data", rej);
        });
    }
    DailyScriptureComponent.prototype.whatsappShare = function () {
        this.sharingVar.shareViaWhatsApp(this.text, null /*Image*/, null /* url */)
            .then(function () {
            alert("Success");
        }, function () {
            alert("failed");
        });
    };
    DailyScriptureComponent.prototype.twitterShare = function () {
        this.sharingVar.shareViaTwitter(this.text, null /*Image*/, null)
            .then(function () {
            alert("Success");
        }, function () {
            alert("failed");
        });
    };
    DailyScriptureComponent.prototype.facebookShare = function () {
        this.sharingVar.shareViaFacebook(this.text, null /*Image*/, null)
            .then(function () {
            alert("Success");
        }, function () {
            alert("failed");
        });
    };
    DailyScriptureComponent.prototype.otherShare = function () {
        this.sharingVar.share(this.text, null /*Subject*/, null /*File*/, null)
            .then(function () {
            alert("Success");
        }, function () {
            alert("failed");
        });
    };
    DailyScriptureComponent.prototype.sharePopover = function (myEvent) {
        // alert('share start');
        var infoModal = this.popOverCtrl.create('PopOverSharePage', { ev: myEvent, text1: this.text });
        // infoModal.onDidDismiss(data => {
        // });
        infoModal.present();
    };
    return DailyScriptureComponent;
}());
DailyScriptureComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-daily-scripture',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/daily-scripture/daily-scripture-component/daily.scripture.html"*/'<ion-header>\n  <ion-navbar  color="primary">\n	  <button ion-button menuToggle icon-only>\n		  <img src="assets/icon/menu-icon-dark.png">\n		  <!--<ion-icon name=\'menu\'></ion-icon>-->\n	  </button>\n    <ion-title>\n      <ion-title>{{\'Daily Scripture\' | translate}}</ion-title>\n    </ion-title>\n\n	  <ion-buttons end>\n		  <button ion-button icon-only (click)="sharePopover($event)">\n			  <ion-icon name="share"></ion-icon>\n		  </button>\n	  </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n	<ion-card class="{{global.state[\'theme\']}}">\n	  <ion-card-content>\n		  <h3>Book: {{book_name}}</h3>\n		  <h5>Chapter: {{chapter_number}}    Verse: {{verse_number}}</h5>\n	  	<!--<h1>Build apps with web tech you know and love</h1>-->\n	  	<p>{{text}}</p>\n\n		  <!--<button ion-button (click)="whatsappShare()" icon-only>-->\n			  <!--<img src="assets/icon/whatsapp.png">-->\n		  <!--</button>-->\n		  <!--&lt;!&ndash;<button ion-button (click)="twitterShare()" icon-only>&ndash;&gt;-->\n			  <!--&lt;!&ndash;<img src="assets/icon/twitter.png">&ndash;&gt;-->\n		  <!--&lt;!&ndash;</button>&ndash;&gt;-->\n\n		  <!--<button ion-button (click)="facebookShare()" icon-only end>-->\n			  <!--<img src="assets/icon/facebook.png">-->\n		  <!--</button>-->\n		  <!--<button ion-button (click)="otherShare()" icon-only end>-->\n			  <!--<img src="assets/icon/flattr.png">-->\n		  <!--</button>-->\n	  </ion-card-content>\n	</ion-card>\n\n	<!--<ion-card>-->\n\n\n	<!--<ion-card-content>-->\n	  	<!--<h1>Build apps with the Ionic 2 App</h1>-->\n	  	<!--<p>Use the Ionic 2 App to get you up and running with mobile apps faster than ever before.</p>-->\n	  <!--</ion-card-content>-->\n	<!--</ion-card>-->\n\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/daily-scripture/daily-scripture-component/daily.scripture.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_5__app_app_global__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__["a" /* SocialSharing */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */]])
], DailyScriptureComponent);

//# sourceMappingURL=daily.scripture.component.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_global__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_currency_provider_currecy_provider__ = __webpack_require__(488);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CurrencyComponent = (function () {
    // current_currency = {currencyID:'GHS',currencyName:'Ghanaian cedi',name:'Ghana',id:'GH',
    //                     flag: 'assets/flags100px/gh.png'};
    function CurrencyComponent(navCtrl, http, global, currencyProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.global = global;
        this.currencyProvider = currencyProvider;
        this.currencies = [{ currencyID: 'GHS', currencyName: 'Ghanaian cedi', name: 'Ghana', id: 'GH',
                flag: 'assets/flags100px/gh.png', rate: 1 },
            { name: 'United States of America',
                id: 'US',
                currencyID: 'USD',
                currencySymbol: '$',
                flag: 'assets/flags100px/us.png', rate: 0.22632115 },
            { name: 'United Kingdom',
                id: 'GB',
                currencyID: 'GBP',
                currencySymbol: '£',
                flag: 'assets/flags100px/gb.png', rate: 0.17481295 }
        ];
        var s;
        // alert("start");
        // alert(localStorage.getItem('GHS_USD'));
        if (localStorage.getItem('GHS_USD')) {
            s = localStorage.getItem('GHS_USD');
        }
        else {
            s = 0.22632115;
        }
        this.currencies[1].rate = Number(parseFloat(s).toFixed(3));
        if (localStorage.getItem('GHS_GBP')) {
            s = localStorage.getItem('GHS_GBP');
        }
        else {
            s = 0.17481295;
        }
        this.currencies[2].rate = Number(parseFloat(s).toFixed(3));
        // alert("start1");
        this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=GHS_USD&compact=y')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            // alert("GHS_USD");
            s = parseFloat(data.GHS_USD.val);
            _this.currencies[1].rate = Number((_this.currencies[0].rate * s).toFixed(3));
            localStorage.setItem('GHS_USD', s);
        });
        this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=GHS_GBP&compact=y')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            // alert("GHS_GHP");
            s = parseFloat(data.GHS_GBP.val);
            _this.currencies[2].rate = Number((_this.currencies[0].rate * s).toFixed(3));
            localStorage.setItem('GHS_GBP', s);
        });
        // this.currencyProvider.getCurrencyByCurrencyID('USD').then((result: any)=>{
        //   console.log(result);
        //   this.current_currency['name'] = result.name;
        //   this.current_currency['currencyID'] = result.currencyId;
        //   this.current_currency['id'] = result.id;
        //   this.current_currency['currencySymbol'] = result.currencySymbol;
        //   this.current_currency['flag'] = 'assets/flags100px/' + result.id.toLowerCase() + '.png';
        //
        // });
        // this.currencyProvider.getCurrencies().then((result1: any)=>{
        //   console.log(result1);
        //
        //   Object.keys(result1).forEach(key => {
        //     var val = result1[key];
        //
        //       var currency = {};
        //
        //       currency['name'] = result1[key].name;
        //       currency['currencyID'] = result1[key].currencyId;
        //       currency['id'] = result1.id;
        //       currency['currencySymbol'] = result1[key].currencySymbol;
        //       currency['flag'] = 'assets/flags100px/' + result1[key].id.toLowerCase() + '.png';
        //       this.currencies.push(currency);
        //   });
        // });
    }
    CurrencyComponent.prototype.valuChange = function (currency) {
        var _this = this;
        var s;
        switch (currency.currencyID) {
            case ('GHS'):
                if (localStorage.getItem('GHS_USD')) {
                    s = localStorage.getItem('GHS_USD');
                }
                else {
                    s = 0.22632115;
                }
                this.currencies[1].rate = Number((this.currencies[0].rate * parseFloat(s)).toFixed(3));
                if (localStorage.getItem('GHS_GBP')) {
                    s = localStorage.getItem('GHS_GBP');
                }
                else {
                    s = 0.17481295;
                }
                this.currencies[2].rate = Number((this.currencies[0].rate * parseFloat(s)).toFixed(3));
                this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=GHS_USD&compact=y')
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    // alert("GHS_USD");
                    s = parseFloat(data.GHS_USD.val);
                    localStorage.setItem('GHS_USD', s);
                    _this.currencies[1].rate = Number((_this.currencies[0].rate * s).toFixed(3));
                });
                this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=GHS_GBP&compact=y')
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    // alert(data.val);
                    s = parseFloat(data.GHS_GBP.val);
                    localStorage.setItem('GHS_GBP', s);
                    _this.currencies[2].rate = Number((_this.currencies[0].rate * s).toFixed(3));
                });
                break;
            case ('USD'):
                if (localStorage.getItem('USD_GHS')) {
                    s = localStorage.getItem('USD_GHS');
                }
                else {
                    s = 4.4185;
                }
                this.currencies[0].rate = Number((this.currencies[1].rate * parseFloat(s)).toFixed(3));
                if (localStorage.getItem('USD_GBP')) {
                    s = localStorage.getItem('USD_GBP');
                }
                else {
                    s = 0.77053475;
                }
                this.currencies[2].rate = Number((this.currencies[1].rate * parseFloat(s)).toFixed(3));
                this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=USD_GHS&compact=y')
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    // alert(data.val);
                    s = parseFloat(data.USD_GHS.val);
                    localStorage.setItem('USD_GHS', s);
                    _this.currencies[0].rate = Number((_this.currencies[1].rate * s).toFixed(3));
                });
                this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=USD_GBP&compact=y')
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    // alert(data.val);
                    s = parseFloat(data.USD_GBP.val);
                    localStorage.setItem('USD_GBP', s);
                    _this.currencies[2].rate = Number((_this.currencies[1].rate * s).toFixed(3));
                });
                break;
            case ('GBP'):
                if (localStorage.getItem('GBP_GHS')) {
                    s = localStorage.getItem('GBP_GHS');
                }
                else {
                    s = 5.7204;
                }
                this.currencies[0].rate = Number((this.currencies[2].rate * parseFloat(s)).toFixed(3));
                if (localStorage.getItem('GBP_USD')) {
                    s = localStorage.getItem('GBP_USD');
                }
                else {
                    s = 1.2978;
                }
                this.currencies[1].rate = Number((this.currencies[2].rate * parseFloat(s)).toFixed(3));
                this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=GBP_GHS&compact=y')
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    // alert(data.val);
                    s = parseFloat(data.GBP_USD.val);
                    localStorage.setItem('GBP_USD', s);
                    _this.currencies[0].rate = Number((_this.currencies[2].rate * s).toFixed(3));
                });
                this.http.get('http://free.currencyconverterapi.com/api/v3/convert?q=GBP_USD&compact=y')
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    // alert(data.val);
                    s = parseFloat(data.GBP_GHS.val);
                    localStorage.setItem('GBP_GHS', s);
                    _this.currencies[1].rate = Number((_this.currencies[2].rate * s).toFixed(3));
                });
                break;
            default:
                break;
        }
    };
    return CurrencyComponent;
}());
CurrencyComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-currency',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/currency/currency-component/currency.html"*/'<ion-header>\n  <ion-navbar  color="primary">\n	  <button ion-button menuToggle icon-only>\n		  <img src="assets/icon/menu-icon-dark.png">\n		  <!--<ion-icon name=\'menu\'></ion-icon>-->\n	  </button>\n      <ion-title>{{\'Currency Converter\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding >\n	<!--<ion-card>-->\n		<!--<ion-item class="current-currency">-->\n			<!--<ion-avatar item-left>-->\n				<!--<img src="{{current_currency.flag}}">-->\n			<!--</ion-avatar>-->\n			<!--<h2>{{current_currency.currencyID}}</h2>-->\n			<!--&lt;!&ndash;<p>{{current_currency.name}}</p>&ndash;&gt;-->\n			<!--<input value="sdgf">-->\n		<!--</ion-item>-->\n	<!--</ion-card>-->\n	<ion-list>\n		<ion-item *ngFor="let c of currencies" class="current-currency">\n			<ion-avatar item-left>\n				<img src="{{c.flag}}">\n			</ion-avatar>\n			<h2>{{c.currencyID}}</h2>\n			<input [value]="c.rate" (blur)="valuChange(c)" [(ngModel)]="c.rate">\n		</ion-item>\n	</ion-list>\n\n	<!--<ion-select>-->\n		<!--<ion-option *ngFor="let cc of currencyList" value="{{ cc }}">-->\n			<!--<span class=\'flag-icon flag-icon-{{ cc.slice(0, -1) }}\'></span>-->\n			<!--{{ cc }}-->\n		<!--</ion-option>-->\n	<!--</ion-select>-->\n\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/currency/currency-component/currency.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_global__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_5__providers_currency_provider_currecy_provider__["a" /* CurrencyProvider */]])
], CurrencyComponent);

//# sourceMappingURL=currency.component.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencyProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
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
 * Created by mac on 09/08/2017.
 */



var CurrencyProvider = (function () {
    function CurrencyProvider(http) {
        this.http = http;
        console.log('Hello Currency Provider');
        this.currencyDataJson = localStorage.getItem('Currencies');
        // this.http.get("assets/data/currencies.json")
        //     .map(res => {
        //         this.currencyDataJson = res.json();
        //     }).subscribe(data => {
        // }, (rej) => {
        //     console.error("Could not load local data",rej);
        // });
    }
    CurrencyProvider.prototype.getCurrencyByCurrencyID = function (currencyID) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("assets/data/currencies.json")
                .map(function (res) {
                _this.currencyDataJson = res.json();
                Object.keys(_this.currencyDataJson.results).forEach(function (key) {
                    var val = _this.currencyDataJson.results[key];
                    if (_this.currencyDataJson.results[key].currencyId === currencyID) {
                        console.log("Found.");
                        resolve(_this.currencyDataJson.results[key]);
                    }
                });
                // localStorage.setItem('Currencies', res.json().results);
            }).subscribe(function (data) {
            }, function (rej) {
                console.error("Could not load local data", rej);
            });
        });
    };
    CurrencyProvider.prototype.getCurrencyByCountryName = function (countryName) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("assets/data/currencies.json")
                .map(function (res) {
                _this.currencyDataJson = res.json();
                Object.keys(_this.currencyDataJson.results).forEach(function (key) {
                    var val = _this.currencyDataJson.results[key];
                    if (_this.currencyDataJson.results[key].name === countryName) {
                        console.log("Found.");
                        resolve(_this.currencyDataJson.results[key]);
                    }
                });
                // localStorage.setItem('Currencies', res.json().results);
            }).subscribe(function (data) {
            }, function (rej) {
                console.error("Could not load local data", rej);
            });
        });
    };
    CurrencyProvider.prototype.getCurrencies = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("assets/data/currencies.json")
                .map(function (res) {
                resolve(res.json().results);
            }).subscribe(function (data) {
            }, function (rej) {
                console.error("Could not load local data", rej);
            });
        });
    };
    return CurrencyProvider;
}());
CurrencyProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], CurrencyProvider);

//# sourceMappingURL=currecy-provider.js.map

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessNews; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wordpress_shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wordpress_wordpress_posts_wordpress_posts_component__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BusinessNews = (function () {
    function BusinessNews(wordpressService, navController, loadingController) {
        this.wordpressService = wordpressService;
        this.navController = navController;
        this.loadingController = loadingController;
    }
    BusinessNews.prototype.ngOnInit = function () {
        this.getCategory();
    };
    BusinessNews.prototype.getCategory = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.wordpressService.getCategories()
            .subscribe(function (result) {
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var cat = result_1[_i];
                if (cat.name == 'Business') {
                    _this.category = cat;
                }
            }
        }, function (error) { return console.log(error); }, function () { return loader.dismiss(); });
    };
    BusinessNews.prototype.loadCategory = function (category) {
        if (category) {
            this.navController.push(__WEBPACK_IMPORTED_MODULE_3__wordpress_wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */], {
                category: category
            });
        }
    };
    return BusinessNews;
}());
BusinessNews = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/business-news/business-news.html"*/'<ion-header>\n	<ion-navbar>\n		<button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>{{\'BUSINESS\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list>\n		<ion-item (click)="loadCategory(category)">\n			<ion-icon name="pricetags" item-left></ion-icon>\n			<h2>News</h2>\n			<!--<ion-badge item-right primary>{{category.count}}</ion-badge>-->\n		</ion-item>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/business-news/business-news.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__wordpress_shared_services_wordpress_service__["a" /* WordpressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__wordpress_shared_services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
], BusinessNews);

//# sourceMappingURL=business-news.component.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SportNews; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wordpress_shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wordpress_wordpress_posts_wordpress_posts_component__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SportNews = (function () {
    function SportNews(wordpressService, navController, loadingController) {
        this.wordpressService = wordpressService;
        this.navController = navController;
        this.loadingController = loadingController;
    }
    SportNews.prototype.ngOnInit = function () {
        this.getCategory();
    };
    SportNews.prototype.getCategory = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.wordpressService.getCategories()
            .subscribe(function (result) {
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var cat = result_1[_i];
                if (cat.name == 'Sport') {
                    _this.category = cat;
                }
            }
        }, function (error) { return console.log(error); }, function () { return loader.dismiss(); });
    };
    SportNews.prototype.loadCategory = function (category) {
        if (category) {
            this.navController.push(__WEBPACK_IMPORTED_MODULE_3__wordpress_wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */], {
                category: category
            });
        }
    };
    return SportNews;
}());
SportNews = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/sport-news/sport-news.html"*/'<ion-header>\n	<ion-navbar>\n		<button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>{{\'Sport\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list>\n		<ion-item (click)="loadCategory(category)">\n			<ion-icon name="pricetags" item-left></ion-icon>\n			<h2>News</h2>\n			<!--<ion-badge item-right primary>{{category.count}}</ion-badge>-->\n		</ion-item>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/sport-news/sport-news.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__wordpress_shared_services_wordpress_service__["a" /* WordpressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__wordpress_shared_services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
], SportNews);

//# sourceMappingURL=sport-news.component.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
/**
 * Created by mac on 15/07/2017.
 */
/**
 * Created by mac on 15/07/2017.
 */ var environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyAgaNFDAxJCpaBQJWnyoH0fU8cng0s3Wh4",
        authDomain: "ghinformer-9de48.firebaseapp.com",
        databaseURL: "https://ghinformer-9de48.firebaseio.com",
        projectId: "ghinformer-9de48",
        storageBucket: "ghinformer-9de48.appspot.com",
        messagingSenderId: "677137583283"
    },
    ads: {
        appid: 'ca-app-pub-8145684018864402/6762066392'
    }
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_rate__ = __webpack_require__(447);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
 Generated class for the RatingProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var RatingProvider = (function () {
    function RatingProvider(http, _RATE) {
        this.http = http;
        this._RATE = _RATE;
        console.log('Hello RatingProvider Provider');
        this._RATE.preferences = {
            displayAppName: 'GH informer',
            storeAppURL: {
                ios: "com.ghananews.sarchitech",
                android: 'market://details?id=com.ghananews.sarchitech'
            }
        };
    }
    RatingProvider.prototype.requestRating = function () {
        // alert('start');
        this._RATE.promptForRating(true);
    };
    return RatingProvider;
}());
RatingProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_rate__["a" /* AppRate */]])
], RatingProvider);

//# sourceMappingURL=rating.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(509);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_admob_free__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_admob__ = __webpack_require__(617);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_geocoder__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_global__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home_module__ = __webpack_require__(632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs_module__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_google_maps_google_maps_module__ = __webpack_require__(681);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_wordpress_wordpress_module__ = __webpack_require__(687);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_slides_slides_module__ = __webpack_require__(689);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_grid_grid_module__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_settings_settings_module__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_feeds_feeds_module__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_youtube_youtube_module__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_about_about_module__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_contact_contact_module__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_datetime_datetime_module__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_ranges_ranges_module__ = __webpack_require__(699);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_action_sheet_action_sheet_module__ = __webpack_require__(701);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_facebook_connect_facebook_connect_module__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_login_login_module__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_charts_charts_module__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_firebase_firebase_module__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_weather_weather_module__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_signup_signup_module__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_password_reset_password_reset_module__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_weather_city_weather_city_weather_module__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_weather_home_weather_home_weather_module__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_weather_location_location_module__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_weather_settings_settings_module__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_weather_tabs_tabs_module__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_weather_weather_detail_weather_detail_module__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_weather_world_city_list_world_city_list_module__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_daily_scripture_daily_scripture_module__ = __webpack_require__(708);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_currency_currency_module__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_feedback_feedback_module__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__services_sentry_errorhandler__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__components_loading_modal_loading_modal_module__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__components_likepopover_likepopover_module__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_business_news_business_news_module__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_sport_news_sport_news_module__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_profile_profile_one_profile_one_module__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_profile_profile_settings_profile_settings_module__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_profile_profile_module__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_placeholder_placeholder_module__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__components_components_module__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_weather_directives_directives_module__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__app_component__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__providers_weather_service_weather_service__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__providers_geocode_service_geocode_service__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_wordpress_shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__providers_auth_auth__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__providers_currency_provider_currecy_provider__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__providers_util_alert_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__providers_util_toast_service__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__providers_network_network__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__environments_environment__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__providers_firebase_use_firebase_use__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__providers_weather_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__providers_analytics_analytics__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__providers_messaging_messaging__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__providers_preloader_preloader__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__providers_utilities_utilities__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__providers_validation_validation__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__providers_rating_rating__ = __webpack_require__(493);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








// import { Push } from '@ionic-native/push';
// import {
//   Push,
//   PushToken
// } from '@ionic/cloud-angular';


































// import {  PopOverSharePageModule } from '../pages/pop-over-share/pop-over-share.module';







// Module Example: Use the PlaceholderModule for any new App Module





















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_51__app_component__["a" /* MyApp */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_51__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/password-reset/password-reset.module#PasswordResetPageModule', name: 'PasswordResetPage', segment: 'password-reset', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../components/loading-modal/loading-modal.module#LoadingModalModule', name: 'LoadingModal', segment: 'loading-modal', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profile/profile.module#ProfileListPageModule', name: 'ProfileListPage', segment: 'profile', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/feedback/feedback.module#FeedbackPageModule', name: 'app-feedback', segment: 'feedback', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/weather/home-weather/home-weather.module#HomeWeatherPageModule', name: 'HomeWeatherPage', segment: 'home-weather', priority: 'high', defaultHistory: [] },
                    { loadChildren: '../pages/weather/location/location.module#LocationPageModule', name: 'LocationPage', segment: 'location', priority: 'high', defaultHistory: [] },
                    { loadChildren: '../pages/weather/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/weather/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'high', defaultHistory: [] },
                    { loadChildren: '../pages/weather/weather-detail/weather-detail.module#WeatherDetailPageModule', name: 'WeatherDetailPage', segment: 'weather-detail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/weather/world-city-list/world-city-list.module#WorldCityListPageModule', name: 'WorldCityListPage', segment: 'world-city-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/weather/city-weather/city-weather.module#CityWeatherPageModule', name: 'CityWeatherPage', segment: 'city-weather', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profile/profile-one/profile-one.module#ProfileOnePageModule', name: 'ProfileOnePage', segment: 'profile-one', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profile/profile-settings/profile-settings.module#ProfileSettingsPageModule', name: 'ProfileSettingsPage', segment: 'profile-settings', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/pop-over-share/pop-over-share.module#PopOverSharePageModule', name: 'PopOverSharePage', segment: 'pop-over-share', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_9__pages_home_home_module__["a" /* HomeModule */],
            __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs_module__["a" /* TabsModule */],
            __WEBPACK_IMPORTED_MODULE_11__pages_google_maps_google_maps_module__["a" /* GoogleMapsModule */],
            __WEBPACK_IMPORTED_MODULE_12__pages_wordpress_wordpress_module__["a" /* WordpressModule */],
            __WEBPACK_IMPORTED_MODULE_13__pages_slides_slides_module__["a" /* SlidesModule */],
            __WEBPACK_IMPORTED_MODULE_14__pages_grid_grid_module__["a" /* GridModule */],
            __WEBPACK_IMPORTED_MODULE_15__pages_settings_settings_module__["a" /* SettingsModule */],
            __WEBPACK_IMPORTED_MODULE_16__pages_feeds_feeds_module__["a" /* FeedsModule */],
            __WEBPACK_IMPORTED_MODULE_17__pages_youtube_youtube_module__["a" /* YoutubeModule */],
            __WEBPACK_IMPORTED_MODULE_18__pages_about_about_module__["a" /* AboutModule */],
            __WEBPACK_IMPORTED_MODULE_19__pages_contact_contact_module__["a" /* ContactModule */],
            __WEBPACK_IMPORTED_MODULE_20__pages_datetime_datetime_module__["a" /* DatetimeModule */],
            __WEBPACK_IMPORTED_MODULE_21__pages_ranges_ranges_module__["a" /* RangesModule */],
            __WEBPACK_IMPORTED_MODULE_22__pages_action_sheet_action_sheet_module__["a" /* ActionSheetModule */],
            __WEBPACK_IMPORTED_MODULE_23__pages_facebook_connect_facebook_connect_module__["a" /* FacebookConnectModule */],
            __WEBPACK_IMPORTED_MODULE_24__pages_login_login_module__["LoginPageModule"],
            __WEBPACK_IMPORTED_MODULE_25__pages_charts_charts_module__["a" /* ChartsModule */],
            __WEBPACK_IMPORTED_MODULE_26__pages_firebase_firebase_module__["a" /* FirebaseModule */],
            __WEBPACK_IMPORTED_MODULE_48__pages_placeholder_placeholder_module__["a" /* PlaceholderModule */],
            __WEBPACK_IMPORTED_MODULE_27__pages_weather_weather_module__["a" /* WeatherModule */],
            __WEBPACK_IMPORTED_MODULE_43__pages_business_news_business_news_module__["a" /* BusinessNewsModule */],
            __WEBPACK_IMPORTED_MODULE_41__components_loading_modal_loading_modal_module__["LoadingModalModule"],
            __WEBPACK_IMPORTED_MODULE_44__pages_sport_news_sport_news_module__["a" /* SportNewsModule */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_60__environments_environment__["a" /* environment */].firebase),
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_28__pages_signup_signup_module__["SignupPageModule"],
            __WEBPACK_IMPORTED_MODULE_29__pages_password_reset_password_reset_module__["PasswordResetPageModule"],
            __WEBPACK_IMPORTED_MODULE_45__pages_profile_profile_one_profile_one_module__["ProfileOnePageModule"],
            __WEBPACK_IMPORTED_MODULE_46__pages_profile_profile_settings_profile_settings_module__["ProfileSettingsPageModule"],
            __WEBPACK_IMPORTED_MODULE_47__pages_profile_profile_module__["ProfileListPageModule"],
            __WEBPACK_IMPORTED_MODULE_42__components_likepopover_likepopover_module__["a" /* LikepopoverModule */],
            __WEBPACK_IMPORTED_MODULE_49__components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_30__pages_weather_city_weather_city_weather_module__["CityWeatherPageModule"],
            __WEBPACK_IMPORTED_MODULE_31__pages_weather_home_weather_home_weather_module__["HomeWeatherPageModule"],
            __WEBPACK_IMPORTED_MODULE_32__pages_weather_location_location_module__["LocationPageModule"],
            __WEBPACK_IMPORTED_MODULE_33__pages_weather_settings_settings_module__["SettingsPageModule"],
            __WEBPACK_IMPORTED_MODULE_34__pages_weather_tabs_tabs_module__["TabsPageModule"],
            __WEBPACK_IMPORTED_MODULE_35__pages_weather_weather_detail_weather_detail_module__["WeatherDetailPageModule"],
            __WEBPACK_IMPORTED_MODULE_36__pages_weather_world_city_list_world_city_list_module__["WorldCityListPageModule"],
            __WEBPACK_IMPORTED_MODULE_50__pages_weather_directives_directives_module__["a" /* DirectivesModule */],
            __WEBPACK_IMPORTED_MODULE_37__pages_daily_scripture_daily_scripture_module__["a" /* DailyScriptureModule */],
            __WEBPACK_IMPORTED_MODULE_38__pages_currency_currency_module__["a" /* CurrencyModule */],
            __WEBPACK_IMPORTED_MODULE_39__pages_feedback_feedback_module__["FeedbackPageModule"],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_51__app_component__["a" /* MyApp */]
        ],
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_40__services_sentry_errorhandler__["a" /* SentryErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_52__providers_weather_service_weather_service__["a" /* WeatherServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_53__providers_geocode_service_geocode_service__["a" /* GeocodeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_54__pages_wordpress_shared_services_wordpress_service__["a" /* WordpressService */],
            __WEBPACK_IMPORTED_MODULE_55__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_61__providers_firebase_use_firebase_use__["a" /* FirebaseUseProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_admob_free__["a" /* AdMobFree */],
            __WEBPACK_IMPORTED_MODULE_56__providers_currency_provider_currecy_provider__["a" /* CurrencyProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_admob__["a" /* AdMob */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
            // Push,
            __WEBPACK_IMPORTED_MODULE_7__app_global__["a" /* AppState */],
            __WEBPACK_IMPORTED_MODULE_57__providers_util_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_58__providers_util_toast_service__["a" /* ToastService */],
            __WEBPACK_IMPORTED_MODULE_62__providers_weather_service__["i" /* Sql */],
            __WEBPACK_IMPORTED_MODULE_62__providers_weather_service__["c" /* DatabaseService */],
            __WEBPACK_IMPORTED_MODULE_62__providers_weather_service__["j" /* UtilService */],
            __WEBPACK_IMPORTED_MODULE_62__providers_weather_service__["d" /* ForecastService */],
            __WEBPACK_IMPORTED_MODULE_59__providers_network_network__["a" /* NetworkProvider */],
            __WEBPACK_IMPORTED_MODULE_63__providers_analytics_analytics__["a" /* AnalyticsProvider */],
            __WEBPACK_IMPORTED_MODULE_64__providers_messaging_messaging__["a" /* MessagingProvider */],
            __WEBPACK_IMPORTED_MODULE_65__providers_preloader_preloader__["a" /* PreloaderProvider */],
            __WEBPACK_IMPORTED_MODULE_66__providers_utilities_utilities__["a" /* UtilitiesProvider */],
            __WEBPACK_IMPORTED_MODULE_67__providers_validation_validation__["a" /* ValidationProvider */],
            __WEBPACK_IMPORTED_MODULE_68__providers_rating_rating__["a" /* RatingProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_email__ = __webpack_require__(140);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupPage = (function () {
    function SignupPage(viewCtrl, navCtrl, loadingCtrl, alertCtrl, formBuilder, authProvider) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.authProvider = authProvider;
        this.signupForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validators_email__["a" /* EmailValidator */].isValid])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    SignupPage.prototype.signupUser = function () {
        //   if (!this.signupForm.valid){
        //     console.log(this.signupForm.value);
        //   } else {
        //     this.authProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password)
        //     .then(() => {
        //       this.loading.dismiss().then( () => {
        //         let data = { 'email': this.signupForm.value.email};
        //         this.viewCtrl.dismiss(data);
        //       });
        //     }, (error) => {
        //       this.loading.dismiss().then( () => {
        //         var errorMessage: string = error.message;
        //         let alert = this.alertCtrl.create({
        //           message: errorMessage,
        //           buttons: [{ text: "Ok", role: 'cancel' }]
        //         });
        //         alert.present();
        //       });
        //     });
        //
        //     this.loading = this.loadingCtrl.create();
        //     this.loading.present();
        //   }
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-signup',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/signup/signup.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Create an Account\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="signup">\n  <!--<img src="http://placehold.it/300x100">-->\n  <form [formGroup]="signupForm" (submit)="signupUser()" novalidate>\n\n    <ion-item>\n      <ion-label stacked>Email</ion-label>\n      <ion-input formControlName="email" type="email" placeholder="Your email address"\n        [class.invalid]="!signupForm.controls.email.valid && signupForm.controls.email.dirty"></ion-input>\n    </ion-item>\n    <ion-item class="error-message" *ngIf="!signupForm.controls.email.valid  && signupForm.controls.email.dirty">\n      <p>Please enter a valid email.</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>Password</ion-label>\n      <ion-input formControlName="password" type="password" placeholder="Your password"\n        [class.invalid]="!signupForm.controls.password.valid && signupForm.controls.password.dirty"></ion-input>\n    </ion-item>\n    <ion-item class="error-message" *ngIf="!signupForm.controls.password.valid  && signupForm.controls.password.dirty">\n      <p>Your password needs more than 6 characters.</p>\n    </ion-item>\n\n    <button ion-button block type="submit">\n      Create an Account\n    </button>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/signup/signup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forecast_service__ = __webpack_require__(581);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__forecast_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_service__ = __webpack_require__(584);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_1__util_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__database_service__ = __webpack_require__(281);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__database_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql__ = __webpack_require__(282);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_3__sql__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model__ = __webpack_require__(149);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__model__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__model__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__model__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_4__model__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_4__model__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants__ = __webpack_require__(283);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__constants__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__constants__["b"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressPost; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_global__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_firebase_use_firebase_use__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var WordpressPost = (function () {
    function WordpressPost(navParams, http, wordpressService, loadingController, iab, socialSharing, firebaseUseProvider, navCtrl, alertCtrl, modalCtrl, toastController, storage, global, afAuth) {
        var _this = this;
        this.navParams = navParams;
        this.http = http;
        this.wordpressService = wordpressService;
        this.loadingController = loadingController;
        this.iab = iab;
        this.socialSharing = socialSharing;
        this.firebaseUseProvider = firebaseUseProvider;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.toastController = toastController;
        this.storage = storage;
        this.global = global;
        this.afAuth = afAuth;
        this.commentData = [];
        this.postBrnStr = 'POST COMMENT';
        this.author_name = '';
        this.content = '';
        if (navParams.get('post')) {
            this.post = navParams.get('post');
            if (this.post) {
                this.currentPostDate = this.post.date.split('T')[0];
            }
            this.current_id = String(this.post.id);
            // this.authorData = this.post["_embedded"].author[0];
            this.getCommentDataByID();
            // if(this.post["_embedded"].replies) {
            //  	this.comments = this.post["_embedded"].replies[0];
            // }
        }
        this.favoritePosts = [];
        this.storage.get('wordpress.favorite')
            .then(function (data) {
            if (data) {
                _this.favoritePosts = JSON.parse(data);
            }
        });
        if (navParams.get('id')) {
            this.getPost(navParams.get('id'));
        }
        var unsubscribe = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.auth().onAuthStateChanged(function (user) {
            if (!user) {
                _this.postBrnStr = 'LOG IN';
                unsubscribe();
            }
            else {
                if (localStorage.getItem('isLogin') == 'true') {
                    unsubscribe();
                }
                else {
                    _this.postBrnStr = 'LOG IN';
                    unsubscribe();
                }
            }
        });
    }
    WordpressPost.prototype.getCommentDataByID = function () {
        var _this = this;
        if (this.firebaseUseProvider.getCommentData(this.current_id)) {
            this.firebaseUseProvider.getCommentData(this.current_id).subscribe(function (snapshots) {
                _this.commentData = [];
                for (var _i = 0, snapshots_1 = snapshots; _i < snapshots_1.length; _i++) {
                    var obj = snapshots_1[_i];
                    var obj1 = obj;
                    // if (obj1.comment_post_ID == this.current_id) {
                    // 	this.commentData.push({'author': obj1.author, 'comment': obj1.comment});
                    // }
                    if (obj1.A.k.ba.value.B == _this.current_id) {
                        _this.commentData.push({ 'author': obj1.A.k.ba.left.left.value.B, 'comment': obj1.A.k.ba.left.value.B });
                    }
                }
                // snapshots.forEach(snapshot1 => {
                // 	var snapshot :any = snapshot1;
                // 	var item = snapshot.val();
                // 	if (item.comment_post_ID == this.current_id) {
                // 		this.commentData.push({'author': item.author, 'comment': item.comment});
                // 	}
                // 	console.log(snapshot.key, snapshot.val());
                // });
            });
        }
    };
    WordpressPost.prototype.getPost = function (id) {
        // let loader = this.loadingController.create({
        // 	content: "Please wait"
        // });
        var _this = this;
        // loader.present();
        this.isBusy = true;
        this.wordpressService.getPost(id)
            .subscribe(function (result) {
            _this.post = result;
            if (_this.post) {
                _this.currentPostDate = _this.post.date.split('T')[0];
            }
            // this.authorData = this.post["_embedded"].author[0];
            _this.getCommentDataByID();
            // if(this.post["_embedded"].replies) {
            //  	this.comments = this.post["_embedded"].replies[0];
            // }
        }, function (error) { return console.log(error); }, function () { return _this.isBusy = false; });
    };
    WordpressPost.prototype.previewPost = function () {
        var browser = this.iab.create(this.post.link, '_blank');
        browser.show();
    };
    WordpressPost.prototype.sharePost = function () {
        var subject = this.post.title.rendered;
        var message = this.post.content.rendered;
        message = message.replace(/(<([^>]+)>)/ig, "");
        var url = this.post.link;
        this.socialSharing.share(message, subject, '', url);
    };
    WordpressPost.prototype.postComment = function () {
        var _this = this;
        // let loader = this.loadingController.create({
        // 	content: "Please wait"
        // });
        this.isBusy = true;
        console.log("post comment");
        this.wordpressService.postComment({ 'comment': 'test comment', 'comment_post_ID': 146, '_wp_unfiltered_html_comment': 'b1b82053ab', 'comment_parent': 0 })
            .subscribe(function (result) {
            _this.post = result;
            if (_this.post) {
                _this.currentPostDate = _this.post.date.split('T')[0];
            }
            // this.authorData = this.post["_embedded"].author[0];
            _this.getCommentDataByID();
            // if(this.post["_embedded"].replies) {
            // 	this.comments = this.post["_embedded"].replies[0];
            // }
        }, function (error) { return console.log(error); }, function () { return _this.isBusy = false; });
    };
    WordpressPost.prototype.doComment = function (value, event) {
        // var data = {'post_id':this.post.id.toLocaleString(),
        // 			'author_name':value.author_name,
        // 			'author_email': value.author_email,
        // 			'comment': value.content};
        // this.firebaseUseProvider.commentData.push(data);
        var _this = this;
        // this.http.post(this.post._links.replies[0].href, value).subscribe( data =>{
        // 	console.log("success comment");
        // });
        // const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        var user = this.afAuth.auth.currentUser;
        if (this.postBrnStr == 'LOG IN') {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */]);
            modal.onDidDismiss(function (val) {
                if (val.login_status == 'true') {
                    _this.postBrnStr = 'POST COMMENT';
                    _this.getCommentDataByID();
                    // var data = {'comment_post_ID': this.post.id,
                    // 	'comment_parent': '0',
                    // 	'author': value.author_name,
                    // 	'email': val.email,
                    // 	'comment': value.content};
                    // this.commentData.push({'author': value.author_name, 'comment': value.content});
                    // this.firebaseUseProvider.saveCommentData(data);
                    // this.http.post('http://scraper.sarchitech.com/wp-comments-post.php', data).subscribe( data =>{
                    // 	console.log("success comment");
                    // });
                }
            });
            modal.present();
            // let alert = this.alertCtrl.create({
            // 	title: 'Information',
            // 	message: 'You can not comment. Please signin firstly.',
            // 	buttons:[
            // 		{
            // 			text: 'OK',
            // 			handler: data => {
            // 				// unsubscribe();
            // 				let modal = this.modalCtrl.create(LoginPage);
            // 				modal.onDidDismiss(val => {
            // 					if(val.login_status == 'true'){
            // 						var data = {'comment_post_ID': this.post.id,
            // 							'comment_parent': '0',
            // 							'author': value.author_name,
            // 							'email': val.email,
            // 							'comment': value.content};
            // 						this.commentData.push({'author': value.author_name, 'comment': value.content});
            // 						this.firebaseUseProvider.saveCommentData(data);
            // 						// this.http.post('http://scraper.sarchitech.com/wp-comments-post.php', data).subscribe( data =>{
            // 						// 	console.log("success comment");
            // 						// });
            // 					}
            //
            // 				});
            // 				modal.present();
            // 			}
            // 		},
            // 		{
            // 			text: 'CANCEL',
            // 			role: 'cancel',
            // 			handler: () => {
            // 				// confirm.dismiss().then(() => {
            // 				//
            // 				// });
            // 			}
            //
            // 		}
            // 	]
            // });
            // alert.present();
        }
        else {
            var author = localStorage.getItem('currentUser');
            var data = { 'comment_post_ID': this.post.id,
                'comment_parent': '0',
                'author': author,
                'email': user.email,
                'comment': value.content };
            this.firebaseUseProvider.saveCommentData(data).then(function (result) {
                if (result) {
                    // this.commentData.push({'author': value.author_name, 'comment': value.content});
                    _this.author_name = '';
                    _this.content = '';
                }
                else {
                }
            });
            // this.http.post('http://scraper.sarchitech.com/wp-comments-post.php', data).subscribe( data =>{
            // 	console.log("success comment");
            // });
        }
        // });
    };
    WordpressPost.prototype.favoritePost = function (post) {
        var newPost = true;
        var message;
        this.favoritePosts.forEach(function (favPost) {
            if (JSON.stringify(favPost) === JSON.stringify(post)) {
                newPost = false;
            }
        });
        if (newPost) {
            this.favoritePosts.push(post);
            this.storage.set('wordpress.favorite', JSON.stringify(this.favoritePosts));
            message = "This post has been saved to your list";
        }
        else {
            message = "This post is already in your list";
        }
        var toast = this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    };
    return WordpressPost;
}());
WordpressPost = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-wordpress-post',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-post/wordpress-post.html"*/'<ion-header>\n	<ion-navbar  color="primary">\n		<button menuToggle>\n			<img src="assets/icon/menu-icon-dark.png">\n			<!--<ion-icon name="menu"></ion-icon>-->\n		</button>\n		<ion-title *ngIf="post">{{post.title.rendered}}</ion-title>\n		<ion-buttons end>\n	      <button (tap)="sharePost()" ion-button icon-only>\n	        <ion-icon name="share"></ion-icon>\n	      </button>\n	    </ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<!--<ion-content class="post">-->\n	<!--<div class="container" *ngIf="isBusy">-->\n		<!--<div class="spinner">-->\n			<!--<div class="backdrop"></div>-->\n			<!--<p>&#9733;</p>-->\n		<!--</div>-->\n		<!--<p text-center="true">Loading...</p>-->\n	<!--</div>-->\n  <!--<ion-list *ngIf="post">-->\n    <!--<ion-card>-->\n        <!--<ion-item text-wrap>-->\n            <!--<h1 [innerHTML]="post.title.rendered"></h1>-->\n        <!--</ion-item>-->\n        <!--<wordpress-feature-media *ngIf="post.featured_media" [id]="post.featured_media"></wordpress-feature-media>-->\n    <!--</ion-card>-->\n\n    <!--<ion-card text-wrap *ngIf="post.content.rendered">-->\n        <!--<p padding [innerHtml]="post.content.rendered"></p>-->\n		<!--<p text-right style="color: blue;margin-right: 5px;">{{currentPostDate}}</p>-->\n    <!--</ion-card>-->\n\n	<!--&lt;!&ndash;<button ion-button full (click)=previewPost()>Preview</button>&ndash;&gt;-->\n\n	<!--<ion-list> &lt;!&ndash;*ngIf="comments">&ndash;&gt;-->\n	  <!--<ion-item-divider light>Comments</ion-item-divider>-->\n	  <!--<ion-item text-wrap *ngFor="let comment of commentData">-->\n			<!--<ion-label>{{comment.author}}</ion-label>-->\n			<!--<ion-label>{{comment.comment}}</ion-label>-->\n	  <!--</ion-item>-->\n\n		<!--<ion-card>-->\n			<!--<form #f="ngForm">-->\n				<!--<ion-item>-->\n					<!--<ion-label floating>Name</ion-label>-->\n					<!--<ion-input-->\n							<!--[(ngModel)]="author_name"-->\n							<!--name="author_name"-->\n							<!--type="text"-->\n							<!--required-->\n					<!--&gt;</ion-input>-->\n				<!--</ion-item>-->\n				<!--&lt;!&ndash;<ion-item>&ndash;&gt;-->\n					<!--&lt;!&ndash;<ion-label floating>Email</ion-label>&ndash;&gt;-->\n					<!--&lt;!&ndash;<ion-input&ndash;&gt;-->\n							<!--&lt;!&ndash;[(ngModel)]="author_email"&ndash;&gt;-->\n							<!--&lt;!&ndash;name="author_email"&ndash;&gt;-->\n							<!--&lt;!&ndash;type="text"&ndash;&gt;-->\n							<!--&lt;!&ndash;required&ndash;&gt;-->\n					<!--&lt;!&ndash;&gt;</ion-input>&ndash;&gt;-->\n				<!--&lt;!&ndash;</ion-item>&ndash;&gt;-->\n				<!--<ion-item>-->\n					<!--<ion-label floating>Content</ion-label>-->\n					<!--<ion-textarea-->\n							<!--[(ngModel)]="content"-->\n							<!--name="content"-->\n							<!--required-->\n					<!--&gt;</ion-textarea>-->\n				<!--</ion-item>-->\n				<!--<button-->\n						<!--ion-button-->\n						<!--type="submit"-->\n						<!--full-->\n						<!--[disabled]="f.valid === false"-->\n						<!--(click)="doComment(f.value,$event)"-->\n				<!--&gt;POST COMMENT</button>-->\n			<!--</form>-->\n		<!--</ion-card>-->\n	<!--</ion-list>-->\n\n  <!--</ion-list>-->\n<!--</ion-content>-->\n\n\n<ion-content class="post">\n	<div class="container" *ngIf="isBusy">\n		<div class="spinner">\n			<div class="backdrop"></div>\n			<p>&#9733;</p>\n		</div>\n		<p text-center="true">Loading...</p>\n	</div>\n\n\n\n	<div class="card-background-page" *ngIf="post">\n		<ion-card>\n			<wordpress-feature-media *ngIf="post.featured_media" [id]="post.featured_media"></wordpress-feature-media>\n			<ion-grid class="card-subtitle row">\n				<!--<ion-row class="detialsPage">-->\n					<!--<ion-col width-25>-->\n						<!--<button clear  icon-left ion-button class="col" (click)="favoritePost(post)">-->\n							<!--<ion-icon name="heart" ></ion-icon>-->\n						<!--</button>-->\n					<!--</ion-col>-->\n					<!--<ion-col width-25>-->\n						<!--<button clear  icon-left ion-button class="col" class="active" >-->\n							<!--<ion-icon name="ios-add-circle" ></ion-icon>-->\n						<!--</button>-->\n					<!--</ion-col>-->\n					<!--<ion-col width-25>-->\n						<!--<button clear  icon-left ion-button class="col" >-->\n							<!--<ion-icon name="md-refresh" ></ion-icon>-->\n						<!--</button>-->\n					<!--</ion-col>-->\n					<!--<ion-col width-25>-->\n						<!--<button clear  icon-left ion-button class="col" >-->\n							<!--<ion-icon name="md-share" ></ion-icon>-->\n						<!--</button>-->\n					<!--</ion-col>-->\n				<!--</ion-row>-->\n			</ion-grid>\n		</ion-card>\n	</div>\n\n\n	<div class="newsDetails" *ngIf="post">\n		<ion-card class="{{global.state[\'theme\']}}">\n			<ion-card-header [innerHTML]="post.title.rendered">\n			</ion-card-header>\n			<span>{{currentPostDate}}</span>\n			<ion-card-content>\n				<p padding [innerHTML]="post.content.rendered"></p>\n			</ion-card-content>\n		</ion-card>\n\n\n		<ion-list> <!--*ngIf="comments">-->\n			<ion-item-divider light>Comments</ion-item-divider>\n			<ion-item text-wrap *ngFor="let comment of commentData">\n				<ion-label style="color:blue;">{{comment.author}}</ion-label>\n				<ion-label>{{comment.comment}}</ion-label>\n			</ion-item>\n\n			<ion-card>\n				<form #f="ngForm">\n					<!--<ion-item>-->\n						<!--<ion-label floating>Name</ion-label>-->\n						<!--<ion-input-->\n								<!--[(ngModel)]="author_name"-->\n								<!--name="author_name"-->\n								<!--type="text"-->\n								<!--required-->\n						<!--&gt;</ion-input>-->\n					<!--</ion-item>-->\n					<!--<ion-item>-->\n					<!--<ion-label floating>Email</ion-label>-->\n					<!--<ion-input-->\n					<!--[(ngModel)]="author_email"-->\n					<!--name="author_email"-->\n					<!--type="text"-->\n					<!--required-->\n					<!--&gt;</ion-input>-->\n					<!--</ion-item>-->\n					<ion-item>\n						<ion-label floating>Content</ion-label>\n						<ion-textarea\n								[(ngModel)]="content"\n								name="content"\n								required\n						></ion-textarea>\n					</ion-item>\n					<button\n							ion-button\n							type="submit"\n							full\n							[disabled]="f.valid === false && postBrnStr == \'POST COMMENT\'"\n							(click)="doComment(f.value,$event)"\n					>{{postBrnStr}}</button>\n					<ion-label  *ngIf="postBrnStr != \'POST COMMENT\'">* Plese log in to post comment.</ion-label>\n				</form>\n			</ion-card>\n		</ion-list>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-post/wordpress-post.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_10__shared_services_wordpress_service__["a" /* WordpressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_10__shared_services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */],
        __WEBPACK_IMPORTED_MODULE_9__providers_firebase_use_firebase_use__["a" /* FirebaseUseProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6__app_app_global__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */]])
], WordpressPost);

//# sourceMappingURL=wordpress-post.component.js.map

/***/ }),

/***/ 580:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeWeatherPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { Geolocation } from '@ionic-native/geolocation';
var HomeWeatherPage = (function () {
    // location: Location;
    function HomeWeatherPage(databaseService, modalCtrl) {
        this.databaseService = databaseService;
        this.modalCtrl = modalCtrl;
        this.location = {};
        this.onInitEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onDestroyEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    HomeWeatherPage.prototype.ionViewWillEnter = function () {
        var self = this;
        // this.geolocation.getCurrentPosition().then(pos => {
        //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        //   self.location['lat'] = pos.coords.latitude;
        //   self.location['lng'] = pos.coords.longitude;
        self.location['name'] = '';
        //   self.emitInit();
        // });
        self.emitInit();
    };
    HomeWeatherPage.prototype.emitInit = function () {
        if (this.onInitEmitter) {
            this.onInitEmitter.emit('');
        }
    };
    HomeWeatherPage.prototype.ionViewWillLeave = function () {
        if (this.onDestroyEmitter) {
            this.onDestroyEmitter.emit('');
        }
    };
    return HomeWeatherPage;
}());
HomeWeatherPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])({
        priority: 'high'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home-weather',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/home-weather/home-weather.html"*/'<!--suppress ALL -->\n<ion-header>\n  <ion-navbar>\n    <ion-buttons start menuToggle clear>\n      <button ion-button  clear>\n        <img src="assets/icon/menu-icon-default.png">\n      </button>\n    </ion-buttons>\n    <!--<button menuToggle>-->\n      <!--<img src="assets/icon/menu-icon-default.png">-->\n    <!--</button>-->\n    <ion-title>Current Location Weather</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <weather-list [location]="location" *ngIf="location"\n                [onInitEmitter]="onInitEmitter"\n                [onDestroyEmitter]="onDestroyEmitter"></weather-list>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/home-weather/home-weather.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["c" /* DatabaseService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */]])
], HomeWeatherPage);

//# sourceMappingURL=home-weather.js.map

/***/ }),

/***/ 581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForecastService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__database_service__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ForecastService = (function () {
    function ForecastService(jsonp, databaseService) {
        this.jsonp = jsonp;
        this.databaseService = databaseService;
    }
    ForecastService.prototype.getForecast = function (location, cacheOnly) {
        if (cacheOnly === void 0) { cacheOnly = false; }
        var self = this;
        var emitterForecast = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        self.databaseService.getForecast(location.name)
            .then(function (data) {
            if (__WEBPACK_IMPORTED_MODULE_8_lodash__["isEmpty"](data) || !data.lastUpdated || __WEBPACK_IMPORTED_MODULE_8_lodash__["isEmpty"](data.forecast)) {
                throw new Error('Invalid database forecast, fallback to server > ' + location.name);
            }
            else {
                console.debug('getting forecast data from DATABASE');
                emitterForecast.emit(data.forecast);
                if (Date.now() - data.lastUpdated > __WEBPACK_IMPORTED_MODULE_7__constants__["d" /* REFRESH_THRESHOLD */]) {
                    throw new Error('Outdated database forecast, refreshing from server > ' + location.name);
                }
            }
        })
            .catch(function (err) {
            if (err && err.message) {
                console.error(err.message);
            }
            if (cacheOnly) {
                console.debug('Cache only flag > not refreshing from server > ' + location.name);
            }
            else {
                self.getServerData(location, emitterForecast);
            }
        });
        return emitterForecast;
    };
    ForecastService.prototype.getServerData = function (location, emitterForecast) {
        console.debug('getting forecast data from SERVER');
        var self = this;
        self.jsonp.get(self.getRequestUri(location))
            .map(function (res) { return res.json(); })
            .catch(self.handleError)
            .subscribe(function (data) {
            emitterForecast.emit(data);
            self.databaseService.addForecast(location.name, data);
        });
    };
    ForecastService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    ForecastService.prototype.getRequestUri = function (location) {
        console.log(__WEBPACK_IMPORTED_MODULE_7__constants__["c" /* FORECAST_CONFIG */].API_ENDPOINT + __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* FORECAST_CONFIG */].API_KEY + '/' + location.lat + ',' + location.lng
            + '?units=us&lang=en&exclude=currently,minutely,alerts,flags&callback=JSONP_CALLBACK');
        return __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* FORECAST_CONFIG */].API_ENDPOINT + __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* FORECAST_CONFIG */].API_KEY + '/' + location.lat + ',' + location.lng
            + '?units=us&lang=en&exclude=currently,minutely,alerts,flags&callback=JSONP_CALLBACK';
    };
    return ForecastService;
}());
ForecastService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Jsonp */],
        __WEBPACK_IMPORTED_MODULE_6__database_service__["a" /* DatabaseService */]])
], ForecastService);

//# sourceMappingURL=forecast.service.js.map

/***/ }),

/***/ 584:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment_timezone__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment_timezone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment_timezone__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UtilService = (function () {
    function UtilService(toastCtrl) {
        this.toastCtrl = toastCtrl;
        this.tabChangeEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    UtilService.prototype.getStandardDay = function (epoch, tz) {
        var pattern = 'dddd, MMM D';
        return epoch ? this.formatEpoch(epoch, pattern, tz) : null;
    };
    UtilService.prototype.getCalendarDay = function (epoch, tz) {
        if (!epoch) {
            return null;
        }
        return __WEBPACK_IMPORTED_MODULE_3_moment___default()(epoch * 1000).tz(tz).calendar(null, {
            sameDay: '[Today], MMM D',
            nextDay: '[Tomorrow], MMM D',
            nextWeek: 'dddd, MMM D',
            lastDay: '[Yesterday], MMM D',
            lastWeek: '[Last] dddd, MMM D',
            sameElse: 'dddd, MMM D'
        });
    };
    UtilService.prototype.getTime = function (epoch, metrics, tz) {
        var pattern = metrics.time === 24 ? 'HH:mm' : 'h:mm A';
        return epoch ? this.formatEpoch(epoch, pattern, tz).replace(':00', '') : null;
    };
    UtilService.prototype.getCurrentHour = function (tz) {
        return __WEBPACK_IMPORTED_MODULE_3_moment___default()().tz(tz).hour();
    };
    UtilService.prototype.epochToHour = function (epoch, tz) {
        return __WEBPACK_IMPORTED_MODULE_3_moment___default()(epoch * 1000).tz(tz).hour();
    };
    UtilService.prototype.formatEpoch = function (epoch, pattern, tz) {
        return __WEBPACK_IMPORTED_MODULE_3_moment___default()(epoch * 1000).tz(tz).format(pattern);
    };
    UtilService.prototype.formatTemp = function (temp, metrics) {
        if (!temp) {
            return null;
        }
        if (metrics.temp === __WEBPACK_IMPORTED_MODULE_2__model__["d" /* MetricTemp */].C) {
            temp = (temp - 32) / 1.8;
        }
        return __WEBPACK_IMPORTED_MODULE_4_lodash__["round"](temp) + '\u00B0';
    };
    UtilService.prototype.formatLength = function (length, metrics) {
        if (!length) {
            return null;
        }
        if (metrics.length === __WEBPACK_IMPORTED_MODULE_2__model__["b" /* MetricLength */].CM) {
            length = length * 2.54;
        }
        return __WEBPACK_IMPORTED_MODULE_4_lodash__["round"](length, 5) + ' ' + __WEBPACK_IMPORTED_MODULE_4_lodash__["lowerCase"](__WEBPACK_IMPORTED_MODULE_2__model__["b" /* MetricLength */][metrics.length]);
    };
    UtilService.prototype.formatDistance = function (distance, metrics) {
        if (!distance) {
            return null;
        }
        if (metrics.distance === __WEBPACK_IMPORTED_MODULE_2__model__["a" /* MetricDistance */].KM) {
            distance = distance * 1.60934;
        }
        return __WEBPACK_IMPORTED_MODULE_4_lodash__["round"](distance, 5) + ' ' + __WEBPACK_IMPORTED_MODULE_4_lodash__["lowerCase"](__WEBPACK_IMPORTED_MODULE_2__model__["a" /* MetricDistance */][metrics.distance]);
    };
    UtilService.prototype.formatPressure = function (pressure, metrics) {
        if (!pressure) {
            return null;
        }
        var unit = 'mbar';
        if (metrics.pressure === __WEBPACK_IMPORTED_MODULE_2__model__["c" /* MetricPressure */].HPA) {
            unit = 'hPa';
        }
        return __WEBPACK_IMPORTED_MODULE_4_lodash__["round"](pressure, 5) + ' ' + unit;
    };
    UtilService.prototype.formatWind = function (windSpeed, windDegree, metrics) {
        if (!windSpeed) {
            return null;
        }
        if (metrics.distance === __WEBPACK_IMPORTED_MODULE_2__model__["a" /* MetricDistance */].KM) {
            windSpeed = windSpeed * 1.60934;
        }
        return __WEBPACK_IMPORTED_MODULE_4_lodash__["round"](windSpeed, 2) + ' ' + __WEBPACK_IMPORTED_MODULE_4_lodash__["lowerCase"](__WEBPACK_IMPORTED_MODULE_2__model__["a" /* MetricDistance */][metrics.distance]) + '/h ' + this.degToCard(windDegree);
    };
    UtilService.prototype.formatPI = function (pi, metrics) {
        if (!pi) {
            return null;
        }
        if (metrics.length === __WEBPACK_IMPORTED_MODULE_2__model__["b" /* MetricLength */].CM) {
            pi = pi * 25.4;
        }
        return __WEBPACK_IMPORTED_MODULE_4_lodash__["round"](pi, 5) + ' mm/h';
    };
    UtilService.prototype.getWeatherIcon = function (icon) {
        if (icon) {
            return 'assets/img/' + icon + '.png';
        }
        else {
            return 'assets/img/default.png';
        }
    };
    UtilService.prototype.degToCard = function (deg) {
        if (deg > 11.25 && deg < 33.75) {
            return 'NNE';
        }
        else if (deg > 33.75 && deg < 56.25) {
            return 'ENE';
        }
        else if (deg > 56.25 && deg < 78.75) {
            return 'E';
        }
        else if (deg > 78.75 && deg < 101.25) {
            return 'ESE';
        }
        else if (deg > 101.25 && deg < 123.75) {
            return 'ESE';
        }
        else if (deg > 123.75 && deg < 146.25) {
            return 'SE';
        }
        else if (deg > 146.25 && deg < 168.75) {
            return 'SSE';
        }
        else if (deg > 168.75 && deg < 191.25) {
            return 'S';
        }
        else if (deg > 191.25 && deg < 213.75) {
            return 'SSW';
        }
        else if (deg > 213.75 && deg < 236.25) {
            return 'SW';
        }
        else if (deg > 236.25 && deg < 258.75) {
            return 'WSW';
        }
        else if (deg > 258.75 && deg < 281.25) {
            return 'W';
        }
        else if (deg > 281.25 && deg < 303.75) {
            return 'WNW';
        }
        else if (deg > 303.75 && deg < 326.25) {
            return 'NW';
        }
        else if (deg > 326.25 && deg < 348.75) {
            return 'NNW';
        }
        else {
            return 'N';
        }
    };
    UtilService.prototype.uppercase = function (text) {
        return __WEBPACK_IMPORTED_MODULE_4_lodash__["upperCase"](text);
    };
    UtilService.prototype.startCase = function (text) {
        return __WEBPACK_IMPORTED_MODULE_4_lodash__["startCase"](text);
    };
    UtilService.prototype.getTabChangeEvent = function () {
        return this.tabChangeEvent;
    };
    UtilService.prototype.showToast = function (message, duration) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: duration || 3000
        });
        toast.present();
    };
    return UtilService;
}());
UtilService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */]])
], UtilService);

//# sourceMappingURL=util.service.js.map

/***/ }),

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 285,
	"./af.js": 285,
	"./ar": 286,
	"./ar-ly": 287,
	"./ar-ly.js": 287,
	"./ar-ma": 288,
	"./ar-ma.js": 288,
	"./ar-sa": 289,
	"./ar-sa.js": 289,
	"./ar-tn": 290,
	"./ar-tn.js": 290,
	"./ar.js": 286,
	"./az": 291,
	"./az.js": 291,
	"./be": 292,
	"./be.js": 292,
	"./bg": 293,
	"./bg.js": 293,
	"./bn": 294,
	"./bn.js": 294,
	"./bo": 295,
	"./bo.js": 295,
	"./br": 296,
	"./br.js": 296,
	"./bs": 297,
	"./bs.js": 297,
	"./ca": 298,
	"./ca.js": 298,
	"./cs": 299,
	"./cs.js": 299,
	"./cv": 300,
	"./cv.js": 300,
	"./cy": 301,
	"./cy.js": 301,
	"./da": 302,
	"./da.js": 302,
	"./de": 303,
	"./de-at": 304,
	"./de-at.js": 304,
	"./de.js": 303,
	"./dv": 305,
	"./dv.js": 305,
	"./el": 306,
	"./el.js": 306,
	"./en-au": 307,
	"./en-au.js": 307,
	"./en-ca": 308,
	"./en-ca.js": 308,
	"./en-gb": 309,
	"./en-gb.js": 309,
	"./en-ie": 310,
	"./en-ie.js": 310,
	"./en-nz": 311,
	"./en-nz.js": 311,
	"./eo": 312,
	"./eo.js": 312,
	"./es": 313,
	"./es-do": 314,
	"./es-do.js": 314,
	"./es.js": 313,
	"./et": 315,
	"./et.js": 315,
	"./eu": 316,
	"./eu.js": 316,
	"./fa": 317,
	"./fa.js": 317,
	"./fi": 318,
	"./fi.js": 318,
	"./fo": 319,
	"./fo.js": 319,
	"./fr": 320,
	"./fr-ca": 321,
	"./fr-ca.js": 321,
	"./fr-ch": 322,
	"./fr-ch.js": 322,
	"./fr.js": 320,
	"./fy": 323,
	"./fy.js": 323,
	"./gd": 324,
	"./gd.js": 324,
	"./gl": 325,
	"./gl.js": 325,
	"./he": 326,
	"./he.js": 326,
	"./hi": 327,
	"./hi.js": 327,
	"./hr": 328,
	"./hr.js": 328,
	"./hu": 329,
	"./hu.js": 329,
	"./hy-am": 330,
	"./hy-am.js": 330,
	"./id": 331,
	"./id.js": 331,
	"./is": 332,
	"./is.js": 332,
	"./it": 333,
	"./it.js": 333,
	"./ja": 334,
	"./ja.js": 334,
	"./jv": 335,
	"./jv.js": 335,
	"./ka": 336,
	"./ka.js": 336,
	"./kk": 337,
	"./kk.js": 337,
	"./km": 338,
	"./km.js": 338,
	"./ko": 339,
	"./ko.js": 339,
	"./ky": 340,
	"./ky.js": 340,
	"./lb": 341,
	"./lb.js": 341,
	"./lo": 342,
	"./lo.js": 342,
	"./lt": 343,
	"./lt.js": 343,
	"./lv": 344,
	"./lv.js": 344,
	"./me": 345,
	"./me.js": 345,
	"./mi": 346,
	"./mi.js": 346,
	"./mk": 347,
	"./mk.js": 347,
	"./ml": 348,
	"./ml.js": 348,
	"./mr": 349,
	"./mr.js": 349,
	"./ms": 350,
	"./ms-my": 351,
	"./ms-my.js": 351,
	"./ms.js": 350,
	"./my": 352,
	"./my.js": 352,
	"./nb": 353,
	"./nb.js": 353,
	"./ne": 354,
	"./ne.js": 354,
	"./nl": 355,
	"./nl.js": 355,
	"./nn": 356,
	"./nn.js": 356,
	"./pa-in": 357,
	"./pa-in.js": 357,
	"./pl": 358,
	"./pl.js": 358,
	"./pt": 359,
	"./pt-br": 360,
	"./pt-br.js": 360,
	"./pt.js": 359,
	"./ro": 361,
	"./ro.js": 361,
	"./ru": 362,
	"./ru.js": 362,
	"./se": 363,
	"./se.js": 363,
	"./si": 364,
	"./si.js": 364,
	"./sk": 365,
	"./sk.js": 365,
	"./sl": 366,
	"./sl.js": 366,
	"./sq": 367,
	"./sq.js": 367,
	"./sr": 368,
	"./sr-cyrl": 369,
	"./sr-cyrl.js": 369,
	"./sr.js": 368,
	"./ss": 370,
	"./ss.js": 370,
	"./sv": 371,
	"./sv.js": 371,
	"./sw": 372,
	"./sw.js": 372,
	"./ta": 373,
	"./ta.js": 373,
	"./te": 374,
	"./te.js": 374,
	"./th": 375,
	"./th.js": 375,
	"./tl-ph": 376,
	"./tl-ph.js": 376,
	"./tlh": 377,
	"./tlh.js": 377,
	"./tr": 378,
	"./tr.js": 378,
	"./tzl": 379,
	"./tzl.js": 379,
	"./tzm": 380,
	"./tzm-latn": 381,
	"./tzm-latn.js": 381,
	"./tzm.js": 380,
	"./uk": 382,
	"./uk.js": 382,
	"./uz": 383,
	"./uz.js": 383,
	"./vi": 384,
	"./vi.js": 384,
	"./x-pseudo": 385,
	"./x-pseudo.js": 385,
	"./zh-cn": 386,
	"./zh-cn.js": 386,
	"./zh-hk": 387,
	"./zh-hk.js": 387,
	"./zh-tw": 388,
	"./zh-tw.js": 388
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 585;

/***/ }),

/***/ 589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeatherListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_global__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(151);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WeatherListComponent = (function () {
    function WeatherListComponent(navCtrl, forecastService, databaseService, utilService, global, geolocation, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.forecastService = forecastService;
        this.databaseService = databaseService;
        this.utilService = utilService;
        this.global = global;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.hourlyArray = [];
    }
    WeatherListComponent.prototype.ionViewDidLoad = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Loading Weather data...'
        });
        this.loading.present();
    };
    WeatherListComponent.prototype.itemClicked = function (item) {
        this.navCtrl.push('WeatherDetailPage', {
            forecast: this.forecast,
            currentForecast: item,
            currentLocation: this.location,
            metrics: this.metrics
        });
    };
    WeatherListComponent.prototype.ngOnInit = function () {
        var _this = this;
        //these emitters are used to programmatically activate lifecycle events
        //because in Ionic 2, changing tabs doesn't activate lifecycle of templates
        if (this.onInitEmitter) {
            this.onInitEmitter.subscribe(function () { return _this.init(); });
        }
        if (this.onDestroyEmitter) {
            this.onDestroyEmitter.subscribe(function () { return _this.destroy(); });
        }
        this.init();
    };
    WeatherListComponent.prototype.init = function () {
        // this.loading = this.loadingCtrl.create({
        //   content: 'Loading Weather data...'
        // });
        // this.loading.present();
        var self = this;
        if (self.location.name != '') {
            self.getForecast(self.location);
        }
        else {
            self.geolocation.getCurrentPosition().then(function (pos) {
                console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
                self.location['lat'] = pos.coords.latitude;
                self.location['lng'] = pos.coords.longitude;
                self.location['name'] = '';
                self.getForecast(self.location);
            }).catch(function (err) {
                self.loading.dismiss();
                self.alertShow("Can not get your current loction. Please check network state.");
            });
        }
        this.databaseService.getJson(__WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["a" /* CONFIG */].METRICS).then(function (data) {
            if (data === null) {
                self.databaseService.setJson(__WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["a" /* CONFIG */].METRICS, __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["b" /* DEFAULT_METRICS */]);
                self.metrics = __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["b" /* DEFAULT_METRICS */];
            }
            else {
                self.metrics = data;
            }
        });
    };
    WeatherListComponent.prototype.getForecast = function (location) {
        var self = this;
        this.forecastSubscriber = self.forecastService.getForecast(location)
            .subscribe(function (data) {
            self.forecast = data;
            if (self.forecast && self.forecast.daily && self.forecast.daily.data) {
                self.todayForecast = self.forecast.daily.data[0];
            }
            self.hourlyArray = [];
            var currentHour = self.utilService.getCurrentHour(self.forecast.timezone);
            var flag = false;
            __WEBPACK_IMPORTED_MODULE_3_lodash__["forEach"](self.forecast.hourly.data, function (obj) {
                if (!flag && self.utilService.epochToHour(obj.time, self.forecast.timezone) < currentHour) {
                    return;
                }
                flag = true;
                self.hourlyArray.push({
                    time: obj.time,
                    icon: obj.icon,
                    temperature: obj.temperature
                });
                if (self.hourlyArray.length > 10) {
                    return false;
                }
            });
            self.loading.dismiss();
        }, function (err) {
            self.loading.dismiss();
            self.alertShow("Can not get Weather data. Please check network state.");
            console.error(err);
        });
    };
    WeatherListComponent.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    WeatherListComponent.prototype.destroy = function () {
        if (this.forecastSubscriber) {
            this.forecastSubscriber.unsubscribe();
        }
    };
    WeatherListComponent.prototype.alertShow = function (message) {
        var alert = this.alertCtrl.create({
            message: message,
            buttons: [
                {
                    text: "Ok",
                    role: 'cancel'
                }
            ]
        });
        alert.present();
    };
    return WeatherListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], WeatherListComponent.prototype, "onInitEmitter", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], WeatherListComponent.prototype, "onDestroyEmitter", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], WeatherListComponent.prototype, "location", void 0);
WeatherListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'weather-list',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/components/weather-list/weather-list.html"*/'<!--suppress ALL -->\n\n<ion-list *ngIf="forecast && metrics && location">\n  <button ion-item detail-none text-wrap color="primary"\n          class="center no-label-margin" style="margin-bottom:-1px;"\n          *ngIf="todayForecast" (click)="itemClicked(todayForecast)">\n    <div class="bold large">{{location.name}}</div>\n    <div class="small">{{utilService.getCalendarDay(todayForecast.time,forecast.timezone)}}</div>\n    <ion-grid>\n      <ion-row>\n        <ion-col col-4 class="center-child">\n          <div>\n            <div class="xx-large">\n              {{utilService.formatTemp(todayForecast.temperatureMax,metrics)}}\n            </div>\n            <div class="large">\n              {{utilService.formatTemp(todayForecast.temperatureMin,metrics)}}\n            </div>\n          </div>\n        </ion-col>\n        <ion-col col-4>\n          <img [src]="utilService.getWeatherIcon(todayForecast.icon)"\n               onerror="this.src=\'assets/img/default.png\'">\n          <span class="bold small">{{utilService.startCase(todayForecast.icon)}}</span>\n        </ion-col>\n        <ion-col col-4 class="center-child">\n          <div>\n            <img [src]="utilService.getWeatherIcon(\'sunrise\')" style="max-width:40%"\n                 onerror="this.src=\'assets/img/default.png\'">\n            <div class="bold small">\n              {{utilService.getTime(todayForecast.sunriseTime,metrics,forecast.timezone)}}\n            </div>\n            <img [src]="utilService.getWeatherIcon(\'sunset\')" style="max-width:40%">\n            <div class="bold small">\n              {{utilService.getTime(todayForecast.sunsetTime,metrics,forecast.timezone)}}\n            </div>\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </button>\n  <ion-scroll scrollX="true" class="center scroll-hourly"\n              *ngIf="hourlyArray?.length>1" >\n    <ion-row nowrap>\n      <ion-col col-3 *ngFor="let item of hourlyArray">\n        <img [src]="utilService.getWeatherIcon(item.icon)"\n             onerror="this.src=\'assets/img/default.png\'" style="max-width: 40%">\n        <p class="bold" ion-text color="text2" no-margin no-padding>\n          <span ion-text color="text1">\n            {{utilService.formatTemp(item.temperature,metrics)}}\n          </span>\n          {{utilService.getTime(item.time,metrics,forecast.timezone)}}\n        </p>\n      </ion-col>\n    </ion-row>\n  </ion-scroll>\n  <button ion-item detail-none text-wrap\n          *ngFor="let item of forecast.daily?.data | slice:1;let i = index"\n          (click)="itemClicked(item)">\n    <img [src]="utilService.getWeatherIcon(item.icon)"\n         onerror="this.src=\'assets/img/default.png\'"\n         item-left style="max-width: 12%">\n    <div class="small">{{utilService.getCalendarDay(item.time,forecast.timezone)}}</div>\n    <p class="bold" ion-text color="text2">{{utilService.startCase(item.icon)}}</p>\n    <div class="large" ion-text color="text1" item-right>\n      {{utilService.formatTemp(forecast.daily.data[i+1]?.temperatureMax,metrics)}}\n    </div>\n    <p class="medium bold" ion-text color="text2" item-right>\n      {{utilService.formatTemp(forecast.daily.data[i+1]?.temperatureMin,metrics)}}</p>\n  </button>\n</ion-list>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/components/weather-list/weather-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["d" /* ForecastService */],
        __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["c" /* DatabaseService */],
        __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["j" /* UtilService */],
        __WEBPACK_IMPORTED_MODULE_4__app_app_global__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], WeatherListComponent);

//# sourceMappingURL=weather-list.js.map

/***/ }),

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_keyboard__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_global__ = __webpack_require__(34);
// import { Component, NgZone, ViewChild } from '@angular/core';
// import { IonicPage, NavParams, ViewController } from 'ionic-angular';
// import { Keyboard } from '@ionic-native/keyboard';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
//
//
// import { Location } from '../../../providers/weather-service';
// import * as _ from 'lodash';
// import { Geolocation } from '@ionic-native/geolocation';
// import { AppState } from '../../../app/app.global';
// declare let google: any;
//
// import * as $ from 'jquery'
//
// @IonicPage({
//   priority: 'high'
// })
// @Component({
//   selector: 'page-location',
//template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/location/location.html"*/'<!--&lt;!&ndash;<div class="{{global.state[\'theme\']}}">&ndash;&gt;-->\n<!--<ion-header class="{{global.state[\'theme\']}}">-->\n  <!--<ion-toolbar color="primary">-->\n    <!--<ion-title>{{heading}}</ion-title>-->\n    <!--<ion-buttons start >-->\n      <!--<button ion-button (click)="dismiss()" icon-only>-->\n        <!--<ion-icon name="ios-close-circle"></ion-icon>-->\n      <!--</button>-->\n      <!--&lt;!&ndash;<button showWhen="android" ion-button icon-only (click)="dismiss()">&ndash;&gt;-->\n        <!--&lt;!&ndash;<ion-icon name="md-close" color="white"></ion-icon>&ndash;&gt;-->\n      <!--&lt;!&ndash;</button>&ndash;&gt;-->\n    <!--</ion-buttons>-->\n  <!--</ion-toolbar>-->\n<!--</ion-header>-->\n\n<!--<ion-content padding>-->\n  <!--<ion-label style="font-weight: bold; color: blue;">Country</ion-label>-->\n  <!--<ion-searchbar-->\n    <!--[(ngModel)]="queryCountry"-->\n    <!--(ionInput)="updateSearchCountry()"-->\n    <!--#searchInput>-->\n  <!--</ion-searchbar>-->\n  <!--<ion-list *ngIf="showCountryList">-->\n    <!--<ion-item *ngFor="let itemCountry of autocompleteCountries"-->\n              <!--(click)="chooseItemCountry(itemCountry)">-->\n      <!--{{ itemCountry }}-->\n    <!--</ion-item>-->\n  <!--</ion-list>-->\n\n  <!--<ion-label style="font-weight: bold; color: blue;">City</ion-label>-->\n  <!--<ion-searchbar-->\n          <!--[(ngModel)]="queryCity"-->\n          <!--(ionInput)="updateSearchCityByCountry()"-->\n          <!--#searchInput>-->\n  <!--</ion-searchbar>-->\n  <!--<ion-list *ngIf="showCityList">-->\n    <!--<ion-item *ngFor="let itemCity of autocompleteCities"-->\n              <!--(click)="chooseItemCity(itemCity)">-->\n      <!--{{ itemCity }}-->\n    <!--</ion-item>-->\n  <!--</ion-list>-->\n  <!--<button ion-button full (click)="savebtnclick()">Save</button>-->\n<!--</ion-content>-->\n<!--&lt;!&ndash;</div>&ndash;&gt;-->\n\n<ion-header class="{{global.state[\'theme\']}}">\n  <ion-toolbar color="primary">\n    <ion-title>{{heading}}</ion-title>\n    <ion-buttons start *ngIf="showCancel">\n      <button ion-button (click)="dismiss()">\n        <span ion-text >Cancel</span>\n      </button>\n      <!--<button showWhen="android" ion-button icon-only (click)="dismiss()">-->\n      <!--<ion-icon name="md-close" color="white"></ion-icon>-->\n      <!--</button>-->\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="{{global.state[\'theme\']}}">\n  <ion-searchbar\n          [(ngModel)]="query"\n          (ionInput)="updateSearch()"\n          #searchInput>\n  </ion-searchbar>\n  <ion-list>\n    <ion-item *ngFor="let item of autocompleteItems"\n              (click)="chooseItem(item)">\n      {{ item.description }}\n    </ion-item>\n  </ion-list>\n  <!--<button ion-button full (click)="savebtnclick()">Save</button>-->\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/location/location.html"*/
// })
// export class LocationPage {
//   @ViewChild('searchInput') searchInput;
//   heading: string;
//   autocompleteItems: Array<{ description: string, place_id: string }>;
//
//   autocompleteCountries = [];
//   autocompleteCities = [];
//
//   queryCity: string;
//   queryCountry: string;
//   acService: any;
//   locationObj: Location;
//   showCancel: boolean;
//   showCountryList = false;
//   showCityList = false;
//
//   cityObj: any;
//
//   constructor(public navParams: NavParams,
//               public viewCtrl: ViewController,
//               public keyboard: Keyboard,
//               public zone: NgZone,
//               private global:AppState,
//               private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
//     this.heading = navParams.get('heading') ? navParams.get('heading') : 'Search City Name';
//     this.showCancel = navParams.data.showCancel !== undefined ? navParams.data.showCancel : true;
//   }
//
//   ionViewDidEnter() {
//
//     var self = this;
//
//     $.getJSON("assets/data/citiesOfAllCountries.json", function(json) {
//       self.cityObj = json;
//     });
//
//
//     // this.zone.run(() => {
//     //   this.searchInput.setFocus();
//     //   this.keyboard.show();
//     // });
//
//
//   }
//
//   ionViewWillEnter() {
//
//     this.autocompleteItems = [];
//     this.queryCountry = '';
//     this.queryCity = '';
//     this.locationObj = {
//       name: null,
//       lat: null,
//       lng: null
//     };
//
//     this.acService = new google.maps.places.AutocompleteService();
//   }
//
//   ionViewWillLeave() {
//     this.keyboard.close();
//   }
//
//   dismiss() {
//     this.viewCtrl.dismiss();
//   }
//
//   updateSearchCountry() {
//     console.debug('modal > updateSearch > query ', this.queryCountry);
//     if (this.queryCountry.trim() == '') {
//       this.autocompleteCountries = [];
//       return;
//     }
//     let self = this;
//     let config = {
//       types: ['(cities)'],
//       input: this.queryCountry
//     };
//     // this.acService.getPlacePredictions(config, (predictions, status) => {
//     //   console.debug('modal > getPlacePredictions > status > ', status);
//     //   self.zone.run(() => {
//     //     self.autocompleteItems = predictions ? predictions : [];
//     //   });
//     // });
//
//
//
//
//     self.autocompleteCountries = [];
//     for (let key in this.cityObj) {
//       // var s = "";
//       // s.toUpperCase();
//       // s.toLowerCase();
//       let index = key.toUpperCase().indexOf(self.queryCountry.toUpperCase());
//       if(index >= 0){
//         self.autocompleteCountries.push(key);
//       }
//       // console.log("      key:", key, "value:", json[key]);
//     }
//
//     if(self.autocompleteCountries.length > 0 ){
//       self.showCountryList = true;
//     }
//
//   }
//
//   chooseItemCountry(item) {
//     this.queryCountry = item;
//     this.showCountryList = false;
//     // let self = this;
//     // let request = {
//     //   placeId: item.place_id
//     // };
//     // let response: Location;
//     // let placesService = new google.maps.places.PlacesService(document.createElement('div'));
//     // placesService.getDetails(request, (place, status) => {
//     //   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     //     self.locationObj.lat = place.geometry.location.lat();
//     //     self.locationObj.lng = place.geometry.location.lng();
//     //     let obj = _.find(place.address_components, ['types[0]', 'locality']);
//     //     if (obj) {
//     //       self.locationObj.name = obj['short_name'];
//     //     }
//     //     response = self.locationObj;
//     //   } else {
//     //     console.debug('page > getPlaceDetail > status > ', status);
//     //   }
//     //   self.zone.run(() => {
//     //     self.viewCtrl.dismiss(response);
//     //   });
//     // });
//   }
//
//   updateSearchCityByCountry(){
//     if(!this.cityObj[this.queryCountry]){
//       return;
//     }
//
//     if (this.queryCity.trim() == '') {
//       this.autocompleteCities = [];
//       return;
//     }
//     let self = this;
//
//     self.autocompleteCities = [];
//     for (let key of this.cityObj[this.queryCountry]) {
//       // var s = "";
//       // s.toUpperCase();
//       // s.toLowerCase();
//       let index = key.toUpperCase().indexOf(self.queryCity.toUpperCase());
//       if(index >= 0){
//         self.autocompleteCities.push(key);
//       }
//     }
//
//     if(self.autocompleteCities.length > 0 ){
//       self.showCityList = true;
//     }
//   }
//
//   chooseItemCity(itemCity){
//     this.queryCity = itemCity;
//     this.showCityList = false;
//   }
//
//
//   savebtnclick(){
//     let self = this;
//     let response: Location;
//
//     this.nativeGeocoder.forwardGeocode(this.queryCity)
//        .then((coordinates: NativeGeocoderForwardResult) =>{
//          self.locationObj['lat'] = parseFloat(coordinates.latitude);
//          self.locationObj['lng'] = parseFloat(coordinates.longitude);
//          self.locationObj['name'] =  self.queryCity + " , " + self.queryCountry;
//          // alert('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)
//          self.viewCtrl.dismiss(self.locationObj);
//
//        }).catch((error: any) => {
//             alert(JSON.stringify(error))
//     });
//
//
//
//     // this.geolocation.watchPosition().subscribe(result => {
//     //   var s = result;
//     // });
//
//     // this.geolocation.getCurrentPosition().then(pos => {
//     //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
//     //   self.locationObj['lat'] = pos.coords.latitude;
//     //   self.locationObj['lng'] = pos.coords.longitude;
//     //   self.locationObj['name'] =  self.queryCity;
//     //   self.viewCtrl.dismiss(self.locationObj);
//     // }).catch(error => {
//     //   alert('google maps service error');
//     // });
//
//
//     //
//     // let placesService = new google.maps.places.PlacesService(document.createElement('div'));
//     // placesService.getDetails(request, (place, status) => {
//     //   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     //     self.locationObj.lat = place.geometry.location.lat();
//     //     self.locationObj.lng = place.geometry.location.lng();
//     //     let obj = _.find(place.address_components, ['types[0]', 'locality']);
//     //     if (obj) {
//     //       self.locationObj.name = obj['short_name'];
//     //     }
//     //     response = self.locationObj;
//     //   } else {
//
//     //     console.debug('page > getPlaceDetail > status > ', status);
//     //   }
//     //   self.zone.run(() => {
//     //     self.viewCtrl.dismiss(response);
//     //   });
//     // });
//
//   }
//
// }
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LocationPage = (function () {
    function LocationPage(navParams, viewCtrl, keyboard, zone, global, geolocation) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.keyboard = keyboard;
        this.zone = zone;
        this.global = global;
        this.geolocation = geolocation;
        this.heading = navParams.get('heading') ? navParams.get('heading') : 'Search City Name';
        this.showCancel = navParams.data.showCancel !== undefined ? navParams.data.showCancel : true;
        this.acService = new google.maps.places.AutocompleteService();
    }
    LocationPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.zone.run(function () {
            _this.searchInput.setFocus();
            _this.keyboard.show();
        });
    };
    LocationPage.prototype.ionViewWillEnter = function () {
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.query = '';
        this.locationObj = {
            name: null,
            lat: null,
            lng: null
        };
    };
    LocationPage.prototype.ionViewWillLeave = function () {
        this.keyboard.close();
    };
    LocationPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    LocationPage.prototype.updateSearch = function () {
        console.debug('modal > updateSearch > query ', this.query);
        if (this.query.trim() == '') {
            this.autocompleteItems = [];
            return;
        }
        var self = this;
        var config = {
            types: ['(cities)'],
            input: this.query
        };
        this.acService.getPlacePredictions(config, function (predictions, status) {
            console.debug('modal > getPlacePredictions > status > ', status);
            self.zone.run(function () {
                self.autocompleteItems = predictions ? predictions : [];
            });
        });
    };
    LocationPage.prototype.chooseItem = function (item) {
        var self = this;
        var request = {
            placeId: item.place_id
        };
        var response;
        var placesService = new google.maps.places.PlacesService(document.createElement('div'));
        placesService.getDetails(request, function (place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                self.locationObj.lat = place.geometry.location.lat();
                self.locationObj.lng = place.geometry.location.lng();
                var obj = __WEBPACK_IMPORTED_MODULE_3_lodash__["find"](place.address_components, ['types[0]', 'locality']);
                if (obj) {
                    self.locationObj.name = obj['short_name'];
                }
                response = self.locationObj;
            }
            else {
                console.debug('page > getPlaceDetail > status > ', status);
            }
            self.zone.run(function () {
                self.viewCtrl.dismiss(response);
            });
        });
    };
    LocationPage.prototype.savebtnclick = function () {
        var self = this;
        var response;
        this.geolocation.getCurrentPosition().then(function (pos) {
            console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
            self.locationObj['lat'] = pos.coords.latitude;
            self.locationObj['lng'] = pos.coords.longitude;
            self.locationObj['name'] = self.query;
            self.viewCtrl.dismiss(self.locationObj);
        }).catch(function (error) {
            alert('google maps service error');
        });
        //
        // let placesService = new google.maps.places.PlacesService(document.createElement('div'));
        // placesService.getDetails(request, (place, status) => {
        //   if (status == google.maps.places.PlacesServiceStatus.OK) {
        //     self.locationObj.lat = place.geometry.location.lat();
        //     self.locationObj.lng = place.geometry.location.lng();
        //     let obj = _.find(place.address_components, ['types[0]', 'locality']);
        //     if (obj) {
        //       self.locationObj.name = obj['short_name'];
        //     }
        //     response = self.locationObj;
        //   } else {
        //     console.debug('page > getPlaceDetail > status > ', status);
        //   }
        //   self.zone.run(() => {
        //     self.viewCtrl.dismiss(response);
        //   });
        // });
    };
    return LocationPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('searchInput'),
    __metadata("design:type", Object)
], LocationPage.prototype, "searchInput", void 0);
LocationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])({
        priority: 'high'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-location',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/location/location.html"*/'<!--&lt;!&ndash;<div class="{{global.state[\'theme\']}}">&ndash;&gt;-->\n<!--<ion-header class="{{global.state[\'theme\']}}">-->\n  <!--<ion-toolbar color="primary">-->\n    <!--<ion-title>{{heading}}</ion-title>-->\n    <!--<ion-buttons start >-->\n      <!--<button ion-button (click)="dismiss()" icon-only>-->\n        <!--<ion-icon name="ios-close-circle"></ion-icon>-->\n      <!--</button>-->\n      <!--&lt;!&ndash;<button showWhen="android" ion-button icon-only (click)="dismiss()">&ndash;&gt;-->\n        <!--&lt;!&ndash;<ion-icon name="md-close" color="white"></ion-icon>&ndash;&gt;-->\n      <!--&lt;!&ndash;</button>&ndash;&gt;-->\n    <!--</ion-buttons>-->\n  <!--</ion-toolbar>-->\n<!--</ion-header>-->\n\n<!--<ion-content padding>-->\n  <!--<ion-label style="font-weight: bold; color: blue;">Country</ion-label>-->\n  <!--<ion-searchbar-->\n    <!--[(ngModel)]="queryCountry"-->\n    <!--(ionInput)="updateSearchCountry()"-->\n    <!--#searchInput>-->\n  <!--</ion-searchbar>-->\n  <!--<ion-list *ngIf="showCountryList">-->\n    <!--<ion-item *ngFor="let itemCountry of autocompleteCountries"-->\n              <!--(click)="chooseItemCountry(itemCountry)">-->\n      <!--{{ itemCountry }}-->\n    <!--</ion-item>-->\n  <!--</ion-list>-->\n\n  <!--<ion-label style="font-weight: bold; color: blue;">City</ion-label>-->\n  <!--<ion-searchbar-->\n          <!--[(ngModel)]="queryCity"-->\n          <!--(ionInput)="updateSearchCityByCountry()"-->\n          <!--#searchInput>-->\n  <!--</ion-searchbar>-->\n  <!--<ion-list *ngIf="showCityList">-->\n    <!--<ion-item *ngFor="let itemCity of autocompleteCities"-->\n              <!--(click)="chooseItemCity(itemCity)">-->\n      <!--{{ itemCity }}-->\n    <!--</ion-item>-->\n  <!--</ion-list>-->\n  <!--<button ion-button full (click)="savebtnclick()">Save</button>-->\n<!--</ion-content>-->\n<!--&lt;!&ndash;</div>&ndash;&gt;-->\n\n<ion-header class="{{global.state[\'theme\']}}">\n  <ion-toolbar color="primary">\n    <ion-title>{{heading}}</ion-title>\n    <ion-buttons start *ngIf="showCancel">\n      <button ion-button (click)="dismiss()">\n        <span ion-text >Cancel</span>\n      </button>\n      <!--<button showWhen="android" ion-button icon-only (click)="dismiss()">-->\n      <!--<ion-icon name="md-close" color="white"></ion-icon>-->\n      <!--</button>-->\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="{{global.state[\'theme\']}}">\n  <ion-searchbar\n          [(ngModel)]="query"\n          (ionInput)="updateSearch()"\n          #searchInput>\n  </ion-searchbar>\n  <ion-list>\n    <ion-item *ngFor="let item of autocompleteItems"\n              (click)="chooseItem(item)">\n      {{ item.description }}\n    </ion-item>\n  </ion-list>\n  <!--<button ion-button full (click)="savebtnclick()">Save</button>-->\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/location/location.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_keyboard__["a" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
        __WEBPACK_IMPORTED_MODULE_5__app_app_global__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */]])
], LocationPage);

//# sourceMappingURL=location.js.map

/***/ }),

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_weather_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsPage = (function () {
    function SettingsPage(databaseService, modalCtrl) {
        this.databaseService = databaseService;
        this.modalCtrl = modalCtrl;
        this.enumTemp = __WEBPACK_IMPORTED_MODULE_1__providers_weather_service__["h" /* MetricTemp */];
        this.enumLength = __WEBPACK_IMPORTED_MODULE_1__providers_weather_service__["f" /* MetricLength */];
        this.enumDistance = __WEBPACK_IMPORTED_MODULE_1__providers_weather_service__["e" /* MetricDistance */];
        this.enumPressure = __WEBPACK_IMPORTED_MODULE_1__providers_weather_service__["g" /* MetricPressure */];
    }
    SettingsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.databaseService.getJson(__WEBPACK_IMPORTED_MODULE_1__providers_weather_service__["a" /* CONFIG */].HOME_LOCATION).then(function (data) { return _this.homeLocation = data; });
        this.databaseService.getJson(__WEBPACK_IMPORTED_MODULE_1__providers_weather_service__["a" /* CONFIG */].METRICS).then(function (data) { return _this.metrics = data; });
    };
    SettingsPage.prototype.metricChange = function () {
        this.databaseService.setJson(__WEBPACK_IMPORTED_MODULE_1__providers_weather_service__["a" /* CONFIG */].METRICS, this.metrics);
    };
    SettingsPage.prototype.changeHomeLocation = function () {
        var self = this;
        var modal = self.modalCtrl.create('LocationPage', { heading: 'Enter Home City' });
        modal.onDidDismiss(function (data) {
            if (data) {
                self.databaseService.setJson(__WEBPACK_IMPORTED_MODULE_1__providers_weather_service__["a" /* CONFIG */].HOME_LOCATION, data);
                self.homeLocation = data;
            }
        });
        modal.present();
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/settings/settings.html"*/'\n<ion-header no-border>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list *ngIf="homeLocation">\n    <ion-list-header>Location</ion-list-header>\n    <button ion-item class="item-select" (click)="changeHomeLocation()">\n      <ion-label color="primary">Home Location</ion-label>\n      <ion-note item-right style="color:inherit">{{homeLocation.name}}</ion-note>\n    </button>\n  </ion-list>\n  <ion-list *ngIf="metrics">\n    <ion-list-header>Metrics</ion-list-header>\n    <ion-item>\n      <ion-label color="primary">Temperature</ion-label>\n      <ion-select [(ngModel)]="metrics.temp" (ionChange)="metricChange()">\n        <ion-option [value]="enumTemp.F">Fahrenheit</ion-option>\n        <ion-option [value]="enumTemp.C">Celsius</ion-option>\n      </ion-select>\n    </ion-item>\n    <!--<ion-item>-->\n    <!--<ion-label color="primary">Time</ion-label>-->\n    <!--<ion-select [(ngModel)]="metrics.time" (ionChange)="metricChange()">-->\n    <!--<ion-option [value]="12">12 Hour</ion-option>-->\n    <!--<ion-option [value]="24">24 Hour</ion-option>-->\n    <!--</ion-select>-->\n    <!--</ion-item>-->\n    <ion-item>\n      <ion-label color="primary">Length</ion-label>\n      <ion-select [(ngModel)]="metrics.length" (ionChange)="metricChange()">\n        <ion-option [value]="enumLength.IN">Inch</ion-option>\n        <ion-option [value]="enumLength.CM">Centimeter</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label color="primary">Distance</ion-label>\n      <ion-select [(ngModel)]="metrics.distance" (ionChange)="metricChange()">\n        <ion-option [value]="enumDistance.MI">Miles</ion-option>\n        <ion-option [value]="enumDistance.KM">Kilometre</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label color="primary">Pressure</ion-label>\n      <ion-select [(ngModel)]="metrics.pressure" (ionChange)="metricChange()">\n        <ion-option [value]="enumPressure.MBAR">mbar</ion-option>\n        <ion-option [value]="enumPressure.HPA">hPa</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/settings/settings.html"*/,
        styles: ["\n    .list-ios {\n      margin-bottom: 10px;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_weather_service__["c" /* DatabaseService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ModalController */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 592:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TabsPage = (function () {
    function TabsPage(navParams, utilService) {
        this.navParams = navParams;
        this.utilService = utilService;
        this.tab1Root = 'HomeWeatherPage';
        this.tab2Root = 'WorldCityListPage';
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])({
        priority: 'high'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-tabs',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/tabs/tabs.html"*/'<!--suppress ALL -->\n<ion-tabs [selectedIndex]="mySelectedIndex">\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="World" tabIcon="globe"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/tabs/tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["j" /* UtilService */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeatherDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_weather_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WeatherDetailPage = (function () {
    function WeatherDetailPage(params, statusBar, utilService) {
        this.params = params;
        this.statusBar = statusBar;
        this.utilService = utilService;
        this.detailsElem = ['humidity', 'pressure', 'windSpeed', 'ozone',
            'dewPoint', 'cloudCover', 'visibility', 'precipType',
            'precipIntensity', 'precipProbability', 'precipAccumulation'];
        this.detailsArray = [];
        this.showSegment = false;
        this.whichSegment = 'detail';
        this.hourlyArray = [];
        this.tempArray = [];
        this.infiniteInc = 10;
        this.forecast = params.data.forecast;
        this.currentForecast = params.data.currentForecast;
        this.currentLocation = params.data.currentLocation;
        this.metrics = params.data.metrics;
    }
    WeatherDetailPage.prototype.ngOnInit = function () {
        var self = this;
        try {
            this.firstHourlyObj = __WEBPACK_IMPORTED_MODULE_4_lodash__["find"](this.forecast.hourly.data, function (obj) { return self.currentForecast.time <= obj.time; });
            this.showSegment = !!this.firstHourlyObj;
        }
        catch (err) {
            this.showSegment = false;
        }
        this.detailsArray = this.getDetailsArray(this.currentForecast);
    };
    WeatherDetailPage.prototype.ionViewWillEnter = function () {
        this.statusBar.styleDefault();
    };
    WeatherDetailPage.prototype.ionViewWillLeave = function () {
        this.statusBar.styleLightContent();
    };
    WeatherDetailPage.prototype.ionViewDidLoad = function () {
        var self = this;
        this.hourlyArray = [];
        if (this.showSegment && this.firstHourlyObj) {
            __WEBPACK_IMPORTED_MODULE_4_lodash__["forEach"](self.forecast.hourly.data, function (obj) {
                if (obj.time < self.firstHourlyObj.time) {
                    return;
                }
                self.hourlyArray.push({
                    time: obj.time,
                    icon: obj.icon,
                    temperature: obj.temperature,
                    showDetails: false,
                    details: self.getDetailsArray(obj)
                });
            });
        }
        self.tempArray = __WEBPACK_IMPORTED_MODULE_4_lodash__["slice"](self.hourlyArray, 0, this.infiniteInc);
    };
    WeatherDetailPage.prototype.doInfinite = function (infiniteScroll) {
        this.tempArray = __WEBPACK_IMPORTED_MODULE_4_lodash__["concat"](this.tempArray, __WEBPACK_IMPORTED_MODULE_4_lodash__["slice"](this.hourlyArray, this.infiniteInc, this.infiniteInc + 10));
        this.infiniteInc += 10;
        if (this.infiniteInc >= this.hourlyArray.length) {
            infiniteScroll.enable(false);
        }
        infiniteScroll.complete();
    };
    WeatherDetailPage.prototype.segmentChange = function () {
        this.content.scrollToTop();
        this.infiniteInc = 10;
        this.tempArray = __WEBPACK_IMPORTED_MODULE_4_lodash__["slice"](this.hourlyArray, 0, this.infiniteInc);
    };
    WeatherDetailPage.prototype.toggleDetails = function (item) {
        item.showDetails = !item.showDetails;
    };
    WeatherDetailPage.prototype.getDetailsArray = function (dp) {
        var self = this;
        var detailsArray = [];
        __WEBPACK_IMPORTED_MODULE_4_lodash__["forEach"](this.detailsElem, function (elem) {
            var elemVal = __WEBPACK_IMPORTED_MODULE_4_lodash__["get"](dp, elem, 0);
            if (elemVal !== 0) {
                var value = self.formatDetailElem(elem, elemVal);
                detailsArray.push({ key: __WEBPACK_IMPORTED_MODULE_4_lodash__["startCase"](elem), value: value });
            }
        });
        return detailsArray;
    };
    WeatherDetailPage.prototype.formatDetailElem = function (detailElem, elemVal) {
        switch (detailElem) {
            case 'humidity':
            case 'cloudCover':
            case 'precipProbability':
                return __WEBPACK_IMPORTED_MODULE_4_lodash__["round"](elemVal * 100, 5) + ' %';
            case 'pressure':
                return this.utilService.formatPressure(elemVal, this.metrics);
            case 'windSpeed':
                var windBearing = this.currentForecast.windBearing;
                return this.utilService.formatWind(elemVal, windBearing, this.metrics);
            case 'ozone':
                return elemVal + ' DU';
            case 'dewPoint':
                return this.utilService.formatTemp(elemVal, this.metrics);
            case 'visibility':
                return this.utilService.formatDistance(elemVal, this.metrics);
            case 'precipType':
                return this.utilService.startCase(elemVal);
            case 'precipIntensity':
                return this.utilService.formatPI(elemVal, this.metrics);
            case 'precipAccumulation':
                return this.utilService.formatLength(elemVal, this.metrics);
            default:
                return elemVal + '';
        }
    };
    return WeatherDetailPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], WeatherDetailPage.prototype, "content", void 0);
WeatherDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-weather-detail',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/weather-detail/weather-detail.html"*/'<!--suppress ALL -->\n<ion-header no-border>\n  <ion-navbar color="white">\n    <ion-title>Weather Detail</ion-title>\n  </ion-navbar>\n  <ion-toolbar *ngIf="showSegment" color="white">\n    <ion-segment [(ngModel)]="whichSegment" (ionChange)="segmentChange($event)">\n      <ion-segment-button value="detail">\n        Detail\n      </ion-segment-button>\n      <!--<ion-segment-button value="hourly">-->\n        <!--Hourly-->\n      <!--</ion-segment-button>-->\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content no-bounce>\n  <div class="full-screen" *ngIf="forecast && currentForecast && currentLocation && metrics">\n\n    <!--Detail Segment-->\n\n    <ion-list class="full-screen" *ngIf="whichSegment===\'detail\'">\n      <ion-item class="center half-screen" text-wrap>\n        <div class="bold large">{{currentLocation.name}}</div>\n        <div class="small">{{utilService.getCalendarDay(currentForecast.time,forecast.timezone)}}</div>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-4 class="center-child">\n              <div>\n                <span class="x-large" ion-text color="text1">\n                  {{utilService.formatTemp(currentForecast.temperatureMax,metrics)}}\n                </span>\n                <span class="large" ion-text color="text1">\n                  {{utilService.formatTemp(currentForecast.temperatureMin,metrics)}}\n                </span>\n                <div class="x-small" ion-text color="text1">RealFeel</div>\n                <span class="large" ion-text color="text2">\n                  {{utilService.formatTemp(currentForecast.apparentTemperatureMax,metrics)}}\n                </span>\n                <span class="medium" ion-text color="text2">\n                  {{utilService.formatTemp(currentForecast.apparentTemperatureMin,metrics)}}\n                </span>\n              </div>\n            </ion-col>\n            <ion-col col-4>\n              <img [src]="utilService.getWeatherIcon(currentForecast.icon)"\n                   onerror="this.src=\'assets/img/default.png\'">\n              <span class="bold small" ion-text color="text1">\n                {{utilService.startCase(currentForecast.icon)}}\n              </span>\n            </ion-col>\n            <ion-col col-4 class="center-child">\n              <div>\n                <img [src]="utilService.getWeatherIcon(\'sunrise\')" style="max-width:40%"\n                     onerror="this.src=\'assets/img/default.png\'">\n                <div class="bold small" ion-text color="text1">\n                  {{utilService.getTime(currentForecast.sunriseTime,metrics,forecast.timezone)}}\n                </div>\n                <img [src]="utilService.getWeatherIcon(\'sunset\')" style="max-width:40%">\n                <div class="bold small" ion-text color="text2">\n                  {{utilService.getTime(currentForecast.sunsetTime,metrics,forecast.timezone)}}\n                </div>\n              </div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n      <ion-item text-wrap color="primary" class="half-screen" style="padding-left: 12%;">\n        <ion-grid>\n          <ion-row *ngFor="let detail of detailsArray">\n            <ion-col>\n              <span class="bold small" ion-text color="text3">{{detail.key}}</span>\n            </ion-col>\n            <ion-col>\n              <span class="bold small">{{detail.value}}</span>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n    </ion-list>\n\n    <!--Hourly Segment-->\n\n    <ion-list class="full-screen" *ngIf="whichSegment===\'hourly\'">\n      <div *ngFor="let item of tempArray">\n        <button ion-item detail-none text-wrap (click)="toggleDetails(item)">\n          <img [src]="utilService.getWeatherIcon(item.icon)"\n               onerror="this.src=\'assets/img/default.png\'"\n               item-left style="max-width: 12%">\n          <span class="x-small">{{utilService.getCalendarDay(item.time,forecast.timezone)}}\n            <span ion-text color="text2">\n              {{utilService.getTime(item.time,metrics,forecast.timezone)}}\n            </span>\n          </span>\n          <p ion-text color="text2" class="bold">{{utilService.startCase(item.icon)}}</p>\n          <span class="medium" item-right style="margin-left:0">\n            {{utilService.formatTemp(item.temperature,metrics)}}\n          </span>\n          <ion-icon class="small center-child" item-right color="text1"\n                    [name]="item.showDetails?\'arrow-up\':\'arrow-down\'"></ion-icon>\n        </button>\n        <ion-item text-wrap color="primary" style="padding-left: 12%;"\n                  [@collapse]="item.showDetails?\'false\':\'true\'">\n          <ion-grid>\n            <ion-row *ngFor="let detail of item.details">\n              <ion-col>\n                <span class="bold small" ion-text color="text3">{{detail.key}}</span>\n              </ion-col>\n              <ion-col>\n                <span class="bold small">{{detail.value}}</span>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n      </div>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="whichSegment===\'hourly\'">\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/weather-detail/weather-detail.html"*/,
        animations: [Object(__WEBPACK_IMPORTED_MODULE_3__providers_weather_service__["k" /* collapse */])()]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__providers_weather_service__["j" /* UtilService */]])
], WeatherDetailPage);

//# sourceMappingURL=weather-detail.js.map

/***/ }),

/***/ 594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorldCityListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WorldCityListPage = (function () {
    function WorldCityListPage(navCtrl, databaseService, utilService, forecastService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.databaseService = databaseService;
        this.utilService = utilService;
        this.forecastService = forecastService;
        this.modalCtrl = modalCtrl;
    }
    WorldCityListPage.prototype.ngOnInit = function () {
        var self = this;
        self.arrWorldWeather = [];
        self.subscribers = [];
        self.databaseService.get('stopDeleteAnimation').then(function (stop) {
            self.databaseService.getAllWorldLocations().then(function (locations) {
                __WEBPACK_IMPORTED_MODULE_3_lodash__["forEach"](locations, function (location, index) {
                    self.arrWorldWeather.push({
                        location: location,
                        firstDailyForecast: null,
                        timezone: null,
                        shouldAnimate: stop ? false : index === 0
                    });
                });
                self.updateForecast();
            });
        });
    };
    WorldCityListPage.prototype.ionViewWillEnter = function () {
        var self = this;
        this.databaseService.getJson(__WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["a" /* CONFIG */].METRICS).then(function (data) {
            if (data === null) {
                self.databaseService.setJson(__WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["a" /* CONFIG */].METRICS, __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["b" /* DEFAULT_METRICS */]);
                self.metrics = __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["b" /* DEFAULT_METRICS */];
            }
            else {
                self.metrics = data;
            }
        });
        self.updateForecast();
    };
    WorldCityListPage.prototype.ionViewWillLeave = function () {
        __WEBPACK_IMPORTED_MODULE_3_lodash__["forEach"](this.subscribers, function (sub) { return sub.unsubscribe(); });
    };
    WorldCityListPage.prototype.updateForecast = function () {
        var self = this;
        __WEBPACK_IMPORTED_MODULE_3_lodash__["forEach"](self.arrWorldWeather, function (wwObj) {
            var sub = self.forecastService.getForecast(wwObj.location, true)
                .subscribe(function (forecast) {
                if (forecast && forecast.daily && forecast.daily.data) {
                    wwObj.firstDailyForecast = forecast.daily.data[0];
                    wwObj.timezone = forecast.timezone;
                }
            }, function (err) {
                console.error(err);
            });
            self.subscribers.push(sub);
        });
    };
    WorldCityListPage.prototype.addLocation = function () {
        var self = this;
        var modal = self.modalCtrl.create('LocationPage', { heading: 'Add New City' });
        modal.onDidDismiss(function (data) {
            if (!data) {
                return;
            }
            self.databaseService.addWorldLocation(data).then(function (success) {
                if (!success) {
                    return;
                }
                var exists = __WEBPACK_IMPORTED_MODULE_3_lodash__["find"](self.arrWorldWeather, function (obj) { return obj.location.name === data.name; });
                if (exists) {
                    self.utilService.showToast(data.name + ' already exists');
                    return;
                }
                self.arrWorldWeather.push({
                    location: data,
                    firstDailyForecast: null,
                    timezone: null,
                    shouldAnimate: false
                });
                self.forecastService.getForecast(data)
                    .subscribe(function (forecast) {
                    if (forecast && forecast.daily && forecast.daily.data) {
                        var obj = __WEBPACK_IMPORTED_MODULE_3_lodash__["find"](self.arrWorldWeather, { location: data });
                        if (obj) {
                            obj.firstDailyForecast = forecast.daily.data[0];
                            obj.timezone = forecast.timezone;
                        }
                    }
                }, function (err) {
                    console.error(err);
                });
            });
        });
        modal.present();
    };
    WorldCityListPage.prototype.delete = function (location) {
        var self = this;
        self.databaseService.removeWorldLocation(location.name).then(function (success) {
            if (success) {
                __WEBPACK_IMPORTED_MODULE_3_lodash__["remove"](self.arrWorldWeather, function (obj) { return obj.location.name === location.name; });
            }
        });
        self.databaseService.set('stopDeleteAnimation', 'true');
    };
    WorldCityListPage.prototype.locationClicked = function (location) {
        this.navCtrl.push('CityWeatherPage', { location: location });
    };
    return WorldCityListPage;
}());
WorldCityListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-world-city-list',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/world-city-list/world-city-list.html"*/'<!--suppress ALL -->\n<ion-header no-border>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>World Weather</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-fab right bottom>\n    <button ion-fab (click)="addLocation()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n\n  <ion-list *ngIf="arrWorldWeather">\n    <ion-item-sliding *ngFor="let item of arrWorldWeather" [animateItemSliding]="item.shouldAnimate">\n      <button ion-item text-wrap (click)="locationClicked(item.location)">\n        <img [src]="utilService.getWeatherIcon(item?.firstDailyForecast?.icon)"\n             onerror="this.src=\'assets/img/default.png\'"\n             item-left style="max-width: 12%">\n        <div class="medium">{{item.location.name}}</div>\n        <p *ngIf="item.firstDailyForecast" class="bold" ion-text color="text2">\n          {{utilService.getStandardDay(item.firstDailyForecast.time,item.timezone)}}\n        </p>\n        <div *ngIf="item.firstDailyForecast && metrics" class="large" ion-text color="text1" item-right>\n          {{utilService.formatTemp(item.firstDailyForecast.temperatureMax,metrics)}}\n        </div>\n        <p *ngIf="item.firstDailyForecast && metrics" class="medium bold" ion-text color="text2" item-right>\n          {{utilService.formatTemp(item.firstDailyForecast.temperatureMin,metrics)}}\n        </p>\n      </button>\n      <ion-item-options>\n        <button ion-button color="danger" (click)="delete(item.location)">\n          <ion-icon name="trash"></ion-icon>\n          Delete\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/world-city-list/world-city-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["c" /* DatabaseService */],
        __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["j" /* UtilService */],
        __WEBPACK_IMPORTED_MODULE_2__providers_weather_service__["d" /* ForecastService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */]])
], WorldCityListPage);

//# sourceMappingURL=world-city-list.js.map

/***/ }),

/***/ 595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_module__ = __webpack_require__(396);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__directives_module__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimateItemSliding; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AnimateItemSliding = (function () {
    function AnimateItemSliding(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    AnimateItemSliding.prototype.ngOnInit = function () {
        var _this = this;
        if (this.shouldAnimate) {
            this.renderer.addClass(this.element.nativeElement, 'active-slide');
            this.renderer.addClass(this.element.nativeElement, 'active-options-right');
            // Wait to apply animation
            setTimeout(function () {
                _this.renderer.addClass(_this.element.nativeElement.firstElementChild, 'itemSlidingAnimation');
                // disables after first animation
                setTimeout(function () {
                    _this.renderer.removeClass(_this.element.nativeElement, 'active-slide');
                    _this.renderer.removeClass(_this.element.nativeElement, 'active-options-right');
                    _this.renderer.removeClass(_this.element.nativeElement.firstElementChild, 'itemSlidingAnimation');
                }, 1000);
            }, 500);
        }
    };
    return AnimateItemSliding;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('animateItemSliding'),
    __metadata("design:type", Boolean)
], AnimateItemSliding.prototype, "shouldAnimate", void 0);
AnimateItemSliding = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[animateItemSliding]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"]])
], AnimateItemSliding);

//# sourceMappingURL=animate-item-sliding.js.map

/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CityWeatherPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CityWeatherPage = (function () {
    function CityWeatherPage(params) {
        this.params = params;
        this.location = params.data.location;
    }
    return CityWeatherPage;
}());
CityWeatherPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-city-weather',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/city-weather/city-weather.html"*/'<!--suppress ALL -->\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>City Weather</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content class="bg-light">\n  <weather-list [location]="location"></weather-list>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/weather/city-weather/city-weather.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
], CityWeatherPage);

//# sourceMappingURL=city-weather.js.map

/***/ }),

/***/ 598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileOnePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProfileOnePage = (function () {
    function ProfileOnePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.posts = [];
        this.imageUrl = 'assets/img/profile/profile-cover.jpg';
        for (var i = 0; i < 10; i++) {
            this.posts[i] = {
                text: 'Post text ' + i,
                created_at: (i + 1),
            };
        }
    }
    return ProfileOnePage;
}());
ProfileOnePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-profile-one',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/profile/profile-one/profile-one.html"*/'<ion-header  color="primary">\n  <ion-navbar>\n    <ion-title>Profile Page</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <div id="profile-bg" [ngStyle]="{\'background-image\': \'url(\' + imageUrl +\')\'}"></div>\n  <div id="content">\n    <div id="profile-info">\n      <img id="profile-image" src="assets/img/profile/profile-2.jpg">\n      <h3 id="profile-name">John</h3>\n      <span id="profile-description">Traveler, geek and animal lover.</span>\n      <p>Follow my <a href="http://twitter.com/ionicframework">@facebook</a> and\n        <a href="http://twitter.com/driftyco">@twitter</a> accounts.</p>\n    </div>\n    <ion-list>\n      <ion-item *ngFor="let post of posts">\n        <img class="post-profile-image" src="assets/img/misc/cat.jpg"> {{post.text}}\n        <div class="post-time">{{post.created_at}} something</div>\n        <div class="post-options">\n          <ion-icon name="undo"></ion-icon>\n        </div>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/profile/profile-one/profile-one.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */]])
], ProfileOnePage);

//# sourceMappingURL=profile-one.js.map

/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileSettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_util_toast_service__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_util_alert_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfileSettingsPage = (function () {
    function ProfileSettingsPage(navParams, navCtrl, alertService, authProvider, viewController, toastCtrl) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.authProvider = authProvider;
        this.viewController = viewController;
        this.toastCtrl = toastCtrl;
        this.placeholder_picture = "http://api.adorable.io/avatar/200/bob";
        this.enableNotifications = true;
        this.languages = ['English', 'Portuguese', 'French'];
        this.paymentMethods = ['Paypal', 'Credit Card'];
        this.currencies = ['USD', 'BRL', 'EUR'];
        this.user = {
            name: 'Marty Mcfly',
            email: '',
            imageUrl: 'assets/img/avatar/marty-avatar.png'
        };
        if (navParams.get('user')) {
            var userData = navParams.get('user');
            this.user.email = userData.email;
        }
    }
    ProfileSettingsPage.prototype.toggleNotifications = function () {
        if (this.enableNotifications) {
            this.toastCtrl.create("Notifications enabled.");
        }
        else {
            this.toastCtrl.create("Notifications disabled.");
        }
    };
    ProfileSettingsPage.prototype.updateImage = function (value) {
        this.profile_picture = 'data:image/jpeg;base64,' + value.val();
    };
    ProfileSettingsPage.prototype.updateProfileImage = function () {
        // this.camera.getPicture({
        //   quality: 50,
        //   allowEdit: true,
        //   cameraDirection: this.camera.Direction.FRONT,
        //   destinationType: this.camera.DestinationType.DATA_URL
        // }).then((imageData) => {
        //   this.user.imageUrl = imageData;
        // }, (err) => {
        //   this.toastCtrl.create("Error: " + err);
        // });
    };
    ProfileSettingsPage.prototype.logOut = function () {
        var _this = this;
        this.alertService.presentAlertWithCallback("Are you sure?", "This will log you out of this application.").then(function (yes) {
            if (yes) {
                _this.authProvider.logoutUser();
                console.log('User iog out successfully.');
                // this.viewController.dismiss();
                // this.authProvider.logoutUser().then( authData => {
                //   console.log('User iog out successfully.')
                //   this.viewController.dismiss();
                // }, error => {
                //   console.log(error)
                // });
                // this.toastCtrl.create("Logged out of the application");
            }
        });
    };
    return ProfileSettingsPage;
}());
ProfileSettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'page-profile-settings',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/profile/profile-settings/profile-settings.html"*/'<ion-header>\n  <ion-navbar  color="primary">\n    <ion-title>User Settings</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list>\n    <ion-list-header>\n      <!--<ion-avatar item-start (click)="updateProfileImage()">-->\n        <!--<img [src]="user.imageUrl ? user.imageUrl : placeholder_picture">-->\n      <!--</ion-avatar>-->\n      <!--<p class="username">{{user.name}}</p>-->\n      <p class="useremail">{{user.email}}</p>\n    </ion-list-header>\n  </ion-list>\n  <ion-list no-border>\n    <ion-list-header>\n      General\n    </ion-list-header>\n    <ion-item>\n      <ion-icon name=\'settings\' item-start></ion-icon>\n      <ion-label>App Language</ion-label>\n      <ion-select [(ngModel)]="language">\n        <ion-option *ngFor="let language of languages" [value]="language">{{language}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-toggle [(ngModel)]="enableNotifications" (click)="toggleNotifications()"></ion-toggle>\n      <ion-label class="label"> Enable notifications </ion-label>\n      <ion-icon name=\'notifications\' item-start></ion-icon>\n    </ion-item>\n  </ion-list>\n  <ion-list>\n    <ion-list-header>\n      Currency\n    </ion-list-header>\n    <ion-item>\n      <ion-icon name=\'card\' item-start></ion-icon>\n      <ion-label>Payment Method</ion-label>\n      <ion-select [(ngModel)]="paymentMethod">\n        <ion-option *ngFor="let method of paymentMethods" [value]="method">{{method}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-icon name=\'logo-usd\' item-start></ion-icon>\n      <ion-label>Currency</ion-label>\n      <ion-select [(ngModel)]="currency">\n        <ion-option *ngFor="let currency of currencies" [value]="currency">{{currency}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n  <!--<ion-list>-->\n    <!--<ion-list-header>-->\n      <!--Other-->\n    <!--</ion-list-header>-->\n    <!--<ion-item>-->\n      <!--<ion-icon name=\'power\' item-start></ion-icon>-->\n      <!--<button ion-button (click)="logOut()" item-end>-->\n      <!--Logout-->\n      <!--</button>-->\n    <!--</ion-item>-->\n  <!--</ion-list>-->\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/profile/profile-settings/profile-settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1__providers_util_alert_service__["a" /* AlertService */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["t" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_0__providers_util_toast_service__["a" /* ToastService */]])
], ProfileSettingsPage);

//# sourceMappingURL=profile-settings.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthProvider = (function () {
    function AuthProvider(afAuth, afDatabase) {
        this.afAuth = afAuth;
        this.afDatabase = afDatabase;
    }
    /**
     * loginUser takes in an email and password and signs the user into the application.
     */
    AuthProvider.prototype.loginUser = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afAuth.auth.signInWithEmailAndPassword(email, password).then(function (user) {
                if (user) {
                    var accountObject = _this.afDatabase.object('/userProfile/' + user.uid).take(1).subscribe(function (data) {
                        resolve(data);
                    });
                    // resolve(accountObject.take(1).subscribe(datat));
                }
                else {
                    resolve(null);
                }
            }).catch(function (err) { reject(err); });
        });
    };
    /**
     * signupUser takes in an email and password and does 3 things:
     * 1. It creates the new user.
     * 2. It signs the user into the application.
     * 3. It creates a database node for the user to store the userProfile, which starts with just
     *    the email address.
     */
    AuthProvider.prototype.signupUser = function (user) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(function (newUser) {
                if (newUser) {
                    user.key = newUser.uid;
                    _this.afDatabase.object("/userProfile/" + newUser.uid).set(user);
                    resolve(user);
                }
                else {
                    resolve(null);
                }
            }).catch(function (err) {
                resolve(null);
            });
        });
    };
    /**
     * resetPassword takes the email address as a string and sends the email with the reset password
     * link.
     */
    AuthProvider.prototype.resetPassword = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    /**
     * logoutUser doesn't take any parameters, it looks into the authentication object and signs out
     * the currently logged in user.
     */
    // logoutUser(): firebase.Promise<any> {
    //   return this.afAuth.auth.signOut();
    // }
    AuthProvider.prototype.logoutUser = function () {
        try {
            this.afAuth.auth.signOut();
        }
        catch (Error) {
        }
    };
    return AuthProvider;
}());
AuthProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], AuthProvider);

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 630:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TruncatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TruncatePipe = (function () {
    function TruncatePipe() {
    }
    TruncatePipe.prototype.transform = function (value, args) {
        var limit = args > 0 ? args : 100;
        var trail = '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    };
    return TruncatePipe;
}());
TruncatePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'truncate'
    })
], TruncatePipe);

//# sourceMappingURL=truncate.pipe.js.map

/***/ }),

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrimHtmlPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TrimHtmlPipe = (function () {
    function TrimHtmlPipe() {
    }
    TrimHtmlPipe.prototype.transform = function (value) {
        return this.htmlToPlainText(value);
    };
    TrimHtmlPipe.prototype.htmlToPlainText = function (html) {
        return String(html).replace(/<[^>]+>/gm, '');
    };
    return TrimHtmlPipe;
}());
TrimHtmlPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'trimHTML'
    })
], TrimHtmlPipe);

//# sourceMappingURL=trim-html.pipe.js.map

/***/ }),

/***/ 632:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_component_home_component__ = __webpack_require__(450);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__home_component_home_component__["a" /* HomeComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__home_component_home_component__["a" /* HomeComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__home_component_home_component__["a" /* HomeComponent */]
        ]
    })
], HomeModule);

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Config = (function () {
    function Config() {
        // public wordpressApiUrl = 'https://ghinforma.sarchitech.com/wp-json';
        this.wordpressApiUrl = 'https://ghinformer.com/wp-json';
        this.wordpressMenusNavigation = false;
        this.feedsUrl = './assets/data/feeds.json';
        this.feedsCategoryUrl = './assets/data/feeds-category.json';
        this.youtubeKey = 'AIzaSyClMa-MaKro_m95tb--4LaAorl-NmGPJxc';
        this.youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/';
        this.youtubeUsername = 'ColdplayVEVO';
        this.youtubeChannelId = 'UCRrW0ddrbFnJCbyZqHHv4KQ';
        this.youtubeResults = 50;
        this.emailTo = 'gtsopour@gmail.com';
    }
    return Config;
}());
Config = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Config);

//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 680:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_component_tabs_component__ = __webpack_require__(473);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var TabsModule = (function () {
    function TabsModule() {
    }
    return TabsModule;
}());
TabsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__tabs_component_tabs_component__["a" /* TabsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__tabs_component_tabs_component__["a" /* TabsComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__tabs_component_tabs_component__["a" /* TabsComponent */]
        ]
    })
], TabsModule);

//# sourceMappingURL=tabs.module.js.map

/***/ }),

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__google_maps_component_google_maps_component__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_google_maps_core__ = __webpack_require__(682);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_google_maps_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var GoogleMapsModule = (function () {
    function GoogleMapsModule() {
    }
    return GoogleMapsModule;
}());
GoogleMapsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__google_maps_component_google_maps_component__["a" /* GoogleMapsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_4_angular2_google_maps_core__["AgmCoreModule"].forRoot({
                apiKey: 'AIzaSyA9aj3-17cojks6gicZZ_PY2t5ERVu25ac'
            })
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__google_maps_component_google_maps_component__["a" /* GoogleMapsComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__google_maps_component_google_maps_component__["a" /* GoogleMapsComponent */]
        ]
    })
], GoogleMapsModule);

//# sourceMappingURL=google-maps.module.js.map

/***/ }),

/***/ 687:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wordpress_home_wordpress_home_component__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wordpress_login_wordpress_login_component__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wordpress_posts_wordpress_posts_component__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wordpress_post_wordpress_post_component__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wordpress_feature_media_wordpress_feature_media_component__ = __webpack_require__(688);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__wordpress_categories_wordpress_categories_component__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__wordpress_tags_wordpress_tags_component__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__wordpress_favorites_wordpress_favorites_component__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__wordpress_pages_wordpress_pages_component__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__wordpress_page_wordpress_page_component__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__wordpress_menus_wordpress_menus_component__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__wordpress_menu_wordpress_menu_component__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__wordpress_menu_item_wordpress_menu_item_component__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__home_component_home_component__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__likes_likes__ = __webpack_require__(482);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var WordpressModule = (function () {
    function WordpressModule() {
    }
    return WordpressModule;
}());
WordpressModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__wordpress_home_wordpress_home_component__["a" /* WordpressHome */],
            __WEBPACK_IMPORTED_MODULE_4__wordpress_login_wordpress_login_component__["a" /* WordpressLogin */],
            __WEBPACK_IMPORTED_MODULE_5__wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */],
            __WEBPACK_IMPORTED_MODULE_6__wordpress_post_wordpress_post_component__["a" /* WordpressPost */],
            __WEBPACK_IMPORTED_MODULE_7__wordpress_feature_media_wordpress_feature_media_component__["a" /* WordpressFeatureMedia */],
            __WEBPACK_IMPORTED_MODULE_8__wordpress_categories_wordpress_categories_component__["a" /* WordpressCategories */],
            __WEBPACK_IMPORTED_MODULE_9__wordpress_tags_wordpress_tags_component__["a" /* WordpressTags */],
            __WEBPACK_IMPORTED_MODULE_10__wordpress_favorites_wordpress_favorites_component__["a" /* WordpressFavorites */],
            __WEBPACK_IMPORTED_MODULE_11__wordpress_pages_wordpress_pages_component__["a" /* WordpressPages */],
            __WEBPACK_IMPORTED_MODULE_12__wordpress_page_wordpress_page_component__["a" /* WordpressPage */],
            __WEBPACK_IMPORTED_MODULE_13__wordpress_menus_wordpress_menus_component__["a" /* WordpressMenus */],
            __WEBPACK_IMPORTED_MODULE_14__wordpress_menu_wordpress_menu_component__["a" /* WordpressMenu */],
            __WEBPACK_IMPORTED_MODULE_15__wordpress_menu_item_wordpress_menu_item_component__["a" /* WordpressMenuItem */],
            __WEBPACK_IMPORTED_MODULE_16__home_component_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_17__likes_likes__["a" /* LikesComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__wordpress_home_wordpress_home_component__["a" /* WordpressHome */],
            __WEBPACK_IMPORTED_MODULE_4__wordpress_login_wordpress_login_component__["a" /* WordpressLogin */],
            __WEBPACK_IMPORTED_MODULE_5__wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */],
            __WEBPACK_IMPORTED_MODULE_6__wordpress_post_wordpress_post_component__["a" /* WordpressPost */],
            __WEBPACK_IMPORTED_MODULE_7__wordpress_feature_media_wordpress_feature_media_component__["a" /* WordpressFeatureMedia */],
            __WEBPACK_IMPORTED_MODULE_8__wordpress_categories_wordpress_categories_component__["a" /* WordpressCategories */],
            __WEBPACK_IMPORTED_MODULE_9__wordpress_tags_wordpress_tags_component__["a" /* WordpressTags */],
            __WEBPACK_IMPORTED_MODULE_10__wordpress_favorites_wordpress_favorites_component__["a" /* WordpressFavorites */],
            __WEBPACK_IMPORTED_MODULE_11__wordpress_pages_wordpress_pages_component__["a" /* WordpressPages */],
            __WEBPACK_IMPORTED_MODULE_12__wordpress_page_wordpress_page_component__["a" /* WordpressPage */],
            __WEBPACK_IMPORTED_MODULE_13__wordpress_menus_wordpress_menus_component__["a" /* WordpressMenus */],
            __WEBPACK_IMPORTED_MODULE_14__wordpress_menu_wordpress_menu_component__["a" /* WordpressMenu */],
            __WEBPACK_IMPORTED_MODULE_15__wordpress_menu_item_wordpress_menu_item_component__["a" /* WordpressMenuItem */],
            __WEBPACK_IMPORTED_MODULE_16__home_component_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_17__likes_likes__["a" /* LikesComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__wordpress_home_wordpress_home_component__["a" /* WordpressHome */],
            __WEBPACK_IMPORTED_MODULE_4__wordpress_login_wordpress_login_component__["a" /* WordpressLogin */],
            __WEBPACK_IMPORTED_MODULE_5__wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */],
            __WEBPACK_IMPORTED_MODULE_6__wordpress_post_wordpress_post_component__["a" /* WordpressPost */],
            __WEBPACK_IMPORTED_MODULE_7__wordpress_feature_media_wordpress_feature_media_component__["a" /* WordpressFeatureMedia */],
            __WEBPACK_IMPORTED_MODULE_8__wordpress_categories_wordpress_categories_component__["a" /* WordpressCategories */],
            __WEBPACK_IMPORTED_MODULE_9__wordpress_tags_wordpress_tags_component__["a" /* WordpressTags */],
            __WEBPACK_IMPORTED_MODULE_10__wordpress_favorites_wordpress_favorites_component__["a" /* WordpressFavorites */],
            __WEBPACK_IMPORTED_MODULE_11__wordpress_pages_wordpress_pages_component__["a" /* WordpressPages */],
            __WEBPACK_IMPORTED_MODULE_12__wordpress_page_wordpress_page_component__["a" /* WordpressPage */],
            __WEBPACK_IMPORTED_MODULE_13__wordpress_menus_wordpress_menus_component__["a" /* WordpressMenus */],
            __WEBPACK_IMPORTED_MODULE_14__wordpress_menu_wordpress_menu_component__["a" /* WordpressMenu */],
            __WEBPACK_IMPORTED_MODULE_15__wordpress_menu_item_wordpress_menu_item_component__["a" /* WordpressMenuItem */],
            __WEBPACK_IMPORTED_MODULE_16__home_component_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_17__likes_likes__["a" /* LikesComponent */]
        ]
    })
], WordpressModule);

//# sourceMappingURL=wordpress.module.js.map

/***/ }),

/***/ 688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressFeatureMedia; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_network_network__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WordpressFeatureMedia = (function () {
    // image_url = 'assets/img/placeholder.png';
    function WordpressFeatureMedia(wordpressService, network) {
        this.wordpressService = wordpressService;
        this.network = network;
        this.timeInterval = null;
    }
    WordpressFeatureMedia.prototype.ngOnInit = function () {
        if (this.id > 0) {
            this.getMedia(this.id);
        }
    };
    WordpressFeatureMedia.prototype.getMedia = function (id) {
        var _this = this;
        this.wordpressService.getMedia(id)
            .subscribe(function (result) {
            _this.media = result;
            // this.image_url = this.media.source_url;
            if (_this.timeInterval) {
                // alert("claear1");
                clearInterval(_this.timeInterval);
            }
        }, function (err) {
            // alert(this.network.obtainNetworkConnection());
            // if (!this.network.obtainNetworkConnection() && this.timeInterval == null) {
            // 	this.timeInterval = setInterval((function () {
            // 		alert("start");
            // 		this.getMedia(id)
            // 	}).bind(this), 2000);
            // 	console.log("Oops!");
            // }
            // else{
            // 	alert("ddd");
            // 	if (this.network.obtainNetworkConnection() && this.timeInterval != null)
            // 	{
            //
            // 		clearInterval(this.timeInterval);
            // 	}
            // }
            // console.log("Oops!");
        });
    };
    return WordpressFeatureMedia;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], WordpressFeatureMedia.prototype, "id", void 0);
WordpressFeatureMedia = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'wordpress-feature-media',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-feature-media/wordpress-feature-media.html"*/'<img *ngIf="media && media.media_type == \'image\' " src="{{media.source_url}}" />\n<img src="assets/img/placeholder.png" *ngIf="!media || media.media_type != \'image\' ">\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-feature-media/wordpress-feature-media.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_1__shared_services_wordpress_service__["a" /* WordpressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_services_wordpress_service__["a" /* WordpressService */], __WEBPACK_IMPORTED_MODULE_2__providers_network_network__["a" /* NetworkProvider */]])
], WordpressFeatureMedia);

//# sourceMappingURL=wordpress-feature-media.component.js.map

/***/ }),

/***/ 689:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SlidesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__slides_component_slides_component__ = __webpack_require__(456);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SlidesModule = (function () {
    function SlidesModule() {
    }
    return SlidesModule;
}());
SlidesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__slides_component_slides_component__["a" /* SlidesComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__slides_component_slides_component__["a" /* SlidesComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__slides_component_slides_component__["a" /* SlidesComponent */]
        ]
    })
], SlidesModule);

//# sourceMappingURL=slides.module.js.map

/***/ }),

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__grid_component_grid_component__ = __webpack_require__(691);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var GridModule = (function () {
    function GridModule() {
    }
    return GridModule;
}());
GridModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__grid_component_grid_component__["a" /* GridComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__grid_component_grid_component__["a" /* GridComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__grid_component_grid_component__["a" /* GridComponent */]
        ]
    })
], GridModule);

//# sourceMappingURL=grid.module.js.map

/***/ }),

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GridComponent = (function () {
    function GridComponent() {
    }
    return GridComponent;
}());
GridComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/grid/grid-component/grid.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{\'GRID\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="grid-basic-page">\n  <ion-row>\n    <ion-col><div>col</div></ion-col>\n    <ion-col><div>col</div></ion-col>\n    <ion-col><div>col</div></ion-col>\n    <ion-col>\n      <div>\n        col<br>\n        3 lines<br>\n        of text<br>\n      </div>\n    </ion-col>\n  </ion-row>\n\n  <ion-row center>\n    <ion-col><div>col</div></ion-col>\n    <ion-col><div>col</div></ion-col>\n    <ion-col><div>col</div></ion-col>\n    <ion-col>\n      <div>\n        col<br>\n        3 lines<br>\n        center<br>\n      </div>\n    </ion-col>\n  </ion-row>\n\n  <ion-row center>\n    <ion-col offset-25><div>col</div></ion-col>\n    <ion-col><div>col</div></ion-col>\n    <ion-col>\n      <div>\n        col<br>\n        3 lines<br>\n        center<br>\n      </div>\n    </ion-col>\n  </ion-row>\n\n  <ion-row baseline>\n    <ion-col offset-50><div>col</div></ion-col>\n    <ion-col>\n      <div>\n        col<br>\n        3 lines<br>\n        baseline<br>\n      </div>\n    </ion-col>\n  </ion-row>\n\n  <ion-row baseline>\n    <ion-col offset-75>\n      <div>\n        col<br>\n        2 lines<br>\n      </div>\n    </ion-col>\n  </ion-row>\n\n\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/grid/grid-component/grid.html"*/
    })
], GridComponent);

//# sourceMappingURL=grid.component.js.map

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_component_settings_component__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SettingsModule = (function () {
    function SettingsModule() {
    }
    return SettingsModule;
}());
SettingsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__settings_component_settings_component__["a" /* SettingsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__settings_component_settings_component__["a" /* SettingsComponent */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__settings_component_settings_component__["a" /* SettingsComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__settings_component_settings_component__["a" /* SettingsComponent */]
        ]
    })
], SettingsModule);

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__feed_categories_feed_categories_component__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feed_category_feed_category_component__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__feeds_feeds_component__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__feed_feed_component__ = __webpack_require__(459);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var FeedsModule = (function () {
    function FeedsModule() {
    }
    return FeedsModule;
}());
FeedsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__feed_categories_feed_categories_component__["a" /* FeedCategoriesComponent */],
            __WEBPACK_IMPORTED_MODULE_4__feed_category_feed_category_component__["a" /* FeedCategoryComponent */],
            __WEBPACK_IMPORTED_MODULE_5__feeds_feeds_component__["a" /* FeedsComponent */],
            __WEBPACK_IMPORTED_MODULE_6__feed_feed_component__["a" /* FeedComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__feed_categories_feed_categories_component__["a" /* FeedCategoriesComponent */],
            __WEBPACK_IMPORTED_MODULE_4__feed_category_feed_category_component__["a" /* FeedCategoryComponent */],
            __WEBPACK_IMPORTED_MODULE_5__feeds_feeds_component__["a" /* FeedsComponent */],
            __WEBPACK_IMPORTED_MODULE_6__feed_feed_component__["a" /* FeedComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__feed_categories_feed_categories_component__["a" /* FeedCategoriesComponent */],
            __WEBPACK_IMPORTED_MODULE_4__feed_category_feed_category_component__["a" /* FeedCategoryComponent */],
            __WEBPACK_IMPORTED_MODULE_5__feeds_feeds_component__["a" /* FeedsComponent */],
            __WEBPACK_IMPORTED_MODULE_6__feed_feed_component__["a" /* FeedComponent */]
        ]
    })
], FeedsModule);

//# sourceMappingURL=feeds.module.js.map

/***/ }),

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__youtube_videos_youtube_videos_component__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__youtube_video_youtube_video_component__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__youtube_channel_youtube_channel_component__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__youtube_channel_video_youtube_channel_video_component__ = __webpack_require__(464);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var YoutubeModule = (function () {
    function YoutubeModule() {
    }
    return YoutubeModule;
}());
YoutubeModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__youtube_videos_youtube_videos_component__["a" /* YoutubeVideosComponent */],
            __WEBPACK_IMPORTED_MODULE_4__youtube_video_youtube_video_component__["a" /* YoutubeVideoComponent */],
            __WEBPACK_IMPORTED_MODULE_5__youtube_channel_youtube_channel_component__["a" /* YoutubeChannelComponent */],
            __WEBPACK_IMPORTED_MODULE_6__youtube_channel_video_youtube_channel_video_component__["a" /* YoutubeChannelVideoComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__youtube_videos_youtube_videos_component__["a" /* YoutubeVideosComponent */],
            __WEBPACK_IMPORTED_MODULE_4__youtube_video_youtube_video_component__["a" /* YoutubeVideoComponent */],
            __WEBPACK_IMPORTED_MODULE_5__youtube_channel_youtube_channel_component__["a" /* YoutubeChannelComponent */],
            __WEBPACK_IMPORTED_MODULE_6__youtube_channel_video_youtube_channel_video_component__["a" /* YoutubeChannelVideoComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__youtube_videos_youtube_videos_component__["a" /* YoutubeVideosComponent */],
            __WEBPACK_IMPORTED_MODULE_4__youtube_video_youtube_video_component__["a" /* YoutubeVideoComponent */],
            __WEBPACK_IMPORTED_MODULE_5__youtube_channel_youtube_channel_component__["a" /* YoutubeChannelComponent */],
            __WEBPACK_IMPORTED_MODULE_6__youtube_channel_video_youtube_channel_video_component__["a" /* YoutubeChannelVideoComponent */]
        ]
    })
], YoutubeModule);

//# sourceMappingURL=youtube.module.js.map

/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__about_component_about_component__ = __webpack_require__(177);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AboutModule = (function () {
    function AboutModule() {
    }
    return AboutModule;
}());
AboutModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__about_component_about_component__["a" /* AboutComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__about_component_about_component__["a" /* AboutComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__about_component_about_component__["a" /* AboutComponent */]
        ]
    })
], AboutModule);

//# sourceMappingURL=about.module.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contact_component_contact_component__ = __webpack_require__(474);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ContactModule = (function () {
    function ContactModule() {
    }
    return ContactModule;
}());
ContactModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__contact_component_contact_component__["a" /* ContactComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__contact_component_contact_component__["a" /* ContactComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__contact_component_contact_component__["a" /* ContactComponent */]
        ]
    })
], ContactModule);

//# sourceMappingURL=contact.module.js.map

/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatetimeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__datetime_component_datetime_component__ = __webpack_require__(698);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DatetimeModule = (function () {
    function DatetimeModule() {
    }
    return DatetimeModule;
}());
DatetimeModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__datetime_component_datetime_component__["a" /* DatetimeComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__datetime_component_datetime_component__["a" /* DatetimeComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__datetime_component_datetime_component__["a" /* DatetimeComponent */]
        ]
    })
], DatetimeModule);

//# sourceMappingURL=datetime.module.js.map

/***/ }),

/***/ 698:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatetimeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DatetimeComponent = (function () {
    function DatetimeComponent() {
        this.event = {
            month: '1990-02-19',
            timeStarts: '07:43',
            timeEnds: '1990-02-20'
        };
    }
    return DatetimeComponent;
}());
DatetimeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/datetime/datetime-component/datetime.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      {{\'DATETIME\' | translate}}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="outer-content">\n\n  <ion-list>\n    <ion-item>\n      <ion-label>Start Date</ion-label>\n      <ion-datetime displayFormat="MMM DD YYYY" [(ngModel)]="event.month"></ion-datetime>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label>Start Time</ion-label>\n      <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="event.timeStarts"></ion-datetime>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Ends</ion-label>\n      <ion-datetime displayFormat="MMM DD YYYY" [(ngModel)]="event.timeEnds"></ion-datetime>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/datetime/datetime-component/datetime.html"*/
    })
], DatetimeComponent);

//# sourceMappingURL=datetime.component.js.map

/***/ }),

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RangesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ranges_component_ranges_component__ = __webpack_require__(700);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var RangesModule = (function () {
    function RangesModule() {
    }
    return RangesModule;
}());
RangesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__ranges_component_ranges_component__["a" /* RangesComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__ranges_component_ranges_component__["a" /* RangesComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__ranges_component_ranges_component__["a" /* RangesComponent */]
        ]
    })
], RangesModule);

//# sourceMappingURL=ranges.module.js.map

/***/ }),

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RangesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RangesComponent = (function () {
    function RangesComponent() {
        this.brightness = 20;
        this.contrast = 0;
        this.warmth = 1300;
        this.structure = { lower: 33, upper: 60 };
        this.text = 0;
    }
    return RangesComponent;
}());
RangesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/ranges/ranges-component/ranges.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Ranges\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="outer-content">\n  <ion-list>\n    <ion-list-header>\n      Adjust Display\n    </ion-list-header>\n    <ion-item>\n      <ion-range [(ngModel)]="brightness">\n        <ion-icon range-left small name="sunny"></ion-icon>\n        <ion-icon range-right name="sunny"></ion-icon>\n      </ion-range>\n    </ion-item>\n    <ion-item>\n      <ion-range min="-200" max="200" pin="true" [(ngModel)]="contrast" color="secondary">\n        <ion-icon range-left small name="contrast"></ion-icon>\n        <ion-icon range-right name="contrast"></ion-icon>\n      </ion-range>\n    </ion-item>\n    <ion-item>\n      <ion-range dualKnobs="true" pin="true" [(ngModel)]="structure" color="dark">\n        <ion-icon range-left small name="brush"></ion-icon>\n        <ion-icon range-right name="brush"></ion-icon>\n      </ion-range>\n    </ion-item>\n    <ion-item>\n      <ion-range min="1000" max="2000" step="100" snaps="true" [(ngModel)]="warmth" color="danger">\n        <ion-icon range-left small color="danger" name="thermometer"></ion-icon>\n        <ion-icon range-right color="danger" name="thermometer"></ion-icon>\n      </ion-range>\n    </ion-item>\n  </ion-list>\n\n  <ion-list>\n    <ion-list-header>\n      Adjust Text\n    </ion-list-header>\n    <ion-item>\n      <ion-range min="-100" step="10" snaps="true" [(ngModel)]="text">\n        <ion-label range-left class="small-text">A</ion-label>\n        <ion-label range-right>A</ion-label>\n      </ion-range>\n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<style>\n  ion-list + ion-list {\n    margin-top: 0;\n  }\n\n  .small-text {\n    font-size: 10px;\n  }\n</style>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/ranges/ranges-component/ranges.html"*/
    })
], RangesComponent);

//# sourceMappingURL=ranges.component.js.map

/***/ }),

/***/ 701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionSheetModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__action_sheet_component_action_sheet_component__ = __webpack_require__(702);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ActionSheetModule = (function () {
    function ActionSheetModule() {
    }
    return ActionSheetModule;
}());
ActionSheetModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__action_sheet_component_action_sheet_component__["a" /* ActionSheetComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__action_sheet_component_action_sheet_component__["a" /* ActionSheetComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__action_sheet_component_action_sheet_component__["a" /* ActionSheetComponent */]
        ]
    })
], ActionSheetModule);

//# sourceMappingURL=action-sheet.module.js.map

/***/ }),

/***/ 702:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionSheetComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ActionSheetComponent = (function () {
    function ActionSheetComponent(platform, actionsheetCtrl) {
        this.platform = platform;
        this.actionsheetCtrl = actionsheetCtrl;
    }
    ActionSheetComponent.prototype.openMenu = function () {
        var actionSheet = this.actionsheetCtrl.create({
            title: 'Albums',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: function () {
                        console.log('Delete clicked');
                    }
                },
                {
                    text: 'Share',
                    icon: !this.platform.is('ios') ? 'share' : null,
                    handler: function () {
                        console.log('Share clicked');
                    }
                },
                {
                    text: 'Play',
                    icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
                    handler: function () {
                        console.log('Play clicked');
                    }
                },
                {
                    text: 'Favorite',
                    icon: !this.platform.is('ios') ? 'heart-outline' : null,
                    handler: function () {
                        console.log('Favorite clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    return ActionSheetComponent;
}());
ActionSheetComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/action-sheet/action-sheet-component/action-sheet.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{\'ACTION_SHEET\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="action-sheets-basic-page">\n  <button ion-button block (click)="openMenu()">\n    Show Action Sheet\n  </button>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/action-sheet/action-sheet-component/action-sheet.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], ActionSheetComponent);

//# sourceMappingURL=action-sheet.component.js.map

/***/ }),

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookConnectModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__facebook_connect_component_facebook_connect_component__ = __webpack_require__(704);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var FacebookConnectModule = (function () {
    function FacebookConnectModule() {
    }
    return FacebookConnectModule;
}());
FacebookConnectModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__facebook_connect_component_facebook_connect_component__["a" /* FacebookConnectComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__facebook_connect_component_facebook_connect_component__["a" /* FacebookConnectComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__facebook_connect_component_facebook_connect_component__["a" /* FacebookConnectComponent */]
        ]
    })
], FacebookConnectModule);

//# sourceMappingURL=facebook-connect.module.js.map

/***/ }),

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookConnectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(469);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FacebookConnectComponent = (function () {
    function FacebookConnectComponent(navController, platform, storage, fb) {
        this.navController = navController;
        this.platform = platform;
        this.storage = storage;
        this.fb = fb;
    }
    FacebookConnectComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    FacebookConnectComponent.prototype.getUser = function () {
        var _this = this;
        this.storage.get('facebook.user')
            .then(function (data) {
            if (data) {
                _this.user = JSON.parse(data);
            }
        });
    };
    FacebookConnectComponent.prototype.login = function () {
        var _this = this;
        var env = this;
        var permissions = new Array();
        permissions = ['public_profile', 'user_friends', 'email'];
        this.fb.login(permissions)
            .then(function (response) {
            var userId = response.authResponse.userID;
            var params = new Array();
            _this.fb.api("/me?fields=name,gender,email", params)
                .then(function (response) {
                response.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                env.user = response;
                env.storage.set('facebook.user', JSON.stringify(env.user));
            });
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
    };
    FacebookConnectComponent.prototype.logout = function () {
        var env = this;
        this.fb.logout()
            .then(function (response) {
            env.user = null;
            env.storage.remove('facebook.user');
        }, function (error) { });
    };
    return FacebookConnectComponent;
}());
FacebookConnectComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/facebook-connect/facebook-connect-component/facebook-connect.html"*/'<ion-content scroll="false" class="page-welcome">\n  <div class="facebook-bg"></div>\n  <div class="facebook-info">\n  <div *ngIf="!user" class="facebook-logo"></div>\n    <div *ngIf="user && user.picture" class="facebook-logo" [ngStyle]="{\'background-image\': \'url(\' + user.picture + \')\'}"></div>\n    <div class="facebook-intro">\n      <span *ngIf="!user">Facebook</span>\n      <span *ngIf="user">Hello {{ user.name }}</span>\n    </div>\n    <div class="facebook-email" *ngIf="user">{{ user.email }}</div>\n  </div>\n  <div padding>\n    <button *ngIf="!user" color="light" ion-button icon-left block (click)="login()">\n      <ion-icon name="logo-facebook"></ion-icon>\n      {{ \'LOGIN\' | translate }}</button>\n    <button *ngIf="user" color="light" ion-button icon-left block (click)="logout()">\n      <ion-icon name="logo-facebook"></ion-icon>\n      {{ \'LOGOUT\' | translate }}\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/facebook-connect/facebook-connect-component/facebook-connect.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */]])
], FacebookConnectComponent);

//# sourceMappingURL=facebook-connect.component.js.map

/***/ }),

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__charts_component_charts_component__ = __webpack_require__(465);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ChartsModule = (function () {
    function ChartsModule() {
    }
    return ChartsModule;
}());
ChartsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__charts_component_charts_component__["a" /* ChartsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__charts_component_charts_component__["a" /* ChartsComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__charts_component_charts_component__["a" /* ChartsComponent */]
        ]
    })
], ChartsModule);

//# sourceMappingURL=charts.module.js.map

/***/ }),

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__firebase_home_firebase_home_component__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__firebase_login_firebase_login_component__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__firebase_sign_up_firebase_sign_up_component__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__firebase_reset_password_firebase_reset_password_component__ = __webpack_require__(472);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var config = {
    apiKey: "AIzaSyDylROIXxYhVGJPrjeVQSJciNGkz7ygv-c",
    authDomain: "ghananews-8a9d2.firebaseapp.com",
    databaseURL: "https://ghananews-8a9d2.firebaseio.com",
    projectId: "ghananews-8a9d2",
    storageBucket: "ghananews-8a9d2.appspot.com",
    messagingSenderId: "658844577080"
};
var FirebaseModule = (function () {
    function FirebaseModule() {
    }
    return FirebaseModule;
}());
FirebaseModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__firebase_home_firebase_home_component__["a" /* FirebaseHomeComponent */],
            __WEBPACK_IMPORTED_MODULE_7__firebase_login_firebase_login_component__["a" /* FirebaseLoginComponent */],
            __WEBPACK_IMPORTED_MODULE_8__firebase_sign_up_firebase_sign_up_component__["a" /* FirebaseSignUpComponent */],
            __WEBPACK_IMPORTED_MODULE_9__firebase_reset_password_firebase_reset_password_component__["a" /* FirebaseResetPasswordComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["b" /* AngularFireDatabaseModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_6__firebase_home_firebase_home_component__["a" /* FirebaseHomeComponent */],
            __WEBPACK_IMPORTED_MODULE_7__firebase_login_firebase_login_component__["a" /* FirebaseLoginComponent */],
            __WEBPACK_IMPORTED_MODULE_8__firebase_sign_up_firebase_sign_up_component__["a" /* FirebaseSignUpComponent */],
            __WEBPACK_IMPORTED_MODULE_9__firebase_reset_password_firebase_reset_password_component__["a" /* FirebaseResetPasswordComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__firebase_home_firebase_home_component__["a" /* FirebaseHomeComponent */],
            __WEBPACK_IMPORTED_MODULE_7__firebase_login_firebase_login_component__["a" /* FirebaseLoginComponent */],
            __WEBPACK_IMPORTED_MODULE_8__firebase_sign_up_firebase_sign_up_component__["a" /* FirebaseSignUpComponent */],
            __WEBPACK_IMPORTED_MODULE_9__firebase_reset_password_firebase_reset_password_component__["a" /* FirebaseResetPasswordComponent */]
        ]
    })
], FirebaseModule);

//# sourceMappingURL=firebase.module.js.map

/***/ }),

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeatherModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weather_component_weather_component__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(150);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var WeatherModule = (function () {
    function WeatherModule() {
    }
    return WeatherModule;
}());
WeatherModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__weather_component_weather_component__["a" /* WeatherComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__weather_component_weather_component__["a" /* WeatherComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__weather_component_weather_component__["a" /* WeatherComponent */]
        ]
    })
], WeatherModule);

//# sourceMappingURL=weather.module.js.map

/***/ }),

/***/ 708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DailyScriptureModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__daily_scripture_component_daily_scripture_component__ = __webpack_require__(486);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DailyScriptureModule = (function () {
    function DailyScriptureModule() {
    }
    return DailyScriptureModule;
}());
DailyScriptureModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__daily_scripture_component_daily_scripture_component__["a" /* DailyScriptureComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__daily_scripture_component_daily_scripture_component__["a" /* DailyScriptureComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__daily_scripture_component_daily_scripture_component__["a" /* DailyScriptureComponent */]
        ]
    })
], DailyScriptureModule);

//# sourceMappingURL=daily.scripture.module.js.map

/***/ }),

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencyModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__currency_component_currency_component__ = __webpack_require__(487);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CurrencyModule = (function () {
    function CurrencyModule() {
    }
    return CurrencyModule;
}());
CurrencyModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__currency_component_currency_component__["a" /* CurrencyComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__currency_component_currency_component__["a" /* CurrencyComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__currency_component_currency_component__["a" /* CurrencyComponent */]
        ]
    })
], CurrencyModule);

//# sourceMappingURL=currency.module.js.map

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SentryErrorHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_raven_js__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_raven_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_raven_js__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by mac on 11/08/2017.
 */


__WEBPACK_IMPORTED_MODULE_1_raven_js___default.a
    .config('https://26e167f4ec5743888ae4298e717bc1cb@sentry.io/202611')
    .install();
var SentryErrorHandler = (function (_super) {
    __extends(SentryErrorHandler, _super);
    function SentryErrorHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SentryErrorHandler.prototype.handleError = function (error) {
        // super.handleError(error);
        try {
            __WEBPACK_IMPORTED_MODULE_1_raven_js___default.a.captureException(error.originalError || error);
        }
        catch (e) {
            console.error(e);
        }
    };
    return SentryErrorHandler;
}(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* IonicErrorHandler */]));

//# sourceMappingURL=sentry-errorhandler.js.map

/***/ }),

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LikepopoverModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__likepopover__ = __webpack_require__(483);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LikepopoverModule = (function () {
    function LikepopoverModule() {
    }
    return LikepopoverModule;
}());
LikepopoverModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__likepopover__["a" /* likepopover */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__likepopover__["a" /* likepopover */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__likepopover__["a" /* likepopover */]
        ]
    })
], LikepopoverModule);

//# sourceMappingURL=likepopover.module.js.map

/***/ }),

/***/ 718:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessNewsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__business_news_component__ = __webpack_require__(490);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var BusinessNewsModule = (function () {
    function BusinessNewsModule() {
    }
    return BusinessNewsModule;
}());
BusinessNewsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__business_news_component__["a" /* BusinessNews */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__business_news_component__["a" /* BusinessNews */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__business_news_component__["a" /* BusinessNews */]
        ]
    })
], BusinessNewsModule);

//# sourceMappingURL=business-news.module.js.map

/***/ }),

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SportNewsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sport_news_component__ = __webpack_require__(491);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SportNewsModule = (function () {
    function SportNewsModule() {
    }
    return SportNewsModule;
}());
SportNewsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__sport_news_component__["a" /* SportNews */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__sport_news_component__["a" /* SportNews */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__sport_news_component__["a" /* SportNews */]
        ]
    })
], SportNewsModule);

//# sourceMappingURL=sport-news.module.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyticsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_analytics__ = __webpack_require__(89);
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
 * Created by kang on 27/09/2017.
 */




var AnalyticsProvider = (function () {
    function AnalyticsProvider(http, _GA) {
        this.http = http;
        this._GA = _GA;
        this._TRACKER_ID = 'UA-104510871-1';
        this._USER_ID = '96166653';
    }
    AnalyticsProvider.prototype.initiateAnalytics = function () {
        var _this = this;
        this._GA.startTrackerWithId(this._TRACKER_ID).then(function () {
            // alert('Google analytics is ready now');
            _this._GA.trackView('view');
            _this.setAppVersion();
            _this.setUserID();
        })
            .catch(function (e) {
            console.dir('Error starting GoogleAnalytics:' + e);
        });
    };
    AnalyticsProvider.prototype.setUserID = function () {
        this._GA.setUserId(this._USER_ID);
    };
    AnalyticsProvider.prototype.setAppVersion = function () {
        this._GA.setAppVersion('3.0.0');
    };
    AnalyticsProvider.prototype.trackPageView = function (screen) {
        this._GA.trackView(screen);
    };
    // trackCustomMetric(key:string, value:any):void{
    //     this._GA.trackMetric(key, value);
    // }
    AnalyticsProvider.prototype.trackPageEvent = function (category, action) {
        this._GA.trackEvent(category, action);
    };
    AnalyticsProvider.prototype.trackTiming = function (category, timeTaken, variable, label) {
        this._GA.trackTiming(category, timeTaken, variable, label);
    };
    AnalyticsProvider.prototype.trackException = function (whatHappend, isFatal) {
        if (isFatal === void 0) { isFatal = null; }
        this._GA.trackException(whatHappend, isFatal);
    };
    return AnalyticsProvider;
}());
AnalyticsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_analytics__["a" /* GoogleAnalytics */]])
], AnalyticsProvider);

//# sourceMappingURL=analytics.js.map

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceholderModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__placeholder_component_placeholder_component__ = __webpack_require__(721);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PlaceholderModule = (function () {
    function PlaceholderModule() {
    }
    return PlaceholderModule;
}());
PlaceholderModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__placeholder_component_placeholder_component__["a" /* PlaceholderComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__placeholder_component_placeholder_component__["a" /* PlaceholderComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__placeholder_component_placeholder_component__["a" /* PlaceholderComponent */]
        ]
    })
], PlaceholderModule);

//# sourceMappingURL=placeholder.module.js.map

/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceholderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PlaceholderComponent = (function () {
    function PlaceholderComponent(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return PlaceholderComponent;
}());
PlaceholderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-placeholder',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/placeholder/placeholder-component/placeholder.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <ion-title>Title</ion-title>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	This is a Placeholder Component\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/placeholder/placeholder-component/placeholder.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */]])
], PlaceholderComponent);

//# sourceMappingURL=placeholder.component.js.map

/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_translate__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_config__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_google_analytics__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_social_sharing__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_native_geocoder__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_network_network__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_util_toast_service__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__environments_environment__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_jquery__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_admob_free__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_tabs_tabs_component_tabs_component__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_settings_settings_component_settings_component__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_wordpress_wordpress_menus_wordpress_menus_component__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_wordpress_wordpress_categories_wordpress_categories_component__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_weather_weather_component_weather_component__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_business_news_business_news_component__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_sport_news_sport_news_component__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_profile_profile__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_wordpress_likes_likes__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_wordpress_home_component_home_component__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_about_about_component_about_component__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_daily_scripture_daily_scripture_component_daily_scripture_component__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_currency_currency_component_currency_component__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_wordpress_wordpress_posts_wordpress_posts_component__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_feedback_feedback__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_wordpress_shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__app_global__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_auth_auth__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_util_alert_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_login_login__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__providers_rating_rating__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__providers_analytics_analytics__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











// import { OneSignal } from '@ionic-native/onesignal';


// import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';




// import {
// 	Push,
// 	PushToken
// } from '@ionic/cloud-angular';

// import { Push, PushObject, PushOptions} from '@ionic-native/push';























__WEBPACK_IMPORTED_MODULE_7_firebase___default.a.initializeApp({
    // apiKey: "AIzaSyDmaLu7eOCmkji-VgS9bt7_kgSkCfHTQgU",
    // authDomain: "ghananewsapp-53b34.firebaseapp.com",
    // databaseURL: "https://ghananewsapp-53b34.firebaseio.com",
    // projectId: "ghananewsapp-53b34",
    // storageBucket: "ghananewsapp-53b34.appspot.com",
    // messagingSenderId: "934837894682"
    // apiKey: "AIzaSyDylROIXxYhVGJPrjeVQSJciNGkz7ygv-c",
    // authDomain: "ghananews-8a9d2.firebaseapp.com",
    // databaseURL: "https://ghananews-8a9d2.firebaseio.com",
    // projectId: "ghananews-8a9d2",
    // storageBucket: "ghananews-8a9d2.appspot.com",
    // messagingSenderId: "658844577080"
    apiKey: __WEBPACK_IMPORTED_MODULE_15__environments_environment__["a" /* environment */].firebase.apiKey,
    authDomain: __WEBPACK_IMPORTED_MODULE_15__environments_environment__["a" /* environment */].firebase.authDomain,
    databaseURL: __WEBPACK_IMPORTED_MODULE_15__environments_environment__["a" /* environment */].firebase.databaseURL,
    projectId: __WEBPACK_IMPORTED_MODULE_15__environments_environment__["a" /* environment */].firebase.projectId,
    storageBucket: "",
    messagingSenderId: __WEBPACK_IMPORTED_MODULE_15__environments_environment__["a" /* environment */].firebase.messagingSenderId
});
var MyApp = (function () {
    function MyApp(platform, translate, storage, statusBar, splashScreen, config, menuController, loadingController, wordpressService, alertCtrl, admob, 
        // public push: Push,
        http, global, authProvider, alertService, modalCtrl, afAuth, ga, 
        // private oneSignal: OneSignal,
        socialSharing, networkProvider, toastService, nativeGeocoder, _RATE, _ANALTICS, events) {
        var _this = this;
        this.platform = platform;
        this.translate = translate;
        this.storage = storage;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.config = config;
        this.menuController = menuController;
        this.loadingController = loadingController;
        this.wordpressService = wordpressService;
        this.alertCtrl = alertCtrl;
        this.admob = admob;
        this.http = http;
        this.global = global;
        this.authProvider = authProvider;
        this.alertService = alertService;
        this.modalCtrl = modalCtrl;
        this.afAuth = afAuth;
        this.ga = ga;
        this.socialSharing = socialSharing;
        this.networkProvider = networkProvider;
        this.toastService = toastService;
        this.nativeGeocoder = nativeGeocoder;
        this._RATE = _RATE;
        this._ANALTICS = _ANALTICS;
        this.events = events;
        this.menuPage = __WEBPACK_IMPORTED_MODULE_21__pages_wordpress_wordpress_menus_wordpress_menus_component__["a" /* WordpressMenus */];
        this.wordpressMenusNavigation = false;
        this.categoryPagesTitle = ['Politics', 'Business', 'Sport', 'Entertainment', 'World'];
        this.sign_name = "SIGN IN";
        this.email = '';
        this.category_list = [{ name: 'Business', id: 4 },
            { name: 'Culture', id: 5 },
            { name: 'Entertainment', id: 29 },
            { name: 'Lifestyle', id: 10 },
            { name: 'News', id: 3 },
            { name: 'Politics', id: 7 },
            { name: 'Showbiz', id: 9 },
            { name: 'Sport', id: 2 },
            { name: 'Uncategorized', id: 1 },
            { name: 'World', id: 8 }];
        if (!localStorage.getItem('theme')) {
            this.global.set('theme', '');
        }
        else {
            this.global.set('theme', localStorage.getItem('theme'));
        }
        this.http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            var d = data;
            console.log(d);
        });
        // this.nativeGeocoder.forwardGeocode('Aachen')
        //    .then((coordinates: NativeGeocoderForwardResult) => alert('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude))
        //    .catch((error: any) => alert(JSON.stringify(error)));
        __WEBPACK_IMPORTED_MODULE_16_jquery__["getJSON"]("assets/data/citiesOfAllCountries.json", function (json) {
            console.log(json); // this will show the info it in firebug console
        });
        // this.fcm.subscribeToTopic('marketing');
        //
        // this.fcm.getToken().then(token=>{
        // 	alert(token);
        // });
        //
        // this.fcm.onNotification().subscribe(data=>{
        // 	if(data.wasTapped){
        // 		alert("background  " + JSON.stringify(data));
        // 	} else {
        // 		alert('foreground  ' + JSON.stringify(data));
        // 	};
        // });
        //
        // this.fcm.onTokenRefresh().subscribe(token=>{
        // 	alert(token);
        // });
        //
        // this.fcm.unsubscribeFromTopic('marketing');
        // this.pushSetup();
        // this.googleAnalyticsSetup();
        // localStorage.setItem("isLogin", "false");
        this.initializeApp();
        this.translate.setDefaultLang('en');
        storage.get('language').then(function (value) {
            if (value) {
                _this.translate.use(value);
            }
            else {
                _this.translate.use('en');
                _this.storage.set('language', 'en');
            }
        });
        this.pages = [
            // display top news items, have a news slider, or carousel
            // { title: 'HOME', component: TabsComponent, icon: 'home'},
            { title: 'HOME', component: __WEBPACK_IMPORTED_MODULE_28__pages_wordpress_home_component_home_component__["a" /* HomeComponent */], icon: 'home' },
            { title: 'Categories', component: __WEBPACK_IMPORTED_MODULE_22__pages_wordpress_wordpress_categories_wordpress_categories_component__["a" /* WordpressCategories */], icon: 'link' },
            { title: 'Liked Articles', component: __WEBPACK_IMPORTED_MODULE_27__pages_wordpress_likes_likes__["a" /* LikesComponent */], icon: 'heart' },
            //https://bibles.org/pages/api
            { title: 'Daily Scripture', component: __WEBPACK_IMPORTED_MODULE_30__pages_daily_scripture_daily_scripture_component_daily_scripture_component__["a" /* DailyScriptureComponent */], icon: 'information-circle' },
            { title: 'Politics', component: __WEBPACK_IMPORTED_MODULE_19__pages_tabs_tabs_component_tabs_component__["a" /* TabsComponent */], icon: 'outlet' },
            { title: 'Business', component: __WEBPACK_IMPORTED_MODULE_24__pages_business_news_business_news_component__["a" /* BusinessNews */], icon: 'people' },
            { title: 'Sport', component: __WEBPACK_IMPORTED_MODULE_25__pages_sport_news_sport_news_component__["a" /* SportNews */], icon: 'football' },
            { title: 'Entertainment', component: __WEBPACK_IMPORTED_MODULE_19__pages_tabs_tabs_component_tabs_component__["a" /* TabsComponent */], icon: 'sad' },
            { title: 'World', component: __WEBPACK_IMPORTED_MODULE_19__pages_tabs_tabs_component_tabs_component__["a" /* TabsComponent */], icon: 'globe' },
            { title: 'Currency', component: __WEBPACK_IMPORTED_MODULE_31__pages_currency_currency_component_currency_component__["a" /* CurrencyComponent */], icon: 'card' },
            { title: 'Weather', component: __WEBPACK_IMPORTED_MODULE_23__pages_weather_weather_component_weather_component__["a" /* WeatherComponent */], icon: 'partly-sunny' },
            // settings, contains push notifications settings, region settings
            { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_20__pages_settings_settings_component_settings_component__["a" /* SettingsComponent */], icon: 'settings' },
            { title: 'Share this app', component: __WEBPACK_IMPORTED_MODULE_26__pages_profile_profile__["a" /* ProfileListPage */], icon: 'share' },
            // { title: 'Privacy Policy', component: TabsComponent, icon: 'easel'},
            { title: 'Get in Touch', component: __WEBPACK_IMPORTED_MODULE_33__pages_feedback_feedback__["a" /* FeedbackPage */], icon: 'mail' },
            { title: 'About', component: __WEBPACK_IMPORTED_MODULE_29__pages_about_about_component_about_component__["a" /* AboutComponent */], icon: 'alert' },
        ];
        this.wordpressMenusNavigation = config.wordpressMenusNavigation;
        this.platform.ready().then(function () {
            _this._ANALTICS.initiateAnalytics();
        });
        // this.googleAnalyticsSetup();
    }
    // googleAnalyticsSetup(){
    // 	this.ga.startTrackerWithId('UA-104510871-1')
    //        .then(() => {
    // 			alert('Google analytics is ready now');
    // 			this.ga.trackView('test');
    // 			// Tracker is ready
    // 			// You can now track pages or set additional information such as AppVersion or UserId
    // 		})
    //        .catch(e => alert('Error starting GoogleAnalytics'+e));
    // 	this.ga.enableUncaughtExceptionReporting(true).then((_success) => {
    // 		alert("Successful enabling of uncaught exception reporting "+_success)
    // 	}).catch((_error) => {
    // 		alert("error occured "+_error)
    // 	});
    // //
    //
    // }
    // pushSetup(){
    // 	// Enable to debug issues.
    // 	this.oneSignal.startInit('d7986097-7f5f-4c06-9f72-48d620297cab', '882443494375');
    //
    // 	this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    //
    // 	this.oneSignal.handleNotificationReceived().subscribe(() => {
    // 		// do something when notification is received
    // 		alert('OneSignal received');
    // 	});
    //
    // 	this.oneSignal.handleNotificationOpened().subscribe(() => {
    // 		// do something when a notification is opened
    // 		alert('OneSignal opened');
    // 	});
    //
    // 	this.oneSignal.endInit();
    // // 	const options: PushOptions = {
    // // 		android: {
    // // 			senderID: '882443494375'
    // // 		},
    // // 		ios: {
    // // 			alert: 'true',
    // // 			badge: true,
    // // 			sound: 'false'
    // // 		},
    // // 		windows: {}
    // // 	};
    // //
    // // 	const pushObject: PushObject = this.push.init(options);
    // //
    // // 	pushObject.on('notification').subscribe((notification: any) => {
    // // 		// alert(notification.message);
    // // 		if(notification.additionalData.foreground){
    // // 			// alert(notification.message);
    // // 			let yourAlertCtrl = this.alertCtrl.create({
    // // 				title: 'New Push Notification',
    // // 				message: notification.message
    // // 			});
    // // 			yourAlertCtrl.present();
    // // 		}
    // // 	});
    // //
    // // 	pushObject.on('registration').subscribe((registration: any) => alert('Device registered: ' + registration));
    // //
    // // 	pushObject.on('error').subscribe((error: any) => alert('error with push plugin: ' + error));
    // }
    MyApp.prototype.admobShow = function () {
        // alert('start');
        // var admobid: AdMobType;
        // if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
        // 	// alert("android");
        //   admobid = {
        //     banner: 'ca-app-pub-5862034108951384/4493464110',
        //     interstitial: 'ca-app-pub-3940256099942544/6300978111'
        //   };
        // } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
        // 	// alert("ios");
        //   admobid = {
        //     banner: 'ca-app-pub-8145684018864402/2046455373',
        //     interstitial: 'ca-app-pub-3940256099942544/6300978111'
        //   };
        // } else { // for windows phone
        //   admobid = {
        //     banner: 'ca-app-pub-8145684018864402~9569722170',
        //     interstitial: 'ca-app-pub-3940256099942544/6300978111'
        //   };
        // }
        // alert(admobid.banner);
        // this.admob.createBanner({
        // 	adId: admobid.banner,
        // 	adSize: 'SMART_BANNER',
        // 	isTesting: true,
        // 	// autoShow: true
        // }).then(() => {
        // 	alert('will show admob');
        // 	this.admob.showBanner(8);
        // }).catch(e => {
        // 	alert("error");
        // 		console.log(e);
        // 		alert(e);
        // 	});
        var bannerConfig = {
            isTesting: false,
            autoShow: true,
            id: __WEBPACK_IMPORTED_MODULE_15__environments_environment__["a" /* environment */].ads.appid
            //id: Your Ad Unit ID goes here
        };
        // alert('start');
        this.admob.banner.config(bannerConfig);
        this.admob.banner.prepare().then(function () {
            // alert("end");
        }).catch(function (e) {
            // alert("error");
            console.log(e);
            // alert(e);
        });
    };
    MyApp.prototype.registerNotification = function () {
        // //Register push notification
        // this.push.register().then((t: PushToken) => {
        // 	return this.push.saveToken(t);
        // }).then((t: PushToken) => {
        // 	console.log('Push Token saved:', t.token);
        //
        // 	// this.storage.set(this.KEY_TOKEN, t.token);
        //
        // 	let blogId = Object.keys(res.user_blogs)[0];
        // 	let site = res.user_blogs[blogId].siteurl.split("/").pop();
        //
        // 	this.saveDeviceToken(site, t.token, blogId)
        //        .subscribe((res) => {
        //
        // 			console.log('save device token res:', res);
        // 			this.push.rx.notification()
        //                .subscribe((msg) => {
        // 					console.log('Notification recieved: ',msg.title + ': ' + msg.text);
        // 				});
        //
        // 		});
        //
        // }, err => {
        // 	console.log('Push register failed. Err:'+err);
        // });
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.events.subscribe('loginEvent', function (object) {
                if (object.isLogin) {
                    _this.sign_name = "SIGN OUT";
                    _this.email = object.currentUser;
                }
            });
            if (!_this.networkProvider.obtainNetworkConnection()) {
                console.log('Sorry, network is unavailable. Please make sure status of network.');
                // alert('Sorry, network is unavailable. Please make sure status of network.');
                _this.toastService.create('Sorry, network is unavailable. Please make sure status of network.', false, 3000);
                // this.toastService.present()
                // this.platform.exitApp();
            }
            // Enable RTL Support
            // this.platform.setDir('rtl', true);
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.admobShow();
            _this.loadCurrencies();
            _this.registerNotification();
            // let data = {
            // 	Host: 'http://scraper.sarchitech.com',
            // 	'Content-Length': 26,
            // 	'Content-Type': 'application/x-www-form-urlencoded',
            // 	token: this.device.uuid + '&os=Android'
            // };
            //
            // this.http.post('/pnfw/register/', data).subscribe( data =>{
            // 	alert("success post");
            // });
        });
        // var user = this.afAuth.auth.currentUser;
        // if(!user){
        // 	localStorage.setItem('isLogin', "false")
        // }
        // if (localStorage.getItem('isLogin') != 'true') {
        // 	this.rootPage = HomeComponent;
        // }
        // else {
        // 	var user:any = localStorage.getItem("currentUser");
        // 	this.email = user.email;
        // 	this.sign_name = 'SIGN OUT';
        // 	this.rootPage = HomeComponent;
        // }
        // const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        // 	if (!user) {
        // 		this.rootPage = HomeComponent;
        // 		unsubscribe();
        // 	}
        // 	else {
        if (localStorage.getItem('isLogin') == 'true') {
            this.email = localStorage.getItem('currentUser');
            this.sign_name = 'SIGN OUT';
            this.rootPage = __WEBPACK_IMPORTED_MODULE_28__pages_wordpress_home_component_home_component__["a" /* HomeComponent */];
            // unsubscribe();
        }
        else {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_28__pages_wordpress_home_component_home_component__["a" /* HomeComponent */];
            // unsubscribe();
        }
        // }
        // });
    };
    MyApp.prototype.loadCurrencies = function () {
        // throw new Error('I am a bug..');
        // this.http.get("assets/data/currencies.json")
        //    .map(res => {
        //    	// localStorage.setItem('Currencies', res.json().results);
        // 	}).subscribe(data => {
        // }, (rej) => {
        // 	console.error("Could not load local data",rej);
        // });
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        // this.ga.trackEvent('form', 'vote', 'Hours online', 1)
        //    .then(() => {
        // 		alert('Google analytics Event is ready now');
        // 	});
        this.platform.ready()
            .then(function () {
            _this._ANALTICS.trackPageView(page.title);
        });
        this.menuController.close();
        // if(!localStorage.getItem("isLogin") || localStorage.getItem("isLogin") == "false"){
        // 	this.nav.setRoot(LoginPage);
        // 	let alert = this.alertCtrl.create({
        // 		message: "Please login.",
        // 		buttons: [
        // 			{
        // 				text: "Ok",
        // 				role: 'cancel'
        // 			}
        // 		]
        // 	});
        // 	alert.present();
        // 	return;
        // }
        var isCategoryPage = false;
        if (this.categoryPagesTitle.indexOf(page.title) > -1) {
            isCategoryPage = true;
        }
        if (page.title == 'Logout') {
            this.logOut();
            return;
        }
        if (!isCategoryPage) {
            if (page.title == 'Share this app') {
                this.shareRecipe();
            }
            else if (page.title == 'Get in Touch') {
                this.nav.push(page.component);
            }
            else if (page.title == 'Rate this App') {
                this.promptForAppRating();
                return;
            }
            else {
                this.nav.setRoot(page.component);
            }
        }
        else {
            switch (page.title) {
                case ('Politics'):
                    this.getCategory(page.title);
                    break;
                case ('Business'):
                    this.getCategory(page.title);
                    break;
                case ('Sport'):
                    this.getCategory(page.title);
                    break;
                case ('Entertainment'):
                    this.getCategory(page.title);
                    break;
                case ('World'):
                    this.getCategory(page.title);
                    break;
                default:
                    break;
            }
        }
        // throw new Error('I am a bug... 🐛');
    };
    MyApp.prototype.getCategory = function (categoryName) {
        // let loader = this.loadingController.create({
        // 	content: "Please wait"
        // });
        // loader.present();
        // this.nav.setRoot('LoadingModal', {'isLoading': true});
        // this.nav.push(LoadingModal, {'isLoading': true});
        for (var _i = 0, _a = this.category_list; _i < _a.length; _i++) {
            var cat = _a[_i];
            if (cat.name == categoryName) {
                this.category = cat;
            }
        }
        ;
        this.loadCategory(this.category);
        // this.wordpressService.getCategories()
        //    .subscribe(result => {
        // 			for(var cat of result){
        // 				if(cat.name == categoryName){
        // 					this.category = cat;
        // 				}
        // 			};
        // 			this.loadCategory(this.category);
        //
        // 		},
        // 		error => console.log(error),);
        // () => this.nav.pop(LoadingModal));
    };
    MyApp.prototype.loadCategory = function (category) {
        if (category) {
            // this.nav.pop(LoadingModal);
            // this.nav.push(TabsComponent);
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_32__pages_wordpress_wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */], {
                category: category
            });
            // this.nav.pop(LoadingModal);
        }
    };
    MyApp.prototype.logINOut = function () {
        if (this.sign_name == 'SIGN IN') {
            this.logIn();
        }
        else {
            this.logOut();
        }
    };
    MyApp.prototype.logIn = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_38__pages_login_login__["a" /* LoginPage */]);
        // let modal = this.modalCtrl.create(LoginPage);
        // modal.onDidDismiss(val => {
        // 	if(val.login_status == 'true'){
        // 		this.sign_name = 'SIGN OUT';
        // 		this.email = val.email;
        // 	}
        //
        // });
        // modal.present();
    };
    MyApp.prototype.logOut = function () {
        var _this = this;
        var me = this;
        var confirm = this.alertCtrl.create({
            title: 'Information',
            message: "Are you sure?",
            buttons: [{
                    text: 'Yes',
                    role: 'yes',
                    handler: function () {
                        // this.authProvider.logoutUser();
                        console.log('User iog out successfully.');
                        localStorage.setItem('isLogin', 'false');
                        localStorage.setItem('currentUser', '');
                        _this.sign_name = 'SIGN IN';
                        _this.email = '';
                        // confirm.dismiss().then(() => {
                        // 	this.authProvider.logoutUser();
                        // 	console.log('User iog out successfully.');
                        // });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        // confirm.dismiss().then(() => {
                        //
                        // });
                    }
                }]
        });
        confirm.present();
    };
    MyApp.prototype.getIsLogin = function () {
        return localStorage.getItem('isLogin');
    };
    MyApp.prototype.shareRecipe = function () {
        this.socialSharing.shareWithOptions({
            message: 'GH informer',
            url: 'https://play.google.com/store/apps/details?id=com.ghananews.sarchitech'
        }).then(function () {
            console.log('Shared!');
        }).catch(function (err) {
            console.log('Oops, something went wrong:', err);
        });
    };
    MyApp.prototype.menuOpened = function () {
        // const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        // 	if (!user) {
        // 		unsubscribe();
        // 	}
        // 	else {
        if (localStorage.getItem('isLogin') == 'true') {
            this.email = localStorage.getItem('currentUser');
            this.sign_name = 'SIGN OUT';
            // unsubscribe();
        }
        else {
            this.email = "";
        }
        // 	}
        // });
    };
    MyApp.prototype.promptForAppRating = function () {
        var _this = this;
        // Only allow the plugin to be triggered when the device is ready
        this.platform.ready()
            .then(function () {
            _this._RATE.requestRating();
        });
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/app/app.html"*/'<!--<div class="{{global.state[\'theme\']}}">-->\n  <!--<ion-menu [content]="content" id="menu-material">-->\n    <!--<ion-content>-->\n      <!--<div class="menu-header">-->\n        <!--&lt;!&ndash;material-design-background&ndash;&gt;-->\n        <!--<img class="user-avatar round" [src]="chosenPicture || placeholder" onerror="this.src=\'assets/img/avatar/girl-avatar.png\'"-->\n        <!--/>-->\n        <!--<p class="name">    </p>-->\n        <!--<p class="e-mail">  </p>-->\n      <!--</div>-->\n      <!--<ion-list no-lines>-->\n        <!--<button menuClose="left" ion-item detail-none *ngFor="let p of pages" (click)="openPage(p)">-->\n          <!--<ion-icon [name]="p.icon" item-left></ion-icon>-->\n          <!--{{p.title}}-->\n        <!--</button>-->\n\n        <!--<button menuClose="left" ion-item detail-none (click)="logOut()" *ngIf="getIsLogin()==\'true\'">-->\n          <!--<ion-icon [name]="\'power\'" item-left></ion-icon>-->\n          <!--Logout-->\n        <!--</button>-->\n        <!--<button menuClose="left" ion-item detail-none (click)="logIn()" *ngIf="!getIsLogin() || getIsLogin()==\'false\'">-->\n          <!--<ion-icon [name]="\'power\'" item-left></ion-icon>-->\n          <!--Login-->\n        <!--</button>-->\n      <!--</ion-list>-->\n    <!--</ion-content>-->\n  <!--</ion-menu>-->\n  <!--&lt;!&ndash; Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus &ndash;&gt;-->\n  <!--<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>-->\n<!--</div>-->\n\n\n<div class="{{global.state[\'theme\']}}">\n\n\n<ion-menu [content]="content" (ionOpen)="menuOpened()" (ionDrag)="menuOpened()">\n\n  <!--<ion-header no-border >-->\n    <!--<ion-toolbar>-->\n      <!--<ion-title>Menu</ion-title>-->\n    <!--</ion-toolbar>-->\n  <!--</ion-header>-->\n\n\n  <ion-content>\n    <div style="text-align: center;">\n      <img src="assets/icon/GH Informer-App-Icon-192x192px-2.png" class="menu-logo-image" >\n    </div>\n    <ion-list class="avatarList">\n      <ion-item>\n        <!--<ion-avatar item-left>-->\n          <!--<img src="assets/img/avatar/marty-avatar.png">-->\n        <!--</ion-avatar>-->\n        <h2>{{email}}</h2>\n        <button ion-button color="danger" clear (click)="logINOut()" menuClose><ins>{{sign_name}}</ins></button>\n      </ion-item>\n    </ion-list>\n    <ion-list class="ListMenu">\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        <ion-icon  name="{{p.icon}}"></ion-icon>\n        <span>{{p.title}}</span>\n      </button>\n\n\n      <!--<button menuClose="left" ion-item detail-none (click)="logOut()" *ngIf="getIsLogin()==\'true\'">-->\n        <!--<ion-icon [name]="\'power\'" item-left></ion-icon>-->\n        <!--Logout-->\n      <!--</button>-->\n      <!--<button menuClose="left" ion-item detail-none (click)="logIn()" *ngIf="!getIsLogin() || getIsLogin()==\'false\'">-->\n        <!--<ion-icon [name]="\'power\'" item-left></ion-icon>-->\n        <!--Login-->\n      <!--</button>-->\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n  </div>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_5_ng2_translate__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_34__pages_wordpress_shared_services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_17__ionic_native_admob_free__["a" /* AdMobFree */],
        __WEBPACK_IMPORTED_MODULE_8__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_35__app_global__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_36__providers_auth_auth__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_37__providers_util_alert_service__["a" /* AlertService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_18_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_google_analytics__["a" /* GoogleAnalytics */],
        __WEBPACK_IMPORTED_MODULE_11__ionic_native_social_sharing__["a" /* SocialSharing */],
        __WEBPACK_IMPORTED_MODULE_13__providers_network_network__["a" /* NetworkProvider */],
        __WEBPACK_IMPORTED_MODULE_14__providers_util_toast_service__["a" /* ToastService */],
        __WEBPACK_IMPORTED_MODULE_12__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
        __WEBPACK_IMPORTED_MODULE_39__providers_rating_rating__["a" /* RatingProvider */],
        __WEBPACK_IMPORTED_MODULE_40__providers_analytics_analytics__["a" /* AnalyticsProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeatherServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the WeatherServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var WeatherServiceProvider = (function () {
    function WeatherServiceProvider(http) {
        this.http = http;
        this.data = null;
        console.log('Hello WeatherServiceProvider Provider');
    }
    WeatherServiceProvider.prototype.load = function (currentLoc) {
        // if (this.data) {
        //   return Promise.resolve(this.data);
        // }
        var _this = this;
        return new Promise(function (resolve) {
            // this.http.get('assets/data/data.json')
            //     .map(res => res.json())
            //     .subscribe(data => {
            //       this.data = data;
            //       resolve(this.data);
            //     });
            _this.http.get('https://api.darksky.net/forecast/11471c56c5c16eedc5f1b4a714010a4f/' + currentLoc.lat + ',' + currentLoc.lon)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            });
        });
    };
    WeatherServiceProvider.prototype.getWeather = function (currentLoc) {
        return this.load(currentLoc).then(function (data) {
            return data;
        });
    };
    return WeatherServiceProvider;
}());
WeatherServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], WeatherServiceProvider);

//# sourceMappingURL=weather-service.js.map

/***/ }),

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeocodeServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the GeocodeServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var GeocodeServiceProvider = (function () {
    function GeocodeServiceProvider(http) {
        this.http = http;
        console.log('Hello GeocodeServiceProvider Provider');
    }
    return GeocodeServiceProvider;
}());
GeocodeServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], GeocodeServiceProvider);

//# sourceMappingURL=geocode-service.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NetworkProvider = (function () {
    function NetworkProvider(http, network, toast) {
        this.http = http;
        this.network = network;
        this.toast = toast;
        console.log('Hello Network Provider');
    } // end constructor
    NetworkProvider.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.connected = this.network.onConnect().subscribe(function (data) {
            console.log(data);
            _this.displayNetworkUpdate(data.type);
        }, function (error) { return console.error(error); });
        this.disconnected = this.network.onDisconnect().subscribe(function (data) {
            console.log(data);
            _this.displayNetworkUpdate(data.type);
        }, function (error) { return console.error(error); });
    };
    // displayNetworkUpdate(connectionState: string){
    //   let networkType = this.network.type
    //   this.toast.create({
    //     message: `You are now ${connectionState} via ${networkType}`,
    //     duration: 3000
    //   }).present();
    // }
    NetworkProvider.prototype.checkConnectionStatus = function () {
        var _this = this;
        this.network.onConnect().subscribe(function (data) {
            _this.displayNetworkUpdate(data.type);
            console.info(data.type);
            console.debug(data.type);
            alert(data.type);
        }, function (error) {
            console.warn(error);
        });
        this.network.onDisconnect().subscribe(function (data) {
            _this.displayNetworkUpdate(data.type);
            console.log(data.type);
        }, function (error) { return console.warn(error.message); });
    };
    //displayNetworkUpdateProv(connectionState: string){
    //   let networkType = this.network.type;
    //  alert(`You are now ${connectionState} via ${networkType}`);
    // }
    NetworkProvider.prototype.displayNetworkUpdate = function (connectionState) {
        var networkType = this.network.type;
        this.toast.create({
            message: "You are now " + connectionState + " via " + networkType,
            duration: 3000
        }).present();
    };
    NetworkProvider.prototype.leavingView = function () {
        this.connected.unsubscribe();
        this.disconnected.unsubscribe();
    };
    NetworkProvider.prototype.obtainNetworkConnection = function () {
        // this.platform.ready().then(() => {
        if (navigator.connection != null) {
            var networkState = navigator.connection.type;
            var states = {};
            // states[Connection.UNKNOWN]  = 'Unknown connection';
            // states[Connection.ETHERNET] = 'Ethernet connection';
            // states[Connection.WIFI]     = 'WiFi connection';
            // states[Connection.CELL_2G]  = 'Cell 2G connection';
            // states[Connection.CELL_3G]  = 'Cell 3G connection';
            // states[Connection.CELL_4G]  = 'Cell 4G connection';
            // states[Connection.CELL]     = 'Cell generic connection';
            // states[Connection.NONE]     = 'No network connection';
            if (networkState == 'none') {
                // this.loading_ctrl.dismiss();
                // alert('Connection type: ' + 'No network connection');
                return false;
            }
        }
        return true;
        // });
    };
    return NetworkProvider;
}()); // end class
NetworkProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["s" /* ToastController */]])
], NetworkProvider);

//# sourceMappingURL=network.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseUseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the FirebaseUseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var FirebaseUseProvider = (function () {
    function FirebaseUseProvider(http, afDatabase, afAuth) {
        this.http = http;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        console.log('Hello FirebaseUseProvider Provider');
        // if(this.afAuth.auth.currentUser) {
        //
        //   localStorage.setItem("userUID", this.afAuth.auth.currentUser.uid);
        // }
        // this.userId = this.afAuth.auth.currentUser.uid;
        // firebase.auth().onAuthStateChanged( user => {
        //   this.currentUser = user;
        //   this.commentData = firebase.database().ref('/commentData')
        //       .child(user.uid);
        //   this.commentData.set({'id':1, 'data':'sfdasfsf'});
        //   if (user){
        //     this.currentUser = user;
        //     this.commentData = firebase.database().ref('/commentData')
        //         .child(user.uid);
        //   }
        // });
    }
    FirebaseUseProvider.prototype.saveCommentData = function (data) {
        // firebase.auth().onAuthStateChanged( user => {
        //   this.currentUser = this.afAuth.auth.currentUser;
        return new Promise(function (resolve) {
            if (localStorage.getItem('isLogin') == 'true') {
                var commentData0 = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('/commentData'); //.child(this.afAuth.auth.currentUser.uid);
                // var data = {'post_id':value.id,
                // 			'author_name':value.author_name,
                // 			'author_email': value.author_email,
                // 			'comment': value.content};
                commentData0.push(data).then(function (result) {
                    resolve(true);
                }).catch(function (err) {
                    resolve(false);
                });
            }
            else {
                resolve(false);
            }
        });
    };
    FirebaseUseProvider.prototype.getCommentData = function (post_ID) {
        if (localStorage.getItem('isLogin') == 'true') {
            // var commentData1 = this.afDatabase
            //     .list(`/commentData/${this.afAuth.auth.currentUser.uid}`, {preserveSnapshot: true});
            var commentData1 = this.afDatabase
                .list("/commentData", { preserveSnapshot: true });
            return commentData1;
        }
        else {
            return null;
        }
        // if(localStorage.getItem('isLogin') == 'true') {
        //   var commentData1 = this.afDatabase.list<any>('/commentData').valueChanges();
        // }
        // else{
        //   return null;
        // }
        //  return commentData1;
    };
    return FirebaseUseProvider;
}());
FirebaseUseProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */]])
], FirebaseUseProvider);

//# sourceMappingURL=firebase-use.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_wordpress_service__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WordpressPage = (function () {
    function WordpressPage(navParams, wordpressService, loadingController, iab, socialSharing) {
        this.navParams = navParams;
        this.wordpressService = wordpressService;
        this.loadingController = loadingController;
        this.iab = iab;
        this.socialSharing = socialSharing;
        if (navParams.get('page')) {
            this.page = navParams.get('page');
        }
        if (navParams.get('id')) {
            this.getPage(navParams.get('id'));
        }
    }
    WordpressPage.prototype.getPage = function (id) {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.wordpressService.getPage(id)
            .subscribe(function (result) {
            _this.page = result;
        }, function (error) { return console.log(error); }, function () { return loader.dismiss(); });
    };
    WordpressPage.prototype.previewPage = function () {
        var browser = this.iab.create(this.page.link, '_blank');
        browser.show();
    };
    WordpressPage.prototype.sharePage = function () {
        var subject = this.page.title.rendered;
        var message = this.page.content.rendered;
        message = message.replace(/(<([^>]+)>)/ig, "");
        var url = this.page.link;
        this.socialSharing.share(message, subject, '', url);
    };
    return WordpressPage;
}());
WordpressPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-page/wordpress-page.html"*/'<ion-header>\n	<ion-navbar>\n		<button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title *ngIf="page">{{page.title.rendered}}</ion-title>\n		<ion-buttons end>\n	      <button (tap)="sharePage()" ion-button icon-only>\n	        <ion-icon name="share"></ion-icon>\n	      </button>\n	    </ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n    <section *ngIf="page" padding [innerHTML]="page.content.rendered"></section>\n    <button ion-button full (click)=previewPage()>Preview</button>\n</ion-content>'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-page/wordpress-page.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4__shared_services_wordpress_service__["a" /* WordpressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__shared_services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */]])
], WordpressPage);

//# sourceMappingURL=wordpress-page.component.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToastService = (function () {
    function ToastService(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    ToastService.prototype.create = function (message, ok, duration) {
        if (ok === void 0) { ok = false; }
        if (duration === void 0) { duration = 2000; }
        if (this.toast) {
            this.toast.dismiss();
        }
        this.toast = this.toastCtrl.create({
            message: message,
            duration: ok ? null : duration,
            position: 'bottom',
            showCloseButton: ok,
            closeButtonText: 'OK'
        });
        this.toast.present();
    };
    return ToastService;
}());
ToastService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */]])
], ToastService);

//# sourceMappingURL=toast.service.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressCategories; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wordpress_posts_wordpress_posts_component__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { LoadingModal } from '../../../components/loading-modal/loading-modal';
var WordpressCategories = (function () {
    function WordpressCategories(wordpressService, navController, loadingController) {
        this.wordpressService = wordpressService;
        this.navController = navController;
        this.loadingController = loadingController;
        this.categories = [];
    }
    WordpressCategories.prototype.ngOnInit = function () {
        this.getCategories();
    };
    WordpressCategories.prototype.getCategories = function () {
        var _this = this;
        this.isBusy = true;
        // let loader = this.loadingController.create({
        // 	spinner: 'hide',
        // 	content: `
        // 			  <div class="container0" [ngClass]="{'busy': isBusy}">
        // 				<div class="spinner0">
        // 				  <div class="backdrop0"></div>
        // 				  <p>&#9733;</p>
        // 				</div>
        // 			  </div>`,
        // 	cssClass: 'spinner0 backdrop0 container0'
        // });
        // loader.present();
        this.wordpressService.getCategories()
            .subscribe(function (result) {
            // this.categories = result;
            result.forEach(function (cat) {
                switch (cat.name) {
                    case 'Business':
                        cat['img'] = 'assets/img/category/icons8-business.png';
                        _this.categories.push(cat);
                        break;
                    case 'Culture':
                        cat['img'] = 'assets/img/category/culture.png';
                        break;
                    case 'Entertainment':
                        cat['name'] = 'Lifestyle and Entertainment';
                        cat['img'] = 'assets/img/category/icons8-lifestyle-entertainment.png';
                        _this.categories.push(cat);
                        break;
                    case 'Health':
                        cat['img'] = 'assets/img/category/icons8-health.png';
                        _this.categories.push(cat);
                        break;
                    // case 'News':
                    // 	cat.name = 'General News';
                    // 	cat['img'] = 'assets/img/category/news.png';
                    // 	this.categories.push(cat);
                    // 	break;
                    case 'Politics':
                        cat['img'] = 'assets/img/category/icons8-politics.png';
                        _this.categories.push(cat);
                        break;
                    case 'Showbiz':
                        cat['img'] = 'assets/img/category/showbiz.png';
                        break;
                    case 'Sport':
                        cat['img'] = 'assets/img/category/icons8-sport.png';
                        _this.categories.push(cat);
                        break;
                    case 'Uncategorized':
                        cat['img'] = 'assets/img/category/icons8-uncategorized.png';
                        _this.categories.push(cat);
                        break;
                    case 'World':
                        cat['img'] = 'assets/img/category/icons8-international.png';
                        _this.categories.push(cat);
                        break;
                    case 'Africa':
                        cat['img'] = 'assets/img/category/icons8-africa.png';
                        _this.categories.push(cat);
                        break;
                }
            });
        }, function (error) { return console.log(error); }, function () { return _this.isBusy = false; });
    };
    WordpressCategories.prototype.loadCategory = function (category) {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_3__wordpress_posts_wordpress_posts_component__["a" /* WordpressPosts */], {
            category: category
        });
    };
    return WordpressCategories;
}());
WordpressCategories = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-wordpress-categories',template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-categories/wordpress-categories.html"*/'<ion-header>\n	<ion-navbar  color="primary">\n		<button ion-button menuToggle>\n			<img src="assets/icon/menu-icon-dark.png">\n			<!--<ion-icon name="menu"></ion-icon>-->\n		</button>\n		<ion-title>{{\'CATEGORIES\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<!--<ion-content>-->\n	<!--<div class="container" *ngIf="isBusy">-->\n		<!--<div class="spinner">-->\n			<!--<div class="backdrop"></div>-->\n			<!--<p>&#9733;</p>-->\n		<!--</div>-->\n		<!--<p text-center="true">Loading...</p>-->\n	<!--</div>-->\n		<!--<ion-list>-->\n		<!--<ion-item *ngFor="let category of categories" (click)="loadCategory(category)">-->\n			<!--<ion-icon name="pricetags" item-left></ion-icon>-->\n			<!--<h2>{{category.name}}</h2>-->\n			<!--&lt;!&ndash;<ion-badge item-right primary>{{category.count}}</ion-badge>&ndash;&gt;-->\n		<!--</ion-item>-->\n	<!--</ion-list>-->\n<!--</ion-content>-->\n\n<ion-content class="categoriesPage">\n\n	<div class="container" *ngIf="isBusy">\n		<div class="spinner">\n			<div class="backdrop"></div>\n			<p>&#9733;</p>\n		</div>\n		<p text-center="true">Loading...</p>\n	</div>\n\n	<ion-list class="categoriesList">\n		<ion-item *ngFor="let category of categories" [navPush]="home" (click)="loadCategory(category)">\n			<img src="{{category.img}}">\n			<!--<ion-icon name="pricetags"></ion-icon>-->\n			<h3> {{category.name}} </h3>\n\n		</ion-item>\n\n	</ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-categories/wordpress-categories.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__shared_services_wordpress_service__["a" /* WordpressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__shared_services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
], WordpressCategories);

//# sourceMappingURL=wordpress-categories.component.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressMenus; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_wordpress_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wordpress_menu_wordpress_menu_component__ = __webpack_require__(452);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WordpressMenus = (function () {
    function WordpressMenus(navParams, wordpressService, navController, loadingController, storage) {
        this.navParams = navParams;
        this.wordpressService = wordpressService;
        this.navController = navController;
        this.loadingController = loadingController;
        this.storage = storage;
    }
    WordpressMenus.prototype.ngOnInit = function () {
        this.getMenus();
    };
    WordpressMenus.prototype.getMenus = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Please wait"
        });
        loader.present();
        this.wordpressService.getMenus()
            .subscribe(function (result) {
            _this.menus = result;
            loader.dismiss();
        });
    };
    WordpressMenus.prototype.loadMenu = function (menu) {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_4__wordpress_menu_wordpress_menu_component__["a" /* WordpressMenu */], {
            title: menu.name,
            id: menu.ID
        });
    };
    return WordpressMenus;
}());
WordpressMenus = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-menus/wordpress-menus.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-buttons start>\n			<button menuToggle>\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title>{{\'MENUS\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list>\n        <ion-item *ngFor="let menu of menus" text-wrap (click)="loadMenu(menu)">\n        	{{menu.name}}\n        	<ion-icon name="more" item-right></ion-icon>\n        </ion-item>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/England_Jhon/news_app/src/pages/wordpress/wordpress-menus/wordpress-menus.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__shared_services_wordpress_service__["a" /* WordpressService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], WordpressMenus);

//# sourceMappingURL=wordpress-menus.component.js.map

/***/ })

},[494]);
//# sourceMappingURL=main.js.map