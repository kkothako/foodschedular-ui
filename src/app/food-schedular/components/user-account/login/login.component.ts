import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { UserAccountRegistrationModel } from 'src/app/food-schedular/store/models/user-account.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';
import { SignupTypeComponent } from '../signup-type/signup-type.component';
import * as loginActions from './../../../store/action/user-account-login';
import * as selectors from './../../../store/selector/user-account.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginFormGroup: FormGroup;
  load$: Observable<boolean>;
  handleClick: boolean;

  constructor(private router: Router,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private store: Store<AppState>) { }


  ngOnInit(): void {
    this.loginFormGroup = this._formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.email],
        updateOn: "change",
      }],
      password: ['', {
        validators: [Validators.required],
        updateOn: 'change'
      }]


    });
    this.bindShowHideLoad();
    this.bindErrors();
    this.store.pipe(select(selectors.selectLoggedInUser))
      .subscribe(response => {
        if (this.handleClick && response) {
          this.router.navigate(['food-schedular/dashboard/schedule-food']);
        }
      });
  }
  bindShowHideLoad(): void {
    this.load$ = this.store.pipe(select(selectors.load))
      .pipe(catchError((error) => {
        this.openSnackBar('Opps! something went wrong' + error, "Error")
        return EMPTY;
      }))
  }
  bindErrors(): void {
    this.store.pipe(select(selectors.selectError))
      .subscribe(error => {
        debugger
        if (error) {
          this.openSnackBar(error, 'Error');
        }
      });
  }
  redirectToForgotPassword(): void {
    this.router.navigate(["food-schedular/useraccount/forgotpassword"]);
  }

  redirectToTC(): void {
    this.router.navigate(["food-schedular/useraccount/terms-conditions"]);
  }

  openSignUpTypeDialog() {
    this.dialog.open(SignupTypeComponent, {
      width: '800px'
    });
  }
  validateLogin(loginFormGroup: FormGroup): void {
    this.handleClick = true;
    const loginUser = <UserAccountRegistrationModel>loginFormGroup.value;
    this.store.dispatch(loginActions.validateLogin({ payload: loginUser }))

  }
  openSnackBar(message: string, action: string, duration = 5000) {
    this._snackBar.dismiss();
    this._snackBar.open(message, action, {
      duration: duration,
    });

  }

}
