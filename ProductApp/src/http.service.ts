import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  GetAllProducts() {
    return this.httpClient.get('http://localhost:60556/rest/products/Products');
  }

  GetProductById() {
    return this.httpClient.get('http://localhost:60556/rest/products/Product?id=1');
  }

  AddProduct() {
    return this.httpClient.post<any>('http://localhost:60556/rest/products/Product', 
    { name: 'Lg k 10', brand: 'Lg', createdDate: '2020-06-09 14:23:51.207'});
  }

  UpdateProduct() {
    return this.httpClient.put<any>('http://localhost:60556/rest/products/Product?id=11',
    { id: 11, name: 'LG k 10 PRO', brand: 'LG', createdDate: '2020-06-09 14:23:51.207'});
  }

  DeleteProduct() {
    return this.httpClient.delete<any>('http://localhost:60556/rest/products/Product?id=4');
  }
}
