import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  UserName: String;
  // tslint:disable-next-line: ban-types
  Password: String;
  // tslint:disable-next-line: ban-types
  message: String;

  constructor(private httpService: HttpService) { }

  CheckLogin() {
    console.log('UserName :' + this.UserName);
    console.log('Password :' + this.Password);
    this.httpService.CheckLogin(this.UserName, this.Password).subscribe((d: any) => {
      this.message = d;
      // tslint:disable-next-line: triple-equals
      if (this.message == 'User Logined Successfully')
      {
          window.location.href = '/user';
      }
      console.log(this.message);
    });
  }

  ngOnInit(): void {
  }

}
