import { Component, inject } from '@angular/core';
import { CityWeather } from '../../../common/city-weather/city-weather';
import { CityService } from '../../../city';
import { Dropdown } from '../../../common/dropdown/dropdown';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CityWeather, Dropdown, FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  cityService = inject(CityService);

  // selectedContinent = signal('');
  // cities = signal<string[]>([]);

  // continentCities: { [key: string]: string[] } = {
  //   Europe: ['Skopje', 'London', 'Berlin', 'Paris', 'Belgrade'],
  //   Asia: ['Ankara', 'Moscow', 'New Delhi', 'Seoul', 'Beijing'],
  //   Africa: ['Cairo', 'Lagos', 'Tunis', 'Cape Town', 'Nairobi'],
  //   Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  //   'North America': ['New York', 'Toronto', 'Mexico City', 'Chicago', 'Los Angeles'],
  //   'South America': ['São Paulo', 'Buenos Aries', 'Lima', 'Bogota', 'Santiago'],
  // };

  onCityChange(city: string) {
    const enteredCity = city.trim();

    if (!enteredCity) return;
    this.cityService.selectedCity.set(enteredCity);
  }
}
