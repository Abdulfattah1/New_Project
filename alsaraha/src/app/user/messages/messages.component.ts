import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../chat-service.service';
import { ServiceService } from '../../service.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers:[ChatServiceService , ServiceService ]
})
export class MessagesComponent implements OnInit {

  constructor(private Chat:ChatServiceService , private Service:ServiceService) { }
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
    this.Chat.sendMessage(data);
  }
}
