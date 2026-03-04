import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';
import { AdditionalInfo } from '../../components/additional-info/additional-info';
import { CityService } from '../../../services/city.service';

// MainLayout component
@Component({
  selector: 'app-main-layout',
  imports: [Header, Sidebar, AdditionalInfo],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  constructor(public cityService: CityService) {}
}
