import { Component } from '@angular/core';
import { ChatServiceService } from './chat-service.service';
import { ServiceService } from './service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] , 
  providers: [ ChatServiceService , ServiceService]
})
export class AppComponent {
  constructor(private Chat:ChatServiceService,
  private service:ServiceService){};
  
  title = 'app';
}
