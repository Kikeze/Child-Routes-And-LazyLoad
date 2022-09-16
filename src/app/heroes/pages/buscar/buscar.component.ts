import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';


@Component({
    selector: 'app-buscar',
    templateUrl: './buscar.component.html',
    styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
    termino: string = "";
    heroes: Heroe[] = [];
    seleccionado: Heroe | undefined;

    constructor(
        private HeroesSvc: HeroesService
    ) {
        // Do nothing
    }

    ngOnInit(): void {
        // Do nothing
    }

    buscando() {
        this.HeroesSvc.getHeroesFilter(this.termino.trim(), 5)
            .subscribe({
                next: (v) => {
                    this.heroes = v;
                },
                error: (e) => {
                    console.error(e);
                },
                complete: () => {
                    console.log("Busqueda de autocomplete terminada");
                }
            });
    }

    seleccionada(e: MatAutocompleteSelectedEvent) {
        if( !e.option.value ) {
            this.seleccionado = undefined;
            return;
        }

        const heroe: Heroe = e.option.value;
        this.termino = heroe.superhero;
        this.seleccionado = heroe;
    }

}
