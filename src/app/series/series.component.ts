import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { TmdbService } from 'src/services/tmdb.service';
import { PopularTv, PopularTvResponse } from 'src/models/Tv/PopularTv';
import { Tv, TvResponse } from 'src/models/Tv/Tv';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  popularSeries: Tv[] = [];
  topRatingSeries: Tv[] = [];
  onAirSeries: Tv[] = [];
  AiringTodaySeries: Tv[] = [];

  constructor(private fireBase : FirebaseService, private api: TmdbService) { }

  ngOnInit(): void {

    this.api.getTopRatingTv().subscribe(
      (data: TvResponse) => {
        this.topRatingSeries = data.results;
      },
      error => {
        console.error('Erreur lors de la récupération des séries populaires : ', error);
      }
    );

    this.api.getPopularTv().subscribe(
      (data: TvResponse) => {
        this.popularSeries = data.results;
      },
      error => {
        console.error('Erreur lors de la récupération des séries populaires : ', error);
      }
    );

    this.api.getOnTheAirTv().subscribe(
      (data: TvResponse) => {
        this.onAirSeries = data.results;
      },
      error => {
        console.error('Erreur lors de la récupération des séries populaires : ', error);
      }
    );

    this.api.getAiringTodayTv().subscribe(
      (data: TvResponse) => {
        this.AiringTodaySeries = data.results;
      },
      error => {
        console.error('Erreur lors de la récupération des séries populaires : ', error);
      }
    );
  }

}
