import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { TmdbService } from 'src/services/tmdb.service';
import { PopularTv, PopularTvResponse } from 'src/models/Tv/PopularTv';
import { Peoples, PeoplesResponse } from 'src/models/People/People';
import { Person } from 'src/models/People/PeopleDetails';

@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css']
})
export class PersonneComponent implements OnInit {
  popularPeoples: Peoples[] = [];

  constructor(private fireBase : FirebaseService, private api: TmdbService) { }

  ngOnInit(): void {

    this.api.getPopularPeoples().subscribe(
      (data: PeoplesResponse) => {
        this.popularPeoples = data.results;
      },
      error => {
        console.error('Erreur lors de la récupération des personnes populaires : ', error);
      }
    );

  }

}
