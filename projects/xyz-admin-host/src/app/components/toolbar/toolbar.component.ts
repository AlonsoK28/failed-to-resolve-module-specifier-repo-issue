import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

// ng material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// routing
import { Router } from '@angular/router';

// environment
import { environment } from '@environment';

// services
import { AuthService } from '@services/auth.service';
import { ThemeService } from '@services/theme.service';
import { AppVersionService } from '@services/app-version.service';

// fontawesome
import { 
  faPowerOff, faRotate, faExpand, faCompress, faSun, faMoon, faHome,
  faBars
 } from '@fortawesome/free-solid-svg-icons';

// interfaces
import { MyRoutes } from '@interfaces/myRoutes';
import { MyThemes } from '@interfaces/my-themes';

// rxjs
import { Subscription } from 'rxjs';

// ng-matero
import { MtxDrawer } from '@ng-matero/extensions/drawer';

// components
import { DrawerComponent } from '@components/drawer/drawer.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  // current userman
  userName: string;

  // current app version
  version: string;

  // snackbar
  durationInSecondsDefault = environment.snackbarDefaultTimeoutSeconds;
  durationInSecondsOnError = environment.snackbarOnErrorTimeoutSeconds;

  // close session spinner
  isLoading:boolean = false;

  updateAvailable: boolean = false;

  isLoadingUpdate: boolean = false;

  suscription!: Subscription;

  // theming
  currentTheme!: MyThemes;
  MyThemes = MyThemes;

  @Output() onLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  icons = {
    faPowerOff, faRotate, faExpand, 
    faCompress, faSun, faMoon, faHome, 
    faBars
  }
  isFullScreenEnabled: boolean = false;
  drawerIsOpen: boolean = false;

  constructor(
    public dialog: MatDialog,
    private drawer: MtxDrawer,
    private swUpdate: SwUpdate,
    private _snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly appVersionService: AppVersionService,
    private themeService: ThemeService
  ) { 
    // init user name
    this.userName = this.authService.getCurrentUsername();

    // init app version
    this.version = this.appVersionService.getAppVersion();
  }

  ngOnInit(): void {
    this.getCurrentTheme();
    this.checkServiceWorkerUpdate();
  }

  logout() {
    this.isLoading = true;
    this.onLoading.emit(true);
    this.authService
      .logout()
      .then(x => new Promise(resolve => setTimeout(() => resolve(x), 1033)))
      .then(() => {
        const message = 'Session closed ✔️';
        this.dialog.closeAll();
        this.router.navigate(['/']);
        localStorage.removeItem(environment.localStorageSessionKey);
        this.openSnackBar(message, 'close', this.durationInSecondsDefault);
      })
      .then(() => {
        this.isLoading = false;
        this.onLoading.emit(false);
      })
      .catch((e) => console.log(e.message));
  }

  openSnackBar(message: string, action: string, durationInSeconds: number) {
    const config = {
      duration: durationInSeconds * 1000
    };
    this._snackBar.open(message, action, config);
  }

  // docs https://angular.io/guide/service-worker-communications
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
            this.updateAvailable = true;
            break;

          case 'VERSION_INSTALLATION_FAILED':
            console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
            break;
        }
      })
    }
  }

  applyUpdate(){
    this.isLoadingUpdate = true;
    setTimeout(() => {
      document.location.reload();
      this.isLoadingUpdate = false;
    }, 1330);
  }

  toggleFullScreen() {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
        this.isFullScreenEnabled = true;
      } 
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.isFullScreenEnabled = false;
      }
    }
  }

  toggleTheme() {
    if (this.currentTheme === MyThemes.Dark) {
      this.themeService.setThemeLight();      
      this.currentTheme = MyThemes.Light;
    } else {
      this.themeService.setThemeDark();
      this.currentTheme = MyThemes.Dark;
    }
  }

  getCurrentTheme() {
    this.themeService.detectUserThemePreference();
    this.suscription =
    this.themeService
      .getCurrentTheme()
      .subscribe(data => {
        this.currentTheme = data;
    });
  }

  goToRoot() {
    this.router.navigateByUrl('/');
  }

  open() {
    // avoid throting
    if (this.drawerIsOpen) return;

    // avoid opening over a dialog
    const canOpenDrawer = this.valideCurrentRoute();
    if (!canOpenDrawer) return;

    this.drawerIsOpen = true;

    const drawerRef = this.drawer.open(DrawerComponent, {
      position: 'left',
      width: '400px',
      height: '300px',
      hasBackdrop: false,
      disableClose: false,
      closeOnNavigation: true,
      data: {},
      autoFocus: false,
    });

    drawerRef
    .afterDismissed()
    .subscribe(result => {
      console.log('The drawer was dismissed');
      this.drawerIsOpen = false;
    });
  }

  valideCurrentRoute() {
    const currentRoute = this.router.url;

    const routeMatch = [MyRoutes.openLists, MyRoutes.openImportXlsx, MyRoutes.openEdit, MyRoutes.openTicketInvoice].some((el) => currentRoute.endsWith((el)));
    return routeMatch ? false : true;
  }
}
