import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-passowrd',
  templateUrl: './forgot-passowrd.component.html',
  styleUrls: ['./forgot-passowrd.component.scss']
})
export class ForgotPassowrdComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router) { }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
  }

}
