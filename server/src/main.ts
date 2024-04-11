import express, { Express, Request, Response, NextFunction, json } from "express";
import "dotenv/config";
import cors from "cors";
import eventsRouter from "./routes/events.routes";
const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(json())


app.use('/api/v1/events',eventsRouter) 
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});





app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
