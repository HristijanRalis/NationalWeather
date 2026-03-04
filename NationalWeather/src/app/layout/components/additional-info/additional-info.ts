import { Component, effect, inject, Input, signal } from '@angular/core';
import { WeatherApi } from '../../../api/weather-api.service';
import { CityService } from '../../../services/city.service';
import { CityWeather } from '../../../common/city-weather/city-weather';

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

  forecast = signal<any[]>([]);

  constructor() {
    // automatically react to city changes
    effect(() => {
      const city = this.cityService.selectedCity();
      if (!city) return;

      this.weatherApi.getWeather(city).subscribe((res: any) => {
        if (!res.list || res.list.length === 0) return;

        const dailyMap: { [key: string]: any } = {};
        res.list.forEach((day: any) => {
          const date = day.dt_txt.split(' ')[0];
          // take forecast closest to 12:00 only
          if (!dailyMap[date] && day.dt_txt.includes('12:00:00')) {
            dailyMap[date] = day;
          }
        });

        // update forecast signal with only 5 days
        this.forecast.set(Object.values(dailyMap).slice(0, 5));
      });
    });
  }
}