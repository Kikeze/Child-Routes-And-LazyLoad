import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Heroe } from '../interfaces/heroes.interface';


@Injectable({
    providedIn: 'root'
})
export class HeroesService {

    private apiUrl: string = environment.baseUrl;

    constructor(
        private http: HttpClient
    ) {
        // Do nothing
    }

    getHeroes(): Observable<Heroe[]> {
        return this.http.get<Heroe[]>(`${this.apiUrl}/heroes`);
    }

    getHeroePorId(id: string): Observable<Heroe> {
        return this.http.get<Heroe>(`${this.apiUrl}/heroes/${id}`);
    }

    getHeroesFilter(query: string, limit: number = 5): Observable<Heroe[]> {
        const params = new HttpParams()
            .set("q", query)
            .set("_limit", limit);

        return this.http.get<Heroe[]>(`${this.apiUrl}/heroes`, { params });
    }

}
