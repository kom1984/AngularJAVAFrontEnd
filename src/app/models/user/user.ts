export class User {
    public idUser:number;
    public firstname: string;
    public lastname: string;
    public email: string;
    public password: string;
    public role: string;
    public enabled: boolean;
    public username:string;
    public accountNonLocked:boolean;
    public credentialsNonExpired:boolean;
    public accountNonExpired:boolean;
    public authorities:string[];
    public profileImageURL: string;
    public isActive: boolean;
    public isNotLocked:boolean;
    public lastLoginDate:Date;
    public lastLoginDateDisplay:Date;
    public joinDate:Date;

    constructor(){
        this.idUser=0;
        this.firstname='';
        this.lastname='';
        this.email='';
        this.password='';
        this.role='';
        this.enabled=true;
        this.username='';
        this.accountNonLocked=true;
        this.credentialsNonExpired=true;
        this.accountNonExpired=true;
        this.authorities=[];
        this.profileImageURL='';
        this.isActive=true;
        this.isNotLocked=false;
        this.lastLoginDate=new Date();
        this.lastLoginDateDisplay= new Date();
        this.joinDate=new Date();
        

    }

}
