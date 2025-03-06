import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { MobileNotAllowedComponent } from '../mobile-not-allowed.component';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    MobileNotAllowedComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule
  ],
  exports: [
    MobileNotAllowedComponent
  ]
})
export class MobileNotAllowedModule { }
