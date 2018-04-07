import { Component, OnInit } from '@angular/core';
import {ChatServiceService } from '../../chat-service.service';
@Component({
  selector: 'app-message-sent',
  templateUrl: './message-sent.component.html',
  styleUrls: ['./message-sent.component.css'] , 
  providers:[ ChatServiceService ]
})
export class MessageSentComponent implements OnInit {

  constructor(
    private Chat:ChatServiceService
  ) { }


  ngOnInit() {

  }
}
