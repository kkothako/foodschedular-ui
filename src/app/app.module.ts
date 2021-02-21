import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { ToolbarComponent } from './food-schedular/components/banners/toolbar/toolbar.component';
import { SidenavComponent } from './food-schedular/components/banners/sidenav/sidenav.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreFeatureBaseModule } from './food-schedular/store/store-feature.module';
const routes: Routes = [
  { path: 'food-schedular', loadChildren: () => import('./food-schedular/food-schedular.module').then(m => m.FoodSchedularModule) },
  { path: '**', redirectTo: 'food-schedular/useraccount/signin' }
]

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AngularMaterialModule,
    StoreFeatureBaseModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      },
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
