import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../shared/enviroment';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  constructor(private httpClient: HttpClient) {}

  get<T>(path: string): Observable<T> {
    return this.httpClient.get<T>(`${environment.apiUrl}${path}`);
  }
  post<T>(path: string, body: any): Observable<T> {
    return this.httpClient.post<T>(`${environment.apiUrl}${path}`, body);
  }
  put<T>(path: string, body: any, params: any): Observable<T> {
    return this.httpClient.put<T>(`${environment.apiUrl}${path}`, body, {
      params,
    });
  }
  delete<T>(path: string): Observable<T> {
    return this.httpClient.delete<T>(`${environment.apiUrl}${path}`, {});
  }
}
