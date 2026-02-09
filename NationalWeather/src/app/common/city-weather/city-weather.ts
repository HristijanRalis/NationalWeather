import { Component } from '@angular/core';
import { Header } from '../../layout/components/header/header';
import { Sidebar } from '../../layout/components/sidebar/sidebar';
import { AdditionalInfo } from '../../layout/components/additional-info/additional-info';

@Component({
  selector: 'app-city-weather',
  imports: [Header, Sidebar, AdditionalInfo],
  templateUrl: './city-weather.html',
  styleUrl: './city-weather.css',
})
export class CityWeather {}
