import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserAccountRegistrationModel } from '../models/user-account.model';

@Injectable()
export class UserAccountService {
  constructor(private httpClient: HttpClient) { }
  createUserAccount(userAccountRegistration: UserAccountRegistrationModel): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/useraccounts`, userAccountRegistration)
    .pipe(catchError(error => of(error)));
  }
}
