import { Component, OnInit } from '@angular/core';
import { KeyValueModel } from 'src/app/food-schedular/store/models/preferences.model';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})

export class AddFoodComponent implements OnInit {

  constructor() { }

  lstCuisines: KeyValueModel[] = [];
  selectedCuisine: KeyValueModel[] = [];

  lstProtiens: KeyValueModel[] = [];
  selectedProtien: KeyValueModel[] = [];

  date1: Date;
  timeonly: Date;

  ngOnInit(): void {
    this.lstCuisines = [
      { name: 'American', code: 'AM' },
      { name: 'Asian', code: 'AS' },
      { name: 'Mexican', code: 'ME' },
      { name: 'Italian', code: 'IT' },
      { name: 'Spanish', code: 'SP' }
    ]
      ;

    this.lstProtiens = [
      { name: 'Chicken', code: 'CH' },
      { name: 'Goat', code: 'GO' },
      { name: 'Beef', code: 'BE' }
    ];
  }
}
