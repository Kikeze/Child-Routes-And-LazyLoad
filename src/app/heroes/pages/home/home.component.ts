import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { Usuario } from '../../../authentication/interfaces/authentication.interfaces';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    usuario: Usuario;

    constructor(
        private router: Router,
        private AuthSvc: AuthenticationService
    ) {
        this.usuario = AuthSvc.getAuthentication();
    }

    ngOnInit(): void {
        // Do nothing
    }

    logout() {
        this.AuthSvc.logout();
        this.router.navigate(["/authentication"]);
    }

}
