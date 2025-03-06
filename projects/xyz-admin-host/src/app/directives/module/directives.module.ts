import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// directives
import { ToLowerCaseDirective } from '@directives/to-lower-case.directive';
import { BounceOnClickDirective } from '@directives/bounce-on-click.directive';
import { OnlyNumbersDirective } from '@directives/only-numbers.directive';
import { OnlyPriceDirective } from '@directives/only-price.directive';
import { SlugDirective } from '@directives/slug.directive';
import { AccesskeyShortcutDirective } from '@directives/accesskey-shortcut.directive';

@NgModule({
  declarations: [
    ToLowerCaseDirective,
    OnlyPriceDirective,
    BounceOnClickDirective,
    SlugDirective,
    OnlyNumbersDirective,
    AccesskeyShortcutDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToLowerCaseDirective,
    OnlyPriceDirective,
    BounceOnClickDirective,
    SlugDirective,
    OnlyNumbersDirective,
    AccesskeyShortcutDirective
  ]
})
export class DirectivesModule { }
