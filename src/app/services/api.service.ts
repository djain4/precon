import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getData<T>(reqParams: any): Observable<T> {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json, text/plain, */*',
    };

    const httpHeaders = new HttpHeaders(headers);

    return this.httpClient
      .get<T>(reqParams.url, {
        headers: httpHeaders,
      })
      .pipe(finalize(() => {}));
  }
}
