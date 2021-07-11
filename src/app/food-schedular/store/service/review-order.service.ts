import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DistanceModel } from '../models/distance.model';
import { OrderMasterModel, OrderMasterRequestModel, OrderModel } from '../models/order.model';

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

  getAllRestorentsByZipCodes(zipCodes: string[]): Observable<any> {
    const url = `${environment.baseUrl}/restaurant/getAllRestorentsByZipCodes`;
    return this.httpClient.post<any>(url, { zipCodes })
      .pipe(
        tap((data) => console.log('all restaurents', data))
      );
  }
  getAllRestaurentMenusAndTimings(restorentIds: string[]): Observable<any> {
    const url = `${environment.baseUrl}/restaurantTimings/getAllRestaurentMenusAndTimings`
    return this.httpClient.post(url, { restorentIds })
      .pipe(
        tap((data) => console.log('menus', data))
      )
  }
  getAllZipCodesByCustomerZipCode(zipCode: string): Observable<any> {
    const url = `${environment.baseUrl}/restaurant/getAllZipCodesByCustomerZipCode`
    return this.httpClient.post(url, { customerZipCode: zipCode })
      .pipe(
        tap((data) => console.log('5 miles zipcodes', data))
      )
  }

  createOrderHistory(draftOrders: OrderModel[]): Observable<any> {
    const url = `${environment.baseUrl}/orderhistory`
    return this.httpClient.post(url, { orders: draftOrders })
      .pipe(
        tap((data) => console.table('draft orders', data))
      )
  }

  createOrderMaster(order: OrderMasterRequestModel): Observable<any> {
    debugger
    const url = `${environment.baseUrl}/orderMaster`
    return this.httpClient.post(url, {request: order })
      .pipe(
        tap(data => console.table(data))
      )
  }

}

