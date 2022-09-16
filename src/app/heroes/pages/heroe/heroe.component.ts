import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';


@Component({
    selector: 'app-heroe',
    templateUrl: './heroe.component.html',
    styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
    heroe!: Heroe;

    constructor(
        private ActRoute: ActivatedRoute,
        private HeroesSvc: HeroesService,
        private router: Router
    ) {
        // Do nothing
    }

    ngOnInit(): void {
        // Do nothing
        this.ActRoute.params
            .pipe(
                switchMap((params) => {
                    return this.HeroesSvc.getHeroePorId(params["id"]);
                })
            )
            .subscribe({
                next: (v) => {
                    this.heroe = v;
                },
                error: (e) => {
                    console.error(e);
                },
                complete: () => {
                    console.log("Consulta de parametros completada");
                }
            });
    }

    regresar() {
        this.router.navigate(["/heroes/listado"]);
    }

}
