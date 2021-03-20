import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { pid } from 'process';
import { combineLatest, EMPTY, merge, Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CuisineModel, ProtienModel } from 'src/app/food-schedular/store/models/cuisine.model';
import { KeyValueModel } from 'src/app/food-schedular/store/models/preferences.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';

import * as actions from './../../../../store/action/food-schedular.action';
import * as selectors from './../../../../store/selector/food-shedular.selectors';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {

  selectedCuisine: KeyValueModel[] = [];
  selectedProtien: KeyValueModel[] = [];

  selectedDate: Date;
  selectedTime: Date;
  myDatePicker: any;
  cusines$: Observable<CuisineModel[]>;
  protiens$: Observable<ProtienModel[]>;
  viewModel$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.bindDropdowns();
  }

  ngOnInit(): void {
    this.store.dispatch(actions.getAllCuisines());
    this.store.dispatch(actions.getAllProtiens());
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

    this.viewModel$ = combineLatest([this.cusines$, this.protiens$])
      .pipe(map(([cuisines, protiens]) => ({ cuisines, protiens })));

  }

  addOrder(): void {

  }

}
