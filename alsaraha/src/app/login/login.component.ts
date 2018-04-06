import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Form , FormControl , FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers , RequestOptions } from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ServiceService]
})
export class LoginComponent implements OnInit {

  constructor(private service:ServiceService , private router:Router) { }

  singInForm:FormGroup;
  success:boolean;
  ngOnInit() {
    this.singInForm = new FormGroup({
      'Username': new FormControl(null),
      'Password': new FormControl(null)
    });

    function supports_html5_storage() {
      try {
            console.log('localStorage' in window && window['localStorage'] !== null);
          } catch (e) {
        console.log(false);
       }
     }
  }

  





  onSubmit()
  {
    var singInObject = {
      Username:this.singInForm.value.Username,
      Password:this.singInForm.value.Password
    }
    this.service.singInUser(singInObject).subscribe(
      (data)=>{
        console.log(data);
       localStorage.setItem('token' , data.token);
       localStorage.setItem('userName',data.userName);
       if(data.success)
       {
         this.success = true;
        setTimeout(()=>{
          this.router.navigate(['/home']);
        },2000);
      }
      else 
      {
        this.success = false;
      }
      },
      (err)=>console.log(err));
  }
}
