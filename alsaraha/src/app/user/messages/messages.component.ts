import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../chat-service.service';
import { ServiceService } from '../../service.service';
import { Router ,ActivatedRoute} from '@angular/router';
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
    private router:Router , 
    private route:ActivatedRoute
  ) { }
  text_box = "";
  userName_Reciver ;
  userNameSender =""; 
  message:String;
  success:String;
  ngOnInit() {
    this.userName_Reciver = this.route.snapshot.params['id'];
  }


  Check_Send_Recive()
  {
    if(this.Service.ifLoggedIn())
    this.userNameSender = localStorage.getItem('userName');
    else
    this.userNameSender ="NO";
  }

  Send_message()
  {
    this.Check_Send_Recive();
    if(this.text_box!="")
    {
    var data = {
      userName_Reciver:this.userName_Reciver,
      message:this.text_box , 
      userName_Sender:this.userNameSender

    }
    this.Chat.Send_message(data).subscribe((res=>{
      if(res.success)
      {
        console.log(res);
        this.message = "your message was sent";
        this.success ="alert alert-success";
        setTimeout(()=>{
          this.router.navigate(['THX']);
        },2000);
      }
      else 
      {
        console.log('NOW');
      }
    }));    
  }
  else 
  {
    this.message ="write something";
    this.success ="alert alert-danger";
  }
  }
}
