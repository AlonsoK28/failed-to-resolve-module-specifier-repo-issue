import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { LoginComponent } from '../login.component';

// material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

// angular forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// angular cdk
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

// 3-party
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MtxButtonModule } from '@ng-matero/extensions/button';

// modules
import { AppLogoModule } from '@components/app-logo/module/app-logo.module';
import { LanguageModule } from '@components/language/module/language.module';
import { MobileNotAllowedModule } from '@components/mobile-not-allowed/module/mobile-not-allowed.component.module';

// translate
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSnackBarModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MtxButtonModule,
    AppLogoModule,
    MobileNotAllowedModule,
    TranslateModule,
    MatIconModule,
    LanguageModule
  ]
})
export class LoginModule { }
