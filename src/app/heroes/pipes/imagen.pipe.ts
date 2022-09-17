import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';


@Pipe({
    name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

    transform(value: Heroe): string {
        if( !value.id ) {
            return `assets/no-image.png`;
        }
        if( value.alt_img ) {
            return value.alt_img;
        }

        return `assets/heroes/${value.id}.jpg`;
    }

}
