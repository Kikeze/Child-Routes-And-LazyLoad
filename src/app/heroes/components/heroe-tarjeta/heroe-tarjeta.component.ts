import { Component, Input, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';


@Component({
    selector: 'app-heroe-tarjeta',
    templateUrl: './heroe-tarjeta.component.html',
    styleUrls: ['./heroe-tarjeta.component.css']
})
export class HeroeTarjetaComponent implements OnInit {

    @Input() heroe!: Heroe;

    constructor() {
        // Do nothing
    }

    ngOnInit(): void {
        // Do nothing
    }

}
