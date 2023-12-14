import { inject } from '@angular/core';
import {  CanActivateChildFn,  Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { NotificationService } from '../service/notification/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

export const AuthenticationGuard: CanActivateChildFn = () => {
  
  var authenticationService:boolean = inject(AuthenticationService).isUserLoggedIn()
   if(!authenticationService){
    inject(Router).navigate(['']);
    //Notification flash à la déconnexion
    inject(NotificationService).notify(NotificationType.ERROR,'you need to log in to access to this page');
   }
   return authenticationService;
  };
  

