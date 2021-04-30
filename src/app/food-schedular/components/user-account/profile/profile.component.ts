import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { EMPTY, fromEvent, Observable } from 'rxjs';
import { catchError, debounce, debounceTime, distinctUntilChanged, filter, map, pluck } from 'rxjs/operators';
import { AddressModel, UserAccountRegistrationModel } from 'src/app/food-schedular/store/models/user-account.model';
import { UserProfileModel } from 'src/app/food-schedular/store/models/user-profile.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';

import * as actions from '../../../store/action/user-account.action';
import * as selectors from './../../../store/selector/user-account.selector';

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
  load$: Observable<boolean>;
  newUser: UserAccountRegistrationModel;
  hasSaveClicked = false;
  @ViewChild('input') zipCodeElement: ElementRef;
  userId: string;
  profileId: string;

  constructor(private _formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    this.load$ = this.store.pipe(select(selectors.load));

    this.store.pipe(select(selectors.selectNewlyCreatedUser))
      .subscribe(response => {
        this.newUser = response;
      });

    this.store.pipe(select(selectors.selectUserProfiles))
      .subscribe(response => {
        if (response && this.hasSaveClicked) {
          this.hasSaveClicked = false;
          this.openSnackBar("User profile created", "success")
          this.router.navigate(['food-schedular/useraccount/preferences', response[0].userId, response[0].id]);
        }
        if (this.hasSaveClicked && !response) {
          this.openSnackBar("Opps!, Error while creating user profile", "error")
          this.hasSaveClicked = false;
        }
      });
    this.bindAddress();
  }

  ngOnInit() {

    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(state => {
        this.isSmallScreen = state.matches;

      })

    this.route.params.subscribe(param => {
      this.userId = param["userId"];
      this.profileId = param["profileId"];
    });

    this.nameFormGroup = this._formBuilder.group({
      nickName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['']
    });

    if (this.profileId != null) {
      this.store.dispatch(actions.getUserProfileByProfileId({ userId: this.userId, profileId: this.profileId }));
    }

  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  createUserProfile(): void {
    this.hasSaveClicked = true;
    const profile = <UserProfileModel>this.nameFormGroup.value;
    profile.address = <AddressModel>this.secondFormGroup.value;
    profile.userId = this.userId != null ? this.userId : this.newUser.id;

    this.store.dispatch(actions.createUserProfile({ payload: profile }));

  }
  openSnackBar(message: string, action: string, duration = 8000) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }
  ngAfterViewInit(): void {
    this.searchAddressByZipCode();
  }
  searchAddressByZipCode(): void {
    fromEvent(this.zipCodeElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        pluck('target', 'value'),
        distinctUntilChanged(),
        filter((value: string) => (value.length > 3)),
        map(value => value)
      )
      .subscribe(result => {
        this.store.dispatch(actions.getAddress({ zipCode: result }));
      });
  }
  bindAddress(): void {
    this.store.pipe(select(selectors.selectAddress))
      .subscribe(response => {
        if (response) {
          this.secondFormGroup.get('city').setValue(response.city);
          this.secondFormGroup.get('state').setValue(response.state);
          this.secondFormGroup.get('country').setValue(response.country);
        }
      });
  }
}
