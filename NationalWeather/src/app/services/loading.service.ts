import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading = signal(false);

  stop() {
    this.loading.set(false);
  }

  start() {
    this.loading.set(true);
  }
}
