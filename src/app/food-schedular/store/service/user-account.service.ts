import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAccountRegistrationModel } from '../models/user-account.model';

@Injectable()
export class UserAccountService {
  constructor(private httpClient: HttpClient) { }
  createUserAccount(login: UserAccountRegistrationModel): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/customers/validate`, login)
  }
}
