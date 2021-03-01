import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  email$: Observable<string>;
  constructor(private router: Router,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar) {
    this.email$ = this.store.pipe(select(selectors.selectNewlyCreatedEmail))
      .pipe(
        catchError(error => {
          return EMPTY;
        }));
  }

  ngOnInit(): void {
  }
  redirectToProfile(): void {
    this.store.dispatch(actions.validateActivationKey({activationKey: this.activationKey.value}))
    //this.router.navigate(['food-schedular/useraccount/profile'])
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
