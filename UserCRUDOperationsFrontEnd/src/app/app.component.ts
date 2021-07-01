import { Component } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserCRUDOperationsFrontEnd';

  constructor(private httpService: HttpServiceService) { }

  userData: any;
  UserForm: FormGroup;
  submitted = false;
  EventValue: any = 'SaveUser';

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {

    this.GetUsers();

    this.UserForm = new FormGroup({
      userId: new FormControl(null),
      userName: new FormControl('', [Validators.required]),
      userAge: new FormControl('', [Validators.required]),
      userContact: new FormControl('', [Validators.required]),
      userEmail: new FormControl('', [Validators.required]),
      userAddress: new FormControl('', [Validators.required]),
    });
  }

  GetUsers() {
    this.httpService.GetUsers().subscribe((data: any[]) => {
      this.userData = data;
    });
  }

  DeleteUser(id) {
    this.httpService.DeleteUser(id).subscribe((data: any[]) => {
      this.userData = data;
      this.GetUsers();
    });
  }

  SaveUser() {
    this.submitted = true;
    if (this.UserForm.invalid) {
      return;
    }
    this.httpService.SaveUser(this.UserForm.value).subscribe((data: any[]) => {
      this.userData = data;
      this.ResetUserForm();
    });
  }

  UpdateUser() {
    this.submitted = true;
    if (this.UserForm.invalid) {
      return;
    }
    this.httpService.UpdateUser(this.UserForm.value.userId, this.UserForm.value).subscribe((data: any[]) => {
      this.userData = data;
      this.ResetUserForm();
    });
  }

  EditUser(userData) {
    // tslint:disable-next-line: no-string-literal
    this.UserForm.controls['userId'].setValue(userData.userId);
    // tslint:disable-next-line: no-string-literal
    this.UserForm.controls['userName'].setValue(userData.userName);
    // tslint:disable-next-line: no-string-literal
    this.UserForm.controls['userAge'].setValue(userData.userName);
    // tslint:disable-next-line: no-string-literal
    this.UserForm.controls['userContact'].setValue(userData.userContact);
    // tslint:disable-next-line: no-string-literal
    this.UserForm.controls['userEmail'].setValue(userData.userEmail);
    // tslint:disable-next-line: no-string-literal
    this.UserForm.controls['userAddress'].setValue(userData.userAddress);

    this.EventValue = 'UpdateUser';
  }

  ResetUserForm() {
    this.GetUsers();
    this.UserForm.reset();
    this.EventValue = 'SaveUser';
    this.submitted = false;
  }
}
