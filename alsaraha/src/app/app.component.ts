import { Component } from '@angular/core';
import { ChatServiceService } from './chat-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] , 
  providers: [ ChatServiceService ]
})
export class AppComponent {
  constructor(private Chat:ChatServiceService){};
  
  title = 'app';
}
