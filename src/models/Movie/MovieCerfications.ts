export interface MovieCertifications {
    certifications: {
        [country: string]: {
            certification: string;
            meaning: string;
            order: number;
        }[];
    };
}

