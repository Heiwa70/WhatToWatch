export interface MoviesReleaseDates {
    id: number;
    results: {
        iso_3166_1: string;
        release_dates: {
            certification: string;
            descriptors: any[];
            iso_639_1: string;
            note: string;
            release_date: string;
            type: number;
        }[];
    }[];
}