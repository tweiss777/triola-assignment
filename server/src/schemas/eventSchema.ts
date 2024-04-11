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
        notEmpty: true,
      },
      description: {
        type: "string",
        notEmpty: true,
      },
      date: {
        type: "string",
        notEmpty: true,
      },
      location: {
        type: "string",
        notEmpty: true,
      },
    },
    required: ["location", "title", "description", "date"],
  };

  export default eventSchema
