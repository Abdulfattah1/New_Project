import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Form , FormControl , FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers , RequestOptions } from '@angular/http';
import { AuthGuard } from '../Gard/Auth.gard';
import { AuthGuardLogin } from '../Gard/guardAuthLogin';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ServiceService  , AuthGuardLogin]
})
export class LoginComponent implements OnInit {

  constructor(private service:ServiceService , private router:Router ,
  private Auth1:AuthGuardLogin,
  private Auth:AuthGuard) { }

  singInForm:FormGroup;
  success:Number;
  success1:String;
  message:String;
  ngOnInit() {
      
    console.log(this.Auth.redirectUrl);
    
    if(this.Auth.redirectUrl)
    {

      this.success  = 2;
      this.success1 = "alert alert-danger";
      this.message = "you have to be loged in";
    }
    this.singInForm = new FormGroup({
      'Username': new FormControl(null),
      'Password': new FormControl(null)
    });

    console.log(this.Auth.redirectUrl);
  }

  
  onSubmit()
  {

    var singInObject = {
      Username:this.singInForm.value.Username,
      Password:this.singInForm.value.Password
    }
    this.service.singIn(singInObject).subscribe(
      (data)=>{
        console.log(data);
       if(data.success)
       {
        this.success = 1;
        this.success1= "alert alert-success";
        this.message = "you are loged in";
        localStorage.setItem('token' , data.token);
        localStorage.setItem('userName',data.userName);
        this.service.setUserName(data.userName);
        setTimeout(()=>{
          this.router.navigate(['/home']);
        },2000);
      }
      else 
      {
        this.success = 2;
        this.success1= "alert alert-danger";
        this.message = "Try again";
      }
      },
      (err)=>console.log(err));
  }
}
