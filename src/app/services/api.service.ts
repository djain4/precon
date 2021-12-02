import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { PreconData, ReasonsList, User} from '../commons/classes'

@Injectable()
export class ApiService {

  filterParams: any;
  selectedProject: any;
  selectedProjectStation: any;

  constructor(private httpClient: HttpClient) {}

  getData<T>(reqParams: any): Observable<T> {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json, text/plain, */*',
      responseType: 'text'
    };

    const httpHeaders = new HttpHeaders(headers);

    return this.httpClient
      .get<T>(reqParams.url, {
        headers: httpHeaders,
      })
      .pipe(finalize(() => {}));
  }

  getDataCSV<T>(reqParams: any): Observable<any> {

    return this.httpClient
      .get(reqParams.url, {
        responseType: 'text'
      })
      .pipe(finalize(() => {}));
  }

  setLocalStorage(key: string, data: any)  {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getLocalStorage(key: string) {
    let data: any = localStorage.getItem(key);
    return JSON.parse(data);
  }

  setFilterParams(filterParams: any) {
    this.filterParams = filterParams;
  }

  getFilterParams() {
    return this.filterParams;
  }

  setSelectedProject(project: any) {
    this.selectedProject = project;
  }

  getSelectedProject() {
    return this.selectedProject;
  }

  setSelectedProjectStation(station: any) {
    this.selectedProjectStation = station;
  }

  getSelectedProjectStation() {
    return this.selectedProjectStation;
  }
}
