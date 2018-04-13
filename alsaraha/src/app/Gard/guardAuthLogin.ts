import { Injectable }     from '@angular/core';
import { CanActivate  , ActivatedRouteSnapshot , RouterStateSnapshot }    from '@angular/router';
import { ServiceService } from '../service.service';
import { Router} from '@angular/router';
@Injectable()
export class AuthGuardLogin implements CanActivate {


    redirectUrl;
    constructor(
        private service:ServiceService,
        private router:Router
    ){}
  
  
    canActivate(
        router:ActivatedRouteSnapshot , 
        state:RouterStateSnapshot 
    ) {
        if(this.service.ifLoggedIn())
        {
            this.redirectUrl = state.url;
            console.log(this.redirectUrl);
            
            console.log("you can't get into this page");
            this.router.navigate(['/home']);
            return false;
        }
        else 
        {

            return true;
        }
  }
}