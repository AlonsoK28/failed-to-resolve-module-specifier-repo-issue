import { Router } from '@angular/router';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

// ng forms
import { FormControl, FormGroup, Validators } from '@angular/forms';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// services
import { AppVersionService } from '@services/app-version.service';
import { AuthService } from '@services/auth.service';

// environment
import { environment } from '@environment';
import { MediaObserver } from '@ngbracket/ngx-layout';

// fontawesome
import {
  faDesktopAlt, faUsers, faScrewdriverWrench
} from '@fortawesome/free-solid-svg-icons';
import {
  faGoogle
} from '@fortawesome/free-brands-svg-icons';

// theme
import { MyThemes } from '@interfaces/my-themes';
import { ThemeService } from '@services/theme.service';

// rxjs
import { Subscription } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  version: string;
  isLoading: boolean = false;
  isMobile: boolean = false;
  hide = true;

  // snackbar
  durationInSecondsDefault = environment.snackbarDefaultTimeoutSeconds;
  durationInSecondsOnError = environment.snackbarOnErrorTimeoutSeconds;

  // theming
  currentTheme!: MyThemes;
  MyThemes = MyThemes;
  suscription!: Subscription;

  icons = {
    faDesktopAlt, faUsers, faScrewdriverWrench, faGoogle
  }

  constructor(
    private el: ElementRef,
    private swUpdate: SwUpdate,
    private media: MediaObserver,
    private readonly router: Router,
    private themeService: ThemeService,
    private readonly _snackBar: MatSnackBar,
    private readonly authService: AuthService,
    private readonly appVersionService: AppVersionService
  ) { 
    // init form
    this.loginForm =  new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    // init app version
    this.version = this.appVersionService.getAppVersion();
  }

  ngOnInit(): void {
    this.setMediaObserverListener();
    this.getCurrentTheme();
    this.checkServiceWorkerUpdate();
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }


  getCurrentTheme() {
    this.suscription =
    this.themeService
    .getCurrentTheme()
    .subscribe(data => {
      this.currentTheme = data;
    });

    this.themeService.detectUserThemePreference();
  }

  checkServiceWorkerUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate
      .versionUpdates
      .subscribe(evt => {
        switch (evt.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new app version: ${evt.version.hash}`);
          break;

          case 'VERSION_READY':
            this.isLoading = true;
            this.loginForm.disable();

            setTimeout(() => {
              document.location.reload();
              this.isLoading = false;
            }, 1330);
          break;

          case 'VERSION_INSTALLATION_FAILED':
            console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
        }
      })
    }
  }

  setMediaObserverListener() {
    // docs https://github.com/angular/flex-layout/wiki/MediaObserver
    this.media
    .asObservable()
    .subscribe((change) => {
      const mobileBreakpoint = 'xs';
      const tabletBreakpoint = 'sm';
      change[0].mqAlias == mobileBreakpoint || change[0].mqAlias == tabletBreakpoint ? this.isMobile = true : this.isMobile = false;
    });

  }

  loginWithEmail(){
    // avoid user throttling
    if (this.isLoading) return;

    if(this.loginForm.invalid) {
      this.focusNextInvalidControl();
      return; 
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.isLoading = true;
    this.authService
      .loginWithEmail(email, password)
      .then(x => new Promise(resolve => setTimeout(() => resolve(x), 3300)))
      .then(() => this.goToHome())
      .catch((err) => {
        const userInvalidErrorMessageResponse = 'Firebase: Error (auth/user-not-found).';
        const wrongPasswordErrorMessageResponse = 'Firebase: Error (auth/wrong-password).';
        const userInvalidErrorMessage = 'Invalid user or password';
        const currentLoginErrorMessages = [userInvalidErrorMessageResponse, wrongPasswordErrorMessageResponse];
        this.setLoginErrors();
        if (currentLoginErrorMessages.includes(err.message)){
          this.openSnackBar(userInvalidErrorMessage, 'close', this.durationInSecondsOnError);
        }else{
          this.openSnackBar(err.message, 'close', this.durationInSecondsOnError);
        }
      })
      .finally(() => this.isLoading = false);
  }

  setLoginErrors() {
    const loginError = { loginError: true };
    const form: FormGroup = this.loginForm;
    form.get('email')?.setErrors(loginError);
    form.get('password')?.setErrors(loginError);
  }

  loginWithGoogle() {
    this.authService
    .loginWithGoogle()
    .then(() => {
      this.isLoading = true;
      this.loginForm.disable();
    })
    .then(x => new Promise(resolve => setTimeout(() => resolve(x), 3300)))
    .then(() => this.goToHome())
    .catch((err) => {
      this.isLoading = false;
      this.loginForm.enable();
    });
  }

  loginWithGoogleWithRestrictions() {
    this.authService
      .signInWithGoogleWithRestrictions()
      .then(() => {
        this.isLoading = true;
        this.loginForm.disable();
      })
      .then(x => new Promise(resolve => setTimeout(() => resolve(x), 3300)))
      .then(() => this.goToHome())
      .catch((err) => {
        this.isLoading = false;
        this.loginForm.enable();
        
        this.validateLoginWithGoogleWithRestrictions(err);
      });
  }

  validateLoginWithGoogleWithRestrictions(err: any) {
    const loginCancelledbyUserMessageResponse = 'Firebase: Error (auth/cancelled-popup-request).';
    const loginCancelledbyUserError = 'Login was cancelled by user';
    if (loginCancelledbyUserMessageResponse.includes(err.message)) {
      this.openSnackBar(loginCancelledbyUserError, 'close', this.durationInSecondsOnError);
    } else {
      this.openSnackBar(err.message, 'close', this.durationInSecondsOnError);
    }
  }


  openSnackBar(message: string, action: string, durationInSeconds: number) {
    const config = {
      duration: durationInSeconds * 1000
    }
    this._snackBar.open(message, action, config);
  }

  goToHome(){
    this.router.navigate(['/dashboard']);
    this.setLocalStorageSession();
    this.closeAlreadyOpenedSnackbar();
  }

  setLocalStorageSession() {
    localStorage.setItem(environment.localStorageSessionKey, JSON.stringify({
      date: new Date()
    }));
  }

  closeAlreadyOpenedSnackbar(){
    this._snackBar.dismiss();
  }

  focusNextInvalidControl() {
    for (const key of Object.keys(this.loginForm.controls)) {
      if (this.loginForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector(`[formcontrolname="${key}"]`);
        invalidControl.focus();
        break;
      }
    }

  }

}
