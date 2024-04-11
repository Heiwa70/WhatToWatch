import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from 'src/models/Movie/MovieDetails';
import { TmdbService } from 'src/services/tmdb.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  idDetails: string | null = '';
  details: MovieDetails = {} as MovieDetails;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: TmdbService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.idDetails = id;
    this.getMovieDetails(this.idDetails);
  }

  getMovieDetails(id: string | null): void {
    if (id !== null) {
      this.api.getDetailsMovie(id).subscribe((movie) => {
        this.details = movie;
        console.log(this.details);
      });
    }
  }
}
