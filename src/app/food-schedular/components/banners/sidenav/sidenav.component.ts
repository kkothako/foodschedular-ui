import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountRegistrationModel } from 'src/app/food-schedular/store/models/user-account.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';
import * as selectors from './../../../store/selector/user-account.selector';
import * as loginActions from './../../../store/action/user-account-login';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isSmallScreen: boolean;
  isAlternateColor: boolean;
  typesOfShoes: string[] = ['Sign In'];
  loggedInUser$: UserAccountRegistrationModel;

  constructor(private breakPointObserver: BreakpointObserver,
    private router: Router,
    private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.breakPointObserver.observe([Breakpoints.XSmall])
      .subscribe(state => {
        this.isSmallScreen = state.matches;
      })
    this.store.pipe(select(selectors.selectLoggedInUser))
      .subscribe(response => {
        this.loggedInUser$ = response;
      });


  }
  navigateLoginOrLogOut(): void {
    this.store.dispatch(loginActions.logoutAction());
    this.router.navigate(['food-schedular/useraccount/signin']);
  }

  changeColor(): void {
    this.isAlternateColor = !this.isAlternateColor;
  }
}
