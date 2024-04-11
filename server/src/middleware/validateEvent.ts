import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import eventSchema from "../schemas/eventSchema";
const ajv = new Ajv();

export default function validateEvent(req: Request, res: Response, next: NextFunction) {
    try {
        const valid = ajv.validate(eventSchema, req.body);
        if (!valid) {
            return res.status(400).send(ajv.errors);
        }
        next();
    } catch (error) {
        next(error);
    }
}
