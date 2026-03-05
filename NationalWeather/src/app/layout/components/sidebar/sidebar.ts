import { Component, effect, inject, signal } from '@angular/core';
import { WeatherApi } from '../../../api/weather-api.service';
import { CityService } from '../../../services/city.service';
import { DatePipe } from '@angular/common';
import { SidebarWeather } from '../../../models/weather.model';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  //Injected services
  weatherApi = inject(WeatherApi);
  cityService = inject(CityService);

  //Signal for loading
  loading = signal(false);

  // Signal fo weather
  weather = signal<SidebarWeather | null>(null);

  constructor() {
    // Runs whenever the selectedCity signal is changed
    effect(() => {
      const city = this.cityService.selectedCity();
      if (!city) return;
      this.getWeather(city);
    });
  }

  // Function for find city weather
  getWeather(city: string) {
    this.loading.set(true);

    // Fetch weather data from API for selected city
    this.weatherApi.getWeather(city).subscribe({
      next: (res: any) => {
        if (!res?.list?.length) return;

        const firstItem = res.list[0];
        if (!firstItem?.main || !firstItem.weather?.length) return;

        const weatherDate: SidebarWeather = {
          temperature_max: Math.round(firstItem.main.temp_max),
          temperature_min: Math.round(firstItem.main.temp_min),
          city: res.city?.name || '',
          country: res.city?.country || '',
          clouds: firstItem.weather[0].main,
          iconUrl: `https://openweathermap.org/img/wn/${firstItem.weather[0].icon}@2x.png`,
          feelsLike: firstItem.main.feels_like,
          humidity: firstItem.main.humidity,
          windSpeed: firstItem.wind.speed,
          pressure: firstItem.main.pressure,
          time: new Date(),
          date: firstItem.dt_txt?.split(' ')[0] || '',
        };

        this.weather.set(weatherDate);
      },
      error: (err) => console.log('Error fetching weather:', err),
      complete: () => this.loading.set(false),
    });
  }
}
