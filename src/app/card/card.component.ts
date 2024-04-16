import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/models/Movie/Movies';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { PopularTv } from 'src/models/Tv/PopularTv';
import { FirebaseService } from 'src/services/firebase.service';
import { Liste } from 'src/models/Liste';
import { Tv } from 'src/models/Tv/Tv';
import { TmdbService } from 'src/services/tmdb.service';
import { MovieDetails } from 'src/models/Movie/MovieDetails';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          flexGrow: '1',
          width: '400px',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          flexGrow: '0',
          width: '0',
          opacity: 0,
        })
      ),
      transition('open => closed', [
        animate(
          '0.5s',
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0, offset: 0.5 }),
            style({ width: '0', offset: 0.5 }),
          ])
        ),
      ]),
      transition('closed => open', [
        animate(
          '0.8s',
          keyframes([
            style({ width: '400px', offset: 0.5 }),
            style({ opacity: 1, offset: 1.0 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class CardComponent implements OnInit {
  @Input() movie?: Movie | Tv;
  isOpen = false;
  heartClicked = false;
  details?: MovieDetails;

  constructor(private firebase: FirebaseService, private api: TmdbService) {}

ngOnInit(): void {
  this.firebase.getListWhere(sessionStorage.getItem('email')!, 'like', this.movie!.id.toString())
    .then((doc: boolean | Liste) => {
      let liste: Liste = doc as Liste;
      if(liste.id.includes(this.movie!.id)){
        this.heartClicked = true;
      }
      else{
      }
    });
}

  getMovieDetails(id: string): void {
  if (id !== null) {
    this.api.getDetailsMovie(id).subscribe((movie) => {
      this.details = movie;
      if (this.details && this.details.title) {
      }
    });
  }
}

  toggle() {
  this.isOpen = !this.isOpen;
  if (this.isOpen && this.movie) {
    this.getMovieDetails(this.movie.id.toString());
  }
}

  onListMenuOpen(open:boolean){
    this.isOpen = open;
  }

}
