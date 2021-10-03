import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'precon-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  title = 'precon-browser';
  active = 2;
  navItems: any = [];

  constructor() {}

  ngOnInit(): void {
    this.navItems = [
      { title: 'PRECONBROWSER', content: 'Content 1', route: '/home' },
      { title: 'Projects', content: 'Content 2', route: '/projects' },
      { title: 'Why CANADA', content: 'Content 3', route: '/why-canada' },
      {
        title: 'Why PRE-CONSTRUCTION',
        content: 'Content 4',
        route: '/pre-construction',
      },
    ];
  }
}
