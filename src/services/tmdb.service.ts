import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/models/Movies';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  private headers = new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzEyYmY2YTBiZDg3OWRjMjc2ZTA0MTlmNmQxMzU0NSIsInN1YiI6IjY1ZDY0MDI1ZGIxNTRmMDE2NGEwOGMxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sEpl3yNo5-HSpmuN8mA05LTHSUkMaf-7TXMQlW94LZ4'
  });

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<Movie[]> {
    return this.http.get<{results: Movie[]}>(this.url, { headers: this.headers })
    .pipe(
      map(response => response.results)
    );
  }
  


}