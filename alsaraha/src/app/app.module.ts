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
import { MessageSentComponent } from './user/message-sent/message-sent.component';
import { HttpClientModule } from '@angular/common/http'

const Router_pages:Routes = [
  {
    path:'Home',
    component:HomeComponent
  },
  {
    path:'user/register',
    component:RegisterComponent
  },
  {
    path:'user/login',
    component:LoginComponent
  },
  {
    path:'USER',
    component:UserComponent
  },
  {
    path:'user/profile',
    component:ProfileComponent
  },
  {
    path:'user/message',
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
    path:'messageSent',
    component:MessageSentComponent
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
    MessageSentComponent,
    
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,HttpModule,
    RouterModule.forRoot(Router_pages)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
