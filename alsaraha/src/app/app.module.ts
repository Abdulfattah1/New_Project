import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Http ,HttpModule} from '@angular/http';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {  RouterModule } from  '@angular/router';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { MessagesComponent } from './user/messages/messages.component';
import { NothingComponent } from './nothing/nothing.component';
import { ThanksComponent } from './thanks/thanks.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageReciveComponent } from './home/message-recive/message-recive.component';
import { MessageSendComponent } from './home/message-send/message-send.component';
import { FavorComponent } from './home/favor/favor.component'

const Router_pages:Routes = [
  {
    path:'home',
    component:HomeComponent , 
    children:[
      {
        path:'messageRecive',
        component:MessageReciveComponent
      },
      {
        path:'messageSend' , 
        component:MessageSendComponent
      },
      {
        path:'favor',
        component:FavorComponent
      }
    ]
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'USER',
    component:UserComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'message',
    component:MessagesComponent
  },
  {
    path:'user/:id',
    component:MessagesComponent
  },
  {
    path:'THX',
    component:ThanksComponent
  },
  {
    path:'nothing',
    component:NothingComponent
  },
  {
    path:'about',
    component:AboutUsComponent
  },
  {
    path:'**',
    component:HomeComponent
  },
  {
    path:'',
    component:HomeComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    AboutUsComponent,
    ContactComponent,
    HomeComponent,
    UserComponent,
    ProfileComponent,
    MessagesComponent,
    NothingComponent,
    ThanksComponent,
    MessageReciveComponent,
    MessageSendComponent,
    FavorComponent
    
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,HttpModule,
    RouterModule.forRoot(Router_pages)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
