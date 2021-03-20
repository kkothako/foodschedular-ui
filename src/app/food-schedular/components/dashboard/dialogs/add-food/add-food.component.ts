import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeyValueModel } from 'src/app/food-schedular/store/models/preferences.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';

import * as actions from './../../../../store/action/food-schedular.action';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {

  cuisines: KeyValueModel[] = [];
  selectedCuisine: KeyValueModel[] = [];

  protiens: KeyValueModel[] = [];
  selectedProtien: KeyValueModel[] = [];

  selectedDate: Date;
  selectedTime: Date;
  myDatePicker: any;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(actions.getAllCuisines());

    this.cuisines = [
      { name: 'American', code: 'AM' },
      { name: 'Asian', code: 'AS' },
      { name: 'Mexican', code: 'ME' },
      { name: 'Italian', code: 'IT' },
      { name: 'Spanish', code: 'SP' }
    ]
      ;

    this.protiens = [
      { name: 'Chicken', code: 'CH' },
      { name: 'Goat', code: 'GO' },
      { name: 'Beef', code: 'BE' }
    ];
  }

}
