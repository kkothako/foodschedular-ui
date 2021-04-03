import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PreferencesModel } from '../models/preferences.model';


@Injectable()
export class UserPreferencesService {
    constructor(private httpClient: HttpClient){}
    createPreferences(preferences: PreferencesModel): Observable<any> {
        return this.httpClient.post<any>(`${environment.baseUrl}/createPreferences`, preferences)
          .pipe(catchError(error => of(error)));
      }
      getPreferencesByUserId(userId: string): Observable<any> {
        return this.httpClient.get<any>(`${environment.baseUrl}/getPreferences/${userId}`)
          .pipe(
            //tap(data=> console.log('preference', data)),
            catchError(error => of(error))
            );
      }
}
