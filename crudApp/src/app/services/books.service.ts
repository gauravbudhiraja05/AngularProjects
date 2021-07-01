import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpService: HttpClient) { }

  public post_request(frmData) {

    const myBooksList = this.httpService.post('http://localhost:52279/api/books/', frmData)
    .pipe();

    return myBooksList;
  }
}
