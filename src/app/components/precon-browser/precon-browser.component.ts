import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { canadajson } from '../../commons/constants';
import { ApiService } from '../../services/api.service';
import * as echarts from 'echarts';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { PreconData, ReasonsList, User } from '../../commons/classes';

@Component({
  selector: 'precon-precon-browser',
  templateUrl: './precon-browser.component.html',
  styleUrls: ['./precon-browser.component.scss'],
  animations: [
    trigger('slideChart1', [
      state(
        'false',
        style({
          transform: 'translateX(-10px)',
        })
      ),
      state(
        'true',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition('false <=> true', animate('400ms ease-in-out')),
    ]),
    trigger('slideChart2', [
      state(
        'false',
        style({
          transform: 'translateX(10px)',
        })
      ),
      state(
        'true',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition('false <=> true', animate('400ms ease-in-out')),
    ]),
  ],
})
export class PreconBrowserComponent implements OnInit {
  isChart1Animate: boolean = true;
  isChart2Animate: boolean = true;
  previousEvent: string = '';
  isShowChart1: boolean = true;
  isShowChart2: boolean = false;
  isShowChartImages: boolean = false;
  imagesList: string[] = [];
  featuredImageList: string[] = [];

  reasonsList: ReasonsList[] = [];
  userArray: User[] = [];
  preconData: PreconData[] = [];

  mapChartOption: any;
  chartOption: any = {
    tooltip: {},
    xAxis: {
      name: 'YEAR',
      type: 'category',
      data: ['2021', '2022', '2023', '2024', '2025'],
    },
    yAxis: {
      name: 'ROI',
      type: 'value',
      axisLabel: {
        formatter: '{value} %',
      },
    },
    series: [
      {
        data: [10, 15, 25, 30, 40],
        type: 'line',
        smooth: true,
      },
    ],
  };

  constructor(private apiService: ApiService, private router: Router) {}

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

    this.apiService
      .getDataCSV({ url: 'http://localhost:4200/csv/data.csv' })
      .subscribe(
        (successResponse: any) => {
          console.log(successResponse);
          let csvToRowArray = successResponse.split('\n');
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(',');
            this.userArray.push(
              new User(parseInt(row[0], 10), row[1], row[2].trim())
            );
          }
          console.log(this.userArray);
        },
        (erroResponse) => {}
      );

    this.apiService
      .getDataCSV({ url: 'http://localhost:4200/csv/precon.csv' })
      .subscribe(
        (successResponse: any) => {
          console.log(successResponse);
          let csvToRowArray = successResponse.split('\n');
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(',');
            this.preconData.push(
              new PreconData(
                row[0],
                row[1],
                row[2],
                row[3],
                row[4],
                row[5],
                row[6],
                row[7],
                row[8],
                row[9],
                row[10],
                row[11],
                row[12],
                row[13],
                row[14],
                row[15],
                row[16]
              )
            );
          }

          this.apiService.setLocalStorage('preconData', this.preconData);
          console.log(this.apiService.getLocalStorage('preconData'));

          this.featuredImageList = this.preconData
            .filter((obj) => obj.Featured.toLowerCase() == 'yes')
            .map((item) => `/assets/images/${item.Project_Name}/main.png`);

          let listOfProjects: PreconData[] =
            this.apiService.getLocalStorage('preconData');
          let provinceProjectCount: any = {};

          listOfProjects.forEach((project) => {
            if (provinceProjectCount[project.Province] == null) {
              provinceProjectCount[project.Province] = 1;
            } else {
              provinceProjectCount[project.Province] =
                provinceProjectCount[project.Province] + 1;
            }
          });

          let _canadajson: any = canadajson;

          _canadajson.features.forEach((obj: any, index: any) => {
            if (provinceProjectCount[obj.properties.name] != null) {
              _canadajson.features[index].properties.name =
              _canadajson.features[index].properties.name +
                ' ( ' +
                provinceProjectCount[obj.properties.name] +
                ' ) ';
            }
          });

          echarts.registerMap('abc', _canadajson);
          this.mapChartOption = {
            toolbox: {
              show: true,
              //orient: 'vertical',
              left: 'left',
              top: 'top',
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {},
              },
            },
            series: [
              {
                name: 'USA PopEstimates',
                type: 'map',
                roam: true,
                map: 'abc',
                emphasis: {
                  label: {
                    show: true,
                  },
                },
              },
            ],
          };
        },
        (erroResponse) => {}
      );
  }

  onChartEvent(event: any, type: string) {
    console.log('chart event:', type, event);
    alert(`${event.name} is selected`);
    let province = event.name.split('(');
    this.apiService.setFilterParams({ Province: province[0].trim() });
    this.router.navigate(['/projects']);
  }

  async onChartClick(event: any) {
    // console.log('chart event:', event);
    // alert(`${event.name} is selected`);
    if (event.name == this.previousEvent) {
      this.isChart1Animate = !this.isChart1Animate;
      await new Promise((f) => setTimeout(f, 200));
      this.isShowChartImages = !this.isChart1Animate;
      // this.isChart2Animate = !this.isChart2Animate;
      // if(this.isChart1Animate) {
      //   this.isShowChartImages = false;
      // }
      // await new Promise(f => setTimeout(f, 200));
      // this.isShowChart2 = !this.isShowChart2;
      // // this.isShowChart1 = !this.isShowChart1;
      // if(!this.isChart1Animate) {
      //   this.isShowChartImages = true;
      // }
    } else {
      // this.isChart2Animate = true;
      this.isChart1Animate = false;
      await new Promise((f) => setTimeout(f, 398));
      // this.isShowChart1 = false;
      this.isShowChartImages = true;
      // this.isShowChart2 = true;
      this.previousEvent = event.name;
    }
  }

  setLifestyle(style: any) {
    this.apiService.setFilterParams({ Style: style });
    this.router.navigate(['/projects']);
  }

  onContactUs() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
