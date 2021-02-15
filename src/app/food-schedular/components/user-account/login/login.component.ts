import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginTypeModel, Types } from 'src/app/food-schedular/store/models/login-type.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginTypes: LoginTypeModel[] = [];

  constructor(private router: Router) { }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit(): void {
    this.bindLoginTypes();
  }
  redirectToSingUp(): void {
    this.router.navigate(["food-schedular/useraccount/signup"]);
  }
  redirectToForgotPassword(): void {
    this.router.navigate(["food-schedular/useraccount/forgotpassword"]);
  }

  redirectToTC(): void {
    this.router.navigate(["food-schedular/useraccount/terms-conditions"]);
  }
  selectedLoginType(loginType: LoginTypeModel, count: number): void {
    loginType.className = 'pi pi-spin pi-spinner';
    console.log('iiiii', count);
    this.loginTypes.forEach((item, i) => {
      if (i !== count) {
        item.className='pi pi-user';
      }
    })
  }
  bindLoginTypes(): void {
    this.loginTypes = [
      {
        title: 'Are You Customer',
        subTitle: 'Loves eating fresh food',
        className: 'pi pi-spin pi-spinner',
        hasSelected: true,
        style: { 'background-color': '#ff4081', color: '#ffffff' }
      },
      {
        title: 'Are You Restorent',
        subTitle: 'Loves making fresh food',
        className: 'pi pi-user',
        style: { 'background-color': '#9c27b0', color: '#ffffff' },
        hasSelected: false
      },
      {
        title: 'Are You Agent',
        subTitle: 'Loves customer support',
        className: 'pi pi-user',
        style: { 'background-color': '#2196F3', color: '#ffffff' },
        hasSelected: false
      }
    ];

  }

}
