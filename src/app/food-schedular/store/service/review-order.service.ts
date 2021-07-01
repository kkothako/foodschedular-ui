import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DistanceModel } from '../models/distance.model';

@Injectable()
export class ReviewOrderService {

  constructor(private httpClient: HttpClient) {

  }

  getLangandLatitudes(fromZipCode: string, toZipCode: string): Observable<any> {
    const url = `${environment.baseUrl}/orderDraft/getLangAndLatBy`;
    return this.httpClient.post<any>(url, { customerZipCode: fromZipCode, restorentZipCode: toZipCode })
      .pipe(
        tap((data) => console.log(data))
      );
  }

  getAllRestorentsByCuisineIds(cuisineIds: string[]): Observable<any> {
    const url = `${environment.baseUrl}/restaurant/getAllRestorentsByCuisineIds`;
    return this.httpClient.post<any>(url, { cuisineIds })
      .pipe(
        tap((data) => console.log('all restaurents', data))
      );
  }
  getAllRestaurentMenusAndTimings(restaurentId: string): Observable<any> {
    const url = `${environment.baseUrl}/restaurantTimings/getAllRestaurentMenusAndTimings`
    return this.httpClient.post(url, { restorentId: restaurentId })
      .pipe(
        tap((data) => console.log('menus', data))
      )
  }
  getAllZipCodesByCustomerZipCode(zipCode: string): Observable<any> {
    const url = `${environment.baseUrl}/restaurantTimings/getAllZipCodesByCustomerZipCode`
    return this.httpClient.post(url, { customerZipCode: zipCode })
      .pipe(
        tap((data) => console.log('5 miles zipcodes', data))
      )
  }
}

