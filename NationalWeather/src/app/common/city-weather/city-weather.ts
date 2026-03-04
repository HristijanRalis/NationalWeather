import { Component, inject, input, Input, OnInit } from '@angular/core';
import { WeatherApi } from '../../api/weather-api.service';
import { CityService } from '../../services/city.service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-city-weather',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './city-weather.html',
  styleUrl: './city-weather.css',
})
export class CityWeather {
  @Input() city!: string;
  @Input() temperature!: number;
  @Input() weather!: string;
  @Input() icon!: string;
  @Input() date!: string;
}
