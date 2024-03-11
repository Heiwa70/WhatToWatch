export interface TvTranslations {
    id: number;
    translations: {
        iso_3166_1: string;
        iso_639_1: string;
        name: string;
        english_name: string;
        data: {
            name: string;
            overview: string;
            homepage: string;
            tagline: string;
        };
    }[];
}