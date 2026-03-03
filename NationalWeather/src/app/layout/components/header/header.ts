import { Component, inject, signal } from '@angular/core';
import { CityWeather } from '../../../common/city-weather/city-weather';
import { CityService } from '../../../city';
import { Dropdown } from '../../../common/dropdown/dropdown';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeatherApi } from '../../../api/weather-api';
import { ContinentCity } from '../../../common/continent-city/continent-city';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Dropdown, FontAwesomeModule, ContinentCity],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  cityService = inject(CityService);

  selectedContinent = '';
  citiesWeather: { name: string; temperature: number; icon: string }[] = [];
  cities = signal<string[]>([]);

  continentCities: { [key: string]: string[] } = {
    europe: ['Skopje', 'London', 'Berlin', 'Paris', 'Belgrade'],
    asia: ['Ankara', 'Moscow', 'New Delhi', 'Seoul', 'Beijing'],
    africa: ['Cairo', 'Lagos', 'Tunis', 'Cape Town', 'Nairobi'],
    australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    'north america': ['New York', 'Toronto', 'Mexico City', 'Chicago', 'Los Angeles'],
    'south america': ['São Paulo', 'Buenos Aires', 'Lima', 'Bogota', 'Santiago'],
  };

  onCityChange(city: string) {
    const enteredCity = city.trim();

    if (!enteredCity) return;
    this.cityService.selectedCity.set(enteredCity);
  }

  constructor(private weatherApi: WeatherApi) {}

  onContinentSelect(continent: string) {
    if (!continent) return;

    const key = continent.trim().toLowerCase();
    const cities = this.continentCities[key];

    if (!cities) {
      console.log('No cities for continent!', continent);
      this.citiesWeather = [];
      return;
    }

    this.citiesWeather = [];

    cities.forEach((city: string) => {
      this.weatherApi.getWeather(city).subscribe({
        next: (res: any) => {
          if (res?.city && res?.list?.length) {
            this.citiesWeather.push({
              name: res.city.name,
              temperature: res.list[0].main.temp_max,
              icon: res.list[0].weather[0].icon,
            });
          }
        },

        error: (err) => {
          console.log('Error fetching weather for', city, err);
        },
      });
    });
  }
}
