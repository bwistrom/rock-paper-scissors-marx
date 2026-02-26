import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(this.loadThemePreference());
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.applyTheme(this.darkModeSubject.value);
  }

  toggleDarkMode(): void {
    const newValue = !this.darkModeSubject.value;
    this.darkModeSubject.next(newValue);
    this.saveThemePreference(newValue);
    this.applyTheme(newValue);
  }

  setDarkMode(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    this.saveThemePreference(isDark);
    this.applyTheme(isDark);
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  private applyTheme(isDark: boolean): void {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
  }

  private loadThemePreference(): boolean {
    const saved = localStorage.getItem('rpsGameTheme');
    if (saved !== null) {
      return saved === 'dark';
    }
    // Default to light mode or detect system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private saveThemePreference(isDark: boolean): void {
    localStorage.setItem('rpsGameTheme', isDark ? 'dark' : 'light');
  }
}
