import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { LoginComponent } from './guest/login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { StorageService } from './common/service/storage.service';
import { HttpModule } from '@angular/http';
import { AuthenService } from './common/service/authen.service';
import { AuthGuardService } from './common/service/auth-guard.service';
import { RequestAdmService } from './common/service/module-request/adm.service';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { BodyComponent } from './layouts/body/body.component';
import { CommonService } from './common/service/common.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    StorageService,
    AuthenService,
    AuthGuardService,
    RequestAdmService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
