import fastify, { FastifyInstance } from "fastify";
import helloWorldRoutes from "./routes/helloWorld.routes";
import cors from "@fastify/cors";

const app: FastifyInstance = fastify({ logger: true });

app.register(cors, { origin: true });

app.register(helloWorldRoutes);

const port = Number(process.env.PORT) || 3333;

app.listen(
  {
    port,
  },
  (err) => {
    if (err) console.error(err);
    else console.log(`FOOD API Running on http://localhost:${port}`);
  }
);
