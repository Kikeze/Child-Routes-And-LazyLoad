import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/authentication.interfaces';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private apiUrl: string = environment.baseUrl;
    private _usuario: Usuario | undefined;

    constructor(
        private http: HttpClient
    ) {
        // Do nothing
    }

    getAuthentication(): Usuario {
        return { ...this._usuario } as Usuario;
    }

    login(): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/usuarios/1`)
            .pipe(tap((v) => {
                this._usuario = v;
            }), tap((v) => {
                localStorage.setItem("token", v.id);
            }));
    }

    logout() {
        localStorage.removeItem("token");
        this._usuario = undefined;
    }

    verificaAuthenticacion(): Observable<boolean> {
        if( !localStorage.getItem("token") ) {
            return of(false);
        }

        return this.http.get<Usuario>(`${this.apiUrl}/usuarios/1`)
            .pipe(map((v) => {
                if( v.id ) {
                    this._usuario = v;
                    return true;
                }
                return false;
            }));
    }

}
