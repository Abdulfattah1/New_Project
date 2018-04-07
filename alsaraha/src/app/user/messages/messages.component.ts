import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../chat-service.service';
import { ServiceService } from '../../service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers:[ChatServiceService , ServiceService]
})
export class MessagesComponent implements OnInit {

  constructor(
    private Chat:ChatServiceService , 
    private Service:ServiceService ,
    private router:Router
  ) { }
  text_box = "";
  userName ;
  ngOnInit() {
    var name = window.location.href;
    this.userName = name.slice(27);
  }

  Send_message()
  {
    var data = {
      userName:this.userName,
      message:this.text_box
    }
    this.Chat.Send_message(data).subscribe((res=>{
      if(res.success)
      {
        setTimeout(()=>{
          this.router.navigate(['THX']);
        },1000);
      }
      else 
      {
        console.log('fuck');
      }
    }));    
  }
}
