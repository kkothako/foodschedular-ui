import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, EMPTY, merge, Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AllergyModel, CuisineModel, ProtienModel } from 'src/app/food-schedular/store/models/cuisine.model';
import { KeyValueModel } from 'src/app/food-schedular/store/models/preferences.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';
import * as actions from './../../../store/action/food-schedular.action';
import * as selectors from './../../../store/selector/food-shedular.selectors';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})

export class PreferencesComponent implements OnInit {

  selectedCuisine: KeyValueModel[] = [];
  selectedProtien: KeyValueModel[] = [];
  selectedAllergy: KeyValueModel[] = [];

  cusines$: Observable<CuisineModel[]>;
  protiens$: Observable<ProtienModel[]>;
  allergys$: Observable<AllergyModel[]>;
  viewModel$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.bindDropdowns();
  }

  bindDropdowns(): void {

    this.cusines$ = this.store.pipe(select(selectors.selectAllCuisines))
      .pipe(catchError((error) => {
        console.log(error);
        return EMPTY;
      }));

    this.protiens$ = this.store.pipe(select(selectors.slectAllProtiens))
      .pipe(catchError((error) => {
        console.log(error);
        return EMPTY;
      }));

      this.allergys$ = this.store.pipe(select(selectors.selectAllAllergys))
      .pipe(catchError((error) => {
        console.log(error);
        return EMPTY;
      }));

    this.viewModel$ = combineLatest([this.cusines$, this.protiens$, this.allergys$])
      .pipe(map(([cuisines, protiens, allergys]) => ({ cuisines, protiens, allergys })));

  }

  ngOnInit(): void {

    this.store.dispatch(actions.getAllCuisines());
    this.store.dispatch(actions.getAllProtiens());
    this.store.dispatch(actions.getAllAllergys());
  }

}
