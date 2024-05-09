import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndPointModel } from '../models/endPoint-model';

@Injectable({ providedIn: 'root' })
export class APIService {
  constructor(private http: HttpClient) {}


  apiCall(endPointInfo: EndPointModel, args?: any){
    switch (endPointInfo.method) {
        case 'GET':
            return this.get(`${endPointInfo.url}${endPointInfo.api}`);
        case 'POST':
            return this.post(`${endPointInfo.url}${endPointInfo.api}`, args);
        case 'PATCH':
            return this.patch(`${endPointInfo.url}${endPointInfo.api}`);
        case 'DELETE':
            return this.delete(`${endPointInfo.url}${endPointInfo.api}`);
        default:
            return this.get(`${endPointInfo.url}${endPointInfo.api}`);
    }
  }

 private get(url: string, options?: any) {
    return this.http.get<any>(url, options);
  }

 private post(url: string, args?: any, options?: any) {
    return this.http.post<any>(url, args, options);
  }
 private patch(url: string, args?: any, options?: any) {
    return this.http.patch<any>(url, args, options);
  }

  private delete(url: string, options?: any) {
    return this.http.delete<any>(url, options);
  }
}
