import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find'
import { NetworkProvider } from '../network/network';
import { Storage } from '@ionic/storage';
// import { now, isMoment } from 'moment';
// import * as moment from 'moment';
// import { timestamp } from 'rxjs/operator/timestamp';


PouchDB.plugin(PouchDBFind);



@Injectable()
export class SubmissionsProvider {

    private _DB: any;
    private success: boolean = true;
    public current_Id: any;
    public persist: any;


    constructor(public http: Http,
        public storage: Storage,
        public alertCtrl: AlertController,
        private networkProvider: NetworkProvider) {
        console.log('Hello SubmissionsProvider Provider');

        this.initialiseDB();



    }// end constructor
    initialiseDB() {
        this._DB = new PouchDB('submissions');
        console.log(this._DB);
    }

    //STWReferenceNumber
    STWReferenceNumber() {
        let num = Math.floor(Math.random() * 100000);
        let milliseconds = (new Date).getTime();

        // console.info(num);
        // console.info(milliseconds);
        let sTWReferenceNumber = num + milliseconds;
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now && 'funtion') {
            d += performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    TimeOfOccurence() {
        let currentTime = new Date(),
            hours = currentTime.getHours(),
            minutes: any = currentTime.getMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        var suffix = "AM";
        if (hours >= 12) {
            suffix = "PM";
            hours = hours - 12;
        }
        if (hours == 0) {
            hours = 12;
        }

        let timeOfOccurence = hours + ":" + minutes + " " + suffix;
        console.info(timeOfOccurence);
        return timeOfOccurence;

    }

    // DateOfOccurence(form_result, isSaveSubmit = false) {

    //    let DateOfOccurence = new Date().toISOString();
    //    if (form_result.DateOfOccurence != null) {
    //        DateOfOccurence = form_result.DateOfOccurence.substring(0, 10)
    //    }
    //    else {
    //        DateOfOccurence = "";
    //    }
    // }

    addSubmission(category, form_result, isSaveSubmit = false) {
        {
            let image1, image2, image3, image4;
            if (form_result.image1 != null) {
                image1 = form_result.image1.substring(23);
            }
            else {
                image1 = "";
            }
            if (form_result.image2 != null) {
                image2 = form_result.image2.substring(23);
            }
            else {
                image2 = "";
            }
            if (form_result.image3 != null) {
                image3 = form_result.image3.substring(23);
            }
            else {
                image3 = "";
            }
            if (form_result.image4 != null) {
                image4 = form_result.image4.substring(23);
            }
            else {
                image4 = "";
            }

            let preciseLocation;
            // if(form_result.LocationVariable == "Severn Trent Water (STW)" || form_result.LocationVariable == "Severn Trent Services (STS)"){
            //     preciseLocation = form_result.location;
            // }
            // else{
            //     preciseLocation = form_result.PreciseLocation;
            // }
            var timeStamp = new Date().toISOString(); //.substring(0, 10);

            // var timeStamp = new Date().toLocaleString().substring(0, 10);

            // moment (timeStamp).format("YYYY-MM-DD")
            // var res = timeStamp.substring(0, 8);
            // var timeStamp = new Date().toLocaleDateString('en-GB', {  
            //     day : 'numeric',
            //     month : 'numeric',
            //     year : 'numeric'
            // })
            if (form_result._id != null) timeStamp = form_result._id;

            this.current_Id = form_result._id;



            var submission = {
                _id: timeStamp,
                MobileAppRefNo: form_result.RefrerenceNumber,

                // team and user name for some reason need to be switched for now
                //   ReporterName:form_result.ReporterName,
                //   TeamName: form_result.TeamName,
                //   EmployeeEmail: form_result.EmployeeEmail,
                //   EmployeeNumber: form_result.EmployeeNumber,
                //   FirstName: form_result.FirstName,
                //   LastName: form_result.LastName,

                ReporterName: "Tom Burton",
                TeamName: "CU IS Plan - IRD Digital",
                EmployeeEmail: "tom.burton@severntrent.co.uk",
                EmployeeNumber: "09310026",
                FirstName: "Tom",
                LastName: "Burton",

                WasInjuryWorkRelated: form_result.WasInjuryWorkRelated,
                EnvironmentalImpact: form_result.EnvironmentalImpact,
                WhatHappenedVehicleAsset: form_result.WhatHappenedVehicleAsset,
                WhatWasEnvironmentalImpact: form_result.WhatWasEnvironmentalImpact,
                PropertyVehicleDamage: form_result.PropertyVehicleDamage,
                DamageCompanyBusiness: form_result.DamageCompanyBusiness,
                ReportedToPolice: form_result.ReportedToPolice,
                PoliceForce: form_result.PoliceForce,
                ItemOwnership: form_result.ItemOwnership,
                SmartWaterSite: form_result.SmartWaterSite,
                DateOfIncident: form_result.DateOfIncident,
                TimeIncidentHappened: form_result.TimeIncidentHappened,
                SeriousInjuryOrFatality: form_result.SeriousInjuryOrFatality,
                EstimateValueOfLossDamage: form_result.EstimateValueOfLossDamage,
                ItemDescription: form_result.ItemDescription,
                PoliceCrimeRefNo: form_result.PoliceCrimeRefNo,
                LocationType: form_result.LocationVariable,
                LocationVariable: form_result.location,
                Location: form_result.location, //shows the address on sent forms on the app 
                DateOfOccurence: form_result.DateOfOccurence.substring(0, 10),
                TimeOfOccurence: form_result.TimeOfOccurence,
                DateAbsenceStarted: form_result.DateAbsenceStarted && form_result.DateAbsenceStarted.substring(0, 10),
                ReturnToWork: form_result.ReturnToWork && form_result.ReturnToWork.substring(0, 10),
                AdditionalTime: form_result.AdditionalTime,
                AdditionalTimeComments: form_result.AdditionalTimeComments,
                DateRestrictedDuties: form_result.DateRestrictedDuties && form_result.DateRestrictedDuties.substring(0, 10),
                ReturnToNormal: form_result.ReturnToNormal && form_result.ReturnToNormal.substring(0, 10),
                AdditionalRestricted: form_result.AdditionalRestricted,
                AdditionalRestrictedComments: form_result.AdditionalRestrictedComments,
                PreciseLocation: form_result.PreciseLocation,
                DetailsOfActivityBeingDone: form_result.DetailsOfActivityBeingDone,
                WeatherConditionsAtTime: form_result.WeatherConditionsAtTime,
                status: 0,
                type: 'report',
                DoYouWishToReport: category,
                WasAnyoneInjured: form_result.WasAnyoneInjured,
                ReasonForTheConversation: form_result.ReasonForTheConversation,
                TypeOfSecurityConcern: form_result.TypeOfSecurityConcern,
                IncidentDescription: form_result.IncidentDescription,
                PersonInvolved: form_result.PersonInvolved,
                RemovedHazard: form_result.RemovedHazard,
                WasMoreThanOnePersonInvolved: form_result.WasMoreThanOnePersonInvolved,
                //   IncidentReferenceNumber: form_result.IncidentReferenceNumber,
                // FirstName: form_result.FirstName,
                // LastName: form_result.LastName,
                EmailAddress: form_result.EmailAddress,
                // Employee: form_result.Employee,
                Postcode: form_result.Postcode,
                EmployeeNotOnList: form_result.EmployeeNotOnList,
                Company: form_result.Company,
                JobTitle: form_result.JobTitle,
                Age: form_result.Age,
                Gender: form_result.Gender,
                EmployeeName: form_result.EmployeeName,

                SubCategoryApplicable: form_result.SubCategoryApplicable,
                EventCategoryApplicable: form_result.EventCategoryApplicable,
                PotentialToCauseSeriousInjury: form_result.PotentialToCauseSeriousInjury,
                ActionRequired: form_result.ActionRequired,
                XCoordinate: form_result.XCoordinate,
                YCoordinate: form_result.YCoordinate,
                MostApplicable: form_result.standards,
                TelephoneNumber: form_result.TelephoneNumber,
                WhoWasInvolved: form_result.WhoWasInvolved,
                HomeAddress: form_result.HomeAddress,
                ActionTaken: form_result.ActionTaken,
                CorrectiveActionTaken: form_result.CorrectiveActionTaken,

                InjuryResultedInFatality: form_result.InjuryResultedInFatality,
                IncidentResultedInRestrictedDuties: form_result.IncidentResultedInRestrictedDuties,
                IncidentResultedInLostTime: form_result.IncidentResultedInLostTime,
                Bodyparts: form_result.BodypartsControl && form_result.BodypartsControl.split(',  ').filter(v => v),
                ImmediateTreatmentGiven: form_result.ImmediateTreatmentGiven,
                TreatmentDetails: form_result.TreatmentDetails,
                AdditionalTreatmentGiven: form_result.AdditionalTreatmentGiven,
                InvestigatingManager: form_result.InvestigatingManager,
                // BodyPart: form_result.BodyPart,

                ReasonForConversation: form_result.ReasonForConversation,
                ConsideredTheFollowing: form_result.ConsideredTheFollowing,

                DidYouSpeakToPerson: form_result.DidYouSpeakToPerson,

                Sent: form_result.Sent,

                _attachments: {
                    "submission1.jpg": {
                        content_type: 'image/jpeg',
                        data: image1,
                        // data: form_result.image1.substring(23),
                    },
                    "submission2.jpg": {
                        content_type: 'image/jpeg',
                        data: image2,
                        // data: form_result.image2.substring(23),
                    },
                    "submission3.jpg": {
                        content_type: 'image/jpeg',
                        data: image3,
                        // data: form_result.image3.substring(23),
                    },
                    "submission4.jpg": {
                        content_type: 'image/jpeg',
                        data: image4,
                        // data: form_result.image4.substring(23),
                    }
                }
            };


            return new Promise(resolve => {
                var me = this;
                this._DB.put(submission).then(function (response) {
                    if (isSaveSubmit) {
                        this.oneWay().then((result) => {
                            resolve(true);
                        });
                        // if(result){
                        //     resolve(true);
                        // }
                    }
                    else {
                        if (form_result.Sent == "sending") {
                            var isSubmissionIntervalRunning = localStorage.getItem("submissionIntervalRunning");
                            if (isSubmissionIntervalRunning == "false") {
                                me.persist = setInterval(function () {
                                    localStorage.setItem("submissionIntervalRunning", "true");
                                    if (me.networkProvider.obtainNetworkConnection()) {
                                        me.againUpload();
                                    }
                                }, 1000);
                            }

                        }
                        resolve(true);
                    }
                    // alert("saved");
                }.bind(this)).catch((err) => {
                    this.success = false;
                });
                console.log(submission);
                // resolve(true);
            });
        }
    }
    againUpload() {
        clearInterval(this.persist);
        // alert("againUpload");
        var me = this;

        this._DB.allDocs({ include_docs: true, descending: true, attachments: true }, function (err, doc) {
            let k,
                items = [],
                row = doc.rows;

            for (k in row) {
                var item = row[k].doc,
                    dataURIPrefix = 'data:image/jpeg;base64,',
                    attachment;
                item.Sent = "sent";

                me._DB.put(item).then(function (response) {

                });
            }
            // alert("ssss");
            me.oneWay().then((result) => {
                localStorage.setItem("submissionIntervalRunning", "false");
                // alert("end");
            });

        });
        // this._DB.find({
        //     selector: {_id: {$eq: me.current_Id}}
        // }).then(filtered => {
        //     var doc0 = filtered.docs[0];
        //     doc0.Sent = "sent";
        //     this._DB.put(doc0).then(function (response) {
        //         alert(me.current_Id);
        //         this.oneWay().then((result) =>{
        //
        //         });
        //     });
        //     // filtered.docs.forEach(function (item) {
        //     //     this.data.push(item);
        //     // }.bind(this));
        // });


    }
    async auto_save1(recordId, referenceNumber, category, dateOfOccurence, timeOfOccurence, data) {
        var me = this;
        await this._DB.find({
            selector: {
                _id: { $eq: recordId }
            }
        }).then(function (result) {
            if (result == null || result.docs.length < 1) {
                var data1 = {};
                for (var index_key in data) {
                    if (data.hasOwnProperty(index_key)) {
                        if (index_key == "key") {
                            if (data[index_key] == "XYCoordinate") {
                                data1["XCoordinate"] = data.value.split(",")[0];
                                data1["YCoordinate"] = data.value.split(",")[1];
                                data1["XYCoordinate"] = data.value;
                            }
                            else {
                                data1[data[index_key]] = data.value;
                            }
                        }
                        else {
                            data1[index_key] = data[index_key];
                        }
                    }
                }

                data1["_id"] = recordId;
                data1["RefrerenceNumber"] = referenceNumber;
                if (data.key != "DateOfOccurence") {
                    data1["DateOfOccurence"] = dateOfOccurence;
                }
                if (data.key != "TimeOfOccurence") {
                    data1["TimeOfOccurence"] = timeOfOccurence;
                }
                me.addSubmission(category, data1);
            }
            else {
                me._DB.get(recordId, { attachments: true })
                    .then((doc) => {
                        // var doc = result.docs[0];
                        for (var index_key in data) {
                            if (data.hasOwnProperty(index_key)) {
                                if (index_key == "key") {
                                    var image1, image2, image3, image4;
                                    if (doc._attachments["submission1.jpg"].data != null) {
                                        image1 = doc._attachments["submission1.jpg"].data;
                                    }
                                    else {
                                        image1 = "";
                                    }
                                    if (doc._attachments["submission2.jpg"].data != null) {
                                        image2 = doc._attachments["submission2.jpg"].data;
                                    }
                                    else {
                                        image2 = "";
                                    }
                                    if (doc._attachments["submission3.jpg"].data != null) {
                                        image3 = doc._attachments["submission3.jpg"].data;
                                    }
                                    else {
                                        image3 = "";
                                    }
                                    if (doc._attachments["submission4.jpg"].data != null) {
                                        image4 = doc._attachments["submission4.jpg"].data;
                                    }
                                    else {
                                        image4 = "";
                                    }

                                    switch (data[index_key]) {
                                        case "XYCoordinate":
                                            doc["XCoordinate"] = data.value.split(",")[0];
                                            doc["YCoordinate"] = data.value.split(",")[1];
                                            doc["XYCoordinate"] = data.value;
                                            break;
                                        case "image1":
                                            image1 = data.value.substring(23);
                                            break;
                                        case "image2":
                                            image2 = data.value.substring(23);
                                            break;
                                        case "image3":
                                            image3 = data.value.substring(23);
                                            break;
                                        case "image4":
                                            image4 = data.value.substring(23);
                                            break;
                                        default:
                                            doc[data[index_key]] = data.value;
                                            break;
                                    }

                                    var attachments = {
                                        "submission1.jpg": {
                                            content_type: 'image/jpeg',
                                            data: image1,
                                        },
                                        "submission2.jpg": {
                                            content_type: 'image/jpeg',
                                            data: image2,
                                        },
                                        "submission3.jpg": {
                                            content_type: 'image/jpeg',
                                            data: image3,
                                        },
                                        "submission4.jpg": {
                                            content_type: 'image/jpeg',
                                            data: image4,
                                        }
                                    };
                                    doc["_attachments"] = attachments;
                                }
                                else {
                                    doc[index_key] = data[index_key];
                                }
                            }
                        }
                        me._DB.put(doc)
                            .catch((err) => {
                                // this.success = false;
                            });
                    });
            }
        });
    }




    updateSubmission(id, revision, category, form_result, isSaveSubmit = false) {
        {

            this.current_Id = id;
            let image1, image2, image3, image4;
            if (form_result.image1 != null) {
                image1 = form_result.image1.substring(23);
            }
            else {
                image1 = "";
            }
            if (form_result.image2 != null) {
                image2 = form_result.image2.substring(23);
            }
            else {
                image2 = "";
            }
            if (form_result.image3 != null) {
                image3 = form_result.image3.substring(23);
            }
            else {
                image3 = "";
            }
            if (form_result.image4 != null) {
                image4 = form_result.image4.substring(23);
            }
            else {
                image4 = "";
            }
            // let preciseLocation = form_result.location;
            var submission1 = {
                _id: id,
                _rev: revision,
                DoYouWishToReport: category,
                // category:category,
                STWReferenceNumber: form_result.RefrerenceNumber,


                // team and user name for some reason need to be switched for now
                ReporterName: form_result.ReporterName,
                TeamName: form_result.TeamName,
                EmployeeEmail: form_result.EmployeeEmail,
                EmployeeNumber: form_result.EmployeeNumber,
                FirstName: form_result.FirstName,
                LastName: form_result.LastName,

                WasInjuryWorkRelated: form_result.WasInjuryWorkRelated,
                EnvironmentalImpact: form_result.EnvironmentalImpact,
                WhatHappenedVehicleAsset: form_result.WhatHappenedVehicleAsset,

                WhatWasEnvironmentalImpact: form_result.WhatWasEnvironmentalImpact,
                PropertyVehicleDamage: form_result.PropertyVehicleDamage,
                DamageCompanyBusiness: form_result.DamageCompanyBusiness,
                ReportedToPolice: form_result.ReportedToPolice,
                PoliceForce: form_result.PoliceForce,
                ItemOwnership: form_result.ItemOwnership,
                SmartWaterSite: form_result.SmartWaterSite,
                SeriousInjuryOrFatality: form_result.SeriousInjuryOrFatality,
                EstimateValueOfLossDamage: form_result.EstimateValueOfLossDamage,
                ItemDescription: form_result.ItemDescription,
                PoliceCrimeRefNo: form_result.PoliceCrimeRefNo,
                DateOfIncident: form_result.DateOfIncident,
                TimeIncidentHappened: form_result.TimeIncidentHappened,

                LocationType: form_result.LocationVariable,
                LocationVariable: form_result.location,
                Location: form_result.locationType,
                DateOfOccurence: form_result.DateOfOccurence,
                TimeOfOccurence: form_result.TimeOfOccurence,
                PreciseLocation: form_result.PreciseLocation,
                DateAbsenceStarted: form_result.DateAbsenceStarted,
                ReturnToWork: form_result.ReturnToWork,
                DateRestrictedDuties: form_result.DateRestrictedDuties,
                ReturnToNormal: form_result.ReturnToNormal,
                DetailsOfActivityBeingDone: form_result.DetailsOfActivityBeingDone,
                WeatherConditionsAtTime: form_result.WeatherConditionsAtTime,
                status: 0,
                type: 'report',
                WasAnyoneInjured: form_result.WasAnyoneInjured,
                // ReasonForTheConversation: form_result.ReasonForTheConversation,
                TypeOfSecurityConcern: form_result.TypeOfSecurityConcern,
                IncidentDescription: form_result.IncidentDescription,
                PersonInvolved: form_result.PersonInvolved,
                Employee: form_result.Employee,
                RemovedHazard: form_result.RemovedHazard,
                // FirstName: form_result.FirstName,
                // LastName: form_result.LastName,
                EmailAddress: form_result.EmailAddress,
                Postcode: form_result.Postcode,
                EmployeeNotOnList: form_result.EmployeeNotOnList,
                Company: form_result.Company,
                JobTitle: form_result.JobTitle,
                Age: form_result.Age,
                Gender: form_result.Gender,
                EmployeeName: form_result.EmployeeName,

                SubCategoryApplicable: form_result.SubCategoryApplicable,
                EventCategoryApplicable: form_result.EventCategoryApplicable,
                PotentialToCauseSeriousInjury: form_result.PotentialToCauseSeriousInjury,
                ActionRequired: form_result.ActionRequired,
                XCoordinate: form_result.XCoordinate,
                YCoordinate: form_result.YCoordinate,
                MostApplicable: form_result.standards,
                TelephoneNumber: form_result.TelephoneNumber,
                WhoWasInvolved: form_result.WhoWasInvolved,
                HomeAddress: form_result.HomeAddress,
                ActionTaken: form_result.ActionTaken,

                InjuryResultedInFatality: form_result.InjuryResultedInFatality,
                IncidentResultedInRestrictedDuties: form_result.IncidentResultedInRestrictedDuties,
                IncidentResultedInLostTime: form_result.IncidentResultedInLostTime,
                BodypartsControl: form_result.BodypartsControl,
                ImmediateTreatmentGiven: form_result.ImmediateTreatmentGiven,
                AdditionalTreatmentGiven: form_result.AdditionalTreatmentGiven,
                InvestigatingManager: form_result.InvestigatingManager,
                BodyPart: form_result.BodyPart,

                ReasonForConversation: form_result.ReasonForConversation,
                ConsideredTheFollowing: form_result.ConsideredTheFollowing,

                DidYouSpeakToPerson: form_result.DidYouSpeakToPerson,

                Sent: form_result.Sent,

                _attachments: {
                    "submission1.jpg": {
                        content_type: 'image/jpeg',
                        data: image1,
                    },
                    "submission2.jpg": {
                        content_type: 'image/jpeg',
                        data: image2,
                    },
                    "submission3.jpg": {
                        content_type: 'image/jpeg',
                        data: image3,
                    },
                    "submission4.jpg": {
                        content_type: 'image/jpeg',
                        data: image4,
                    }
                }
            };

            return new Promise(resolve => {
                var me = this;
                this._DB.put(submission1).then(function (response) {
                    if (isSaveSubmit) {
                        this.oneWay().then((result) => {
                            resolve(true);
                        });
                        // if(result){
                        //     resolve(true);
                        // }
                    }
                    else {
                        if (form_result.Sent == "sending") {
                            var isSubmissionIntervalRunning = localStorage.getItem("submissionIntervalRunning");
                            if (isSubmissionIntervalRunning == "false") {
                                me.persist = setInterval(function () {
                                    localStorage.setItem("submissionIntervalRunning", "true");
                                    if (me.networkProvider.obtainNetworkConnection()) {
                                        me.againUpload();
                                    }
                                }, 1000);
                            }
                        }
                        resolve(true);
                    }

                    // alert("saved");
                }.bind(this)).catch((err) => {
                    this.success = false;
                });
                // resolve(true);
                // if (this.success) {
                //   resolve(true);
                // }
            });
        }
    }


    retrieveSubmission(id) {
        return new Promise(resolve => {
            this._DB.get(id, { attachments: true })
                .then((doc) => {
                    var item = [],
                        dataURIPrefix = 'data:image/jpeg;base64,';

                    item.push({
                        id: id,
                        rev: doc._rev,
                        ReferenceNumber: doc.STWReferenceNumber,
                        // MostApplicable: doc.standards,
                        // team and user name for some reason need to be switched for now
                        ReporterName: doc.ReporterName,
                        TeamName: doc.TeamName,
                        EmployeeEmail: doc.EmployeeEmail,
                        EmployeeNumber: doc.EmployeeNumber,
                        FirstName: doc.FirstName,
                        LastName: doc.LastName,

                        WasInjuryWorkRelated: doc.WasInjuryWorkRelated,
                        EnvironmentalImpact: doc.EnvironmentalImpact,
                        WhatHappenedVehicleAsset: doc.WhatHappenedVehicleAsset,
                        WhatWasEnvironmentalImpact: doc.WhatWasEnvironmentalImpact,

                        ReportedToPolice: doc.ReportedToPolice,
                        PoliceForce: doc.PoliceForce,
                        ItemOwnership: doc.ItemOwnership,
                        SmartWaterSite: doc.SmartWaterSite,
                        SeriousInjuryOrFatality: doc.SeriousInjuryOrFatality,
                        EstimateValueOfLossDamage: doc.EstimateValueOfLossDamage,
                        ItemDescription: doc.ItemDescription,
                        PoliceCrimeRefNo: doc.PoliceCrimeRefNo,

                        PropertyVehicleDamage: doc.PropertyVehicleDamage,
                        DamageCompanyBusiness: doc.DamageCompanyBusiness,
                        LocationType: doc.LocationVariable,
                        LocationVariable: doc.location,
                        Location: doc.locationType,
                        DateOfOccurence: doc.DateOfOccurence,
                        TimeOfOccurence: doc.TimeOfOccurence,
                        PreciseLocation: doc.PreciseLocation,
                        DateAbsenceStarted: doc.DateAbsenceStarted,
                        ReturnToWork: doc.ReturnToWork,
                        DateRestrictedDuties: doc.DateRestrictedDuties,
                        ReturnToNormal: doc.ReturnToNormal,
                        DetailsOfActivityBeingDone: doc.DetailsOfActivityBeingDone,
                        WeatherConditionsAtTime: doc.WeatherConditionsAtTime,
                        status: doc.status,
                        type: doc.type,
                        DoYouWishToReport: doc.DoYouWishToReport,
                        WasAnyoneInjured: doc.WasAnyoneInjured,
                        ReasonForTheConversation: doc.ReasonForTheConversation,
                        TypeOfSecurityConcern: doc.TypeOfSecurityConcern,
                        IncidentDescription: doc.IncidentDescription,
                        RemovedHazard: doc.RemovedHazard,
                        PersonInvolved: doc.PersonInvolved,
                        Employee: doc.Employee,
                        DateOfIncident: doc.DateOfIncident,
                        TimeIncidentHappened: doc.TimeIncidentHappened,
                        // FirstName: form_result.FirstName,
                        // LastName: form_result.LastName,
                        EmailAddress: doc.EmailAddress,
                        Postcode: doc.Postcode,
                        EmployeeNotOnList: doc.EmployeeNotOnList,
                        Company: doc.Company,
                        JobTitle: doc.JobTitle,
                        Age: doc.Age,
                        Gender: doc.Gender,
                        EmployeeName: doc.EmployeeName,

                        SubCategoryApplicable: doc.SubCategoryApplicable,
                        EventCategoryApplicable: doc.EventCategoryApplicable,
                        PotentialToCauseSeriousInjury: doc.PotentialToCauseSeriousInjury,
                        ActionRequired: doc.ActionRequired,
                        XCoordinate: doc.XCoordinate,
                        YCoordinate: doc.YCoordinate,
                        MostApplicable: doc.MostApplicable,
                        TelephoneNumber: doc.TelephoneNumber,
                        WhoWasInvolved: doc.WhoWasInvolved,
                        HomeAddress: doc.HomeAddress,
                        ActionTaken: doc.ActionTaken,
                        image1: dataURIPrefix + doc._attachments["submission1.jpg"].data,
                        image2: dataURIPrefix + doc._attachments["submission2.jpg"].data,
                        image3: dataURIPrefix + doc._attachments["submission3.jpg"].data,
                        image4: dataURIPrefix + doc._attachments["submission4.jpg"].data,

                        InjuryResultedInFatality: doc.InjuryResultedInFatality,
                        IncidentResultedInRestrictedDuties: doc.IncidentResultedInRestrictedDuties,
                        IncidentResultedInLostTime: doc.IncidentResultedInLostTime,
                        BodypartsControl: doc.BodypartsControl,
                        ImmediateTreatmentGiven: doc.ImmediateTreatmentGiven,
                        AdditionalTreatmentGiven: doc.AdditionalTreatmentGiven,
                        InvestigatingManager: doc.InvestigatingManager,
                        BodyPart: doc.BodyPart,

                        ReasonForConversation: doc.ReasonForConversation,
                        ConsideredTheFollowing: doc.ConsideredTheFollowing,

                        DidYouSpeakToPerson: doc.DidYouSpeakToPerson,
                        XYCoordinate: doc.XYCoordinate,

                        Sent: doc.Sent

                    });

                    // item.push({
                    //   id: id,
                    //   rev: doc._rev,
                    //   user: doc.user,
                    //   locationType: doc.locationType,
                    //   date: doc.date,
                    //   description: doc.description,
                    //   standards: doc.standards,
                    //   safeUnsafeAct: doc.safeUnsafeAct,
                    //   phoneNumber: doc.phoneNumber,
                    //   whoWasInvolved: doc.whoWasInvolved,
                    //   HomeAddress: doc.HomeAddress,
                    //   immediateActionsTaken: doc.immediateActionsTaken,
                    //   image		: dataURIPrefix
                    // });
                    resolve(item);
                });
        });
    }

    retrieveSubmissions() {
        return new Promise(resolve => {
            this._DB.allDocs({ include_docs: true, descending: true, attachments: true }, function (err, doc) {
                let k,
                    items = [],
                    row = doc.rows;

                for (k in row) {
                    var item = row[k].doc,
                        dataURIPrefix = 'data:image/jpeg;base64,',
                        attachment;

                    if (item._attachments) {
                        attachment = dataURIPrefix + item._attachments["submission.jpg"].data;
                    }

                    items.push({
                        id: item._id,
                        rev: item._rev,
                        user: item.user,
                        locationType: item.locationType,
                        date: item.date,
                        description: item.description,
                        standards: item.standards,
                        safeUnsafeAct: item.safeUnsafeAct,
                        phoneNumber: item.phoneNumber,
                        whoWasInvolved: item.whoWasInvolved,
                        HomeAddress: item.HomeAddress,
                        immediateActionsTaken: doc.immediateActionsTaken,
                        image: dataURIPrefix + attachment
                    });
                }
                resolve(items);
            });
        });
    }


    removeSubmission(id, rev) {
        return new Promise(resolve => {
            var submission = { _id: id, _rev: rev };

            this._DB.remove(submission)
                .catch((err) => {
                    console.log(err);
                    this.success = false;
                });

            if (this.success) {
                resolve(true);
            }
        });
    }

    errorHandler(err) {

        let headsUp = this.alertCtrl.create({
            title: "Alert",
            subTitle: err,
            buttons: ['OK']
        });
        headsUp.present();
    }

    successAlert(msg) {

        let headsUp = this.alertCtrl.create({
            title: "Submission Sent",
            subTitle: msg,
            buttons: ['OK']
        });
        headsUp.present();
    }

    public sync() {

        this._DB.setMaxListeners(20);

        let _syncOpts = {
            live: true,
            retry: true,
            continuous: true,
        };

        let remoteDatabase = "https://st4l3043.stwater.intra:6984/submissions"

        //  let remoteDatabase = "http://johnamuesi:johnamuesi@st4l3043.stwater.intra:5984/submissions";
        //  let remoteDatabase = "http://johnamuesi:johnamuesi@st4l3043:5984/submissions";
        //  let remoteDatabase = "http://johnamuesi:johnamuesi@10.242.181.69:5984/submissions";
        //	 let remoteDatabase = "https://johnamuesi:johnamuesi@st4l3043.stwater.intra:6984/demo";
        //  let remoteDatabase = "http://st4l3043.stwater.intra:5984/demo";
        //  let remoteDatabase = "https://st4l3043:6984/demo";
        //   working
        //  let remoteDatabase = "http://edmeister18:kapitantutan18@52.31.45.68:5984/submissions";



        this._DB.sync(remoteDatabase, _syncOpts).
            once('change', change => {
                console.dir(change);
                console.log('synced');
            }).once('error', error => {
                console.error(JSON.stringify(error));
            });
    }

    public oneWay() {


        return new Promise(resolve => {
            var me = this;
            //	  let remoteDatabase = "https://st4l3043:6984/demo";
            //		  let remoteDatabase = "http://edmeister18:kapitantutan18@52.31.45.68:5984/submissions";
            //  let remoteDatabase = "https://johnamuesi:johnamuesi@st4l3043.stwater.intra:6984/demo";
            //   let remoteDatabase = "http://johnamuesi:johnamuesi@st4l3043.stwater.intra:5984/submissions";
            let remoteDatabase = "https://st4l3043.stwater.intra:6984/submissions"

            this._DB.replicate.to(remoteDatabase).on('complete', () => {
                // alert("Thanks for your submission, please check progress through SafetyNet on your desktop.");
                console.log('Synced');
                me.successAlert("Thanks for your submission, please check progress through SafetyNet on your desktop.");
                resolve(true);
            }).on('error', (err) => {
                console.log("Error " + JSON.stringify(err));
                alert("Error: " + JSON.stringify(err));
                resolve(false);
                //   throw new Error(err);
                // handle complete
            }).on("complete", (msg) => {
                alert("Completed:" + JSON.stringify(msg));
                console.log("Completed: " + JSON.stringify(msg));
                resolve(true);


                // replication paused (e.g. replication up to date, user went offline)
            }).on('paused', (msg) => {
                console.log("Paused: " + JSON.stringify(msg));
                alert("Paused: " + JSON.stringify(msg));


                // a document failed to replicate (e.g. due to permissions)
            }).on('denied', (msg) => {
                alert("Denied:" + JSON.stringify(msg));
                console.log("Denied: " + JSON.stringify(msg));
                return;
            });
        });


    }








    getFirstName() {
        return new Promise(resolve => {
            this.storage.get("firstName")
                .then(val => {
                    console.log("First Name is: ", val);
                    resolve(val);
                });
        });
    }

    getLastName() {
        return new Promise(resolve => {
            this.storage.get("lastName")
                .then(val => {
                    console.log("Last Name is: ", val);
                    resolve(val);
                });
        });
    }

    getTeamName() {
        return new Promise(resolve => {
            this.storage.get("teamName")
                .then(val => {
                    console.log("Team Name is: ", val);
                    resolve(val);
                });
        });
    }

}// end class