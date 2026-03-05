import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContinentService {
  private continents = [
    { label: 'Europe', value: 'Europe' },
    { label: 'Asia', value: 'Asia' },
    { label: 'Africa', value: 'Africa' },
    { label: 'South America', value: 'South America' },
    { label: 'North America', value: 'North America' },
    { label: 'Australia', value: 'Australia' },
  ];

  getContinents(): Observable<{ label: string; value: string }[]> {
    return of(this.continents);
  }
}
