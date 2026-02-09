import { Component, signal } from '@angular/core';
import { MainLayout } from './layout/layouts/main-layout/main-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('NationalWeather');
}
