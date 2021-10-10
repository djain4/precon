import { Component, Input, NgModule, OnInit } from '@angular/core';
@Component({
  selector: 'precon-flex',
  templateUrl: './flex.component.html',
  styleUrls: ['./flex.component.scss']
})
export class FlexComponent implements OnInit {

  @Input()
  customTitle: string = "";

  showCities: boolean = false;

  showImages: boolean = false;

  showImagesFiltered: boolean = false;

  response: String[] = [];

  filteredImages: String[] = [];

  imagesList: String[] = ["https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg",
    "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/LTLE4QGRVQ.jpg",
    "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/R926LU1YEA.jpg",
    "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/U9PP3KXXY2.jpg",
    "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg",
    "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/LTLE4QGRVQ.jpg",
    "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/R926LU1YEA.jpg",
    "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/U9PP3KXXY2.jpg",
  ];
  cityList: String[] = ["Toronto", "Mississauga", "Brampton", "Oakville", "Milton", "Hamilton"]

  constructor() {
  }

  ngOnInit(): void {
    if (this.customTitle == "cities") {
      this.response = this.cityList
      this.showCities = true
    } else {
      this.response = this.imagesList
      this.showImages = true
    }
  }

  public onCardClick(evt: MouseEvent){
    this.filteredImages = this.imagesList
    this.showImagesFiltered = true
  }

}
