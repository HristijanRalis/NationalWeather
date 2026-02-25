import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './city-search.html',
  styleUrl: './city-search.css',
})
export class CitySearch {
  cityName: string = '';

  @Output() citySelected = new EventEmitter<string>();

  searchCity() {
    if (this.cityName.trim()) {
      this.citySelected.emit(this.cityName.trim());
    }
  }
}
