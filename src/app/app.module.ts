import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './core/landing-page/landing-page.component';
import { AdminModule } from './admin/admin.module';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';



@NgModule({
  declarations: [
    AppComponent,
  
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule
  ],
  exports:[ReactiveFormsModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
