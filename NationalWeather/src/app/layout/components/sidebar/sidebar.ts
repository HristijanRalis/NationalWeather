import { Component, OnInit } from '@angular/core';
import { WeatherApi } from '../../../api/weather-api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  myWeather: any;
  temperature: number = 0;
  name: string = '';
  country: string = '';
  clouds: string = '';
  constructor(private weatherService: WeatherApi) {}

  ngOnInit(): void {
    this.weatherService.getWeather('Bitola', 'MK').subscribe({
      next: (res) => {
        this.myWeather = res;
        console.log(this.myWeather);
        this.temperature = this.myWeather.main.temp;
        this.name = this.myWeather.name;
        this.country = this.myWeather.sys.country;
        this.clouds = this.myWeather.weather[0].main;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
