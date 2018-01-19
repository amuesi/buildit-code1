export interface GeneralType {
    index: string;
    value:string;
}

export interface SecurityIncidentType {
    id: string;
    EventReportType : string;
    IncidentType: string;
    SecurityCategory: string;
    SecurityIncidentType: string;
}

export interface bodypartsInjuredMultiselectType {
    id: string;
    RIDDOR_FLAG : string;
    RIDDOR_Illness_Flag: string;
    Body_Part: string;
    Injury_Type: string;
}

export interface SubCategoryType {
    id: string;
    EventCategory : string;
    EventSubCategory: string;
    EventCategorySubCategory: string;
}

export interface LocationsType {
    id : string;
    Ownership:string;
    FunctionalLocation: string;
    Description: string;
    StreetHouse: string;
    District: string;
    City: string;
    Postal: string;
    X: string;
    Y: string;
    dist: any;
}

export interface TreatmentType {
    id: string;
    Treatment : string;
    TreatmentDetailsRequired: string;
}

export interface person {
    EmployeeNumber: string;
    FirstName : string;
    Surname: string;
}