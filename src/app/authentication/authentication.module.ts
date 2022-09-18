import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';



@NgModule({
    declarations: [
        LoginComponent,
        RegistroComponent,
    ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        MaterialModule,
    ]
})
export class AuthenticationModule { }
