import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'precon-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isShown: boolean = false;
  cities: string = "cities";
  images: string = "images";

  constructor() {
  }

  ngOnInit(): void {
  }

  // onFocusEvent(event: any){
  //   this.isShown = ! this.isShown;
  // }

  toggleDiv(){
    this.isShown = ! this.isShown;
  }

  // onFocusOutEvent(event: any){
  //   this.isShown = ! this.isShown;
  // }

}
