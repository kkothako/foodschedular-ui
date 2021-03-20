import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConstantService } from './constant.service';

@Injectable()
export class FoodSchedularService {

  constructor(private httpClient: HttpClient,
    private constantService: ConstantService) { }
  getAllCuisines(): Observable<any> {
    const url = `${environment.baseUrl}/restaurantCuisine`;
    return this.httpClient.post<any>(url, this.constantService.httpOptions)
      .pipe(catchError(error => of(error)));
  }
  getAllProtiens(): Observable<any> {
    const url = `${environment.baseUrl}/restaurantProtien`;
    return this.httpClient.post<any>(url, this.constantService.httpOptions)
      .pipe(catchError(error => of(error)));
  }
}
