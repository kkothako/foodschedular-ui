import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { ActivatedRoute, Router } from '@angular/router';
import * as accountSelectors from './../../../store/selector/user-account.selector';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})

export class PreferencesComponent implements OnInit {

  formGroup: FormGroup;

  selectedCuisine: KeyValueModel[] = [];
  selectedProtein: KeyValueModel[] = [];
  selectedAllergy: KeyValueModel[] = [];

  cusines$: Observable<CuisineModel[]>;
  proteins$: Observable<ProtienModel[]>;
  allergys$: Observable<AllergyModel[]>;
  viewModel$: Observable<any>;

  userId: string;
  profileId: string;

  load$: Observable<boolean>;
  hasPreferenceSaveClick = false;

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router) {
    this.bindDropdowns();
    this.bindShowHideLoad();
    this.store.pipe(select(accountSelectors.selectHasProfileCreated))
      .subscribe(response => {
        if (response && this.hasPreferenceSaveClick) {
          this.hasPreferenceSaveClick = false;
          this.openSnackBar('User Preferences Successfully Created', 'Success');
          this.router.navigate(['food-schedular/dashboard/schedule-food', response[0].userId, response[0].profielId]);
        }
      })
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

    this.route.params.subscribe(param => {
      this.userId = param["userId"];
      this.profileId = param["profileId"];
    });

       this.formGroup = this._formBuilder.group({
      cuisines: ['', Validators.required],
      proteins: ['', Validators.required],
      allergys: ['', Validators.required]
    });

  }

  createPreferences():void{

    const preferences = <PreferencesModel>this.formGroup.value;
    preferences.cuisines = this.selectedCuisine;
    preferences.proteins = this.selectedProtein;
    preferences.allergys = this.selectedAllergy;

    preferences.userId  = this.userId;
    preferences.profileId  = this.profileId;

    //preferences
    this.store.dispatch(preferenceActions.createPreferences({ payload: preferences }));
    this.hasPreferenceSaveClick = true;
  }

  bindShowHideLoad(): void {
    this.load$ = this.store.pipe(select(accountSelectors.load))
      .pipe(catchError((error) => {
        return EMPTY;
      }))
  }

  openSnackBar(message: string, action: string, duration = 5000) {
    this._snackBar.dismiss();
    this._snackBar.open(message, action, {
      duration: duration,
    });

  }



}
