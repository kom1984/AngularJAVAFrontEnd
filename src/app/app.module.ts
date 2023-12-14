import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { VehiculeComponent } from './components/vehicule/vehicule.component';
import { VoitureComponent } from './components/voiture/voiture.component';
import { AuthenticationService } from './service/authentication/authentication.service';
import { UserService } from './service/user/user.service';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification/notification.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { FormsModule } from '@angular/forms';

//import{AuthInterceptor} from './interceptor/authinterceptor.authinterceptor';



@NgModule({
  declarations: [
    AppComponent,
    VehiculeComponent,
    VoitureComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    FormsModule
  ],
  providers: [NotificationService,AuthenticationService,UserService,
  //{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
],
schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
  bootstrap: [AppComponent]
})
export class AppModule { }
