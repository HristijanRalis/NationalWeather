import { Component } from '@angular/core';
import { CityWeather } from "../../../common/city-weather/city-weather";
import { Dropdown } from "../../../common/dropdown/dropdown";

@Component({
  selector: 'app-header',
  imports: [CityWeather, Dropdown],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
