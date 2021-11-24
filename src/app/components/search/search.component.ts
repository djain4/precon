import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, filter } from 'rxjs/operators';
import { PreconData, ReasonsList, User} from '../../commons/classes'
import { ApiService } from '../../services/api.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'precon-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search: any;
  lightblue = '#FFF6EF';
  isShown = false;
  cities = 'cities';
  image = 'images';
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  showFilter = true;
  toppings = new FormControl('#FFF6EF');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  regionsList: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  comingSoonList: string[] = ['Jan', 'Feb', 'March', 'April', 'May', 'June'];
  typeList: string[] = ['Greenery', 'CityVibes'];
  bedsList: string[] = ['1', '2', '3', '4', '5', '5+'];
  bathsList: string[] = ['1', '2', '3', '4', '5', '5+'];
  baths: any = [];
  beds: any = [];
  type: any = [];
  comingSoon: any = [];
  regions: any = [];

  itemFiltered = "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg";
  preconData: PreconData[] = [];
  filteredPreconData: PreconData[] = [];

  @ViewChild('input') input?: ElementRef;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.preconData = this.apiService.getLocalStorage('preconData');
  }

  ngAfterViewInit() {
    fromEvent(this.input?.nativeElement,'keyup')
            .pipe(
                filter(Boolean),
                debounceTime(150),
                distinctUntilChanged(),
                tap((text) => {
                  this.filteredPreconData = this.input?.nativeElement.value 
                  ? this.preconData.filter(item => item.City.indexOf(this.input?.nativeElement.value) > -1)
                  : [];
                })
            )
            .subscribe();
  }

  modelChanged() { }

  // onFocusEvent(event: any){
  //   this.isShown = ! this.isShown;
  // }

  toggleDiv(){
    this.isShown = ! this.isShown;
  }

  // onFocusOutEvent(event: any){
  //   this.isShown = ! this.isShown;
  // }

  onFilterClick() {
    this.showFilter = !this.showFilter;
  }

  findProperty() {
    console.log("Sdfdsfds")
    console.log("Sdfdsfds" + this.regions);
    console.log("Sdfdsfds" + this.comingSoon);
    console.log("Sdfdsfds" + this.beds);
    console.log("Sdfdsfds" + this.baths);
    console.log("Sdfdsfds" + this.type);

    this.preconData
      .filter(item => this.regions.indexOf(item.Province) > -1)
      .filter(item => item.Beds.split(',').filter(ef => this.regions.indexOf(ef) > -1))
      .filter(item => item.Baths.split(',').filter(ef => this.regions.indexOf(ef) > -1))
      .filter(item => this.regions.indexOf(item.Type) > -1)
      .filter(item => this.regions.indexOf(item.Coming_Soon) > -1)
      

  }
}
