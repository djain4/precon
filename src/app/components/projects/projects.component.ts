import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PreconData, ReasonsList, User} from '../../commons/classes'

@Component({
  selector: 'precon-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  amnitiesList: any = [];
  listOfProjects: PreconData[] =  [];
  showProjectDetails: boolean = false;
  selectedProject: any;
  selectedProjectStation: any;


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService
      .getData({ url: 'http://localhost:4200/json/data.json' })
      .subscribe(
        (successResponse: any) => {
          this.amnitiesList = successResponse.amnitiesList;
        },
        (erroResponse) => {}
      );

      let listOfProjects: PreconData[] = this.apiService.getLocalStorage('preconData');

      let filterParams: PreconData = this.apiService.getFilterParams();

      if(filterParams) {
        listOfProjects.forEach(obj => { 
          if(this.partialContains(obj, filterParams)) {
            this.listOfProjects.push(obj);
          }
        });
      } else {
        this.listOfProjects = listOfProjects;
      }
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
    this.showProjectDetails = true;
    this.selectedProjectStation = [
      {
        id: project.UID,
        name: project.Project_Name,
        lat: project.Latitude,
        lng: project.Longitude,
        installed: 1,
        active: 1,
        province: project.Province,
        type: project.Style
      }
    ]
    this.selectedProject = project;
  }

  
}
