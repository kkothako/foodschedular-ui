import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@fullcalendar/angular';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConstantService } from './constant.service';

@Injectable()
export class FoodSchedularService {

  constructor(private httpClient: HttpClient,
    private constantService: ConstantService) { }
  getAllCuisines(): Observable<any> {
    const url = `${environment.baseUrl}/cuisine/getallcuisines`;
    return this.httpClient.post<any>(url, this.constantService.httpOptions)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(error => of(error))
        );
  }
  getAllProtiens(): Observable<any> {
    const url = `${environment.baseUrl}/protein/getallproteins`;
    return this.httpClient.post<any>(url,this.constantService.httpOptions)
      .pipe(catchError(error => of(error)));
  }
  // createDraftOrder(): Observable<Action>{

  // }
}
