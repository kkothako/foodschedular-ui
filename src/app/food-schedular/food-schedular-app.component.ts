import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-food-schedular-app',
  template: `
   <app-sidenav></app-sidenav>
  `,
  styles: [
  ]
})
export class FoodSchedularAppComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "unicorn",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/1.svg")
    );

  }

  ngOnInit(): void {
  }

}
