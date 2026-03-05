import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContinentCitiesService {
  private continentCities: { [key: string]: string[] } = {
    europe: ['Skopje', 'London', 'Berlin', 'Paris', 'Belgrade'],
    asia: ['Ankara', 'Moscow', 'New Delhi', 'Seoul', 'Beijing'],
    africa: ['Cairo', 'Lagos', 'Tunis', 'Cape Town', 'Nairobi'],
    australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    'north america': ['New York', 'Toronto', 'Mexico City', 'Chicago', 'Los Angeles'],
    'south america': ['São Paulo', 'Buenos Aires', 'Lima', 'Bogota', 'Santiago'],
  };

  getCities(continent: string): Observable<string[]> {
    const key = continent.trim().toLowerCase();
    return of(this.continentCities[key] || []);
  }
}
