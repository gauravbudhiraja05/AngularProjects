import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  items: Object;

  // tslint:disable-next-line: ban-types
  Id: String;
  // tslint:disable-next-line: ban-types
  Name: String;
  // tslint:disable-next-line: ban-types
  Brand: String;
  // tslint:disable-next-line: ban-types
  CreatedDate: String;

  // tslint:disable-next-line: ban-types
  AddMessage: String;
  // tslint:disable-next-line: ban-types
  UpdateMessage: String;
  // tslint:disable-next-line: ban-types
  DeleteMessage: String;

  constructor(private httpService: HttpService) { }

  GetProducts() {
    this.httpService.GetAllProducts().subscribe((d: any) => {
      this.items = d;
      console.log(this.items);
    });
  }

  GetProductById() {
    this.httpService.GetProductById().subscribe((d: any) => {
      this.Id = d.id;
      console.log(this.Id);
      this.Name = d.name;
      console.log(this.Name);
      this.Brand = d.brand;
      console.log(this.Brand);
      this.CreatedDate = d.createdDate;
      console.log(this.CreatedDate);
    });
  }

  AddProduct() {
    this.httpService.AddProduct().subscribe((d: any) => {
      this.AddMessage = d;
      console.log(this.AddMessage);
    });
  }

  UpdateProduct() {
    this.httpService.UpdateProduct().subscribe((d: any) => {
      this.UpdateMessage = d;
      console.log(this.UpdateMessage);
    });
  }

  DeleteProduct() {
    this.httpService.DeleteProduct().subscribe((d: any) => {
      this.DeleteMessage = d;
      console.log(this.DeleteMessage);
    });
  }

  ngOnInit(): void  {


        //// PUT
      //   this.http.put<any>('http://localhost:60556/api/Values/1', {}).subscribe((d: any) => {
      //     this.items = d;
      //     console.log(this.items);
      // });

      //// DELETE
      // this.http.delete<any>('http://localhost:60556/api/Values/1', {}).subscribe((d: any) => {
      //   this.items = d;
      //   console.log(this.items);
      // });
  }
}
