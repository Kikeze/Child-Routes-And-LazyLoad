import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Usuario } from '../interfaces/authentication.interfaces';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanLoad {
    constructor(
        private AuthSvc: AuthenticationService,
        private router: Router
    ) {
        // Do nothing
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.AuthSvc.verificaAuthenticacion()
            .pipe(tap((v) => {
                if( !v ) {
                    this.router.navigate(["/authentication/login"]);
                }
            }));
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.AuthSvc.verificaAuthenticacion()
            .pipe(tap((v) => {
                if( !v ) {
                    this.router.navigate(["/authentication/login"]);
                }
            }));
    }
}
