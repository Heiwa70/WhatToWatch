export interface MoviesTranslations {
    id : number;
    translations : {
        iso_3166_1 : string;
        iso_639_1 : string;
        name : string;
        english_name : string;
        data : {
            homepage : string;
            overview : string;
            runtime : number;
            tagline : string;
            title : string;
        }
    }[];
}