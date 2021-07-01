import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  getData() {
  return this.http.get('https://localhost:44312/api/Employee');
  }

  postData(formData) {
  return this.http.post('https://localhost:44312/api/Employee', formData);
  }

  putData(id, formData) {
  return this.http.put('https://localhost:44312/api/Employee/' + id, formData);
  }

  deleteData(id) {
  return this.http.delete('https://localhost:44312/api/Employee/' + id);
  }

}
