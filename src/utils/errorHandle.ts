import { Response } from "express";

const handleHttp = (
  res: Response,
  message: string,
  errorRaw?: unknown
): void => {
  if (process.env.NODE_ENV !== "production" && errorRaw) {
    console.error("Error Raw:", errorRaw);
  }

  res.status(500).json({
    error: message,
    ...(process.env.NODE_ENV !== "production" && errorRaw
      ? { details: String(errorRaw) }
      : {}),
  });
};

export { handleHttp };