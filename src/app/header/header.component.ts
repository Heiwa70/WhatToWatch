import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FirebaseService } from 'src/services/firebase.service';
import { TmdbService } from 'src/services/tmdb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '280px',
        })
      ),
      state(
        'closed',
        style({
          height: '0',
        })
      ),
      transition('open <=> closed', [animate('0.7s ease-in-out')]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  email: string = sessionStorage.getItem('email')!;
  searchResults: any[] = [];
  searchValue: string = '';
  selectedValue: string = 'film'; // Initial value

  ngOnInit(): void {
    this.onValueChange(); // Log initial value
  }
  @ViewChild('menu') menu!: ElementRef;
  isOpen = false;

  constructor(
    public firebaseService: FirebaseService,
    private api: TmdbService
  ) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  onValueChange() {
    this.onSearchInput(); // Update search results based on new value
  }

  resetResults() {
    this.searchResults = [];
    this.searchValue = '';
  }

  onSearchInput() {
    switch (this.selectedValue) {
      case 'film':
        this.api.getMovies(this.searchValue).subscribe((response) => {
          this.searchResults = response.results;
        });
        break;
      case 'tv':
        this.api.getTvs(this.searchValue).subscribe((response) => {
          this.searchResults = response.results;
        });
        break;
      case 'people':
        this.api.getPeopleMovies(this.searchValue).subscribe((response) => {
          this.searchResults = response.results;
        });
        break;
    }
  }
}
