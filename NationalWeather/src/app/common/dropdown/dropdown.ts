import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { value } from '@primeuix/themes/aura/knob';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule],
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.css'], // fixed
})
export class Dropdown implements OnInit {
  @Output() continentSelected = new EventEmitter<string>();

  selectedItem: any;
  filteredItems: any[] = [];
  items: any[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Europe', value: 'Europe' },
      { label: 'Asia', value: 'Asia' },
      { label: 'Africa', value: 'Africa' },
      { label: 'South America', value: 'South America' },
      { label: 'North America', value: 'North America' },
      { label: 'Australia', value: 'Australia' },
    ];
  }

  filterItems(event: any) {
    const query = event.query.toLowerCase();
    this.filteredItems = this.items.filter((item) => item.label.toLowerCase().startsWith(query));

  }

  onSelect(event: any) {
    console.log("Selected: ", event.value)
    this.continentSelected.emit(event.value);
  }
}
