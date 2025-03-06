import { Injectable } from '@angular/core';

// environment
import { environment } from '@environment';

// interfaces
import { DomainConfig, MyCurrentDomains, myCurrentDomains } from '@interfaces/domains';

@Injectable({
  providedIn: 'root'
})
export class CurrentSelectedDomainService {

  private currentDomains: MyCurrentDomains[] = myCurrentDomains;

  constructor() { }

  getSelectedDomain(): DomainConfig{
    const currentDomainFromLS = this.getDomainFromLS();
    const currentSelectedDomain = currentDomainFromLS || this.currentDomains[0];
    return currentSelectedDomain;
  }

  getDefaultSelectedDomain(): DomainConfig{
    return this.currentDomains[0];
  }

  setSelectedDomain(selectedDomain: DomainConfig) {
    localStorage.setItem(environment.localStorageDomainKey, selectedDomain.slug)
  }

  getDomainFromLS() {
    const currentDomainKeyFromLS = localStorage.getItem(environment.localStorageDomainKey);
    if (currentDomainKeyFromLS) {
      return this.currentDomains.find(el => el.slug === currentDomainKeyFromLS)
    } else {
      return undefined;
    }
  }
}
