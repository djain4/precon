import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { PreconData, ReasonsList, User } from '../../../commons/classes';

@Component({
  selector: 'precon-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  amnitiesList: any = [];
  listOfProjects: PreconData[] = [];
  showProjectDetails: boolean = false;
  selectedProject: any;
  selectedProjectStation: any;
  images: any = [];
  mainImage: string = '';

  constructor(private apiService: ApiService,
    private _router: Router) {}

  ngOnInit(): void {

    this.selectedProject = this.apiService.getSelectedProject();

    if(this.selectedProject == null) {
      this._router.navigate(['/projects']);
      return;
    }

    this.showProjectDetails = true;

    for(let i = 1; i <= this.selectedProject.Number_of_Images; i++) {
      this.images.push(`/assets/images/${this.selectedProject.Project_Name}/${i}.png`);
    }
    this.mainImage = `/assets/images/${this.selectedProject.Project_Name}/main.png`;

    // this.apiService
    //   .getData({ url: 'http://localhost:4200/json/data.json' })
    //   .subscribe(
    //     (successResponse: any) => {
    //       this.amnitiesList = successResponse.amnitiesList;
    //     },
    //     (erroResponse) => {}
    //   );

    console.log(this.selectedProject.Amenities.split("|"));
    this.amnitiesList = this.selectedProject.Amenities.split("|");

    // this.selectedProjectStation = this.apiService.getSelectedProjectStation();

    if(!this.selectedProjectStation) {
      this.selectedProjectStation = [
        {
          name: this.selectedProject.Project_Name,
          description: this.selectedProject.Project_Description,
          lat: this.selectedProject.Latitude,
          lng: this.selectedProject.Longitude,
          installed: 1,
          active: 1,
          province: this.selectedProject.Region,
          type: this.selectedProject.Style,
        },
      ];
    }

    // this.apiService.setSelectedProjectStation(this.selectedProjectStation);

  }

  onContactUs() {
    window.scrollTo(0,document.body.scrollHeight);
  }

}
