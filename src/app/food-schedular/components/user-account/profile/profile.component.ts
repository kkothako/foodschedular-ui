import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  nameFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  isSmallScreen: boolean;


  constructor(private _formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {

    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(state => {
        this.isSmallScreen = state.matches;

      })

    this.nameFormGroup = this._formBuilder.group({
      nickName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email:['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
