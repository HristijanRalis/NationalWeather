import { Component, inject, Signal, signal } from '@angular/core';
import { WeatherApi } from '../../../api/weather-api.service';
import { CityService } from '../../../services/city.service';
import { CityWeather } from '../../../common/city-weather/city-weather';
import { WeatherItem, WeatherResponse } from '../../../models/weather.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map, of } from 'rxjs';
@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [CityWeather],
  templateUrl: './additional-info.html',
  styleUrl: './additional-info.css',
})
export class AdditionalInfo {
  weatherApi = inject(WeatherApi);
  cityService = inject(CityService);

  // signal holding the forecast for 5 days
  forecast!: Signal<WeatherItem[]>;

  constructor() {
    //Observable who emits new city after every change
    const city$ = toObservable(this.cityService.selectedCity);

    // observable
    const forecast$ = city$.pipe(
      // Call every time after changed city and always gives observable
      switchMap((city) => {
        if (!city) return of([]); // Observable who instant emit empty-array
        return this.weatherApi.getWeather(city).pipe(
          map((res: WeatherResponse) => {
            const dailyMap: { [date: string]: WeatherItem } = {};
            res.list.forEach((item) => {
              const date = item.dt_txt.split(' ')[0];
              if (!dailyMap[date] && item.dt_txt.includes('12:00:00')) {
                dailyMap[date] = item;
              }
            });
            return Object.values(dailyMap).slice(0, 5);
          }),
        );
      }),
    );

    // Make RxJS Observable back to signal
    this.forecast = toSignal(forecast$, { initialValue: [] });
  }
}
