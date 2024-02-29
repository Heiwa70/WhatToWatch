import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/models/Movies';
import { map } from 'rxjs/operators';
import { Genre } from 'src/models/Genre';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private url : string;
  private headers = new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzEyYmY2YTBiZDg3OWRjMjc2ZTA0MTlmNmQxMzU0NSIsInN1YiI6IjY1ZDY0MDI1ZGIxNTRmMDE2NGEwOGMxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sEpl3yNo5-HSpmuN8mA05LTHSUkMaf-7TXMQlW94LZ4'
  });

  constructor(private http: HttpClient) {
    this.url = '';
   }

   getUserRegion(): Observable<string> {
    return this.http.get<{country: string}>('https://ipapi.co/json/')
      .pipe(
        map(response => response.country)
      );
  }

  getPopularMovies(): Observable<Movie[]> {
    this.url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    return this.http.get<{results: Movie[]}>(this.url, { headers: this.headers })
    .pipe(
      map(response => response.results)
    );
  }
  
  getGenreMovies(): Observable<Genre[]> {
    this.url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    return this.http.get<{genres: Genre[]}>(this.url, { headers: this.headers })
    .pipe(
      map(response => response.genres)
    );
  }

  getTopRatingMovies(): Observable<Movie[]> {
    this.url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    return this.http.get<{results: Movie[]}>(this.url, { headers: this.headers })
    .pipe(
      map(response => response.results)
    );
  }

  getUpcomingMovies(): Observable<Movie[]> {
    
    this.url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region='+this.getUserRegion().subscribe(data => {return data});
    return this.http.get<{results: Movie[]}>(this.url, { headers: this.headers })
    .pipe(
      map(response => response.results)
    );
  }
}