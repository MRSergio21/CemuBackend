import { Internship } from "../interfaces/internships";

export interface Request {
    id?: number;
    nameStudent: string;
    lastnameStudent: string;
    email: string;
    cv: string;
    status: boolean;
    internship_id: Internship;
}

export interface RequestInput {
    nameStudent: string;
    lastnameStudent: string;
    email: string;
    cv: string;
    status: boolean;
    internship_id: number;
}