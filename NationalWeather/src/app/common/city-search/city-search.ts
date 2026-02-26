import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../city';
@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './city-search.html',
  styleUrl: './city-search.css',
})
export class CitySearch {
 
}
