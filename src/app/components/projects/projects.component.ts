import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { PreconData, ReasonsList, User } from '../../commons/classes';

@Component({
  selector: 'precon-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  amnitiesList: any = [];
  listOfProjects: PreconData[] = [];
  filteredListOfProjects: PreconData[] = [];
  showProjectDetails: boolean = false;
  selectedProject: any;
  selectedProjectStation: any;
  sortByValue: any;
  sortByValueCounter: number = 0;
  imgList: string[] = [];

  constructor(private apiService: ApiService, private _router: Router) {}

  ngOnInit(): void {
    this.apiService
      .getData({ url: 'http://localhost:4200/json/data.json' })
      .subscribe(
        (successResponse: any) => {
          this.amnitiesList = successResponse.amnitiesList;
        },
        (erroResponse) => {}
      );

    let listOfProjects: PreconData[] =
      this.apiService.getLocalStorage('preconData');

    let filterParams: PreconData = this.apiService.getFilterParams();

    if (filterParams) {
      listOfProjects.forEach((obj) => {
        if (this.partialContains(obj, filterParams)) {
          this.listOfProjects.push(obj);
        }
      });
    } else {
      this.listOfProjects = listOfProjects;
    }
    this.filteredListOfProjects = [...this.listOfProjects];

    this.imgList = this.filteredListOfProjects.map(item => `/assets/images/${item.Project_Name}/1.png`);
  }

  partialContains(object: any, subObject: any) {
    // Create arrays of property names
    const objProps = Object.getOwnPropertyNames(object);
    const subProps = Object.getOwnPropertyNames(subObject);

    if (subProps.length > objProps.length) {
      return false;
    }

    for (const subProp of subProps) {
      if (!object.hasOwnProperty(subProp)) {
        return false;
      }

      if (object[subProp] !== subObject[subProp]) {
        return false;
      }
    }

    return true;
  }

  onShowProjectDetails(project: PreconData) {
    this._router.navigate(['/projects/details']);

    this.showProjectDetails = true;
    // this.selectedProjectStation = [
    //   {
    //     name: project.Project_Name,
    //     description: project.Project_Description,
    //     lat: project.Latitude,
    //     lng: project.Longitude,
    //     installed: 1,
    //     active: 1,
    //     region: project.Region,
    //     type: project.Style,
    //   },
    // ];
    this.selectedProject = project;

    // this.apiService.setSelectedProjectStation(this.selectedProjectStation);
    this.apiService.setSelectedProject(this.selectedProject);
  }

  onSortBy(value: number) {
    switch (value) {
      case 0:
        this.updateSortedObject('City', 0)
        break;
      case 1:
        this.updateSortedObject('Starting_Price', 1)
        break;
      case 2:
        this.updateSortedObject('Style', 2)
        break;
      case 3:
        this.updateSortedObject('City', 3)
        break;
      default:
        break;
    }
  }

  updateSortedObject(obj: any, sortByValue: number) {

    if(this.sortByValue == sortByValue) {
      if (this.sortByValueCounter == 0) {
        this.sortByValueCounter++;
        this.filteredListOfProjects = this.filteredListOfProjects.sort(
          (a: any, b: any) => (a[obj] > b[obj]) ? 1 : -1
        );
        this.sortByValue = sortByValue;
      } else if (this.sortByValueCounter == 1) {
        this.sortByValueCounter++;
        this.filteredListOfProjects = this.filteredListOfProjects.sort(
          (a: any, b: any) => (b[obj] > a[obj]) ? 1 : -1
        );
        this.sortByValue = sortByValue;
      } else if (this.sortByValueCounter == 2) {
        this.sortByValueCounter = 0;
        this.filteredListOfProjects = [...this.listOfProjects];
        this.sortByValue = null;
      }
    } else {
      this.sortByValue = sortByValue;
      this.sortByValueCounter = 1;
      this.filteredListOfProjects = this.filteredListOfProjects.sort(
        (a: any, b: any) => (a[obj] > b[obj]) ? 1 : -1
      );
    }
  }
}
