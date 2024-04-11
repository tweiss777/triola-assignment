import { Router } from "express";
import {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getEventCount,
} from "../controllers/events.controller";
import validateEvent from "../middleware/validateEvent";

const eventsRouter: Router = Router();

eventsRouter.route("/count").get(getEventCount)
eventsRouter.route("/").get(getEvents);
eventsRouter.route("/").post(validateEvent,createEvent);

eventsRouter.route("/:id").get(getEvent);
eventsRouter.route("/:id").delete(deleteEvent);
eventsRouter.route("/:id").put(validateEvent,updateEvent);
export default eventsRouter
