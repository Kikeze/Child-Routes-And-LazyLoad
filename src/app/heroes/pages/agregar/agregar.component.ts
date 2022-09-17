import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
    selector: 'app-agregar',
    templateUrl: './agregar.component.html',
    styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

    publishers = [
        {id: "DC Comics", desc: "DC - Comics"},
        {id: "Marvel Comics", desc: "Marvel - Comics"}
    ];

    heroe: Heroe = {
        superhero: "",
        alter_ego: "",
        first_appearance: "",
        characters: "",
        publisher: Publisher.DCComics,
        alt_img: ""
    };

    constructor(
        private ActRoute: ActivatedRoute,
        private HeroesSvc: HeroesService,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {
        // Do nothing
    }

    ngOnInit(): void {

        if( this.router.url.includes("editar") ) {
            this.ActRoute.params
                .pipe(switchMap((params) => {
                    return this.HeroesSvc.getHeroePorId(params["id"])
                }))
                .subscribe({
                    next: (heroe) => {
                        this.heroe = heroe;
                    },
                    error: (e) => {
                        console.error(e);
                    },
                    complete: () => {
                        console.log("Parametros leidos");
                    }
                });
        }

    }

    guardar() {
        if(this.heroe.superhero.length <= 0) {
            return;
        }
        if(this.heroe.alter_ego.length <= 0) {
            return;
        }

        if(!this.heroe.alt_img) {
            this.heroe.alt_img = "assets/no-image.png";
        }

        if(this.heroe.id) {
            // Actualizar
            this.HeroesSvc.putHeroe(this.heroe)
                .subscribe({
                    next: (v) => {
                        this.heroe = v;
                        this.mostrarSnakbar("Registro actualizado correctamente")
                    },
                    error: (e) => {
                        console.error(e);
                    },
                    complete: () => {
                        console.log("Actualizacion terminada");
                    }
                });
        }
        else {
            // Insertar
            this.HeroesSvc.postHeroe(this.heroe)
                .subscribe({
                    next: (v) => {
                        this.router.navigate(["/heroes/editar", v.id]);
                        this.mostrarSnakbar("Registro creado correctamente")
                    },
                    error: (e) => {
                        console.error(e);
                    },
                    complete: () => {
                        console.log("Insercion terminada");
                    }
                });
        }

    }

    confirmarBorrar() {
        const dialog = this.dialog.open(ConfirmarComponent, {
            width: "50%",
            data: this.heroe
        });

        dialog.afterClosed()
            .subscribe({
                next: (v) => {
                    if( v ) {
                        this.borrar();
                    }
                },
                error: (e) => {
                    console.error(e);
                },
                complete: () => {
                    console.log("Dialogo de borrado terminado");
                }
        });
    }

    borrar() {
        this.HeroesSvc.deleteHeroe(this.heroe)
            .subscribe({
                next: (v) => {
                    this.router.navigate(["/heroes/listado"]);
                },
                error: (e) => {
                    console.error(e);
                },
                complete: () => {
                    console.log("Borrado terminado");
                }
        });
    }

    mostrarSnakbar(mensaje: string) {
        this.snackBar.open(mensaje, "OK", {duration: 3000});
    }

}
