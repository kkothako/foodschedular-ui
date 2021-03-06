import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginTypeModel } from 'src/app/food-schedular/store/models/login-type.model';

@Component({
  selector: 'app-signup-type',
  templateUrl: './signup-type.component.html',
  styles: [
    `
    .m-t14{
  margin-top: -14px;
}
    `
  ]
})
export class SignupTypeComponent implements OnInit {
  loginTypes: LoginTypeModel[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.bindLoginTypes();
  }
  bindLoginTypes(): void {
    this.loginTypes = [
      {
        name: 'Consumer',
        title: 'Are You Consumer',
        subTitle: 'Loves eating fresh food',
        className: 'pi pi-user',
        hasSelected: true,
        style: { 'background-color': '#ff4081', color: '#ffffff' }
      },
      {
        name: 'Restaurant',
        title: 'Are You Restaurant',
        subTitle: 'Loves making fresh food',
        className: 'pi pi-user',
        style: { 'background-color': '#9c27b0', color: '#ffffff' },
        hasSelected: false
      },
      {
        name: 'Agent',
        title: 'Are You Agent',
        subTitle: 'Loves customer support',
        className: 'pi pi-user',
        style: { 'background-color': '#2196F3', color: '#ffffff' },
        hasSelected: false
      }
    ];

  }
  redirectToSingUp(selectedLoginType: LoginTypeModel): void {
    this.router.navigate(["food-schedular/useraccount/signup", selectedLoginType.name]);
  }
}
