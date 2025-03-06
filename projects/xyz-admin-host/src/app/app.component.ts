import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';

// services
import { AuthService } from '@services/auth.service';

// 3-party
import { differenceInCalendarDays } from 'date-fns';
import { TranslateService } from '@ngx-translate/core';

// environment
import { environment } from '@environment';

// theming
import { ThemeService } from '@services/theme.service';

interface localSession {
  date: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'xyz-admin';
  mediaQuery!: MediaQueryList;
  private selector = 'globalLoader';

  constructor(
    private readonly router: Router,
    private themeService: ThemeService,
    private readonly authService: AuthService,
    @Inject(DOCUMENT) private document: Document, 
    private readonly translate: TranslateService ){
  }

  ngOnInit(): void {
    if (environment.production) this.diMiSigilio();
    this.validateSession();
    this.setI18NConfig();
    this.getCurrentTheme();
  }

  ngOnDestroy(): void {
    this.mediaQuery?.removeEventListener('change', this.onThemeChange);
  }

  ngAfterViewInit() {
    this.hidePreloader();
  }

  // example https://stackoverflow.com/a/74169714/7724301
  getCurrentTheme() {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', this.onThemeChange);
  }

  onThemeChange = (mediaQuery: MediaQueryListEvent) => {
    this.themeService.detectUserThemePreference();
  }

  validateSession() {
    const currentSession = this.getLocalStorageSession();
    if (currentSession != undefined){
      this.validateSessionTimeElapsed(currentSession.date);
    }else{
      this.logoutSession();
    }
  }

  validateSessionTimeElapsed(time:string){
    if(time){
      const currentTime = new Date(time);
      const now = new Date();
      const elapsedDays = differenceInCalendarDays(now, currentTime);
      if (elapsedDays > environment.maxDaysSession){
        const closedSessionMessage = 'Session was closed due to 5 days elapsed';
        console.log(closedSessionMessage);
        this.logoutSession();
      }
    }
  }

  getLocalStorageSession(): localSession | undefined {
    let localStorageSession: localSession;
    const localStorageRegistry = localStorage.getItem(environment.localStorageSessionKey);
    if (localStorageRegistry){
      localStorageSession = JSON.parse(localStorageRegistry);
      return localStorageSession;
    }else{
      return undefined;
    }
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }

  logoutSession(){
    this.authService.logout();
  }

  setI18NConfig(){
    this.translate.addLangs(environment.supportedLenguages);
    if (localStorage.getItem(environment.localStorageLenguageKey)) {
      this.translate.setDefaultLang(localStorage.getItem(environment.localStorageLenguageKey) || environment.supportedLenguages[0]);
      this.translate.use(localStorage.getItem(environment.localStorageLenguageKey) || environment.supportedLenguages[0]);
    } else {
      this.translate.setDefaultLang(environment.supportedLenguages[0]);
      this.translate.use(environment.supportedLenguages[0]);
      localStorage.setItem(environment.localStorageLenguageKey, environment.supportedLenguages[0]);
    }
  }

  hidePreloader() {
    const el = this.document.getElementById(this.selector);
    if (el) {
      el.addEventListener('transitionend', () => {
        el.className = 'global-loader-hidden';
      });

      if (!el.classList.contains('global-loader-hidden')) {
        el.className += ' global-loader-fade-in';
      }
    }
  }

  diMiSigilio() {
    console.warn('We want grow up, if you want help us please contact me via mail to "calonso011@yahoo.com.mx" or send a message via "https://github.com/AlonsoK28"');
    console.warn('We can help you to manage your eCommerce process and build any system that you need');

    console.log('Yo soy Icon San Angel');
    console.log('Yo soy Icon San Angel');
    console.log('Yo soy Icon San Angel');

    console.log('Y voy a obtener 133 millones de pesos por la venta del eCommerce de xyz');
    console.log('Y voy a obtener 133 millones de pesos por la venta del eCommerce de xyz');
    console.log('Y voy a obtener 133 millones de pesos por la venta del eCommerce de xyz');

    console.log('Los recursos de Icon San Angel');
    console.log('Los recursos de Icon San Angel');
    console.log('Los recursos de Icon San Angel');

    console.log('YsISA');
    console.log('YsISA');
    console.log('YsISA');
  }
}
