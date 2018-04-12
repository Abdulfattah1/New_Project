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
  constructor(private Chat:ChatServiceService) { }
  ngOnInit() {
    this.Chat.getFavor().subscribe((res)=>{
      this.message  = res.favor;
    });
  }

  Remove(item , id)
  {
    var Rmessage = {
      message:item
    }
    this.message.splice(id,1);
    this.Chat.removeFavorMessage(Rmessage).subscribe((res)=>{
      console.log(res);
    });
  }

}
