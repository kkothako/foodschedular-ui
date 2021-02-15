import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  selectedCustomerType: string;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.selectedCustomerType = param['type'];
    });
  }
  redirectToSignIn(): void {
    this.router.navigate(['food-schedular/useraccount/signin']);
  }

  redirectToConfirmEmail(): void {
    this.router.navigate(['food-schedular/useraccount/confirm-email']);
  }
  redirectToTC(): void {
    this.router.navigate(["food-schedular/useraccount/terms-conditions"]);
  }

}
