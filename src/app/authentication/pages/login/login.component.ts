import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { Usuario } from '../../interfaces/authentication.interfaces';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private router: Router,
        private AuthScv: AuthenticationService
    ) {
        // Do nothing
    }

    ngOnInit(): void {
        // Do nothing
    }

    login() {
        this.AuthScv.login()
            .subscribe({
                next: (v) => {
                    if( v.id ) {
                        this.router.navigate(["/heroes"]);
                    }
                },
                error: (e) => {
                    console.error(e);
                },
                complete: () => {
                    console.log("Login de usuario terminado");
                }
            });
    }

}
