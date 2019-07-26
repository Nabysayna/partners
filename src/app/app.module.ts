import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {LoaderComponent} from './loader/loader.component';
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import {TntService} from './Services/tnt.service';
import {WizallService} from './Services/wizall.service';
import {TigocashService} from './Services/tigocash.service';
import {PostCashService} from './Services/postcash.service';
import {OrangemoneyService} from './Services/orangemoney.service';


import {ExpressocashService} from './Services/expressocash.service';

import { from } from 'rxjs/internal/observable/from';
import { AuthentificateComponent } from './authentificate/authentificate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    AuthentificateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    TntService,
    ExpressocashService,
    WizallService,
    TigocashService,
    PostCashService,
    OrangemoneyService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
