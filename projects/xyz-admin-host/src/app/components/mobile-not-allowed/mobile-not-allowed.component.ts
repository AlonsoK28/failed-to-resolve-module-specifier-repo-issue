import { Component, OnInit } from '@angular/core';

// fontawesome
import {
  faDesktopAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mobile-not-allowed',
  templateUrl: './mobile-not-allowed.component.html',
  styleUrls: ['./mobile-not-allowed.component.scss']
})
export class MobileNotAllowedComponent implements OnInit {

  icons = {
    faDesktopAlt
  }

  constructor() { }

  ngOnInit(): void {
  }

}
