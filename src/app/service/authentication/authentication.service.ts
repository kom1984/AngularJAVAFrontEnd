import { Injectable } from '@angular/core';
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { AppSettings } from '../../settings/app.settings';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private host: string = AppSettings.APP_URL;
  declare private token: string;
  declare loggedInUsername: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http:HttpClient) { }
  /*public login(user:User):Observable<HttpResponse<any> | HttpErrorResponse>{
    return this.http.post<HttpResponse<any> | HttpErrorResponse>
    (`${this.host}api/auth/signin`,user,{observe:'response'});


  }*/
  public login(user:User):Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}api/auth/signin`,user,{observe:'response'});
  }
  
  public register(user:User):Observable<User>{
    return this.http.post<User> 
    (`${this.host}api/auth/signin`,user);


  }
  public logout():void{
this.token = '';
this.loggedInUsername = '';
localStorage.removeItem('user');
localStorage.removeItem('token');
localStorage.removeItem('users');

  }
  public saveToken(token:string):void{
    this.token = token;
    localStorage.setItem('token',token);
  
      }
  public addUserToLocalCache(user:User):void{
   localStorage.setItem('user',JSON.stringify(user));
      
   }

   public getUserToLocalCache():User{
     return JSON.parse(localStorage.getItem('user')!);//ou | '{}'
          
    }
    public loadToken():void{
      this.token!= localStorage.getItem('token') || '{}';// ou !
           
     }
     public getToken(token: String){
      return this.token;
     }
     public isUserLoggedIn():boolean{
      this.loadToken();
      if(this.token != null && this.token!== ''){
        if(this.jwtHelper.decodeToken(this.token).sub!=null || '')
        {//vérifier que la sous-chaine du token n'est pas null
             if(!this.jwtHelper.isTokenExpired(this.token)){//vérifier que le token n'pas expiré
              this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
return true;

}
        }

      }
      else{
        this.logout();
        return false;
      }
      return false;
     }
  }

