import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[ServiceService]
})
export class ProfileComponent implements OnInit {

  userName:string;
  Email:string;
  success:boolean;
  constructor(private service:ServiceService) { }
  
  ngOnInit() {
    
  }

}
