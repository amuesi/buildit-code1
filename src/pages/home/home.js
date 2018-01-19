"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomePage = (function () {
    function HomePage(navCtrl, socialSharing) {
        this.navCtrl = navCtrl;
        this.socialSharing = socialSharing;
    }
    /**
     * Opens up the share sheet so you can share using the app you like the most.
     */
    HomePage.prototype.regularShare = function () {
        // share(message, subject, file, url)
        this.socialSharing.share("Testing, sharing this from inside an app I'm building right now", null, "www/assets/img/hulk.jpg", null);
    };
    /**
     * This share's directly via twitter using the:
     * shareViaTwitter(message, image, url)
     */
    HomePage.prototype.twitterShare = function () {
        this.socialSharing.shareViaTwitter("Testing, sharing this from inside an app I'm building right now", "www/assets/img/hulk.jpg", null);
    };
    /**
     * This share's directly via whatsapp using the:
     * shareViaWhatsapp(message, image, url)
     */
    HomePage.prototype.whatsappShare = function () {
        this.socialSharing.shareViaWhatsApp("Testing, sharing this from inside an app I'm building right now", "www/assets/img/hulk.jpg", null);
    };
    /**
     * This share's directly via Instagram using:
     * shareViaInstagram(message, image)
     */
    HomePage.prototype.instagramShare = function () {
        this.socialSharing.shareViaInstagram("Testing, sharing this from inside an app I'm building right now", "www/assets/img/hulk.jpg");
    };
    return HomePage;
}());
HomePage = __decorate([
    core_1.Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    })
], HomePage);
exports.HomePage = HomePage;
