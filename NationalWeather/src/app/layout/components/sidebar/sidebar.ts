import { Component, EventEmitter, OnInit, Output, effect, inject } from '@angular/core';
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

  temperature_max: number = 0;
  temperature_min: number = 0;

  name: string = '';
  country: string = '';
  clouds: string = '';
  date: string = '';
  time: string = '';
  image: string = '';

  constructor() {
    this.getWeather(this.cityService.selectedCity());
    effect(() => {
      const city = this.cityService.selectedCity();

      this.getWeather(city);
    });
  }

  getWeather(city: string) {
    if (!city) return;
    this.weatherService.getWeather(city).subscribe((res: any) => {
      this.temperature_max = res.main.temp_max;
      this.temperature_min = res.main.temp_min;

      this.name = res.name;
      this.country = res.sys.country;
      this.clouds = res.weather[0].main;
      this.image = `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
      this.date = res.list[0].dt_txt;
      // if(res.list && res.list.length > 0){
      //   const firstItem = res.list[0];

      //   this.date = firstItem.dt_txt.split(' ')[0];
      //   this.time = firstItem.dt_txt.split(' ')[1];
      // }
    });
  }
}
