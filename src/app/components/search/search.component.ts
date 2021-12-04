import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';

import {
  debounceTime,
  distinctUntilChanged,
  tap,
  filter,
} from 'rxjs/operators';
import { PreconData, ReasonsList, User } from '../../commons/classes';
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
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  search: any;
  lightblue = '#FFF6EF';
  isShown = false;
  cities = 'cities';
  image = 'images';
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  showFilter = false;
  showCities = false;
  showImages = false;
  selectedCityIndex: number = -1;
  selectedProjectImages: string[] = [];
  selectedProject: any;

  toppings = new FormControl('#FFF6EF');
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  cityList: string[] = [];
  regionsList: string[] = [];
  typeList: string[] = [];
  bedsList: string[] = [];
  bathsList: string[] = [];

  regions: any = [];
  type: any = [];
  beds: any = [];
  baths: any = [];

  itemFiltered =
    'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg';
  preconData: PreconData[] = [];
  filteredPreconData: PreconData[] = [];

  @ViewChild('input') input?: ElementRef;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.preconData = this.apiService.getLocalStorage('preconData');

    this.filteredPreconData = this.preconData;

    this.regionsList = [...new Set(this.preconData.map((item) => item.Region))];
    this.typeList = [...new Set(this.preconData.map((item) => item.Type))];
    this.bathsList = [
      ...new Set(
        this.preconData
          .map((item) => item.Baths)
          .join('|')
          .split('|')
      ),
    ];
    this.bedsList = [
      ...new Set(
        this.preconData
          .map((item) => item.Beds)
          .join('|')
          .split('|')
      ),
    ];
    this.cityList = [
      ...new Set(this.preconData.map((item) => item.City).slice(0, 8)),
    ];
  }

  ngAfterViewInit() {
    fromEvent(this.input?.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        tap((text) => {
          this.filteredPreconData = this.input?.nativeElement.value
            ? this.preconData
                .filter(
                  (item) =>
                    item.City.toLowerCase().indexOf(
                      this.input?.nativeElement.value.toLowerCase()
                    ) > -1
                )
                .slice(0, 8)
            : this.preconData;
          this.selectedCityIndex = -1;

          this.cityList = [
            ...new Set(
              this.filteredPreconData.map((item) => item.City).slice(0, 8)
            ),
          ];
        })
      )
      .subscribe();
  }

  modelChanged() {}

  // onFocusEvent(event: any){
  //   this.isShown = ! this.isShown;
  // }

  toggleDiv() {
    this.isShown = !this.isShown;
  }

  // onFocusOutEvent(event: any){
  //   this.isShown = ! this.isShown;
  // }

  onFilterClick() {
    this.showFilter = !this.showFilter;
  }

  onFocus() {
    this.showCities = true;
  }

  onBlur() {
    setTimeout(() => {
      if (this.input?.nativeElement.value.length == 0) {
        this.showCities = false;
      }
    }, 200);
  }

  onCitySelected(city: string, selectedCityIndex: number) {
    this.search = city;

    this.filteredPreconData = this.preconData
      .filter(
        (item) => item.City.toLowerCase().indexOf(city.toLowerCase()) > -1
      )
      .slice(0, 8);

    this.cityList = [
      ...new Set(this.filteredPreconData.map((item) => item.City).slice(0, 8)),
    ];

    this.showCities = true;
    this.selectedCityIndex = selectedCityIndex;
    this.findProperty();
  }

  onSelectedProjectImageClick(selectedImageIndex: number) {
    this.apiService.setSelectedProject(
      this.filteredPreconData[selectedImageIndex]
    );
    this.router.navigate(['/projects/details']);
  }

  findProperty() {
    let filteredPreconData = this.preconData;

    if (this.regions.length > 0) {
      filteredPreconData = filteredPreconData.filter(
        (item) => this.regions.indexOf(item.Region) > -1
      );
    }

    if (this.type.length > 0) {
      filteredPreconData = filteredPreconData.filter(
        (item) => this.type.indexOf(item.Type) > -1
      );
    }

    if (this.beds.length > 0) {
      filteredPreconData = filteredPreconData.filter((item) => {
        const beds = item.Beds.split('|');
        return beds.some((bed) => this.beds.indexOf(bed) > -1);
      });
    }

    if (this.baths.length > 0) {
      filteredPreconData = filteredPreconData.filter((item) => {
        const baths = item.Baths.split('|');
        return baths.some((bath) => this.beds.indexOf(bath) > -1);
      });
    }

    if (this.selectedCityIndex > -1) {
      filteredPreconData = filteredPreconData.filter(
        (obj) =>
          obj.City.toLowerCase() ===
          this.cityList[this.selectedCityIndex].toLowerCase()
      );
    }

    this.selectedProjectImages = [];

    this.filteredPreconData = filteredPreconData;

    this.selectedProjectImages = filteredPreconData.map(
      (item) => `/assets/images/${item.Project_Name}/1.png`
    );

    this.showImages = true;
  }
}
