import { Component, effect, inject, Input, signal } from '@angular/core';
import { WeatherApi } from '../../../api/weather-api';
import { CityService } from '../../../city';
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
  private weatherService = inject(WeatherApi);
  cityService = inject(CityService);

  @Input() city?: string;
  forecast: any[] = [];

  constructor() {
    effect(() => {
      const activeCity = this.city ?? this.cityService.selectedCity();
      if (activeCity) {
        this.loadForecast(activeCity);
      }
    });
  }

  loadForecast(city: string) {
    this.weatherService.getWeather(city).subscribe((res: any) => {
      if (!res.list || res.list.length === 0) return;

      const dailyMap: { [key: string]: any } = {};
      res.list.forEach((day: any) => {
        const date = day.dt_txt.split(' ')[0];
        if (!dailyMap[date] && day.dt_txt.includes('12:00:00')) {
          dailyMap[date] = day;
        }
      });

      this.forecast = Object.values(dailyMap).slice(0, 5);
    });
  }
}
