import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isSmallScreen: boolean;
  typesOfShoes: string[] = ['Sign In'];
  constructor(private breakPointObserver: BreakpointObserver,
    private router: Router) {

  }

  ngOnInit(): void {
    this.breakPointObserver.observe([Breakpoints.XSmall])
      .subscribe(state => {
        this.isSmallScreen = state.matches;
      })

      
  }

  redirectToSignIn(): void {
    this.router.navigate(['food-schedular/useraccount/signin']);
  }

}
