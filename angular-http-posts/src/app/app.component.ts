import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  items: Object;


    constructor(private http: HttpClient) { }

    ngOnInit() {

      //// GET
      // this.http.get<any>('http://localhost:60556/api/Values').subscribe((d: any) => {
      //   this.items = d;
      //   console.log(this.items);

      //// POST
      //   this.http.post<any>('http://localhost:60556/api/Values', { id : 1}).subscribe((d: any) => {
      //     this.items = d;
      //     console.log(this.items);
      // });

        //// PUT
      //   this.http.put<any>('http://localhost:60556/api/Values/1', {}).subscribe((d: any) => {
      //     this.items = d;
      //     console.log(this.items);
      // });

      //// DELETE
      this.http.delete<any>('http://localhost:60556/api/Values/1', {}).subscribe((d: any) => {
        this.items = d;
        console.log(this.items);
      });

    }
}
