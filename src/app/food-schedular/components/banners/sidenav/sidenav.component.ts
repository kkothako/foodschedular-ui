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

  loggedInUser$: UserAccountRegistrationModel;
  hasLogin = false;
  profileId: string;

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
        if (response) {
          this.hasLogin = true;
          this.loggedInUser$ = response;
          this.store.pipe(select(selectors.selectUserProfiles))
            .subscribe(profiles => {
              if (profiles && response.id) {
                const profile = profiles.find(dr => dr.userId === response.id);
                if (profile) {
                  this.profileId = profile.id;
                }
              }
            })
        } else {
          this.hasLogin = false;
        }


      });


  }
  navigateLoginOrLogOut(): void {
    this.store.dispatch(loginActions.logoutAction());
    this.router.navigate(['food-schedular/useraccount/signin']);
  }
  navigateToDashboard(): void {
    debugger
    if ( this.loggedInUser$.id && this.profileId) {
      this.router.navigate(['food-schedular/dashboard/schedule-food', this.loggedInUser$.id, this.profileId]);
    } else {
      this.router.navigate(['food-schedular/useraccount/signin']);
    }
  }
  changeColor(): void {
    this.isAlternateColor = !this.isAlternateColor;
  }




}
