import { Company } from "./company";
import { Degree } from "./degree";

export interface Internship {
    id: number;
    practiceTitle: string;
    company: Company;
    location: string;
    salary: number;
    modality: "Onsite" | "Remote" | "Hybrid";
    practiceType: "Curricular" | "Extracurricular";
    workday: "Full Time" | "Part Time";
    minimumStudies: string;
    languages: string;
    startDate: Date;
    period: string;
    degree: Degree;
    minimumExperience: string;
    backgroundKnowledge: string;
    description: string;
}