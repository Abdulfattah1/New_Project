import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { ChatServiceService } from '../chat-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] , 
  providers:[ServiceService , ChatServiceService] 
})
export class HomeComponent implements OnInit {
  


  constructor(private service:ServiceService , 
    private router:Router ,
    private Chat:ChatServiceService
  ) { }
  
  userName;
  messages=[];
  ngOnInit() {
    this.userName = "";
    this.Chat.getMessage();
    }

    ifLoggedIn()
    {
      if(localStorage.getItem('userName'))
      {
        this.userName = localStorage.getItem('userName');
        return true;
      }
      this.userName="";
    }

    Set_Url()
    {
      if(this.userName!="")
      {
        this.router.navigate(['/user',this.userName]);
      }
    }
    Recived()
    {
      this.messages = this.Chat.getMessageRecive();
    }

    Sent()
    {
      this.messages = this.Chat.getMessageSent();
    }
}
