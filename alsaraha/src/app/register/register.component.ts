import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl ,Validators} from '@angular/forms';
import {ServiceService } from '../service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[ServiceService]
})
export class RegisterComponent implements OnInit {

  constructor(private Service:ServiceService , private router:Router) { }
  singUp:FormGroup;
  E_success:String;
  U_success:String;
  message:String;
  class:String;
  message_U:String;
  ngOnInit() {
    this.singUp = new FormGroup({
      'Email':new FormControl(null,[
        Validators.required ,
        Validators.email , 
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
        ]),
      'Password':new FormControl(null,[
        Validators.required
      ]),
      'Password_conform':new FormControl(null , [
        Validators.required
      ]),
      'Username':new FormControl(null,[
        Validators.required , 
        Validators.minLength(3) , 
        Validators.maxLength(30) ,
        this.validateUsername
      ]),
      'Name':new FormControl(null,[
        Validators.required , 
        Validators.minLength(3) , 
        Validators.maxLength(20) 
      ]),
      'Birth_date':new FormControl(null,[Validators.required]),
      'Gender':new FormControl(null , [Validators.required]),
      'Country':new FormControl(null , [Validators.required])
    },{
      validators:this.matchingPasswords('Password','Password_conform')
    });
  }

  onSubmit()
  {
    //console.log(this.singUp);
    
    var person_info = {
      email:this.singUp.value.Email,
      passWord:this.singUp.value.Password,
      passWord_config:this.singUp.value.Password_conform,
      userName:this.singUp.value.Username,
      name:this.singUp.value.Name,
      brithDate:this.singUp.value.Birth_date,
      gender:this.singUp.value.Gender,
      country:this.singUp.value.Country
  };
    this.Service.register(person_info).subscribe((res)=>
    {
      if(!res.success)
      {
        this.class   = "alert alert-danger";
        this.message = res.message;
      }
      else{
        
        
        this.class   = "alert alert-success";
        this.message = res.message;
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },2000);
      }
    }
    ,(err)=>console.log(err));
  }



  checkEmail()
  {
    if(this.singUp.get('Email').value)
    {
    this.Service.checkEmail(this.singUp.get('Email').
    value).subscribe((res)=>{

      //console.log(res);
      
      if(!res.success)
      {
        this.E_success  = 'alert alert-danger';
        this.message = res.message;
      }
      else {
        this.E_success = 'alert alert-success';
        this.message  = res.message;
      }
    });
  }
  }

  checkUserName()
  {
    if(this.singUp.get('Username').value)
    {
    this.Service.checkUserName(this.singUp.get('Username').
    value).subscribe((res)=>{

      //console.log(res);
      
      if(!res.success)
      {
        this.U_success = 'alert alert-danger';
        this.message_U = res.message;
      }
      else {
        this.U_success  = 'alert alert-success';
        this.message_U  = res.message;
      }
    });
  }
  }

  validateEmail(controls) {
    
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true }
    }
  }

  validateUsername(controls) {

    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername': true }
    }
  }

  validatePassword(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatePassword': true }
    }
  }

  matchingPasswords(Password,Password_conform)
  {
    return(group:FormGroup)=>{
      if(group.controls[Password].value===group.controls[Password_conform].value)
      return null;
      else 
      {
        return {'matchingPasswords':true}
      }
    }
  }
}
