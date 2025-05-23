import { Response } from "express";

export const parseId = (idParam: string): number | null => {
  const id = parseInt(idParam, 10);
  return isNaN(id) ? null : id;
};

export const successResponse = (res: Response, data: unknown, statusCode = 200): void => {
  res.status(statusCode).json(data);
};

export const errorResponse = (res: Response, message: string, statusCode = 500): void => {
  res.status(statusCode).json({ error: message });
};

export const notFoundResponse = (res: Response, message = "Resource not found"): void => {
  res.status(404).json({ message });
};

export const invalidIdResponse = (res: Response): void => {
  res.status(400).json({ error: "Invalid ID" });
};
