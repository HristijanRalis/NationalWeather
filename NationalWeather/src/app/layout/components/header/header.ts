import { Component, effect, signal } from '@angular/core';
import { CityWeather } from '../../../common/city-weather/city-weather';
import { Dropdown } from '../../../common/dropdown/dropdown';
import { WeatherApi } from '../../../api/weather-api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CityWeather, Dropdown],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  selectedContinent = signal('');
  cities = signal<string[]>([]);

  continentCities: { [key: string]: string[] } = {
    Europe: ['Skopje', 'London', 'Berlin', 'Paris', 'Belgrade'],
    Asia: ['Ankara', 'Moscow', 'New Delhi', 'Seoul', 'Beijing'],
    Africa: ['Cairo', 'Lagos', 'Tunis', 'Cape Town', 'Nairobi'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    'North America': ['New York', 'Toronto', 'Mexico City', 'Chicago', 'Los Angeles'],
    'South America': ['São Paulo', 'Buenos Aries', 'Lima', 'Bogota', 'Santiago'],
  };

  constructor(private weatherService: WeatherApi) {}
  onContinentChange(continent: string) {
    console.log('Continent selected:', continent);
    console.log('Cities found:', this.continentCities[continent]);
    this.selectedContinent.set(continent);
    this.cities.set(this.continentCities[continent] ?? []);
    console.log('Cities for', continent, ':', this.cities());
  }
}
