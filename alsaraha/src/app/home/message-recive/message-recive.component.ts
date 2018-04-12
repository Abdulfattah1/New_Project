import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../chat-service.service';
@Component({
  selector: 'app-message-recive',
  templateUrl: './message-recive.component.html',
  styleUrls: ['./message-recive.component.css'] , 
  providers:[ ChatServiceService ]
})
export class MessageReciveComponent implements OnInit {

  constructor(private Chat:ChatServiceService ) { }
  message =[];
  title:String;
  DELETED;
  ngOnInit() {
     this.title = "the messages that you have recived";
     this.Chat.getReciveMessage().subscribe((res)=>{
       this.message = res.message_Recive;
       console.log(this.message);
     });    
  }
  delete(item , Id)
  {
    if(window.confirm('are you sure'))
    {
    this.message.splice(Id, 1);
    var Type = "Recive";
    this.Chat.Delete(item,Type).subscribe((data)=>{
      console.log(data);
    });
    }
  }

  favor(item)
  {
    console.log(item);
    var MM = {
      message:item
    }
    this.Chat.favor(MM).subscribe((res)=>{
      console.log(res);
    });
  }

}
