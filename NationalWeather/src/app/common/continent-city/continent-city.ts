import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-continent-city',
  imports: [],
  templateUrl: './continent-city.html',
  styleUrl: './continent-city.css',
})
export class ContinentCity {
  @Input() name!: string;
  @Input() temperature!: number;
  @Input() icon!: string;

  get iconName() {
    return `https://openweathermap.org/img/wn/${this.icon}@2x.png`;
  }
}
