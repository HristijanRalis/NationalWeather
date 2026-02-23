import { Component, signal } from '@angular/core';
import { MainLayout } from './layout/layouts/main-layout/main-layout';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  protected readonly title = signal('NationalWeather');
}
