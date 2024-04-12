import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from 'src/models/Movie/MovieDetails';
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
  urlTrailer?: SafeResourceUrl;
  site: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: TmdbService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.idDetails = id;
    this.getMovieDetails(this.idDetails as string);
    this.getTrailer(this.idDetails as string);
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
        this.urlTrailer = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl+trailer.results[0].key);
        console.log(this.urlTrailer);
        console.log(this.site);
      });
    }
  }
}
