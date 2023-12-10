import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { mockedBikeList } from '../models/mock-data';
import { Bike } from '../models/bike';

@Injectable({
    providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

    createDb() {
        return { bikes: mockedBikeList };
    }

    genId(bikes: Bike[]): number {
        return bikes.length > 0 ? Math.max(...bikes.map(bike => bike.id)) + 1 : 1;
    }
}
