import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'precon-flex',
  templateUrl: './flex.component.html',
  styleUrls: ['./flex.component.scss'],
})
export class FlexComponent implements OnInit {
  @Input()
  customTitle = '';

  showCities = false;
  lightblue= 'lightblue';

  showImages = false;

  showImagesFiltered = false;

  response: string[] = [];

  filteredImages: string[] = [];

  imagesList: string[] = [];
  cityList: string[] = [];

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
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
          this.cityList = successResponse.cities;
        },
        (erroResponse) => {}
      );

    setTimeout(() => {
      if (this.customTitle === 'cities') {
        this.response = this.cityList;
        this.showCities = true;
      } else {
        this.response = this.imagesList;
        this.showImages = true;
      }
    }, 2000);
  }

  public onCardClick(evt: MouseEvent) {
    this.filteredImages = this.imagesList;
    this.showImagesFiltered = true;
  }
}
