import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DistanceModel } from '../models/distance.model';

@Injectable()
export class DistanceSearchService {

  constructor(private httpClient: HttpClient) {

  }

  getLangandLatitudes(fromZipCode: string, toZipCode: string): Observable<any> {
    const url = `${environment.latitudeAndLangitudeUrl}/?zip1=${fromZipCode}&zip2=${toZipCode}&rn=1477`;
    return this.httpClient.get<any>(url);
  }
  getDistanceBy(distanceModel: DistanceModel): number {

    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = +distanceModel.lat1 * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = +distanceModel.lat2 * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (+distanceModel.lng1 - +distanceModel.lng2) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
  }

}
