// shared/app-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private fontSize = new BehaviorSubject<number>(1);
  fontSize$ = this.fontSize.asObservable();

  private theme = new BehaviorSubject<string>('#003366'); // Default theme
  theme$ = this.theme.asObservable();

  private lightTheme = new BehaviorSubject<string>('#e6f2ff');
  lightTheme$ = this.lightTheme.asObservable();

  private language = new BehaviorSubject<string>('en');
  language$ = this.language.asObservable();

  setFontSize(size: number) {
    this.fontSize.next(size);
  }

  setTheme(theme: string, lightTheme: string) {
    this.theme.next(theme);
    this.lightTheme.next(lightTheme);
  }

  setLanguage(lang: string) {
    this.language.next(lang);
  }
}
