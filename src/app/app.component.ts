import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'precon-browser';
  active = 2;
  navItems: any = [];

  constructor() {}

  ngOnInit(): void {
    this.navItems = [
      { title: 'PRECONBROWSER', content: 'Content 1' },
      { title: 'Projects', content: 'Content 2' },
      { title: 'Why CANADA', content: 'Content 3' },
      { title: 'Why PRE-CONSTRUCTION', content: 'Content 4' },
    ];
  }
}
