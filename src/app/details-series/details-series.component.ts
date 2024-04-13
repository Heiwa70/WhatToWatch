import { Component, OnInit } from '@angular/core';
import { TvDetails } from 'src/models/Tv/TvDetails';
import { TmdbService } from 'src/services/tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details-series',
  templateUrl: './details-series.component.html',
  styleUrls: ['./details-series.component.css'],
})
export class DetailsSeriesComponent implements OnInit {
  idDetails: string = '';
  details: TvDetails = {} as TvDetails;
  urlTrailer?: SafeResourceUrl;
  site: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: TmdbService,
    private sanitizer: DomSanitizer

  ) {}

ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
    if (id === null) {
        return;
    }
    this.idDetails = id;
    this.getDetailsTv(id);
    this.getTrailer(id);  
  });
}

getDetailsTv(id: string): void {
    this.api.getDetailsTv(id).subscribe((tv) => {
        this.details = tv;
        console.log(this.details);
    });
}

getTrailer(id: string): void {
    let videoUrl = 'https://www.youtube.com/embed/';
    this.api.getVideoTv(id).subscribe((trailer) => {
        this.urlTrailer = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl+trailer.results[0].key);
        console.log(this.urlTrailer);
        console.log(this.site);
    });
}
}
