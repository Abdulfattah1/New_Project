import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {} from "rxjs/Observable";
import { Http } from '@angular/http';
import { ServiceService } from './service.service';
@Injectable()

export class ChatServiceService {

  constructor(private http:Http,
  private service:ServiceService) { }
    
  public message_Recived=[];
  public message_Sent=[];

  Send_message(data)
  {
    return this.http.post('/user/message',data).map((res)=>res.json());
  }

  Delete(Item , Type)
  {
    this.service.createHeader();
    var messages = {
      Type:Type,
      message_Item:Item
    }
    console.log(messages);
    return this.http.post("/user/Delete",messages,this.service.option).map((res)=>res.json());
  }
  

  getReciveMessage()
  {
    this.service.createHeader();
    return this.http.get('/user/getReciveMessage',this.service.option).map((res=>res.json()));
  }
  getSendMessage()
  {
    this.service.createHeader();
    return this.http.get('/user/getSendMessage',this.service.option).map((res=>res.json()));
  }

  favor(message)
  {
    console.log(message.message);
    
    this.service.createHeader();
    return this.http.post("/user/addFavor",message,this.service.option).
    map((res)=>res.json());
  }

  getFavor()
  {
    this.service.createHeader();
    return this.http.get('/user/getFavor',this.service.option).map((res=>res.json()));
  }

  removeFavorMessage(message)
  {
    this.service.createHeader();
    return this.http.post('/user/removeFavorMessage',message,this.service.option).map((res=>res.json()));
  }
}
