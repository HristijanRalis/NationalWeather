import { Component, effect, inject, Input, signal } from '@angular/core';
import { WeatherApi } from '../../../api/weather-api.service';
import { CityService } from '../../../services/city.service';
import { CityWeather } from '../../../common/city-weather/city-weather';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [CityWeather, NgForOf],
  templateUrl: './additional-info.html',
  styleUrl: './additional-info.css',
})
export class AdditionalInfo {
  weatherApi = inject(WeatherApi);
  cityService = inject(CityService);

  @Input() city?: string;
  forecast = signal<any[]>([]);

  constructor() {
    effect(() => {
      const city = this.cityService.selectedCity();
      if (!city) return;

      this.weatherApi.getWeather(city).subscribe((res: any) => {
        this.forecast.set(res.list || []);
      });
    });
  }
  loadForecast(city: string) {
    this.weatherApi.getWeather(city).subscribe((res: any) => {
      if (!res.list || res.list.length === 0) return;

      const dailyMap: { [key: string]: any } = {};
      res.list.forEach((day: any) => {
        const date = day.dt_txt.split(' ')[0];
        if (!dailyMap[date] && day.dt_txt.includes('12:00:00')) {
          dailyMap[date] = day;
        }
      });

      this.forecast.set(Object.values(dailyMap).slice(0, 5));
    });
  }
}
