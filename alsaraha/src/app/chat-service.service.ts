import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {} from "rxjs/Observable";
import { Http } from '@angular/http';
import { ServiceService } from './service.service';
@Injectable()
export class ChatServiceService {

  constructor(private http:Http,
  private service:ServiceService) { }
  Send_message(data)
  {
    return this.http.post('http://localhost:3000/user/message',data).map((res)=>res.json());
  }
  
  private message_Recived=[];
  private message_Sent=[];

  getMessage()
  {
     this.service.createHeader();
     this.http.get('http://localhost:3000/user/getMessage',this.service.option).map((res=>res.json()))
    .subscribe((data)=>{
      this.message_Sent = data.message_Send;
      this.message_Recived = data.message_Recive;
    });
  }

  getMessageSent()
  {
    
    return this.message_Sent;
  }

  getMessageRecive()
  {
    return this.message_Recived;
  }
}
