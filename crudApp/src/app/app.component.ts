import { Component } from '@angular/core';

import { BooksService } from './services/books.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [BooksService]
})
export class AppComponent {
  title = 'CRUD Application in Angular';

  constructor(private service: BooksService) { }

  arrBooks = [] as any;
  arrColumns = [];             // For table column names.
  arrCategories = [] as any;    // Data for the SELECT dropdown list.

  // Creat an instance of HttpParams() class, to add URL parameters (or Query String).
  public myFrmData = new HttpParams();

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.read();
    this.arrCategories = ['Business', 'Computers', 'Programming', 'Science'];
  }

  // CRUD FUNCTONS (STARTS HERE).

  // ***** Read data from the database.
  read() {

    // Assign parameters to the HttpParams() class.
    this.myFrmData = this.myFrmData
      .set('BookID', '')
      .set('BookName', '')
      .set('Category', '')
      .set('Price', '')
      .set('Operation', 'READ');

    // Call our service to POST our request for the data.
    this.service.post_request(this.myFrmData).subscribe(
      data => {
        this.arrBooks = data as any[];

        if (this.arrBooks.length > 0) {
          // Extract columns (or table headers).
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.arrBooks.length; i++) {
            for (const key in this.arrBooks[i]) {
                if (this.arrColumns.indexOf(key) === -1) {
                    this.arrColumns.push(key);      // Fill the array with the column names.
                }
            }
          }
        }
        else {
          // In case the table is empty, get the columns from HttpParams().
          this.arrColumns = this.myFrmData.keys();
        }
      }
    );
  }

  // ***** Update or edit data.
  update(e) {
    const activeRow = e.target.parentNode.parentNode.rowIndex;   // Get the active table row.
    const tab = e.target.parentNode.parentNode.parentNode.parentNode.rows[activeRow]; // THIS IS OUR TABLE.

    for (let i = 1; i < 4; i++) {
      // tslint:disable-next-line: triple-equals
      if (i == 2) {

          const td = tab.getElementsByTagName('td')[i];
          const ele = document.createElement('select');      // ADD A SELECT DROPDOWN LIST TO THE ROW.

          ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
          // tslint:disable-next-line: prefer-for-of
          for (let k = 0; k < this.arrCategories.length; k++) {
              ele.innerHTML = ele.innerHTML +
                  '<option value="' + this.arrCategories[k] + '">' + this.arrCategories[k] + '</option>';
          }
          td.innerText = '';
          ele.setAttribute('style', 'font: 17px Calibri; text-align: center;border: 1px solid #ccc;border-radius: 4px;' );
          td.appendChild(ele);
      }
      else {
          const td = tab.getElementsByTagName('td')[i];
          const ele = document.createElement('input');      // ADD A TEXTBOX TO THE ROW.

          ele.setAttribute('type', 'text');
          ele.setAttribute('value', td.innerText);
          ele.setAttribute('style', 'font: 17px Calibri; text-align: center;border: 1px solid #ccc;border-radius: 4px;' );
          td.innerText = '';
          td.appendChild(ele);
      }

      // tslint:disable-next-line: variable-name
      const iBook_id = tab.getElementsByTagName('td')[0].innerHTML;

      // Show a Cancel or "✖" button.
      const lblCancel = document.getElementById('lbl' + (iBook_id));
      lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position:absolute;');

      // Show the Save button.
      const btSave = document.getElementById('save' + (iBook_id));
      btSave.setAttribute('style', 'display:block; margin-left:30px; float:left;');

      // Hide the Update button.
      e.target.setAttribute('style', 'display:none;');
    }
  }

  // ***** Cancel the action.
  cancelAction(e) {
    e.target.setAttribute('style', 'display:none; float:none;');    // Hide the Cancel (✖) button.

    const activeRow = e.target.parentNode.parentNode.rowIndex;
    const tab = e.target.parentNode.parentNode.parentNode.parentNode.rows[activeRow];
    // tslint:disable-next-line: variable-name
    const iBook_id = tab.getElementsByTagName('td')[0].innerHTML;

    // Hide the Save button.
    const btSave = document.getElementById('save' + (iBook_id));
    btSave.setAttribute('style', 'display:none;');

    // Show the Update button again.
    const btUpdate = document.getElementById('update' + (iBook_id));
    btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color: #5DB75F; color: #FFF;');

    for (let i = 0; i < this.arrColumns.length - 1; i++) {
        const td = tab.getElementsByTagName('td')[i];
        td.innerHTML = this.arrBooks[(activeRow - 1)][this.arrColumns[i]];   // Write the values in the active row cells.
    }
  }

  // Save the Data (in Update mode).
  save(e) {
    this.myFrmData = this.myFrmData.delete('');     // Delete all previous "HttpParams" parameters.

    const activeRow = e.target.parentNode.parentNode.rowIndex;
    const tab = e.target.parentNode.parentNode.parentNode.parentNode.rows[activeRow];

    for (let i = 1; i < this.arrColumns.length; i++) {
        const td = tab.getElementsByTagName('td')[i];

        // Check if its a textbox or a SELECT element.
        // tslint:disable-next-line: triple-equals
        if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
            this.myFrmData = this.myFrmData.set(this.arrColumns[i], td.childNodes[0].value);
        }
        else {
          // Get the ID of the Book.
          this.myFrmData = this.myFrmData.set('BookID', tab.getElementsByTagName('td')[0].innerHTML);
        }
    }

    this.myFrmData = this.myFrmData.set('Operation', 'UPDATE');     // Set Operation type.
    this.perform_CRUD();
  }

  // Create new data.
  createNew(e) {
    const activeRow = e.target.parentNode.parentNode.rowIndex;
    const tab = e.target.parentNode.parentNode.parentNode.parentNode.rows[activeRow];

    let bOk = false;

    for (let i = 1; i < this.arrColumns.length; i++) {
      const td = tab.getElementsByTagName('td')[i];

      // Check if its a textbox or a SELECT element.
      // tslint:disable-next-line: triple-equals
      if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
        const val = td.childNodes[0].value;
        // tslint:disable-next-line: triple-equals
        if (val != '') {
          this.myFrmData = this.myFrmData.set(this.arrColumns[i], td.childNodes[0].value);
          bOk = true;

          // Clear all input and dropdown values.
          // tslint:disable-next-line: triple-equals
          td.childNodes[0].tagName == 'SELECT' ? td.childNodes[0].value = '-- select --' : td.childNodes[0].value = '';
        }
        else {
          alert('All fields are compulsory!');
          bOk = false;
          break;
        }
      }
    }

    if (bOk) {
      this.myFrmData = this.myFrmData.set('Operation', 'SAVE');     // Set Operation type.
      this.perform_CRUD();
    }
  }

  // Delete the selected row data.
  delete(e) {
    const activeRow = e.target.parentNode.parentNode.rowIndex;
    const tab = e.target.parentNode.parentNode.parentNode.parentNode.rows[activeRow];

    // ALL WE NEED IT THE ID.
    this.myFrmData = this.myFrmData.set('BookID', tab.getElementsByTagName('td')[0].innerHTML);
    this.myFrmData = this.myFrmData.set('Operation', 'DELETE');     // Set Operation type.

    // Confirm before deleting.
    if (confirm('Are you sure? ')) {
      this.perform_CRUD();
    }
  }

  // CRUD FUNCTONS (ENDS HERE).


  // Finally, post your request.
  perform_CRUD(){
    // Call "books" service and save all the data.
    this.service.post_request(this.myFrmData).subscribe(
      data => {
        this.arrBooks = data as any[];        // Fill the array with new values.
      }
    );
  }
}
