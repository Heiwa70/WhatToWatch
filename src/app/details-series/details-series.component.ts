import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TvDetails } from 'src/models/Tv/TvDetails';
import { TmdbService } from 'src/services/tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Tv } from 'src/models/Tv/Tv';

@Component({
  selector: 'app-details-series',
  templateUrl: './details-series.component.html',
  styleUrls: ['./details-series.component.css'],
})
export class DetailsSeriesComponent implements OnInit {
  idDetails: string = '';
  details: TvDetails = {} as TvDetails;
  detailsTypeTv: Tv = {} as Tv;
  urlTrailer?: SafeResourceUrl;
  urlIsValide = false;
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
      this.urlIsValide = false;
      this.idDetails = id;
      this.getDetailsTv(id);
      this.getTrailer(id);
    });
  }

 

  getDetailsTv(id: string): void {
    this.api.getDetailsTv(id).subscribe((tv) => {
      this.details = tv;
      this.detailsTypeTv = tv as Tv;
      console.log(this.details);
    });
  }

  getTrailer(id: string): void {
    if (id !== null) {
      let videoUrl = 'https://www.youtube.com/embed/';
      this.api.getVideoTv(id).subscribe((trailer) => {
        if (trailer.results[0] !== undefined) {
          this.urlIsValide = true;
          this.urlTrailer = this.sanitizer.bypassSecurityTrustResourceUrl(
            videoUrl + trailer.results[0].key
          );
        } else {
          this.urlTrailer = this.sanitizer.bypassSecurityTrustResourceUrl('');
          console.log('No trailer found');
        }
        console.log(this.urlTrailer);
      });
    }
  }
}
