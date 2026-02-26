import { Component, OnInit, effect, inject } from '@angular/core';
import { WeatherApi } from '../../../api/weather-api';
import { CityService } from '../../../city';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private weatherService = inject(WeatherApi);
  private cityService = inject(CityService);
  myWeather: any;
  temperature: number = 0;
  name: string = '';
  country: string = '';
  clouds: string = '';

  constructor() {}

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe({
      next: (res: any) => {
        console.log('API response', res);

        this.myWeather = res;
        this.temperature = res.main.temp;
        this.name = res.name;
        this.country = res.sys.country;
        this.clouds = res.weather[0].main;
      },
      error: (err) => console.error(err),
    });
  }
}
