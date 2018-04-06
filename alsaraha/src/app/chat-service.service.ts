import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {} from "rxjs/Observable";
@Injectable()
export class ChatServiceService {

  constructor() { }

  private socket = io('http://localhost:3000');

  sendMessage(data)
  {
    this.socket.emit('join',data);
  }
}
