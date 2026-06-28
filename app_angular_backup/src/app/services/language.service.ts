import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  public currentLang$ = this.currentLangSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const savedLang = localStorage.getItem('prometer_lang') || 'en';
      this.setLanguage(savedLang);
    }
  }

  public get currentLang(): string {
    return this.currentLangSubject.value;
  }

  public toggleLanguage(): void {
    const nextLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.setLanguage(nextLang);
  }

  public setLanguage(lang: string): void {
    this.currentLangSubject.next(lang);
    if (this.isBrowser) {
      localStorage.setItem('prometer_lang', lang);
      const dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.dir = dir;
      document.documentElement.lang = lang;
      
      // Add or remove RTL class on body for styling hook
      if (dir === 'rtl') {
        document.body.classList.add('rtl');
        document.body.dir = 'rtl';
      } else {
        document.body.classList.remove('rtl');
        document.body.dir = 'ltr';
      }
    }
  }
}
