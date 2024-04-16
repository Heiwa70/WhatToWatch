import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from 'src/models/Movie/MovieDetails';
import { MovieCreditsResponse, MovieCredits } from 'src/models/Movie/MovieCredits';
import { TmdbService } from 'src/services/tmdb.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  idDetails: string | null = '';
  details: MovieDetails = {} as MovieDetails;
  credits: MovieCredits = {} as MovieCredits;
  urlTrailer?: SafeResourceUrl;
  urlIsValide = false;
  actorGroups: string= {} as string;

  site: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: TmdbService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
   this.route.paramMap.subscribe((params) => {
    const id = params.get('id');
    if (id === null) {
      return;
    }
    this.idDetails = id;
    this.urlIsValide = false;
    this.getMovieDetails(this.idDetails as string);
    this.getTrailer(this.idDetails as string);
    this.getCreditsMovie(this.idDetails as string);
    });
  }

  getMovieDetails(id: string): void {
    if (id !== null) {
      this.api.getDetailsMovie(id).subscribe((movie) => {
        this.details = movie;
      });
    }
  }

  

  getTrailer(id: string): void {
  if (id !== null) {
    let videoUrl = 'https://www.youtube.com/embed/';
    this.api.getVideoLink(id).subscribe((trailer) => {
      if (trailer.results[0] !== undefined) {
        this.urlIsValide = true;
        this.urlTrailer = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl+trailer.results[0].key);
      } else {
        this.urlTrailer = this.sanitizer.bypassSecurityTrustResourceUrl('');
        console.log('No trailer found');
      }
      console.log(this.urlTrailer);
    });
  }
}

  getCreditsMovie(id: string): void {
  if (id !== null) {
    this.api.getCreditsMovie(id).subscribe((credits) => {
      this.credits = credits;
      console.log(credits);
    });
  }
}
}
