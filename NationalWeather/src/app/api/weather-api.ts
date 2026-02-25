import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherApi {
  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=47807849a472c711513d74166813d7bf&units=metric`,
    );
  }
}
