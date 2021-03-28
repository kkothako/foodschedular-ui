import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'text' as 'json'
  }
  getFormatedDate(date: any): string {
    return + date.getFullYear() + '-' + ("00" + (date.getMonth() + 1)).slice(-2)
      + "-" + ("00" + date.getDate()).slice(-2) + " "
      + ("00" + date.getHours()).slice(-2) + ":"
      + ("00" + date.getMinutes()).slice(-2)
      + ":" + ("00" + date.getSeconds()).slice(-2)
  }
  getFormatedDateWithNoMinutes(date: any): string {
    return + date.getFullYear() + '-' + ("00" + (date.getMonth() + 1)).slice(-2)
      + "-" + ("00" + date.getDate()).slice(-2) + " "
      + ("00" + date.getHours()).slice(-2) + ":"
      + ("00")
      + ":" + ("00")
  }
}
