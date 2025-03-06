import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// pipes
import { DefaultImageSrcPipe } from '../default-image-src.pipe';
import { PriceFormatPipe } from '../price-format.pipe';
import { NumberFormatPipe } from '@pipes/number-format.pipe';
import { UrlSlugPipe } from '@pipes/url-slug.pipe';
import { ChipListPipe } from '@pipes/chip-list-elipsis.pipe';
import { ImageIdPipe } from '@pipes/image-id.pipe';

@NgModule({
  declarations: [
    DefaultImageSrcPipe,
    PriceFormatPipe,
    NumberFormatPipe,
    UrlSlugPipe,
    ChipListPipe,
    ImageIdPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DefaultImageSrcPipe,
    PriceFormatPipe,
    NumberFormatPipe,
    UrlSlugPipe,
    ChipListPipe,
    ImageIdPipe
  ]
})
export class PipeModule { }
