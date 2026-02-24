import { Component, Input, OnInit } from '@angular/core';
import { WeatherApi } from '../../api/weather-api';

@Component({
  selector: 'app-city-weather',
  standalone: true,
  imports: [],
  templateUrl: './city-weather.html',
  styleUrl: './city-weather.css',
})
export class CityWeather implements OnInit {
  @Input() city!: string;

  temperature: number = 0;
  weather: string = '';
  icon: string = '';

  constructor(private weatherService: WeatherApi) {}

  ngOnInit() {
    if (this.city) {
      this.weatherService.getWeather(this.city).subscribe({
        next: (res: any) => {
          this.temperature = res.main.temp;
          this.weather = res.weather[0].main;
        },
        error: (err) => console.error(err),
      });
    }
  }
}
