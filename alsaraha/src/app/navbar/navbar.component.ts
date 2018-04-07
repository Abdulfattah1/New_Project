import { Component, OnInit } from '@angular/core';
import { ServiceService} from '../service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[ServiceService]
})
export class NavbarComponent implements OnInit {

  constructor(private service:ServiceService) { }
  
  ngOnInit() {
    
  }
}
