import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      const isDarkMode = JSON.parse(savedTheme);
      this.setDarkMode(isDarkMode);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkMode(prefersDark);
    }
  }

  toggleDarkMode(): void {
    const currentMode = this.darkModeSubject.value;
    this.setDarkMode(!currentMode);
  }

  setDarkMode(isDarkMode: boolean): void {
    this.darkModeSubject.next(isDarkMode);

    if (isDarkMode) {
      document.body.parentElement?.classList.add('dark-theme');
    } else {
      document.body.parentElement?.classList.remove('dark-theme');
    }

    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }

  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
