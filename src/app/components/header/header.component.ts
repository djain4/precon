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
  _showMenu = false;
  
  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.navItems = [
      // { title: 'PRECONBROWSER', content: 'Content 1', route: '/home' },
      { index: 1, title: 'Projects', content: 'Content 2', route: '/projects' },
      { index: 2, title: 'Why CANADA', content: 'Content 3', route: '/why-canada' },
      {
        index: 3, 
        title: 'Why PRE-CONSTRUCTION',
        content: 'Content 4',
        route: '/pre-construction',
      },
    ];

    //This is to set the active tab on page refresh
    
    let navItems = this.navItems.find(
      (item: any) => item.route === this._router.url
    );

    this.active = navItems ? navItems.index : 0;
  }

  showMenu() {
    this._showMenu = !this._showMenu;
  }
}
