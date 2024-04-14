import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { TmdbService } from 'src/services/tmdb.service';
import { Movie, MoviesResponse } from 'src/models/Movie/Movies';
import { PopularTv, PopularTvResponse } from 'src/models/Tv/PopularTv';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  popularMovies: Movie[] = [];
  topRatingMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];

  constructor(private fireBase : FirebaseService, private api: TmdbService) { }

  ngOnInit(): void {
    this.api.getPopularMovies().subscribe(
      data => {
        this.popularMovies = data.results;
      },
      error => {
        console.error('Erreur lors de la récupération des films populaires : ', error);
      }
    );

    this.api.getTopRatingMovies().subscribe(
      data => {
        this.topRatingMovies = data.results;
      },
      error => {
        console.error('Erreur lors de la récupération des films les mieux notés : ', error);
      }
    );

    this.api.getUpcomingMovies().subscribe(
      data => {
        this.upcomingMovies = data.results;
      },
      error => {
        console.error('Erreur lors de la récupération des films à venir : ', error);
      }
    );

    this.api.getNowPlayingMovies().subscribe(
      data => {
        this.nowPlayingMovies = data.results;
      },
      error => {
        console.error('Erreur lors de la récupération des films en cours de diffusion : ', error);
      }
    );


  }

}
