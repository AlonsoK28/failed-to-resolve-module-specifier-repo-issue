import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { ReloadingComponent } from '../reloading.component';

// ng material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ReloadingComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ReloadingComponent
  ]
})
export class ReloadingModule { }
