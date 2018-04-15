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
  success:boolean;
  ngOnInit() {
    this.singUp = new FormGroup({
      'Email':new FormControl(null,[Validators.required , Validators.email]),
      'Password':new FormControl(null,[Validators.required , Validators.minLength(6)]),
      'Password_conform':new FormControl(null , Validators.required),
      'Username':new FormControl(null,[Validators.required]),
      'Name':new FormControl(null,[Validators.required]),
      'Birth_date':new FormControl(null,[Validators.required]),
      'Gender':new FormControl(null , [Validators.required]),
      'Country':new FormControl(null , [Validators.required])
    });
  }

  onSubmit()
  {
    console.log(this.singUp.value);
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
      console.log(res);
      if(!res.success)
      {
        this.success = false;
      }
      else{
        this.success = true;
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },2000);
      }
    }
    ,(err)=>console.log(err));
  }
}
