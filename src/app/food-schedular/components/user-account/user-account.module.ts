import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserAccountComponent } from './user-account.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { ForgotPassowrdComponent } from './forgot-passowrd/forgot-passowrd.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { SignupTypeComponent } from './signup-type/signup-type.component';

const routes: Routes = [
  {
    path: '', component: UserAccountComponent, children: [
      { path: 'signin', component: LoginComponent },
      { path: 'signup/:type', component: RegistrationComponent },
      { path: 'forgotpassword', component: ForgotPassowrdComponent },
      { path: 'preferences/:userId/:profileId', component: PreferencesComponent },
      { path: 'terms-conditions', component: TermsConditionsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'confirm-email', component: ConfirmEmailComponent },
    ]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    UserAccountComponent,
    ForgotPassowrdComponent,
    PreferencesComponent,
    TermsConditionsComponent,
    ProfileComponent,
    ConfirmEmailComponent,
    SignupTypeComponent
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
