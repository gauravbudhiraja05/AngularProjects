import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getBeer() {
    // return this.httpClient.get('http://dummy.restapiexample.com/api/v1/employees');
    return this.httpClient.get('http://localhost:60556/api/Values');
  }
}
