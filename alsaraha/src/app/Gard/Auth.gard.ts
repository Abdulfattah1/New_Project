import { Injectable }     from '@angular/core';
import { CanActivate  , ActivatedRouteSnapshot , RouterStateSnapshot }    from '@angular/router';
import { ServiceService } from '../service.service';
import { Router} from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {


    
    constructor(
        private service:ServiceService,
        private router:Router
    ){}

    redirectUrl;
  
    canActivate(
        router:ActivatedRouteSnapshot , 
        state:RouterStateSnapshot 
    ) {
        if(this.service.ifLoggedIn())
        {
            return true;
        }
        else 
        {
            console.log("you can't get into this page you have to be loged");
            this.redirectUrl = state.url;
            console.log(this.redirectUrl);    
            this.router.navigate(['/login']);   
            return false;
        }
  }
}