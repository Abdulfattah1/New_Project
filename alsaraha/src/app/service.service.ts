import { Injectable } from '@angular/core';
import { Http , RequestOptions , Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import {Router  } from '@angular/router';
@Injectable()
export class ServiceService {

  url = "http://localhost:3000/";
  private userName;
  private email;
  option;
  Auth;
  constructor(private http:Http , private router:Router) { }
   
  register(user)
  {
    return this.http.post(this.url+"user/register", user).map((res)=>res.json());
  }

  singIn(user)
  {
    return this.http.post(this.url+"user/login",user).map((res)=>res.json());
  }

  profile()
  {
    this.createHeader();
    return this.http.get('http://localhost:3000/user/profile',this.option).map((res=>res.json()));
  }


  changeUserName(userName)
  {
    this.createHeader();
    return this.http.post('http://localhost:3000/user/changeUserName',userName , this.option).map((res)=>res.json());
  }


  finalChangeUserName(userName)
  {    
    this.createHeader();
    return this.http.post('http://localhost:3000/user/finalChangeUserName',userName,this.option)
    .map((res)=>res.json());
  }


  checkEmail(email)
  {
    return this.http.post('http://localhost:3000/user/checkEmail',email , this.option).map((res)=>res.json());
  }


  finalChangeEmail(Email)
  {
    this.createHeader();
    return this.http.post('http://localhost:3000/user/finalChangeEmail',Email,this.option)
    .map((res)=>res.json());
  }

  Change_Password(Password)
  {
    this.createHeader();
    return this.http.post('http://localhost:3000/user/changePassword',Password,this.option)
    .map((res)=>res.json());
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
}
