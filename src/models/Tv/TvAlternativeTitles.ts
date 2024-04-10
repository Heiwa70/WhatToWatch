export interface TvAlternativeTitles {
    id: number;
    results: {
        iso_3166_1: string;
        title: string;
        type: string;
    }[];
}