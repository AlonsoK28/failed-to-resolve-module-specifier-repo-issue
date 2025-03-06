import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { LoadingComponent } from '../loading.component';

// 3-party
import { TranslateModule } from '@ngx-translate/core';
import { FlexModule } from '@ngbracket/ngx-layout';

// ng material
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FlexModule,
    MatProgressBarModule
  ],
  exports: [
    LoadingComponent
  ]
})
export class LoadingModule { }
