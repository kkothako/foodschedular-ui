import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isSmallScreen: boolean;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(private breakPointObserver: BreakpointObserver) {

  }

  ngOnInit(): void {
    this.breakPointObserver.observe([Breakpoints.XSmall])
      .subscribe(state => {
        this.isSmallScreen = state.matches;
      })
  }

}
