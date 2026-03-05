import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ContinentService } from '../../services/continent.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule],
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.css'],
})
export class Dropdown implements OnInit {
  @Output() continentSelected = new EventEmitter<string>();

  selectedItem: any;
  filteredItems: any[] = [];
  continents: any[] = [];

  continentService = inject(ContinentService);

  // Initialization full list of continents
  ngOnInit() {
    this.continentService.getContinents().subscribe((data) => {
      this.continents = data;
    });
  }

  // Filter continents
  filterItems(event: any) {
    const query = event.query.toLowerCase();
    this.filteredItems = this.continents.filter((item) =>
      item.label.toLowerCase().startsWith(query),
    );
  }

  // Handle selection of a continent and emit it to parent
  onSelect(event: any) {
    const selectedContinent = event.value.value;
    console.log('Selected: ', event.value);
    this.continentSelected.emit(selectedContinent);
  }
}
