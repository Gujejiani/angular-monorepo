import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class APIService {
  constructor(private http: HttpClient) {}

  get(url: string, options?: any) {
    return this.http.get<any>(url, options);
  }

  post(url: string, args?: any, options?: any) {
    return this.http.post<any>(url, args, options);
  }
  patch(url: string, args?: any, options?: any) {
    return this.http.patch<any>(url, args, options);
  }

  delete(url: string, options?: any) {
    return this.http.delete<any>(url, options);
  }
}
