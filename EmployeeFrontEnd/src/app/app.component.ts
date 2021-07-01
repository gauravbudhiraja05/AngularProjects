import { Component } from '@angular/core';
import {ServiceService} from './service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmployeeFrontEnd';

  constructor(private httpService: ServiceService) { }

  data: any;
  EmpForm: FormGroup;
  submitted = false;
  EventValue: any = 'Save';

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.getdata();

    this.EmpForm = new FormGroup({
      empId: new FormControl(null),
      empName: new FormControl('', [Validators.required]),
      empContact: new FormControl('', [Validators.required]),
      empEmail: new FormControl('', [Validators.required]),
      empAddress: new FormControl('', [Validators.required]),
    });
  }

  getdata() {
    this.httpService.getData().subscribe((data: any[]) => {
      this.data = data;
    });
  }

  deleteData(id) {
    this.httpService.deleteData(id).subscribe((data: any[]) => {
      this.data = data;
      this.getdata();
    });
  }

  Save() {
    this.submitted = true;
    if (this.EmpForm.invalid) {
            return;
     }
    this.httpService.postData(this.EmpForm.value).subscribe((data: any[]) => {
      this.data = data;
      this.resetForm();
    });
  }

  Update() {
    this.submitted = true;
    if (this.EmpForm.invalid) {
     return;
    }
    this.httpService.putData(this.EmpForm.value.empId, this.EmpForm.value).subscribe((data: any[]) => {
      this.data = data;
      this.resetForm();
    });
  }

  EditData(Data) {
    // tslint:disable-next-line: no-string-literal
    this.EmpForm.controls['empId'].setValue(Data.empId);
    // tslint:disable-next-line: no-string-literal
    this.EmpForm.controls['empName'].setValue(Data.empName);
    // tslint:disable-next-line: no-string-literal
    this.EmpForm.controls['empContact'].setValue(Data.empContact);
    // tslint:disable-next-line: no-string-literal
    this.EmpForm.controls['empEmail'].setValue(Data.empEmail);
    // tslint:disable-next-line: no-string-literal
    this.EmpForm.controls['empAddress'].setValue(Data.empAddress);
    this.EventValue = 'Update';
  }

  resetForm()
  {
    this.getdata();
    this.EmpForm.reset();
    this.EventValue = 'Save';
    this.submitted = false;
  }
}
