import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { ToolbarComponent } from '../toolbar.component';

// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

// 3-party
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxTooltipModule } from '@ng-matero/extensions/tooltip';

// directives
import { DirectivesModule } from '@directives/module/directives.module';
import { DrawerModule } from '@components/drawer/module/drawer.module';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    MtxButtonModule,
    MtxTooltipModule,
    TranslateModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    FontAwesomeModule,
    DirectivesModule,
    DrawerModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
