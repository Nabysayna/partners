import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { LoaderComponent } from './loader/loader.component';
import { AuthentificateComponent } from './authentificate/authentificate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    AuthentificateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
