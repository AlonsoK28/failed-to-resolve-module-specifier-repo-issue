import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { LanguageComponent } from '../language.component';

// ng forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ng material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// fontaesoem
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// translate
import { TranslateModule } from '@ngx-translate/core';

// ngx-flex
import { FlexModule } from '@ngbracket/ngx-layout';

// directives
import { DirectivesModule } from '@directives/module/directives.module';

@NgModule({
  declarations: [
    LanguageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FontAwesomeModule,
    TranslateModule,
    FlexModule,
    DirectivesModule
  ],
  exports: [
    LanguageComponent
  ]
})
export class LanguageModule { }
