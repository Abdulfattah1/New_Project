import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../chat-service.service';
@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html',
  styleUrls: ['./message-send.component.css'] , 
  providers: []
})
export class MessageSendComponent implements OnInit {

  message = [];
  title:String;
  constructor(private Chat:ChatServiceService) { }
  ngOnInit() {
    this.title = "messages that you have sent";
    this.Chat.getSendMessage().subscribe((res)=>{
      this.message = res.message_Send;
      console.log(this.message);
    });
  }

  delete(item , Id)
  {
    if(window.confirm('are you sure'))
    {
    this.message.splice(Id, 1);
    var Type = "Send";
    this.Chat.Delete(item,Type).subscribe((data)=>{
      console.log(data);
    });
    
    }
  }
}
