import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../chat-service.service';
@Component({
  selector: 'app-favor',
  templateUrl: './favor.component.html',
  styleUrls: ['./favor.component.css'] , 
  providers: [ ChatServiceService ]
})
export class FavorComponent implements OnInit {

  message=[];
  title:String;
  constructor(private Chat:ChatServiceService) { }
  ngOnInit() {
    this.Chat.getFavor().subscribe((res)=>{
      if(res.success)
      {
      this.message  = res.message;
      this.title = "the messages that you saved";
      }
    });
  }

  DeleteMessage(item , id)
  {
    if(window.confirm('are you sure'))
    {
    this.message.splice(id, 1);
    var Type = "Favor";
    this.Chat.DeleteMessage(item,Type).subscribe((data)=>{
      console.log(data);
    });
    }
  }

}
