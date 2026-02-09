import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule],
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.css'], // fixed
})
export class Dropdown implements OnInit {
  selectedItem: any;
  filteredItems: any[] = [];
  items: any[] = [];

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
    }
  }

  filterItems(event: any) {
    const query = event.query.toLowerCase();
    this.filteredItems = this.items.filter((item) =>
      item.label.toLowerCase().startsWith(query)
    );
  }
}
