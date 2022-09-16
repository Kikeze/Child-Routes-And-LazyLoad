import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-agregar',
    templateUrl: './agregar.component.html',
    styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

    constructor(
        private ActRoute: ActivatedRoute
    ) {
        // Do nothing
    }

    ngOnInit(): void {
        // Do nothing
        this.ActRoute.params
            .subscribe({
                next: (v) => {
                    console.log(v);
                },
                error: (e) => {
                    console.error(e);
                },
                complete: () => {
                    console.log("Consulta de parametros completada");
                }
            });
    }

}
