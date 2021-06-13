import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DistanceModel } from '../models/distance.model';

@Injectable()
export class DistanceSearchService {

  constructor(private httpClient: HttpClient) {

  }

  getLangandLatitudes(fromZipCode: string, toZipCode: string): Observable<any> {
    const url = `${environment.baseUrl}/orderDraft/getLangAndLatBy`;
    return this.httpClient.post<any>(url,{customerZipCode: fromZipCode, restorentZipCode: toZipCode})
    .pipe(
      tap((data)=> console.log(data))
    );
  }


}
