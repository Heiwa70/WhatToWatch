interface SearchCollectionMovies {
    page : number;
    results : {
        adult : boolean;
        backdrop_path : string;
        id : number;
        name : string;
        original_language : string;
        original_title : string;
        overview : string;
        poster_path : string;
    }[];
    }