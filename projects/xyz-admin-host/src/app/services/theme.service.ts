import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// interfaces
import { MyThemes } from '@interfaces/my-themes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _currentTheme = new BehaviorSubject<MyThemes>(MyThemes.Dark);

  constructor( @Inject(DOCUMENT) private document: Document ) { }

  getCurrentTheme() {
    return this._currentTheme;
  }

  setCurrentTheme(theme: MyThemes) {
    this._currentTheme.next(theme);
  }

  setThemeLight() {
    this.document.body.classList.add(MyThemes.Light);
    this.document.body.classList.remove(MyThemes.Dark);
    this.setCurrentTheme(MyThemes.Light);
  }

  setThemeDark() {
    this.document.body.classList.add(MyThemes.Dark);
    this.document.body.classList.remove(MyThemes.Light);
    this.setCurrentTheme(MyThemes.Dark);
  }

  isDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  detectUserThemePreference(){
    const darkMode = this.isDarkMode();
    darkMode ? this.setThemeDark() : this.setThemeLight();
  }
}
