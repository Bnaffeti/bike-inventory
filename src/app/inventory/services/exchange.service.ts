import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExchangeService {

    constructor(private http: HttpClient) { }

    /**
     * External API to get live echanges currencies rates based on USD
     * @returns rates
     */
    getRates(): Observable<any> {
        return this.http.get<any>(
            `${environment.exchangeRatesUrl}`)
            .pipe(
                map(response => response.conversion_rates),
                catchError((error) => throwError(() => error))
            );
    }
}
