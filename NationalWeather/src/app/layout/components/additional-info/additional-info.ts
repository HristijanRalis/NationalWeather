import { Component, effect, inject, signal } from '@angular/core';
import { WeatherApi } from '../../../api/weather-api.service';
import { CityService } from '../../../services/city.service';
import { CityWeather } from '../../../common/city-weather/city-weather';
import { WeatherItem, WeatherResponse } from '../../../models/weather.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [CityWeather],
  templateUrl: './additional-info.html',
  styleUrl: './additional-info.css',
})
export class AdditionalInfo {
  private weatherApi = inject(WeatherApi);
  private cityService = inject(CityService);

  // signal holding the forecast for 5 days
  forecast = signal<WeatherItem[]>([]);

  constructor() {
    // automatically react to city changes
    effect(() => {
      const city = this.cityService.selectedCity();
      if (!city) return;
this.weatherApi.getWeather(city)
  .pipe(
    catchError(err => {
      console.error('Error fetching weather:', err);
      return of(null); // emit null to continue
    })
  )
  .subscribe({
    next: (res: WeatherResponse | null) => {
      if (!res?.list || res.list.length === 0) return;

      const dailyMap: { [date: string]: WeatherItem } = {};

      res.list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!dailyMap[date] && item.dt_txt.includes('12:00:00')) {
          dailyMap[date] = item;
        }
      });

      this.forecast.set(Object.values(dailyMap).slice(0, 5));
    },
    error: (err) => console.error('Subscription error:', err) // optional, catchError usually handles
  });
    });
  }
}