import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

// Service for Loading cities
export class LoadingService {
  loading = signal(false);

  stop() {
    this.loading.set(false);
  }

  start() {
    this.loading.set(true);
  }
}
