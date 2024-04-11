import { JSONSchemaType } from "ajv";
import IEvent from "../types/IEvent";

const eventSchema: JSONSchemaType<IEvent> = {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      title: {
        type: "string",
      },
      description: {
        type: "string",
      },
      date: {
        type: "string",
      },
      location: {
        type: "string",
      },
    },
    required: ["location", "title", "description", "date"],
  };
  