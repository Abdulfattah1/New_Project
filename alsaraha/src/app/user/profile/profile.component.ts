import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { FormGroup , FormControl ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[ServiceService]
})
export class ProfileComponent implements OnInit {

  userName:string;
  Email:string;
  success:String;
  success1:Number
  personal_Info_Form:FormGroup;
  Password_Form:FormGroup;
  Message;

  messageUsername;
  classUsername;
  success_Username:boolean;


  messageEmail;
  classEmail;
  success_Email:boolean;


  messagePassword;
  classPassword;

  classDeactive;
  messageDeactive;
  constructor(
    public service:ServiceService , 
    private Router:Router
  ) { }
  
  Person={
    userName:'',
    email:''
  }
  oldUserName;
  oldEmail;
  oldPassword;
  ngOnInit() {
    this.service.getProfile().subscribe((res)=>{
      console.log(res);
      
      this.Person = { 
        userName:res.user.userName,
        email:res.user.email
      }

      this.oldUserName=res.user.userName;
      this.oldEmail=res.user.email;
      this.oldPassword = res.user.PassWord;
    });

    this.personal_Info_Form = new FormGroup({
      userName:new FormControl(null,[
        Validators.required ,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      email:new FormControl(null,[
        Validators.required ,
        Validators.email , 
        Validators.minLength(5),
        Validators.maxLength(50),
        this.validateEmail
        ]),
    });

    this.Password_Form = new FormGroup({
      OLD:new FormControl(null),
      NEW:new FormControl(null),
      Config:new FormControl(null)
    });
  }

  //check if this username is evaliable

  checkUserName()
  {
    if(this.Person.userName!="")
  {
    this.service.checkUserName(this.Person.userName).subscribe((res)=>{
      if(res.success)
      {
        this.success_Username = true;
        this.classUsername = "alert alert-success";
        this.messageUsername = res.message;
      }
      else {
        this.success_Username = false;
        this.classUsername = "alert alert-danger";
        this.messageUsername = res.message;
      }
    });
  }
  }


  checkEmail()
  {
    if(this.Person.email!="")
    {
    this.service.checkEmail(this.Person.email).subscribe((res)=>{
      if(res.success)
      {
        this.success_Email = true;
        this.classEmail = "alert alert-success";
        this.messageEmail = res.message;
      }
      else {
        this.success_Email = false;
        this.classEmail = "alert alert-danger";
        this.messageEmail = res.message;
      }
    });
  }
  }


  ChangeUsername()
  {
    if(window.confirm('are you sure'))
    {
        this.service.ChangeUsername(this.Person).
        subscribe((res)=>{
          if(res.success)
          {
           localStorage.setItem('userName',this.Person.userName);
           
           this.classUsername = "alert alert-success";
           this.messageUsername = res.message;
          }
          else 
          {
            
            this.classUsername = "alert alert-danger";
            this.messageUsername = res.message; 
          }
        });
      }
  }


  ChangeEmail()
  {
    if(this.Person.email!=this.oldEmail)
    {
      if(window.confirm('are you sure'))
      {        
        this.service.ChangeEmail(this.Person).subscribe((res)=>{
          console.log(res);
          
          if(res.success)
          {
            this.classEmail = "alert alert-success";
            this.messageEmail = res.message;
          }
          else {
            this.classEmail = "alert alert-danger";
            this.messageEmail = res.message;
          }
        });
      }
    }
  }
  Submit_User()
  {
        console.log(this.personal_Info_Form);
        console.log(this.Person);
  }


  Change_Password()
  {
    console.log(this.Password_Form);
      console.log(this.Password_Form.get('NEW').value);
      console.log(this.Password_Form.get('Config').value);
      var one = this.Password_Form.get('NEW').value;
      var two = this.Password_Form.get('Config').value;
      if(one==two)
      {
        var Password = {
         passWord:this.Password_Form.get('NEW').value
        }
        this.service.Change_Password(Password).
        subscribe((res)=>{
          if(res.success)
          {
            this.classPassword = 'alert alert-success';
            this.messagePassword = res.message;
          }
          else{
            this.classPassword = 'alert alert-danger';
            this.messagePassword = res.message;
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




  deactivate()
  {
    const promp = window.prompt('enter you password');
    
    if(promp!=null)
    {
      console.log(typeof(Number(promp)));
      var config={
        passWord:Number(promp)
      };
      this.service.deactivate(config).subscribe((res)=>{
        
        if(res.success)
        {
          this.classDeactive = "alert alert-success";
          this.messageDeactive = res.message;
          setTimeout(() => {
            localStorage.removeItem('userName');
            localStorage.removeItem('token');
            this.Router.navigate(['/register']);
          }, 5000);
        }
        else {
          this.classDeactive = "alert alert-danger";
          this.messageDeactive = res.message;
        }
      });
    }
  }

}
