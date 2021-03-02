import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { catchError, combineAll } from 'rxjs/operators';
import { UserAccountRegistrationModel } from 'src/app/food-schedular/store/models/user-account.model';
import { UserProfileModel } from 'src/app/food-schedular/store/models/user-profile.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';
import * as actions from './../../../store/action/user-accout.action';
import * as selectors from './../../../store/selector/user-account.selector';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  activationKey = new FormControl('', [Validators.required]);
  newUser$: Observable<UserAccountRegistrationModel>;
  userProfiles$: Observable<UserProfileModel[]>;
  validateActivationStatus$: Observable<boolean>;
  load$: Observable<boolean>;
  handleClick = false;

  constructor(private router: Router,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar) {
    this.newUser$ = this.store.pipe(select(selectors.selectNewlyCreatedUser))
      .pipe(
        catchError(error => {
          return EMPTY;
        }));

    this.validateActivationStatus$ = this.store.pipe(select(selectors.selectValidateActivationStatus))
      .pipe(catchError((error) => {
        console.log(error);
        return EMPTY;
      }));

    this.userProfiles$ = this.store.pipe(select(selectors.selectUserProfiles))
      .pipe(catchError((error) => {
        console.log(error);
        return EMPTY;
      }));
    combineLatest(this.validateActivationStatus$, this.userProfiles$)
      .subscribe(([status, profiles]) => {
        if (this.handleClick && status && !profiles) {
          this.openSnackBar('Validated activation key successfully!', 'Activation Key');
          this.router.navigate(['food-schedular/useraccount/profile']);
          this.handleClick = false;
        } else if (this.handleClick && !status) {
          this.openSnackBar('OOPs, The entered activation key does not exist. Please try again!', 'Activation Key');
        }
      });
    this.load$ = this.store.pipe(select(selectors.load))
      .pipe(catchError(error => {
        console.log(error);
        return EMPTY;
      }));
  }

  ngOnInit(): void {
  }
  vaidateActivationKey(userId: string): void {
    this.handleClick = true;
    this.store.dispatch(actions.validateActivationKey({ activationKey: this.activationKey.value }))
    this.store.dispatch(actions.getUserProfiles({ userId: userId }));
  }
  getErrorMessage() {
    if (this.activationKey.hasError('required')) {
      return 'You must enter a activation key';
    }
  }
  openSnackBar(message: string, action: string, duration = 5000) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }
}
