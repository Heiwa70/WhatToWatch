import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { TmdbService } from 'src/services/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private firbaseSrv : FirebaseService, private api: TmdbService) { }

  ngOnInit(): void {
    this.api.getPopularMovies().subscribe(
      data => {
        console.log(data);
      }
    );

    this.api.getUpcomingMovies().subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
