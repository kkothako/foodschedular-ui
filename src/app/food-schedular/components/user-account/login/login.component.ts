import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginTypeModel } from 'src/app/food-schedular/store/models/login-type.model';
import { SignupTypeComponent } from '../signup-type/signup-type.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private router: Router,
    public dialog: MatDialog) { }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit(): void {

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
  validateLogin(): void {
    this.router.navigate(['food-schedular/dashboard/schedule-food']);
  }

}
