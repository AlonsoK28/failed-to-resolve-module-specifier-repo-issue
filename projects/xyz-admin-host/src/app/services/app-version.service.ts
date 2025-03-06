import { Injectable } from '@angular/core';

// app version 
import packageJson from 'package.json';

@Injectable({
  providedIn: 'root'
})
export class AppVersionService {

  private version: string = packageJson.version;

  constructor() { }

  getAppVersion(){
    return this.version;
  }
}
