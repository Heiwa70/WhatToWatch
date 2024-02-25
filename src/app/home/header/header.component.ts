import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({

  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        visibility: 'visible'
      })),
      state('closed', style({
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('open <=> closed', [
        animate('0.3s')
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  

}
