import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDomainService {

  constructor() { }

  openInDomain(currentUrl: string){
    const urlNavigator: any = window.open(currentUrl, "_blank");
    urlNavigator.location;
  }
}
