import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../../models/user/user';
import { publishFacade } from '@angular/compiler';
import { UserService } from '../../service/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from '../../enum/notification-type.enum';
import { NotificationService } from '../../service/notification/notification.service';
import { AppSettings } from '../../settings/app.settings';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public users!: User[];
  public refreshing!: boolean;
  public subscriptions:Subscription[]=[];
  public showLoading!: boolean;
 declare public fileName: string;
  urlPict = AppSettings.APP_URL;
  public selectedUser!: User;
  
constructor( private userService:UserService,private notificationService:NotificationService){}

public changeTitle(title : string) : void{
  this.titleSubject.next(title);

}

ngOnInit(): void{
  this.getUsers(true);
}

public getUsers(showNotification : boolean):void{
  this.refreshing = true;
  this.subscriptions.push(
    this.userService.getUsers().subscribe({
      next:
          (response:User[]) => {
        this.userService.addUsersToLocalCache(response);
        this.users = response;
        this.refreshing = false;
        if(showNotification){

        }
      }
    ,
    error:
    (errorResponse: HttpErrorResponse) => {
      //console.log(errorResponse);
      this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
      this.refreshing = false;
    }
  }
  )
  );
}
private sendErrorNotification(notificationType: NotificationType, message: string):void {
  if(message){
   this.notificationService.notify(notificationType,message); 
  }else{
    this.notificationService.notify(notificationType,"AN ERROR OCCURED. PLEASE TRY AGAIN");
  }
}
public onSelectUser(selectedUser:User):void{
this.selectedUser = selectedUser;
document.getElementById('openUserInfo')?.click();
}
onAddNewUser(_t129:NgForm){

}
onProfileImageChange($event:Event){

}
saveNewUser(){
  
}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}

  
}





