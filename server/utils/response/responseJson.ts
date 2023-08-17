import { Response } from "express";
import { generateUUID } from "../generate_token/sign_uuid";
export function sendJsonResponse(res: Response, statusCode: number, data: any) {
  res.status(statusCode).json({
    requestId: generateUUID(),
    ...data,
  });
}
