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



  /////you have to learn the abservable things
  Send_message()
  {
    if(this.text_box!="")
    {
      const dataMessage = {
        content:this.text_box,
        userName_Reciver:this.userName_Reciver
      }
      this.Chat.Send_message(dataMessage).
      subscribe((res)=>{
        if(res.success)
        {
          this.success = "alert alert-success";
          this.message = res.message;
          setTimeout(() => {
            this.router.navigate(['THX']);
          }, 2000);
          
        }        
        else {
          this.success = "alert alert-danger";
          this.message = res.message;
        }
      });
      if(localStorage.getItem('token'))
      {
      this.Chat.saveMessageSend(dataMessage)
      .subscribe((res)=>{
        if(res.success)
        {
          console.log('success savaing ');
        }
        else {
          console.log('not saving');
        }
      });
      }
    }
    else 
    {
    this.success = "alert alert-danger";
    this.message = "you have to write a message";
    }
  }
}
