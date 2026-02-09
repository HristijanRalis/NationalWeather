import { Component } from '@angular/core';
import { CityWeather } from "../../../common/city-weather/city-weather";

@Component({
  selector: 'app-header',
  imports: [CityWeather],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
