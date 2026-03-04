import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  selectedCity = signal('Bitola');
}
