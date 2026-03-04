import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

// Service for city from API
export class CityService {
  selectedCity = signal('Bitola');
}
