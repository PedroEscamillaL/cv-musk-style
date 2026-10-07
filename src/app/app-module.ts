import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './header/header';
import { WorkExperienceComponent } from './work-experience/work-experience';
import { SkillsComponent } from './skills/skills';
import { EducationComponent } from './education/education';
import { CertificatesComponent } from './certificates/certificates';
import { LanguagesComponent } from './languages/languages';
import { InterestComponent } from './interest/interest';


import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    App,
    Header,
    WorkExperienceComponent,
    SkillsComponent,
    EducationComponent,
    CertificatesComponent,
    LanguagesComponent,
    InterestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App]
})
export class AppModule { }
