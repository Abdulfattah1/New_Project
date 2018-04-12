import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { FormGroup , FormControl } from '@angular/forms';
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

  constructor(private service:ServiceService) { }
  
  Person={
    userName:'',
    Email:''
  }
  oldUserName;
  oldEmail;
  oldPassword;
  ngOnInit() {
    this.service.profile().subscribe((res)=>{
      console.log(res);
      
      this.Person = { 
        userName:res.user.Username,
        Email:res.user.Email
      }

      this.oldUserName=res.user.Username;
      this.oldEmail=res.user.Email;
      this.oldPassword = res.user.Password;
    });

    this.personal_Info_Form = new FormGroup({
      userName:new FormControl(null),
      email:new FormControl(null)
    });

    this.Password_Form = new FormGroup({
      OLD:new FormControl(null),
      NEW:new FormControl(null),
      Config:new FormControl(null)
    });
  }

  changeUserName()
  {
    if(this.Person.userName!=this.oldUserName)
    {
      if(window.confirm("are you sure"))
      {
        this.service.finalChangeUserName(this.Person).
        subscribe((res)=>{
          if(res.success)
          {
           localStorage.setItem('userName',this.Person.userName);
           this.Message = "username has changed"
           this.success = "alert alert-success";
          }
          else 
          {
            this.Message = "try another username"
           this.success = "alert alert-danger";
          }
        });
      }
    }
    else{
      this.success = "alert alert-dark";
    }
  }

  checkEmail()
  {
    if(this.Person.Email!=this.oldEmail)
    {
      if(this.Person.Email!=this.oldEmail)
      {
        if(window.confirm("are you sure"))
        {
          this.service.finalChangeEmail(this.Person).
          subscribe((res)=>{
            if(res.success)
            {
             this.Message = "Email has changed"
             this.success = "alert alert-success";
            }
            else 
            {
            this.Message = "try another One"
            this.success = "alert alert-danger";
            }
          });
        }
      }
      else {
        this.success = "alert alert-dark";
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
    if(this.oldPassword==this.Password_Form.get('OLD').value)
    {
      console.log(this.Password_Form.get('NEW').value);
      console.log(this.Password_Form.get('Config').value);
      var one = this.Password_Form.get('NEW').value;
      var two = this.Password_Form.get('Config').value;
      if(one==two)
      {
        var Password = {
         Password:this.Password_Form.get('NEW').value
        }
        this.service.Change_Password(Password).
        subscribe((res)=>{
          if(res.success)
          {
            this.Message = "you have changed the password";
            this.success = "alert alert-success";
          }
          else{
            this.Message = "there is somethimg went worng";
            this.success = "alert alert-danger";
          }
          
          console.log(res);
          
        });
      }
    }    
  }
}
