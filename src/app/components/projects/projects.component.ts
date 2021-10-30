import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'precon-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  amnitiesList: any = [];

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
  }

  
}
