import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodSchedularAppComponent } from './food-schedular-app.component';
import { ToolbarComponent } from './components/banners/toolbar/toolbar.component';
import { SidenavComponent } from './components/banners/sidenav/sidenav.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { UserAccountModule } from './components/user-account/user-account.module';

const routes: Routes = [
  {
    path: '', component: FoodSchedularAppComponent, children: [
      { path: 'useraccount', loadChildren: () => import('./components/user-account/user-account.module').then(m => m.UserAccountModule) },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  },
  { path: '**', redirectTo: 'useraccount' }

]

@NgModule({
  declarations: [
    FoodSchedularAppComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    UserAccountModule
  ]
})
export class FoodSchedularModule { }
