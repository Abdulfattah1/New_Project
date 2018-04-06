import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[ServiceService]
})
export class ProfileComponent implements OnInit {

  userName:string;
  Email:string;
  success:boolean;
  constructor(private service:ServiceService) { }
  
  ngOnInit() {
    this.service.getProfile().subscribe((res)=>{
      console.log(res);
      if(!res.success)
      this.success=false;
      else 
      {
        this.userName = res.user.Username;
        this.Email = res.user.Email;
      }
    });
  }

}
