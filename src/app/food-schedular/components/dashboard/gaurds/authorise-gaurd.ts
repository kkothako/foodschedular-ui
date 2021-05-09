import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/food-schedular/store/state/app.state';
import * as selectors from './../../../store/selector/user-account.selector';


@Injectable({
  providedIn: 'root'
})
export class AutheriseGaurd implements CanActivate {
  constructor(private store: Store<AppState>,
    private router: Router) {

  }
  canActivate(): boolean {
    let isAuthorise = false;
    this.store.pipe(select(selectors.selectLoggedInUser))
      .subscribe(response => {
        if (response) {
          isAuthorise = true;
        }
        else {
          this.router.navigate(['food-schedular/useraccount/signin']);
        }
      });
    return isAuthorise;
  }
}
