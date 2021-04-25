import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddressModel, UserAccountRegistrationModel } from '../models/user-account.model';
import { UserProfileModel } from '../models/user-profile.model';

@Injectable()
export class UserAccountService {
  constructor(private httpClient: HttpClient) { }
  createUserAccount(userAccountRegistration: UserAccountRegistrationModel): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/useraccounts`, userAccountRegistration)
      .pipe(catchError(error => of(error)));
  }
  validateActivationKey(activationKey: string, userId: string): Observable<any> {
    const data = { activationKey: activationKey, userId: userId };

    return this.httpClient.post<any>(`${environment.baseUrl}/useraccounts/validateActivationKey`, data)
      .pipe(catchError(error => of(error)));
  }

  getProfilesByUserId(userId: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/userprofiles/${userId}`)
      .pipe(catchError(error => of(error)));
  }
  validateLogin(login: UserAccountRegistrationModel): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/useraccounts/validateLogin`, login)
      .pipe(

        catchError(error => of(error))
      );
  }
  createUserProfile(profile: UserProfileModel): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/userprofiles`, profile)
      .pipe(
        catchError(error => of(error))
      );
  }
  getAdrressByZipCode(zipCode: string): Observable<AddressModel> {
    return this.httpClient.get<any>(`https://ziptasticapi.com/${zipCode}`)
      .pipe(
        catchError(error => of(error))
      );
  }
  deleteProfileById(profileID: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/userprofiles/deleteProfileById`, {id: profileID})
      .pipe(
        catchError(error => of(error))
      );
  }
  forGotPasswordByEmailId(email: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/useraccounts/resendPassword`, {email: email})
      .pipe(
        catchError(error => of(error))
      );
  }
}
