import { Request, Response, NextFunction } from "express";
import calculatePaginationOffset from "../utils/calculatePaginateOffset";
import execute from "../services/sql.service";
import IEvent from "../types/IEvent";
import { UpdateQueryResults } from "../types/UpdateQueryResult";
import ResponseObject from "../types/ResponseObject";

import { v4 as uuid } from "uuid";

export async function getEvents(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const page_number = req.query.page_number as string;
        const per_page = req.query.per_page as string;
        const pageNumber = parseInt(page_number) >= 1 ? parseInt(page_number) : 1;
        const perPage =
            per_page && parseInt(per_page) >= 1 ? parseInt(per_page) : 10;
        const offset = calculatePaginationOffset(pageNumber, perPage).toString();
        const query: string = `SELECT * FROM events LIMIT ${perPage} OFFSET ${offset}`;
        const events = await execute<IEvent[]>(query);
        const response: ResponseObject<IEvent[]> = { data: events };

        res.send(response);
    } catch (error) {
        next(error);
    }
}

export async function getEvent(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const page_number = req.query.page_number as string;
        const per_page = req.query.per_page as string;
        const id: string = req.params.id;
        const pageNumber = parseInt(page_number) >= 1 ? parseInt(page_number) : 1;
        const perPage =
            per_page && parseInt(per_page) >= 1 ? parseInt(per_page) : 10;
        const offset = calculatePaginationOffset(pageNumber, perPage).toString();
        const query: string = `SELECT * FROM events WHERE id='${id}' LIMIT ${perPage} OFFSET ${offset}`;
        const events = await execute<IEvent[]>(query);
        const response: ResponseObject<IEvent[]> = { data: events };

        res.send(response);
    } catch (error) {
        next(error);
    }
}

export async function createEvent(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const { title, description, date, location } = req.body;
        const eventId: string = uuid();
        const newDate = new Date(date).toISOString().slice(0, 19).replace("T", " ");
        const query: string = `INSERT INTO events (id, title, description, date, location) VALUES ('${eventId}', '${title}', '${description}', '${newDate}', '${location}')`;
        const events = await execute<IEvent[]>(query);
        const response: ResponseObject<IEvent[]> = { data: events };

        res.send(response);
    } catch (error) {
        next(error);
    }
}

export async function updateEvent(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const { title, description, date, location } = req.body;
        const id = req.params.id;
        const formattedDate = new Date(date)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        const updateQuery = `UPDATE Events SET title='${title}', description='${description}', date='${formattedDate}', location='${location}' WHERE id='${id}'`;
        const events = await execute<UpdateQueryResults>(updateQuery);
        const response: ResponseObject<UpdateQueryResults> = { data: events };
        res.send(response);
    } catch (error) {
        next(error);
    }
}

export async function deleteEvent(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const id = req.params.id;
        const deleteQuery = `DELETE FROM Events WHERE id='${id}'`;
        const events = await execute<UpdateQueryResults>(deleteQuery);
        const response: ResponseObject<UpdateQueryResults> = { data: events };
        res.send(response);
    } catch (error) {
        next(error);
    }
}
export async function getEventCount(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const query: string = `SELECT COUNT(*) as count FROM events`;
        
        const count = await execute<{count: number}>(query);
        const response: ResponseObject<{count: number}> = { data: count };

        res.send(response);
    } catch (error) {
        next(error);
    }
}
