import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/models/Movies';
import { map } from 'rxjs/operators';
import { MoviesGenre } from 'src/models/MoviesGenre';
import { MoviesTrailer } from 'src/models/MoviesTrailer';
import { MovieProviders } from 'src/models/MoviesProviders';
import { MoviesReleaseDates } from 'src/models/MoviesReleaseDates';
import { MovieDetails } from 'src/models/MovieDetails';
import { SearchCompany } from 'src/models/SearchCompany';
import { SearchActor } from 'src/models/SearchActor';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private url : string;
  private country: string;
  private headers = new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzEyYmY2YTBiZDg3OWRjMjc2ZTA0MTlmNmQxMzU0NSIsInN1YiI6IjY1ZDY0MDI1ZGIxNTRmMDE2NGEwOGMxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sEpl3yNo5-HSpmuN8mA05LTHSUkMaf-7TXMQlW94LZ4'
  });

  constructor(private http: HttpClient) {
    this.url = '';
    this.country = 'FR';
   }

  /**
    * Récupère la région de l'utilisateur en fonction de son adresse IP.
    * @returns Un Observable qui émet la région de l'utilisateur sous forme de chaîne de caractères.
    */
   getUserRegion(): Observable<string> {
    return this.http.get<{country: string}>('https://ipapi.co/json/')
      .pipe(
        map(response => response.country)
      );
  }

  /**
    * Récupère une liste de films populaires à partir de l'API TMDB.
    * @returns Un Observable qui émet un tableau d'objets Movie.
    */
  getPopularMovies(): Observable<Movie[]> {
    this.url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    return this.http.get<Movie[]>(this.url, { headers: this.headers });
  }
  
  /**
    * Récupère une liste de films par genre à partir de l'API TMDB.
    * @returns Un Observable qui émet un tableau d'objets MoviesGenre.
    */
  getGenreMovies(): Observable<MoviesGenre[]> {
    this.url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    return this.http.get<MoviesGenre[]>(this.url, { headers: this.headers });
  }

  /**
    * Récupère une liste de films les mieux notés à partir de l'API TMDB.
    * @returns Un Observable qui émet un tableau d'objets Movie.
    */
  getTopRatingMovies(): Observable<Movie[]> {
    this.url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    return this.http.get<Movie[]>(this.url, { headers: this.headers });
  }

  /**
    * Récupère une liste de films à venir.
    * @returns Un Observable qui émet un tableau d'objets Movie.
    */
  getUpcomingMovies(): Observable<Movie[]> {
    this.url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region='+this.country;
    return this.http.get<Movie[]>(this.url, { headers: this.headers });
  }

  /**
    * Récupère une liste de films actuellement diffusés.
    * @returns Un Observable qui émet un tableau d'objets Movie.
    */
  getNowPlayingMovies(): Observable<Movie[]> {
    this.url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region='+this.country;
    return this.http.get<Movie[]>(this.url, { headers: this.headers });
  }
  
  /**
    * Récupère le lien vidéo d'un film en fonction de son ID.
    * @param id - L'ID du film.
    * @returns Un Observable qui émet l'objet MoviesTrailer contenant le lien vidéo.
    */
  getVideoLink(id:string): Observable<MoviesTrailer> {
    this.url = 'https://api.themoviedb.org/3/movie/'+id+'/videos?language=FR';
    return this.http.get<MoviesTrailer>(this.url, { headers: this.headers });
  }


  /**
    * Récupère les fournisseurs de films pour un ID de film donné.
    * @param id - L'ID du film.
    * @returns Un Observable qui émet les fournisseurs de films.
    */
  getProvidersMovies(id:string): Observable<MovieProviders> {
    this.url = 'https://api.themoviedb.org/3/movie/'+id+'/watch/providers';
    return this.http.get<MovieProviders>(this.url, { headers: this.headers });
  }

  /**
    * Récupère les dates de sortie des films avec l'ID spécifié.
    * @param id - L'ID du film.
    * @returns Un Observable qui émet les dates de sortie du film.
    */
  getReleaseDateMovies(id:string): Observable<MoviesReleaseDates> {
    this.url = 'https://api.themoviedb.org/3/movie/'+id+'/release_dates';
    return this.http.get<MoviesReleaseDates>(this.url, { headers: this.headers });
  }

  /**
    * Récupère les détails d'un film à partir de l'API TMDB.
    * @param id - L'ID du film.
    * @returns Un Observable qui émet les détails du film.
    */
  getDetailsMovie(id:string): Observable<MovieDetails>{
    this.url = 'https://api.themoviedb.org/3/movie/'+id+'?language=fr-FR';
    return this.http.get<MovieDetails>(this.url, { headers: this.headers });
  }

  /**
    * Récupère les films d'une compagnie spécifique.
    * @param name - Le nom de la compagnie.
    * @returns Un Observable qui émet les films de la compagnie.
    */
  getMoviesCompany(name:string): Observable<SearchCompany>{
    this.url =  'https://api.themoviedb.org/3/discover/movie?with_companies='+name;
    return this.http.get<SearchCompany>(this.url, { headers: this.headers });
  }


  /**
    * Récupère les films pour un nom d'acteur donné.
    * @param name - Le nom de l'acteur.
    * @returns Un Observable de type SearchActor.
    */
  getMoviesActor(name:string): Observable<SearchActor>{
    this.url =  'https://api.themoviedb.org/3/search/person?query='+name+'&include_adult=false';
    return this.http.get<SearchActor>(this.url, { headers: this.headers });
  }

  /**
    * Récupère les films pour un nom donné.
    * @param name - Le nom du film.
    * @returns Un Observable de type SearchActor.
    */
  getMovies(name:string): Observable<SearchActor>{
    this.url =  'https://api.themoviedb.org/3/search/movie?query='+name+'&include_adult=false';
    return this.http.get<SearchActor>(this.url, { headers: this.headers });
  }
}