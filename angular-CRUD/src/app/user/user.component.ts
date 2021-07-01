import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  items: Object;
  constructor(private httpService: HttpService) { }

  LoadProductList() {
    this.httpService.LoadProductList().subscribe((d: any) => {
      this.items = d;
      console.log(this.items);
    });
  }

  // tslint:disable-next-line: no-unused-expression
  ngOnInit(): void {
    this.LoadProductList();
  }

}
