import { Response } from "express";

/**
 * Envía una respuesta de error HTTP estándar y opcionalmente loguea detalles
 * @param res Express Response object
 * @param message Mensaje genérico de error
 * @param errorRaw Error original capturado (opcional)
 */

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
