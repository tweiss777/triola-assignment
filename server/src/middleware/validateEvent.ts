import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import eventSchema from "../schemas/eventSchema";
const ajv = new Ajv();

ajv.addKeyword({
  keyword: "notEmpty",
  validate: (flag: boolean, data: string) => {
    return typeof data === "string" && data.trim().length > 0;
  },

  errors: true,
});
export default function validateEvent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const valid = ajv.validate(eventSchema, req.body);
    if (!valid) {
      return res.status(400).send(ajv.errors?.map((error) => error.message));
    }
    next();
  } catch (error) {
    next(error);
  }
}
