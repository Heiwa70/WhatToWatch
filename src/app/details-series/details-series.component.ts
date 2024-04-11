import { Component, OnInit } from '@angular/core';
import { TvDetails } from 'src/models/Tv/TvDetails';
import { TmdbService } from 'src/services/tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-series',
  templateUrl: './details-series.component.html',
  styleUrls: ['./details-series.component.css'],
})
export class DetailsSeriesComponent implements OnInit {
  idDetails: string | null = '';
  details: TvDetails = {} as TvDetails;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: TmdbService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.idDetails = id;
    this.getDetailsTv(id);
  }

  getDetailsTv(id: string | null): void {
    if (id !== null) {
      this.api.getDetailsTv(id).subscribe((tv) => {
        this.details = tv;
        console.log(this.details);
      });
    }
  }
}
