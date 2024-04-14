import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-verticale',
  templateUrl: './menu-verticale.component.html',
  styleUrls: ['./menu-verticale.component.css']
})
export class MenuVerticaleComponent implements OnInit {
  showMenuList = false;
  MenuList = [
    { name: 'Home', path: '/home' },
    { name: 'Movies', path: '/movies' },
    { name: 'Series', path: '/series' },
    { name: 'My List', path: '/mylist' },
    { name: 'Profile', path: '/profile' },
  ];

  constructor() { }

  ngOnInit(): void {
  }


}
