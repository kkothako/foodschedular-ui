import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ScheduleFoodComponent } from './components/schedule-food/schedule-food.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';



const routes: Routes = [
  { path: '', component: DashboardComponent, children:[
    {path:'schedule-food', component: ScheduleFoodComponent}
  ] }
]
@NgModule({
  declarations: [
    DashboardComponent,
    ScheduleFoodComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule
  ]
})
export class DashboardModule {

}
