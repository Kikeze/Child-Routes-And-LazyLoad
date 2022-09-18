import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';


const routes: Routes = [
    {
        path: "authentication",
        loadChildren: () => import("./authentication/authentication.module").then(m => m.AuthenticationModule)
    },
    {
        path: "heroes",
        loadChildren: () => import("./heroes/heroes.module").then(m => m.HeroesModule),
        canLoad: [AuthenticationGuard],
        canActivate: [AuthenticationGuard]
    },
    {
        path: "404",
        component: ErrorPageComponent
    },
    {
        path: "**",
        // component: ErrorPageComponent
        redirectTo: "404"
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
