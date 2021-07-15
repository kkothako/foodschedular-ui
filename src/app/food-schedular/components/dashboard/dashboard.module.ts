import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ScheduleFoodComponent } from './components/schedule-food/schedule-food.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

import { FormsModule } from '@angular/forms';
import { AddFoodComponent } from './dialogs/add-food/add-food.component';
import { ViewOrderComponent } from './dialogs/view-order/view-order.component';
import { ReviewOrderCartComponent } from './components/review-order-cart/review-order-cart.component';
import { AutheriseGaurd } from './gaurds/authorise-gaurd';
import { OrderCofirmationComponent } from './components/order-cofirmation/order-cofirmation.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'schedule-food/:userId/:profileId', canActivate:[AutheriseGaurd], component: ScheduleFoodComponent },
      { path: 'schedule-food/review-order-cart', component: ReviewOrderCartComponent },
      {path:'schedule-food/order-confirmation', component: OrderCofirmationComponent}
    ]
  }
]
@NgModule({
  declarations: [
    DashboardComponent,
    ScheduleFoodComponent,
    AddFoodComponent,
    ViewOrderComponent,
    ReviewOrderCartComponent,
    OrderCofirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    AngularMaterialModule
  ]
})
export class DashboardModule {

}
