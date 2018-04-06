import { Injectable } from '@angular/core';
import { Http , RequestOptions , Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import {Router  } from '@angular/router';
@Injectable()
export class ServiceService {

  constructor(private http:Http , private router:Router) { }


  authToken;
  option;
  user;
  UserName;

  createAutnticationHeader()
  {
    this.loadToken();
    this.option = new RequestOptions({
      headers: new Headers({
        'Content-Type':'Application/json',
        'authorization':this.authToken
      })
    }); 
  }

  loadToken()
  {
    this.authToken = localStorage.getItem('token');
  }

  StoreUserInformation(User)
  {
    console.log(User);
    return this.http.post("http://localhost:3000/user/register",User).map((res)=>res.json());
  }

  singInUser(user)
  {
    console.log(user);
    return this.http.post('http://localhost:3000/user/login',user).map(res=>res.json());
  }

  logOut()
  {

    setTimeout(()=>{
      this.authToken = null;
      this.user = null;
      localStorage.clear();
      this.router.navigate(['/']);
    },1000);
  }
  saveInformationInBrowser(token , user)
  {
    localStorage.setItem('token' , token);
    localStorage.setItem('username', user);
  }

  getProfile()
  {
    this.createAutnticationHeader();
    return this.http.get('http://localhost:3000/user/profile',this.option).map((res)=>res.json());
  }

  LogInOrOut()
  {
    return tokenNotExpired();
  }
  

}
