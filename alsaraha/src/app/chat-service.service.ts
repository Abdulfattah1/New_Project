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
  url = "";

  //send message and save it in the recived message's field
  Send_message(data)
  {
    return this.http.post(this.url+'/messages/sendMessage/'+data.userName_Reciver,data).map((res)=>res.json());
  }

  ////send message and save it in the sent message's field
  saveMessageSend(data)
  {
    this.service.createHeader();
    return this.http.post(this.url+'/messages/saveMessageSend',data,this.service.option).map((res)=>res.json());
  }

  DeleteMessage(Item , Type)
  {
    this.service.createHeader();
    var messages = {
      Type:Type,
      message_Item:Item
    }
    console.log(messages);
    return this.http.post(this.url+'/messages/DeleteMessage',messages,this.service.option).map((res)=>res.json());
  }

  //Get the messages that the user recived
getSendMessage()
  {
    this.service.createHeader();
    return this.http.get(this.url+'/messages/getSentMessage',this.service.option).map((res=>res.json()));
  }

  //Get the messages that the user sent
getReciveMessage()
  {
    this.service.createHeader();
    return this.http.get(this.url+'/messages/getReciveMessage',this.service.option).map((res=>res.json()));
  }

  //Get the messages that the user liked
  favor(message)
  {
    console.log(message.message);
    
    this.service.createHeader();
    return this.http.post(this.url+'/messages/addFavor',message,this.service.option).
    map((res)=>res.json());
  }

  getFavor()
  {
    this.service.createHeader();
    return this.http.get('/messages/getFavorMessage',this.service.option).map((res=>res.json()));
  }

  removeFavorMessage(message)
  {
    this.service.createHeader();
    return this.http.post('/messages/removeFavorMessage',message,this.service.option).map((res=>res.json()));
  }

  
}
