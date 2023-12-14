import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notification/notification.service';
import { User } from '../../models/user/user';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NotificationType } from '../../enum/notification-type.enum';
import { HeaderType } from '../../enum/header-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit,OnDestroy{

   public showLoading!: boolean;
   public subscriptions:Subscription[] = [];

  constructor(private router:Router,
    private authenticationService:AuthenticationService,
    private notificationService:NotificationService){ }

    ngOnInit(): void{
          if(this.authenticationService.isUserLoggedIn()){
            this.router.navigateByUrl('/user/management');
          }else{
          this.router.navigateByUrl('/login');
        }
    }
    public onLogin(user:User):void{
      this.showLoading = true;
      console.log(user);
      
      this.subscriptions.push(this.authenticationService.login(user).subscribe(
        {
        next:
         (response: HttpResponse<User>)=>{
            const token = response.headers.get(HeaderType.JWT_TOKEN);
            this.authenticationService.saveToken(token!);
            this.authenticationService.addUserToLocalCache(response.body!);
            this.router.navigateByUrl('/user/management');
            this.showLoading =false;
            //console.log("Dans le nextdu subscribe:......"+user);
          },
       error:
       (errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse);
        this.sendErrorNotification(NotificationType.ERROR,errorResponse.error.message);
          this.showLoading = false;  
        
                    
        
          }
    }));
  }   
  private sendErrorNotification(notificationType:NotificationType,message:string):void{
    if(message){
      this.notificationService.notify(notificationType,message);
    }else{
      this.notificationService.notify(notificationType,"AN ERROR OCCURED.PLEASE TRY AGAIN");
    }
  }
    
    ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>sub.unsubscribe());
        
    }

}
  

