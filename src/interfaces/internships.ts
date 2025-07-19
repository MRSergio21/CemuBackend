import { Company } from "./company";
import { Degree } from "./degree";
import { Modality, InternshipType, Workday } from "@prisma/client";

export interface Internship {
    id: number;
    internshipTitle: string;
    internshipLocation: string;
    salary: number | null;
    modality: Modality;
    internshipType: InternshipType;
    workday: Workday;
    minimumStudies: string;
    languages: string;
    startDate: Date;
    period: string;
    minimumExperience: string;
    backgroundKnowledge: string;
    description: string;
    degree: Degree;
    company: Company;
}

export interface InternshipInput {
  internshipTitle: string;
  internshipLocation: string;
  salary: number | null;
  modality: Modality;
  internshipType: InternshipType;
  workday: Workday;
  minimumStudies: string;
  languages: string;
  startDate: string;
  period: string;
  minimumExperience: string;
  backgroundKnowledge: string;
  description: string;
  degree_id: number | null;
  company_id: number;
}