import { Component, EventEmitter, OnInit, Output, effect, inject } from '@angular/core';
import { WeatherApi } from '../../../api/weather-api.service';
import { CityService } from '../../../services/city.service';
import { DatePipe } from '@angular/common';

//Sidebar Component
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  weatherApi = inject(WeatherApi);
  private cityService = inject(CityService);

  temperature_max: number = 0;
  temperature_min: number = 0;

  name: string = '';
  country: string = '';
  clouds: string = '';
  date: string = '';
  time: Date = new Date();
  image: string = '';
  pressure: string = '';
  humidity: string = '';
  windSpeed: string = '';
  feelsLike: string = '';
  constructor() {
    effect(() => {
      const city = this.cityService.selectedCity();
      if (!city) return;

      this.weatherApi.getWeather(city).subscribe((res: any) => {});
    });
  }

  getWeather(city: string) {
    if (!city) return;
    this.weatherApi.getWeather(city).subscribe((res: any) => {
      if (!res.list || res.list.length === 0) return;

      const firstItem = res.list.find((item: any) => item.main && item.weather?.length > 0);

      if (!firstItem) return;

      this.temperature_max = firstItem.main.temp_max.toFixed(0);
      this.temperature_min = firstItem.main.temp_min.toFixed(0);

      this.name = res.city?.name || '';
      this.country = res.city?.country || '';

      this.clouds = firstItem.weather[0].main;
      this.image = `https://openweathermap.org/img/wn/${firstItem.weather[0].icon}@2x.png`;

      // Additional information
      this.feelsLike = firstItem.main.feels_like;
      this.humidity = firstItem.main.humidity;
      this.windSpeed = firstItem.wind.speed;
      this.pressure = firstItem.main.pressure;
      this.time = new Date();

      if (firstItem.dt_txt) {
        this.date = firstItem.dt_txt.split(' ')[0];
      }
    });
  }
}
