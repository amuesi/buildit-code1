import {NgModule} from '@angular/core';
import { HomePageModule } from "../pages/home/home.module";
import { IntroPageModule } from "../pages/intro/intro.module";

import { ReferenceNumberComponentModule } from "../components/reference-number/reference-number.module";
import { ReferenceNumberComponent } from "../components/reference-number/reference-number";

// import { StandardsComponentModule } from '../components/standards/standards.module';
// import {StandardsComponent} from '../components/standards/standards';
import { WhatHappenedSecurityComponent } from "../components/what-happened-security/what-happened-security";
import { WhoAreYouComponent } from "../components/who-are-you/who-are-you";




import { FlocLocationsSTWPageModule } from "../pages/floc-locationsSTW/floc-locationsSTW.module";
import { FlocLocationsSTSPageModule } from "../pages/floc-locationsSTS/floc-locationsSTS.module";
import { ImageComponent } from "../components/image/image";
import { ImageComponentModule } from "../components/image/image.module";
// import {search_pageModule} from "../pages/search-page/search-page.module";
import { WhatHappenedSecurityComponentModule } from "../components/what-happened-security/what-happened-security.module";
import { WhoAreYouComponentModule } from "../components/who-are-you/who-are-you.module";




@NgModule({
  
  declarations:[
  ],

  imports:[
    HomePageModule,
    IntroPageModule,
    ReferenceNumberComponentModule,
    FlocLocationsSTWPageModule,
    FlocLocationsSTSPageModule,
    ImageComponentModule,
    WhatHappenedSecurityComponentModule,
    WhoAreYouComponentModule

  ],
  
  entryComponents:[
  ],

  exports:[
   ReferenceNumberComponent,
   ImageComponent,
   WhatHappenedSecurityComponent,
   WhoAreYouComponent
 //  FlocLocationsPage
  ]
  
})
export class SafetyNetModule{

}
