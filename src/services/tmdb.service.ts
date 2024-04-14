import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MoviesResponse } from 'src/models/Movie/Movies';
import { map } from 'rxjs/operators';
import { MoviesGenre } from 'src/models/Movie/MoviesGenre';
import { MoviesTrailer } from 'src/models/Movie/MoviesTrailer';
import { MovieProviders } from 'src/models/Movie/MoviesProviders';
import { MoviesReleaseDates } from 'src/models/Movie/MoviesReleaseDates';
import { MovieDetails } from 'src/models/Movie/MovieDetails';
import { SearchCompany } from 'src/models/Company/SearchCompany';
import { SearchPeople } from 'src/models/People/SearchPeople';
import { MovieCertifications } from 'src/models/Movie/MovieCerfications';
import { TvCertifications } from 'src/models/Tv/TvCertifications'
import { Countries } from 'src/models/Countries';
import { Languages } from 'src/models/Languages';
import { Discover } from 'src/models/Discover';
import { TvGenre } from 'src/models/Tv/TvGenre';
import { MoviesTitlesAlternative } from 'src/models/Movie/MoviesTitlesAlternative';
import { MovieCredits } from 'src/models/Movie/MovieCredits';
import { MovieImages } from 'src/models/Movie/MovieImages';
import { MovieReviews } from 'src/models/Movie/MovieReviews';
import { SearchMovie } from 'src/models/Movie/SearchMovie';
import { TvDetails } from 'src/models/Tv/TvDetails';
import { Tv, TvResponse } from 'src/models/Tv/Tv';
import { PopularTv, PopularTvResponse } from 'src/models/Tv/PopularTv';
import { TvAggregateCredits } from 'src/models/Tv/TvAggregateCredits';
import { TvAlternativeTitles } from 'src/models/Tv/TvAlternativeTitles';
import { TvCredits } from 'src/models/Tv/TvCredits';
import { TvImages } from 'src/models/Tv/TvImages';
import { TvRecommendations } from 'src/models/Tv/TvRecommendations';
import { TvReviews } from 'src/models/Tv/TvReviews';
import { TvSimilars } from 'src/models/Tv/TvSimilars';
import { TvTranslations } from 'src/models/Tv/TvTranslations';
import { TvVideo } from 'src/models/Tv/TvVideo';
import { TvProviders } from 'src/models/Tv/TvProviders';
import { ProvidersRegions } from 'src/models/ProvidersRegions';
import { ProvidersTvMovie } from 'src/models/ProvidersTvMovie';
import { MoviesRecommendations } from 'src/models/Movie/MoviesRecommendations';
import { MoviesSimilars } from 'src/models/Movie/MoviesSimilars';
import { MoviesTranslations } from 'src/models/Movie/MovieTranslations';
import { SearchCollectionMovies } from 'src/models/Movie/SearchCollectionMovies';
import { TrendingMovies } from 'src/models/Movie/TrendingMovies';
import { PeopleCombinedCredits } from 'src/models/People/PeopleCombinedCredits';
import { ApiResponse, Person } from 'src/models/People/PeopleDetails';
import { PeopleImages } from 'src/models/People/PeopleImages';
import { PeopleTranslations } from 'src/models/People/PeopleTranslations';
import { PeoplesResponse } from 'src/models/People/People';
import { TrendingPeople } from 'src/models/People/TrendingPeople';
import { SearchTv } from 'src/models/Tv/SearchTv';
import { TrendingTv } from 'src/models/Tv/TrendingTv';

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
  getPopularMovies(): Observable<MoviesResponse> {
    this.url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    return this.http.get<MoviesResponse>(this.url, { headers: this.headers });
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
  getTopRatingMovies(): Observable<MoviesResponse> {
    this.url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    return this.http.get<MoviesResponse>(this.url, { headers: this.headers });
  }

  /**
    * Récupère une liste de films à venir.
    * @returns Un Observable qui émet un tableau d'objets Movie.
    */
  getUpcomingMovies(): Observable<MoviesResponse> {
    this.url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region='+this.country;
    return this.http.get<MoviesResponse>(this.url, { headers: this.headers });
  }

  /**
    * Récupère une liste de films actuellement diffusés.
    * @returns Un Observable qui émet un tableau d'objets Movie.
    */
  getNowPlayingMovies(): Observable<MoviesResponse> {
    this.url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region='+this.country;
    return this.http.get<MoviesResponse>(this.url, { headers: this.headers });
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
  getMoviesByCompany(name:string): Observable<SearchCompany>{
    this.url =  'https://api.themoviedb.org/3/discover/movie?with_companies='+name;
    return this.http.get<SearchCompany>(this.url, { headers: this.headers });
  }


  /**
    * Récupère les films pour un nom d'acteur donné.
    * @param name - Le nom de l'acteur.
    * @returns Un Observable de type SearchPeople.
    */
  getMoviesByPeople(name:string): Observable<SearchPeople>{
    this.url =  'https://api.themoviedb.org/3/search/person?query='+name+'&include_adult=false';
    return this.http.get<SearchPeople>(this.url, { headers: this.headers });
  }

  /**
    * Récupère les films pour un nom donné.
    * @param name - Le nom du film.
    * @returns Un Observable de type SearchPeople.
    */
  getMovies(name:string): Observable<SearchMovie>{
    this.url =  'https://api.themoviedb.org/3/search/movie?query='+name+'&include_adult=false';
    return this.http.get<SearchMovie>(this.url, { headers: this.headers });
  }


  /**
   * Récupère la liste des certifications des films.
   * @returns Un observable contenant les certifications des films.
   */
  getCertificationMovies(): Observable<MovieCertifications>{
    this.url =  'https://api.themoviedb.org/3/certification/movie/list';
    return this.http.get<MovieCertifications>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les certifications pour les séries TV.
   * @returns Un observable contenant les certifications pour les séries TV.
   */
  getCertificationTv(): Observable<TvCertifications>{
    this.url =  'https://api.themoviedb.org/3/certification/tv/list';
    return this.http.get<TvCertifications>(this.url, { headers: this.headers });
  }


  /**
    * Récupère une liste de pays à partir de l'API TMDB.
    * @returns Un Observable qui émet un objet Countries.
    */
  getCountries(): Observable<Countries>{
    this.url =  'https://api.themoviedb.org/3/configuration/countries?language=en-US';
    return this.http.get<Countries>(this.url, { headers: this.headers });
  }

  /**
    * Récupère la liste des langues depuis l'API TMDB.
    * @returns Un Observable qui émet la liste des langues.
    */
  getLanguages(): Observable<Languages>{
    this.url =  'https://api.themoviedb.org/3/configuration/languages';
    return this.http.get<Languages>(this.url, { headers: this.headers });
  }


  /**
    * Récupère une liste de films découverts en fonction des filtres fournis.
    * @param filters - Un objet contenant des filtres optionnels pour la recherche de films.
    * @returns Un Observable de type Discover, représentant les films découverts.
    */
  getDiscoverMovie(filters: any = {}): Observable<Discover> {
    let params = new HttpParams()
      .set('include_adult', 'false')
      .set('include_video', 'false')
      .set('language', 'en-US')
      .set('page', '1')
      .set('sort_by', 'popularity.desc');

    // Ajouter les filtres à params
    for (let key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }

    this.url = 'https://api.themoviedb.org/3/discover/movie';
    return this.http.get<Discover>(this.url, { headers: this.headers, params });
  }


  /**
   * Récupère les informations de découverte des séries TV.
   * @param filters - Les filtres à appliquer à la requête (facultatif).
   * @returns Un Observable contenant les informations de découverte des séries TV.
   */
  getDiscoverTv(filters: any = {}): Observable<Discover> {
    let params = new HttpParams()
      .set('include_adult', 'false')
      .set('include_video', 'false')
      .set('language', 'en-US')
      .set('page', '1')
      .set('sort_by', 'popularity.desc');

    // Ajouter les filtres à params
    for (let key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }

    this.url = 'https://api.themoviedb.org/3/discover/tv';
    return this.http.get<Discover>(this.url, { headers: this.headers, params });
  }


  /**
   * Récupère la liste des genres de séries TV.
   * @returns Un Observable qui émet un tableau de genres de séries TV.
   */
  getGenresTv(): Observable<TvGenre[]> {
    this.url = 'https://api.themoviedb.org/3/genre/tv/list?language=en';
    return this.http.get<TvGenre[]>(this.url, { headers: this.headers });
  }

  /**
   * Récupère les titres alternatifs d'un film à partir de son identifiant.
   * @param id - L'identifiant du film.
   * @returns Un Observable contenant les titres alternatifs du film.
   */
  getAlternativeTitlesMovies(id:string): Observable<MoviesTitlesAlternative> {
    this.url = 'https://api.themoviedb.org/3/movie/'+id+'/alternative_titles';
    return this.http.get<MoviesTitlesAlternative>(this.url, { headers: this.headers });
  }

  /**
    * Récupère les crédits d'un film en fonction de son ID.
    * @param id - L'ID du film.
    * @returns Un Observable qui émet les crédits du film.
    */
  getCreditsMovie(id:string): Observable<MovieCredits> {
    this.url = 'https://api.themoviedb.org/3/movie/'+id+'/credits';
    return this.http.get<MovieCredits>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les images d'un film à partir de son identifiant.
   * @param id L'identifiant du film.
   * @returns Un observable contenant les images du film.
   */
  getImagesMovie(id:string): Observable<MovieImages> {
    this.url = 'https://api.themoviedb.org/3/movie/'+id+'/images';
    return this.http.get<MovieImages>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les recommandations de films pour un film donné.
   * @param id - L'identifiant du film.
   * @returns Un Observable contenant les recommandations de films.
   */
  getRecommendationsMovie(id:string): Observable<MoviesRecommendations> {
    this.url = 'https://api.themoviedb.org/3/movie/'+id+'/recommendations?language=en-US&page=1';
    return this.http.get<MoviesRecommendations>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les critiques d'un film à partir de son identifiant.
   * @param id L'identifiant du film.
   * @returns Un Observable contenant les critiques du film.
   */
  getReviewsMovie(id:string): Observable<MovieReviews> {
    this.url = 'https://api.themoviedb.org/3/movie/'+id+'/reviews?language=en-US&page=1';
    return this.http.get<MovieReviews>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les films similaires à partir de l'identifiant spécifié.
   * @param id - L'identifiant du film.
   * @returns Un Observable contenant les films similaires.
   */
  getSimilarsMovies(id:string): Observable<MoviesSimilars> {
    this.url = 'https://api.themoviedb.org/3/movie/'+id+'/similar?language=en-US&page=1';
    return this.http.get<MoviesSimilars>(this.url, { headers: this.headers });
  }


  /**
    * Récupère les traductions d'un film spécifique.
    * @param id - L'ID du film.
    * @returns Un Observable qui émet les traductions du film.
    */
  getTranslationsMovies(id:string): Observable<MoviesTranslations> {
    this.url = 'https://api.themoviedb.org/3/movie/'+id+'/translations?language=FR';
    return this.http.get<MoviesTranslations>(this.url, { headers: this.headers });
  }

  /**
   * Récupère les personnes populaires.
   * @returns Un Observable contenant un tableau de PopularPeoples.
   */
  getPopularPeoples(): Observable<PeoplesResponse> {
    this.url = 'https://api.themoviedb.org/3/person/popular?language=en-US&page=1';
    return this.http.get<PeoplesResponse>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les détails d'une personne à partir de son identifiant.
   * @param id L'identifiant de la personne.
   * @returns Un Observable contenant les détails de la personne.
   */
  getDetailsPeople(id:string): Observable<Person> {
    this.url = 'https://api.themoviedb.org/3/person/' + id + '?language=fr';
    return this.http.get<Person>(this.url, { headers: this.headers });
  }

  getPeopleMovies(name:string): Observable<ApiResponse> {
    this.url = 'https://api.themoviedb.org/3/search/person?query='+name+'&include_adult=false&language=fr-FR';
    return this.http.get<ApiResponse>(this.url, { headers: this.headers });
  }

  /**
   * Récupère les crédits combinés d'une personne.
   * @param id - L'identifiant de la personne.
   * @returns Un Observable contenant les crédits combinés de la personne.
   */
  getCombinedCreditsPeople(id:string): Observable<PeopleCombinedCredits> {
    this.url = 'https://api.themoviedb.org/3/person/'+id+'/combined_credits?language=en-US';
    return this.http.get<PeopleCombinedCredits>(this.url, { headers: this.headers });
  }


  /**
    * Récupère les images d'une personne à partir de l'API TMDB.
    * @param id - L'ID de la personne.
    * @returns Un Observable qui émet un objet PeopleImages.
    */
  getImagesPeople(id:string): Observable<PeopleImages> {
    this.url = 'https://api.themoviedb.org/3/person/'+id+'/images';
    return this.http.get<PeopleImages>(this.url, { headers: this.headers });
  }

  /**
    * Récupère les traductions pour une personne spécifique.
    *
    * @param id - L'ID de la personne.
    * @returns Une promesse qui se résout avec les traductions de la personne.
    */
  getTranslationsPeople(id:string): Observable<PeopleTranslations> {
    this.url = 'https://api.themoviedb.org/3/person/'+id+'/translations';
    return this.http.get<PeopleTranslations>(this.url, { headers: this.headers });
  }


  /**
   * Récupère une collection de films en fonction de la requête fournie.
   * @param query - La requête de recherche pour la collection.
   * @returns Un Observable de type SearchCollectionMovies.
   */
  getCollectionMovies(query : string): Observable<SearchCollectionMovies> {
    this.url = 'https://api.themoviedb.org/3/search/collection?query='+query+'&include_adult=false&language=en-US&page=1';
    return this.http.get<SearchCollectionMovies>(this.url, { headers: this.headers });
  }

  /**
   * Récupère les séries TV correspondant à une requête donnée.
   * @param query - La requête de recherche.
   * @returns Un Observable contenant les résultats de recherche des séries TV.
   */
  getTvs(query : string): Observable<SearchTv> {
    this.url = 'https://api.themoviedb.org/3/search/tv?query='+query+'&include_adult=false&language=en-US&page=1';
    return this.http.get<SearchTv>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les films tendances selon la période spécifiée.
   * @param timePeriod La période de temps pour laquelle récupérer les films tendances. Peut être 'day' pour la journée en cours ou 'week' pour la semaine en cours.
   * @returns Un Observable contenant les films tendances.
   */
  getTrendingMovies(timePeriod: 'day' | 'week'): Observable<TrendingMovies> {
    this.url = `https://api.themoviedb.org/3/trending/movie/${timePeriod}?language=en-US`;
    return this.http.get<TrendingMovies>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les personnes les plus populaires selon une période de temps donnée.
   * @param timePeriod La période de temps pour laquelle récupérer les personnes populaires. Peut être 'day' (jour) ou 'week' (semaine).
   * @returns Un Observable contenant les personnes populaires.
   */
  getTrendingPeople(timePeriod: 'day' | 'week'): Observable<TrendingPeople> {
    this.url = `https://api.themoviedb.org/3/trending/person/${timePeriod}?language=en-US`;
    return this.http.get<TrendingPeople>(this.url, { headers: this.headers });
  }



  /**
   * Récupère les émissions de télévision tendances selon la période spécifiée.
   * @param timePeriod La période de temps pour laquelle récupérer les émissions tendances. Peut être 'day' pour la journée en cours ou 'week' pour la semaine en cours.
   * @returns Un Observable contenant les émissions de télévision tendances.
   */
  getTrendingTv(timePeriod: 'day' | 'week'): Observable<TvResponse> {
    this.url = `https://api.themoviedb.org/3/trending/tv/${timePeriod}?language=en-US`;
    return this.http.get<TvResponse>(this.url, { headers: this.headers });
  }



  /**
   * Récupère les séries populaires.
   * @returns Un Observable contenant les séries populaires.
   */
  getPopularTv(): Observable<TvResponse> {
    this.url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
    return this.http.get<TvResponse>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les séries les mieux notées.
   * @returns Un Observable contenant les séries les mieux notées.
   */
  getTopRatingTv(): Observable<TvResponse> {
    this.url = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';
    return this.http.get<TvResponse>(this.url, { headers: this.headers });
  }

  /**
    * Récupère une liste de séries télévisées qui sont diffusées aujourd'hui.
    * @returns Un Observable qui émet un objet TvResponse contenant la liste des séries télévisées.
    */
  getAiringTodayTv(): Observable<TvResponse> {
    this.url = 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1';
    return this.http.get<TvResponse>(this.url, { headers: this.headers });
  }

  /**
    * Récupère la liste des séries TV actuellement diffusées.
    * @returns Un Observable qui émet un objet TvResponse contenant la liste des séries TV.
    */
  getOnTheAirTv(): Observable<TvResponse> {
    this.url = 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1';
    return this.http.get<TvResponse>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les détails d'une série TV à partir de son identifiant.
   * @param id L'identifiant de la série TV.
   * @returns Un Observable contenant les détails de la série TV.
   */
  getDetailsTv(id:string): Observable<TvDetails> {
    this.url = 'https://api.themoviedb.org/3/tv/'+id+'?language=en-US';
    return this.http.get<TvDetails>(this.url, { headers: this.headers });
  }

  /**
   * Récupère les crédits agrégés d'une série TV à partir de son identifiant.
   * @param id L'identifiant de la série TV.
   * @returns Un Observable contenant les crédits agrégés de la série TV.
   */
  getTvAggregateCredits(id:string): Observable<TvAggregateCredits> {
    this.url = 'https://api.themoviedb.org/3/tv/'+id+'/aggregate_credits?language=en-US';
    return this.http.get<TvAggregateCredits>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les titres alternatifs d'une série TV à partir de son identifiant.
   * @param id L'identifiant de la série TV.
   * @returns Un Observable contenant les titres alternatifs de la série TV.
   */
  getTvAlternativeTitles(id:string): Observable<TvAlternativeTitles> {
    this.url = 'https://api.themoviedb.org/3/tv/'+id+'/alternative_titles';
    return this.http.get<TvAlternativeTitles>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les crédits d'une série TV à partir de son identifiant.
   * @param id L'identifiant de la série TV.
   * @returns Un Observable contenant les crédits de la série TV.
   */
  getTvCredits(id:string): Observable<TvCredits> {
    this.url = 'https://api.themoviedb.org/3/tv/'+id+'/credits';
    return this.http.get<TvCredits>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les images d'une série TV à partir de son identifiant.
   * @param id L'identifiant de la série TV.
   * @returns Un Observable contenant les images de la série TV.
   */
  getTvImages(id:string): Observable<TvImages> {
    this.url = 'https://api.themoviedb.org/3/tv/'+id+'/images';
    return this.http.get<TvImages>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les recommandations TV pour une série donnée.
   * @param id - L'identifiant de la série.
   * @returns Un Observable contenant les recommandations TV.
   */
  getTvRecommendations(id:string): Observable<TvRecommendations> {
    this.url = 'https://api.themoviedb.org/3/tv/'+id+'/recommendations?language=en-US&page=1';
    return this.http.get<TvRecommendations>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les critiques d'une série TV à partir de son identifiant.
   * @param id L'identifiant de la série TV.
   * @returns Un Observable contenant les critiques de la série TV.
   */
  getTvReviews(id:string): Observable<TvReviews> {
    this.url = 'https://api.themoviedb.org/3/tv/'+id+'/reviews?language=en-US&page=1';
    return this.http.get<TvReviews>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les séries TV similaires à partir de l'identifiant spécifié.
   * @param id L'identifiant de la série TV.
   * @returns Un Observable contenant les séries TV similaires.
   */
  getTvSimilars(id:string): Observable<TvSimilars> {
    this.url = 'https://api.themoviedb.org/3/tv/'+id+'/similar?language=en-US&page=1';
    return this.http.get<TvSimilars>(this.url, { headers: this.headers });
  }


  /**
   * Retrieves the translations for a TV show.
   * @param id - The ID of the TV show.
   * @returns An Observable that emits the translations for the TV show.
   */
  getTranslationsTv(id:string): Observable<TvTranslations> {
    this.url = 'https://api.themoviedb.org/3/tv/'+id+'/translations?language=FR';
    return this.http.get<TvTranslations>(this.url, { headers: this.headers });
  }

  /**
    * Récupère les informations vidéo d'une série TV en fonction de son ID.
    * @param id - L'ID de la série TV.
    * @returns Un Observable qui émet les informations vidéo de la série TV.
    */
  getVideoTv(id:string): Observable<TvVideo> {
    this.url = 'https://api.themoviedb.org/3/tv/'+id+'/videos?language=FR';
    return this.http.get<TvVideo>(this.url, { headers: this.headers });
  }

  /**
   * Récupère les fournisseurs de télévision pour une série spécifique.
   * @param id - L'identifiant de la série.
   * @returns Un Observable contenant les fournisseurs de télévision pour la série spécifiée.
   */
  getTvProviders(id:string): Observable<TvProviders> {
    this.url = 'https://api.themoviedb.org/3/tv/'+id+'/watch/providers';
    return this.http.get<TvProviders>(this.url, { headers: this.headers });
  }

  /**
   * Récupère les régions disponibles pour les fournisseurs de contenu.
   * @returns Un observable contenant les régions disponibles.
   */
  getAvailableRegions(): Observable<ProvidersRegions> {
    this.url = 'https://api.themoviedb.org/3/watch/providers/regions?language=en-US';
    return this.http.get<ProvidersRegions>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les fournisseurs de diffusion pour un film donné.
   * @param id - L'identifiant du film.
   * @returns Un Observable contenant les fournisseurs de diffusion pour le film.
   */
  getProvidersMovie(id:string): Observable<ProvidersTvMovie> {
    this.url = 'https://api.themoviedb.org/3/movie/'+id+'/watch/providers';
    return this.http.get<ProvidersTvMovie>(this.url, { headers: this.headers });
  }


  /**
   * Récupère les fournisseurs de télévision pour une série spécifique.
   * @param id - L'identifiant de la série.
   * @returns Un Observable contenant les fournisseurs de télévision pour la série spécifiée.
   */
  getProvidersTv(id:string): Observable<ProvidersTvMovie> {
    this.url = 'https://api.themoviedb.org/3/tv/'+id+'/watch/providers';
    return this.http.get<ProvidersTvMovie>(this.url, { headers: this.headers });
  }
}