export interface TopRatingTvResponse {
    page: number;
    results: TopRatingTv[];
    total_pages: number;
    total_results: number;
}

export interface TopRatingTv {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
}