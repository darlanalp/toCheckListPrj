import { LoginService } from './../cadastros/login.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private loginService : LoginService) { }

    canActivate( route: ActivatedRouteSnapshot,
                 state: RouterStateSnapshot ): Observable<boolean> | boolean {

                    this.loginService.currentUser.subscribe( currentUser => {

                        if(currentUser == null)
                           this.router.navigate(['/login']);
                        else
                           return true;
                    })
                    
                    return true;
    }
        
                    
 
}