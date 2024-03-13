import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FirebaseService } from 'src/services/firebase.service';
import { TmdbService } from 'src/services/tmdb.service';



@Component({

  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '280px',
      })),
      state('closed', style({
        height: '0',

      })),
      transition('open <=> closed', [
        animate('0.7s ease-in-out')
      ]),
    ]),
  ]
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {}
  @ViewChild('menu') menu!: ElementRef;
  isOpen = false;


  constructor(public firebaseService: FirebaseService, private api: TmdbService) {}


  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
  

  

}
