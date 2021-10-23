import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'precon-precon-browser',
  templateUrl: './precon-browser.component.html',
  styleUrls: ['./precon-browser.component.scss'],
})
export class PreconBrowserComponent implements OnInit {
  imagesList: string[] = [];
  reasonsList: ReasonsList[] = [];
  public userArray: User[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .getData({ url: 'http://localhost:4200/json/images.json' })
      .subscribe(
        (successResponse: any) => {
          this.imagesList = successResponse.imagesList;
        },
        (erroResponse) => {}
      );

    this.apiService
      .getData({ url: 'http://localhost:4200/json/data.json' })
      .subscribe(
        (successResponse: any) => {
          this.reasonsList = successResponse.reasonsList;
        },
        (erroResponse) => {}
      );

    this.apiService
      .getDataCSV({ url: 'http://localhost:4200/csv/data.csv' })
      .subscribe(
        (successResponse: any) => {
          console.log(successResponse)
          let csvToRowArray = successResponse.split('\n');
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(',');
            this.userArray.push(
              new User(parseInt(row[0], 10), row[1], row[2].trim())
            );
          }
          console.log(this.userArray);
        },
        (erroResponse) => {}
      );
  }
}

export class User {
  id: number;
  name: String;
  lastName: String;

  constructor(id: number, name: String, lastName: String) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
  }
}

export class ReasonsList {
  header: string;
  description: string;

  constructor(header: string, description: string) {
    this.header = header;
    this.description = description;
  }
}
