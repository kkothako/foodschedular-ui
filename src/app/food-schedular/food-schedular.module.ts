import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodSchedularAppComponent } from './food-schedular-app.component';
import { ToolbarComponent } from './components/banners/toolbar/toolbar.component';
import { SidenavComponent } from './components/banners/sidenav/sidenav.component';
import { MainContentComponent } from './components/banners/main-content/main-content.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { UserAccountModule } from './components/user-account/user-account.module';

const routes: Routes = [
  {
    path: '', component: FoodSchedularAppComponent,
    children: [
      {
        path: '', component: MainContentComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }

]

@NgModule({
  declarations: [
    FoodSchedularAppComponent,
    ToolbarComponent,
    SidenavComponent,
    MainContentComponent
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
