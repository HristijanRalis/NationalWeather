import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherApi {
  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    return this.http.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=47807849a472c711513d74166813d7bf&units=metric`,
    );
  }
}
