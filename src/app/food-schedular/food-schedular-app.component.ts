import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-food-schedular-app',
  template: `
   <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class FoodSchedularAppComponent implements OnInit {

  constructor() {


  }

  ngOnInit(): void {
  }

}
