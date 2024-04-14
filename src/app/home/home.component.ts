import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { TmdbService } from 'src/services/tmdb.service';
import { Movie, MoviesResponse } from 'src/models/Movie/Movies';
import { PopularTv, PopularTvResponse } from 'src/models/Tv/PopularTv';
import { Tv, TvResponse } from 'src/models/Tv/Tv';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fireBase : FirebaseService, private api: TmdbService) { }

  popularMovies: Movie[] = [];
  popularSeries: Tv[] = [];

  ngOnInit(): void {

    this.api.getPopularMovies().subscribe(
      data => {
        this.popularMovies = data.results;
      },
      error => {
        console.error('Erreur lors de la récupération des films populaires : ', error);
      }
    );

    this.api.getTopRatingTv().subscribe(
      (data: TvResponse) => {
        this.popularSeries = data.results;
      },
      error => {
        console.error('Erreur lors de la récupération des séries populaires : ', error);
      }
    );
    
    console.log("Connexion : "+this.fireBase.userIsConnected());
  }

  

}
