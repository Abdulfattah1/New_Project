import { Injectable } from '@angular/core';
import { Http , RequestOptions , Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import {Router  } from '@angular/router';
@Injectable()
export class ServiceService {

  url = "";
  private userName;
  private email;
  option;
  Auth;
  constructor(private http:Http , private router:Router) { }
   
  register(user)
  {
    return this.http.post(this.url+"/user/register", user).map((res)=>res.json());
  }

  singIn(user)
  {
    return this.http.post(this.url+"/user/login",user).map((res)=>res.json());
  }

  getProfile()
  {
    this.createHeader();
    return this.http.get(this.url+'/user/getProfile',this.option).map((res=>res.json()));
  }



    /*=====================================
                  Changing
    =====================================*/    
  /////Changeing the username////
  ChangeUsername(userName)
  {    
    this.createHeader();
    return this.http.post(this.url+'/user/ChangeUsername',userName,this.option)
    .map((res)=>res.json());
  }

 /////Changeing the Email////
 ChangeEmail(Email)
  {
    this.createHeader();
    return this.http.post(this.url+'/user/ChangeEmail',Email,this.option)
    .map((res)=>res.json());
  }

   /////Changeing the password////
  Change_Password(Password)
  {
    this.createHeader();
    return this.http.post(this.url+'/user/changePassword',Password,this.option)
    .map((res)=>res.json());
  }
  /*=====================================
                 End Changing
    =====================================*/               

  checkEmail(email)
  {    
    return this.http.get(this.url+'/user/checkEmail/' + email).map((res)=>res.json());
  }


  checkUserName(userName)
  {    
    return this.http.get(this.url+'/user/checkUserName/' + userName).map((res)=>res.json());
  }



  setUserName(userName)
  {
    this.userName = userName;
  }

  getUserName()
  {
    return this.userName;
  }

  

  ifLoggedIn()
  {
    return tokenNotExpired();
  }


  logOut()
  {
    localStorage.clear();
    this.userName="";
    this.router.navigate(['nothing']);
  }


  createHeader()
  {
    this.loadToken();
    this.option = new RequestOptions({
      headers: new Headers({
        'Content-Type':'Application/json',
        'authorization':this.Auth
      })
    });
  }

  //HEADER
  loadToken()
  {
    this.Auth = localStorage.getItem('token');
  }


  deactivate(data)
  {
    console.log(data);
    
    this.createHeader();
    return this.http.post(this.url+'/user/deactivate',data,this.option).map((res)=>res.json());
  }
}
