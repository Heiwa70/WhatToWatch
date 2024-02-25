import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FirebaseService } from 'src/app/firebase.service';


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
    this.testGetDocument();
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private firebaseService: FirebaseService) { }

  async testGetDocument() {
    const result = await this.firebaseService.getDocument('users', 'test');
    console.log(result);
  }

}
