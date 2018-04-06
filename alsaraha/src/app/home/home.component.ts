import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] , 
  providers:[ServiceService] 
})
export class HomeComponent implements OnInit {
  


  constructor(private service:ServiceService , private router:Router) { }
  username = '';
  ngOnInit() {
    if(!this.service.LogInOrOut())
    {
    this.username = (localStorage.getItem('userName'));
    this.username = this.username.substring(0,this.username.length-1);
    }
    }

    USER()
    {
      this.router.navigate(["/user",this.username]);
    }
    

}
