import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  items: Object;

  constructor( private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getBeer().subscribe((d: any) => {
      this.items = d;
      console.log(this.items);
    });
  }

}
