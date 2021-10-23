import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'precon-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  active = 0;
  navItems: any = [];

  constructor(private _router: Router) {}

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

    //This is to set the active tab on page refresh
    this.active = this.navItems.findIndex(
      (item: any) => item.route === this._router.url
    );
  }
}
