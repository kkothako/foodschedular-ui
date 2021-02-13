import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserAccountComponent } from './user-account.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { ForgotPassowrdComponent } from './forgot-passowrd/forgot-passowrd.component';

const routes: Routes = [
  {
    path: '', component: UserAccountComponent, children: [
      { path: 'signin', component: LoginComponent },
      { path: 'signup', component: RegistrationComponent },
      { path: 'forgotpassword', component: ForgotPassowrdComponent }
    ]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    UserAccountComponent,
    ForgotPassowrdComponent
  ],
  exports: [
    LoginComponent,
    RegistrationComponent,
    UserAccountComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserAccountModule { }
