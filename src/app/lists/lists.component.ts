import { Component, OnInit } from '@angular/core';
import { CollectionListe } from 'src/models/Liste';
import { MovieDetails } from 'src/models/Movie/MovieDetails';
import { Movie } from 'src/models/Movie/Movies';
import { TvDetails } from 'src/models/Tv/TvDetails';
import { FirebaseService } from 'src/services/firebase.service';
import { TmdbService } from 'src/services/tmdb.service';

type MovieOrTvDetails = MovieDetails | TvDetails;

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  listMovies: MovieOrTvDetails[] = [];
  //infoListes: CollectionListe[] = [];
  path: string[] = [];

  title: string = '';
  constructor(private tmdb: TmdbService, private firebase: FirebaseService) {}

  ngOnInit(): void {}

  handleSelectedDocument(document: CollectionListe) {
    this.listMovies = [];
    console.log(document);
    let length =
      document.id.length == document.type.length ? document.id.length : 0;
    for (let i = 0; i < length; i++) {
      if (document.type[i] == 'movie') {
        this.path.push('Movie');
        this.tmdb
          .getDetailsMovie(document.id[i].toString())
          .subscribe((movie) => {
            //console.log(movie);
            this.listMovies.push(movie);
          });
      } else if (document.type[i] == 'serie'){
        this.path.push('Series')

        this.tmdb.getDetailsTv(document.id[i].toString()).subscribe((serie) => {
          //console.log(serie);
          this.listMovies.push(serie);
        });
      }
    }

  }

  handleTitle(title: string) {
    this.title = title;
  }
  deleteMovie(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce film ?')) {
      this.firebase.deleteItemList(this.title, id)
      this.listMovies = this.listMovies.filter(movie => movie.id !== id);

    } else {
      console.log('La suppression de la liste a été annulée.');
    }
  }
  
}
