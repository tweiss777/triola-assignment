import { Router } from "express";
import {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getEventCount,
} from "../controllers/events.controller";

const eventsRouter: Router = Router();

eventsRouter.route("/count").get(getEventCount)
eventsRouter.route("/").get(getEvents);
eventsRouter.route("/").post(createEvent);

eventsRouter.route("/:id").get(getEvent);
eventsRouter.route("/:id").delete(deleteEvent);
eventsRouter.route("/:id").put(updateEvent);
export default eventsRouter
