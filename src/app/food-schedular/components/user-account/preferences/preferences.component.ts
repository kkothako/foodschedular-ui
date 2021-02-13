import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { KeyValueModel } from 'src/app/food-schedular/stores/models/preferences.model';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})

export class PreferencesComponent implements OnInit {
    hide = true;
    lstCuisines: KeyValueModel[] = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ]
    selectedCuisine: KeyValueModel[];
    constructor() { }
    
    ngOnInit(): void {
    }
  
  }