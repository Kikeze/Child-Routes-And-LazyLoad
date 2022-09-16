import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';


@Component({
    selector: 'app-listado',
    templateUrl: './listado.component.html',
    styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
    heroes: Heroe[] = [];

    constructor(
        private HeroesSvc: HeroesService
    ) {
        // Do nothing
    }

    ngOnInit(): void {
        // Do nothing
        this.HeroesSvc.getHeroes()
            .subscribe({
                next: (v) => {
                    this.heroes = v;
                },
                error: (e) => {
                    console.error(e);
                },
                complete: () => {
                    console.log("Consulta de heroes completada");
                }
            });
    }

}
