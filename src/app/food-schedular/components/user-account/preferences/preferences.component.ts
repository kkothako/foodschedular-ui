import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { KeyValueModel } from 'src/app/food-schedular/store/models/preferences.model';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})

export class PreferencesComponent implements OnInit {

  constructor() { }

  lstCuisines: KeyValueModel[] = [];
  selectedCuisine: KeyValueModel[] = [];

  lstProtiens: KeyValueModel[] = [];
  selectedProtien: KeyValueModel[] = [];

  lstAllergies: KeyValueModel[] = [];
  selectedAllergy: KeyValueModel[] = [];

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
    ]


    this.lstAllergies = [
      { name: 'Peanuts', code: 'PE' },
      { name: 'Seafood', code: 'SE' },
      { name: 'Other', code: 'OT' }
    ]

  }

}
