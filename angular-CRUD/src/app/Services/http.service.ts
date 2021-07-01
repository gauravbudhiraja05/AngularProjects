import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private httpClient: HttpClient) { }

  CheckLogin(userName, pwd) {

    return this.httpClient.post<any>('http://localhost:60556/rest/account/login',
    { UserName: userName, Passowrd: pwd} );
  }

  LoadProductList() {

    return this.httpClient.get<any>('http://localhost:60556/rest/products/Products');
  }


}
