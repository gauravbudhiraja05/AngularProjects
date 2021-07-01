import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
  };

  GetUsers() {
    return this.httpClient.get('https://localhost:44300/api/User');
  }

  SaveUser(formData) {
    return this.httpClient.post('https://localhost:44300/api/User', formData);
  }

  UpdateUser(id, formData) {
    return this.httpClient.put('https://localhost:44300/api/User/' + id, formData);
  }

  DeleteUser(id) {
    return this.httpClient.delete('https://localhost:44300/api/User/' + id);
  }
}
