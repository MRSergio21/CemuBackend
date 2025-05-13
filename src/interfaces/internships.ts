import { Company } from "./company";
import { Grade } from "./grade";

export interface Practice {
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
    degree: Grade;
    minimumExperience: string;
    backgroundKnowledge: string;
    description: string;
}