export interface TvCertifications {
    certifications: {
        [country: string]: {
            certification: string;
            meaning: string;
            order: number;
        }[];
    };
}
