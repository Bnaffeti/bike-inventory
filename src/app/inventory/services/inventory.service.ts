import { Injectable } from '@angular/core';
import { Bike } from '../models/bike';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Params } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    /**
     * Fetch all bike list from the API
     * @returns Bike[]
     */
    getAllBikes(): Observable<Bike[]> {
        return this.http.get<Bike[]>(environment.getAllBikesUrl)
            .pipe(catchError((error) => throwError(() => error)));
    }

    /**
     * Find a bike by id
     * @param bikeId 
     * @returns Bike
     */
    getBikeById(bikeId: number): Observable<Bike> {
        const endpoint = prepareUrlParameters(environment.getBikeByIdUrl, { ':id': bikeId });
        return this.http.get<Bike>(endpoint)
            .pipe(catchError((error) => throwError(() => error)));
    }

    /**
     * Add new Bike to the BD via API
     * @param bike 
     * @returns Bike
     */
    addBikes(bike: Bike): Observable<Bike> {
        return this.http.post<Bike>(environment.addBikeUrl, bike, this.httpOptions)
            .pipe(catchError((error) => throwError(() => error)));
    }

    /**
     * Edit a bike
     * @param bike 
     * @returns any
     */
    editBikes(bike: Bike): Observable<any> {
        return this.http.put(environment.editBikeUrl, bike, this.httpOptions)
            .pipe(catchError((error) => throwError(() => error)));
    }

    /**
     * Delete a bike from DB
     * @param bikeId 
     * @returns 
     */
    deleteBikes(bikeId: number): Observable<Bike> {
        const endpoint = prepareUrlParameters(environment.deleteBikeUrl, { ':id': bikeId });
        return this.http.delete<Bike>(endpoint, this.httpOptions)
            .pipe(catchError((error) => throwError(() => error)));
    }
}

export const prepareUrlParameters = (url: string, urlParameters: Params): string => {
    const regex = new RegExp(Object.keys(urlParameters).join('|'), 'gi');
    return url.replace(regex, (matched) => urlParameters[matched]);
};

