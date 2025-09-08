import { PrismaClient } from "@prisma/client";
import { RequestInput } from "../interfaces/request";

const prisma = new PrismaClient();

export const insertRequest = async (data: RequestInput) => {
    if (data.internship_id === null) {
        throw new Error("internship_id cannot be null");
    }
    return await prisma.request.create({
        data,
        include: {
            internship: {
                include: {
                    company: true,
                    degree: true,
                }
            },
        },
    });
}

export const getRequests = async () => {
    return await prisma.request.findMany({
        include: {
            internship: {
                include: {
                    company: true,
                    degree: true,
                }
            },
        },
    });
}

export const getRequest = async (id: string) => {
    return await prisma.request.findUnique({
        where: { id: Number(id) },
        include: {
            internship: {
                include: {
                    company: true,
                    degree: true,
                }
            },
        },
    });
}

export const updateRequest = async (id: string, data: RequestInput) => {
    if (data.internship_id === null) {
        throw new Error("internship_id cannot be null");
    }
    return await prisma.request.update({
        where: { id: Number(id) },
        data,
        include: {
            internship: {
                include: {
                    company: true,
                    degree: true,
                }
            },
        },
    });
}