import { Component, inject, signal } from '@angular/core';
import { CityService } from '../../../services/city.service';
import { Dropdown } from '../../../common/dropdown/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeatherApi } from '../../../api/weather-api.service';
import { ContinentCity } from '../../../common/continent-city/continent-city';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Dropdown, FontAwesomeModule, ContinentCity],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  cityService = inject(CityService);
  loadingService = inject(LoadingService);
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
    const trimCity = city.trim();

    const lettersRegex = /^[A-Za-zА-Ша-ш\s]+$/;

    if (!lettersRegex.test(trimCity)) {
      alert('Please enter valid city name (only letters)');
      return;
    }

    if (trimCity.length <= 2) {
      alert('City name is too short!!');
      return;
    }

    this.cityService.selectedCity.set(trimCity);
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

    this.loadingService.start();

    const requests = cities.map((city: string) =>
      this.weatherApi.getWeather(city).pipe(
        catchError((err) => {
          console.log(`Error fetching ${city}`, err);
          return of(null);
        }),
      ),
    );

    forkJoin(requests)
      .pipe(
        finalize(() => {
          this.loadingService.stop();
        }),
      )
      .subscribe({
        next: (res: any[]) => {
          this.citiesWeather = res
            .filter((res) => res?.city && res?.list?.length)
            .map((res) => ({
              name: res.city.name,
              temperature: res.list[0].main.temp_max,
              icon: res.list[0].weather[0].icon,
            }));
        },

        error: (err) => {
          console.log('Error fetching weather for', err);
        },
      });
  }
}
