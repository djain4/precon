import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

interface ReasonsList {
  header: string;
  description: string;
}

@Component({
  selector: 'precon-precon-browser',
  templateUrl: './precon-browser.component.html',
  styleUrls: ['./precon-browser.component.scss'],
})
export class PreconBrowserComponent implements OnInit {
  imagesList: string[] = [];
  reasonsList: ReasonsList[] = [];

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
  }
}
