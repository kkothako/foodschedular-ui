import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, EMPTY, merge, Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AllergyModel, CuisineModel, ProtienModel } from 'src/app/food-schedular/store/models/cuisine.model';
import { KeyValueModel, PreferencesModel } from 'src/app/food-schedular/store/models/preferences.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';
import * as actions from './../../../store/action/food-schedular.action';
import * as selectors from './../../../store/selector/food-shedular.selectors';
import * as preferenceActions from './../../../store/action/user-preferences.action';

import * as userAccountActions from './../../../store/action/user-account.action';
import * as userAccountSelectors from './../../../store/selector/user-account.selector'

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})

export class PreferencesComponent implements OnInit {

  FormGroup: FormGroup;

  selectedCuisine: KeyValueModel[] = [];
  selectedProtein: KeyValueModel[] = [];
  selectedAllergy: KeyValueModel[] = [];

  cusines$: Observable<CuisineModel[]>;
  proteins$: Observable<ProtienModel[]>;
  allergys$: Observable<AllergyModel[]>;
  viewModel$: Observable<any>;
userId : string;
  constructor(private store: Store<AppState>) {
    this.bindDropdowns();
  }

  bindDropdowns(): void {

    this.cusines$ = this.store.pipe(select(selectors.selectAllCuisines))
      .pipe(catchError((error) => {
        console.log(error);
        return EMPTY;
      }));

    this.proteins$ = this.store.pipe(select(selectors.slectAllProtiens))
      .pipe(catchError((error) => {
        console.log(error);
        return EMPTY;
      }));

      this.allergys$ = this.store.pipe(select(selectors.selectAllAllergys))
      .pipe(catchError((error) => {
        console.log(error);
        return EMPTY;
      }));

    this.viewModel$ = combineLatest([this.cusines$, this.proteins$, this.allergys$])
      .pipe(map(([cuisines, proteins, allergys]) => ({ cuisines, proteins, allergys })));

  }

  ngOnInit(): void {

    this.store.dispatch(actions.getAllCuisines());
    this.store.dispatch(actions.getAllProtiens());
    this.store.dispatch(actions.getAllAllergys());

    this.bindUserId();
  }

  bindUserId(): void {
    this.store.pipe(select(userAccountSelectors.selectLoggedInUser))
      .subscribe(user => {
        this.userId = user.id;
      });
  }
  // bindUserProfiles(): void {
  //   this.userProfiles$ = this.store.pipe(select(userAccountSelectors.selectUserProfiles));
  //   this.userProfiles$.subscribe(response => {
  //     if (response && this.userProfileFormGroup.get('userProfile')) {
  //       this.userProfiles = response;
  //       const userProfile = response.find(dr => dr.userId === this.userId);
  //       this.userProfileFormGroup.get('userProfile').setValue(userProfile);
  //     }
  //   });
  // }

  createPreferences():void{

    const preferences = <PreferencesModel>this.FormGroup.value;
    preferences.cuisines = this.selectedCuisine;
    preferences.proteins = this.selectedProtein;
    preferences.allergys = this.selectedAllergy;

    preferences.userId  = this.userId;
    preferences.profileId  = "";

    //preferences
    this.store.dispatch(preferenceActions.createPreferences({ payload: preferences }));
  }

}
