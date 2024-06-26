import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { get } from 'http';
import { Person } from 'src/models/People/PeopleDetails';
import { TmdbService } from 'src/services/tmdb.service';

@Component({
  selector: 'app-details-actors',
  templateUrl: './details-actors.component.html',
  styleUrls: ['./details-actors.component.css'],
})
export class DetailsActorsComponent implements OnInit {
  idDetails: string = '';
  details: Person = {} as Person;
  urlTrailer?: SafeResourceUrl;
  site: string = '';
  popularPeoples: Person[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: TmdbService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
  this.api.getPopularPeoples().subscribe((response) => {
    this.popularPeoples = response.results; // Utilisez popularPeoples au lieu de popularPeople
  });

  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id === null) {
      return;
    }
    this.idDetails = id;
    this.getDetailsActor(id);
  });
}

  getDetailsActor(id: string): void {
  this.api.getDetailsPeople(id).subscribe((person) => {
    this.details = person;
    if (this.details.known_for && this.details.known_for.length > 0) {
      console.log(this.details.known_for[0].title);
    }
  });
}
}
