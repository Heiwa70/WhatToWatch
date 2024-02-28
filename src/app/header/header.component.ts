import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FirebaseService } from 'src/services/firebase.service';
import { TmdbService } from 'src/services/tmdb.service';



@Component({

  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {}

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private firebaseService: FirebaseService, private api: TmdbService) { }


}
