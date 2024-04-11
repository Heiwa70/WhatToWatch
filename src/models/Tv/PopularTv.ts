/* export interface PopularTv {
    page: number;
    results: {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        origninal_country: string[];
        original_language: string;
        original_name: string;
        overview: string;
        popularity: number;
        poster_path: string;
        first_air_date: string;
        name: string;
        vote_average: number;
        vote_count: number;
    }[];
} */
/* export interface PopularTv {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origninal_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
} */

export interface PopularTvResponse {
    page: number;
    results: PopularTv[];
    total_pages: number;
    total_results: number;
}

export interface PopularTv {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origninal_country: string[];
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