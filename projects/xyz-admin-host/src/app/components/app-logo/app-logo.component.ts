import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyThemes } from '@interfaces/my-themes';
import { ThemeService } from '@services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logo',
  templateUrl: './app-logo.component.html',
  styleUrls: ['./app-logo.component.scss']
})
export class AppLogoComponent implements OnInit, OnDestroy {

  // theming
  MyThemes = MyThemes;
  currentTheme!: MyThemes;
  myTheme$ = this.themeService.getCurrentTheme();

  suscription!: Subscription;


  constructor(
    private themeService: ThemeService,
  ) {
    
  }

  ngOnInit(): void {
    this.getCurrentTheme();
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  getCurrentTheme() {
    this.suscription =
    this.themeService
      .getCurrentTheme()
      .subscribe(data => {
        
        console.log(data)
        this.currentTheme = data;
    })
  }

}
