import { Component, Input } from '@angular/core';

// environment
import { environment } from '@environment';

// fontawesome
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

// 3-party
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  standalone: false,
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})
export class LanguageComponent {

  // translate
  langs: string[] = [];
  selectedLang: string;

  constructor(private translate: TranslateService) {
    // translate
    this.langs = this.translate.getLangs();
    this.selectedLang = this.translate.currentLang;
  }

  @Input() isAlreadyOpenAnDialog: boolean = false;
  @Input() topSize: string = '0';

  icons = {
    faLanguage
  }

  changeLang(lang: string) {
    // avoid multiple dialogs
    if (this.isAlreadyOpenAnDialog) return;

    this.translate.use(lang);
    this.translate.setDefaultLang(lang);
    localStorage.setItem(environment.localStorageLenguageKey, lang)
  }

}
