export interface MoviesTitlesAlternative {
    id: number;
    titles: {
        iso_3166_1: string;
        title: string;
        type: string;
    }[];
}