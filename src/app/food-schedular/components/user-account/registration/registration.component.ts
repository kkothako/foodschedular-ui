import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserAccountRegistrationModel } from 'src/app/food-schedular/store/models/user-account.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';

import * as action from '../../../store/action/user-accout.action';
import * as userAccountSelectors from '../../../store/selector/user-account.selector';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[MessageService]
})
export class RegistrationComponent implements OnInit {
  hide = true;

  selectedCustomerType: string;
  registationFormGroup: FormGroup;
  registrationModel: UserAccountRegistrationModel;
  load$: Observable<boolean>;
  handleClick = false;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar,
    private messageService: MessageService) {
    this.showError('test');
    this.load$ = this.store.pipe(select(userAccountSelectors.load))
      .pipe(catchError(error => {
        console.log(error);
        return EMPTY;
      }));

    this.load$.subscribe(result => {
      if (!result && this.handleClick) {
        this.openSnackBar('User account created successfully!', 'New Account')
        this.handleClick = false;
        this.redirectToConfirmEmail();
      }

    });

    this.store.pipe(select(userAccountSelectors.error))
      .subscribe(error => {
        debugger
        if (error) {
          this.openSnackBar(error.message, 'Error', 6000);
        }

      });

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(param => {
      this.selectedCustomerType = param['type'];
    });

    this.mapControlls();

  }
  mapControlls(): void {
    this.registationFormGroup = this._formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.email],
        updateOn: "change",
      }],
      password: ['', {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      confirmPassword: ['', {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      address: this._formBuilder.group({
        addressLine1: ['', { updateOn: 'change' }],
        city: ['', { updateOn: 'change' }],
        state: ['', { updateOn: 'change' }],
        country: ['', { updateOn: 'change' }],
        zipCode: ['', { updateOn: 'change' }]
      })
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? { notSame: false } : { notSame: true }
  }
  redirectToSignIn(): void {
    this.router.navigate(['food-schedular/useraccount/signin']);
  }

  saveRegistration(regFormGroup: FormGroup): void {
    this.handleClick = true;
    this.registrationModel = <UserAccountRegistrationModel>this.registationFormGroup.value;
    this.registrationModel.role = this.selectedCustomerType;
    if(this.selectedCustomerType==='Consumer') {
      this.registrationModel.address = null;
    }
    this.store.dispatch(action.createRegistration({ payload: this.registrationModel }));
  }
  redirectToConfirmEmail(): void {
    this.router.navigate(['food-schedular/useraccount/confirm-email']);
  }
  redirectToTC(): void {
    this.router.navigate(["food-schedular/useraccount/terms-conditions"]);
  }
  openSnackBar(message: string, action: string, duration = 2000) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }
  bindErors(): void {

  }
  showError(message: string) {
    this.messageService.clear();
    this.messageService.add({key: 'tl', severity:'info', summary: 'Info', detail: 'Message Content'});
  }

}
