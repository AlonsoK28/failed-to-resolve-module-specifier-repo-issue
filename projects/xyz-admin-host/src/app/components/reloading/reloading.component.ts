import { Component, Input, OnInit } from '@angular/core';

// services
import { ThemeService } from '@services/theme.service';

@Component({
  selector: 'app-reloading',
  templateUrl: './reloading.component.html',
  styleUrls: ['./reloading.component.scss', './_reloading-theme.component.scss']
})
export class ReloadingComponent implements OnInit {

  @Input()
  isReloading: boolean = false;

  // theming
  myTheme$ = this.themeService.getCurrentTheme();

  constructor( private themeService: ThemeService ) { }

  ngOnInit(): void {
  }

}
