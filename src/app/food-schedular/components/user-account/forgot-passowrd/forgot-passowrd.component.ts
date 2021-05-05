import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from 'src/app/food-schedular/store/state/app.state';

import * as userAccountAction from './../../../store/action/user-account.action';
import * as userAccountSelectors from './../../../store/selector/user-account.selector';

@Component({
  selector: 'app-forgot-passowrd',
  templateUrl: './forgot-passowrd.component.html',
  styleUrls: ['./forgot-passowrd.component.scss']
})
export class ForgotPassowrdComponent implements OnInit {
  forgotFormGroup: FormGroup;
  load$: Observable<boolean>;
  handleClick = false;
  //email = new FormControl('', [Validators.required, Validators.email]);
  email = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>) {
    this.bindShowHideLoad();

    this.store.pipe(select(userAccountSelectors.selectSaveOrUpdate))
      .subscribe(response => {
        if (this.handleClick && response) {
          this.openSnackBar(response, "Info!!");
          this.handleClick = false;
          this.router.navigate(['food-schedular/useraccount/signin']);
        } else if (this.handleClick && response) {
          this.openSnackBar(response, "Error!!");
        }
      })
  }

  ngOnInit(): void {

    this.forgotFormGroup = this._formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.email],
        updateOn: "change",
      }]
    });

  }
  bindShowHideLoad(): void {
    this.load$ = this.store.pipe(select(userAccountSelectors.load))
      .pipe(catchError((error) => {
        this.openSnackBar('Opps! something went wrong' + error, "Error")
        return EMPTY;
      }))
  }
  openSnackBar(message: string, action: string, duration = 5000) {
    this._snackBar.dismiss();
    this._snackBar.open(message, action, {
      duration: duration,
    });

  }

  forgotPassword(forgotFormGroup: FormGroup): void {
    this.handleClick = true;
    this.email = forgotFormGroup.get('email').value;
    this.store.dispatch(userAccountAction.forGotPassword({ emailId: this.email }));
  }
}
