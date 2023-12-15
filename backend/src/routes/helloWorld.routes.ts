import { FastifyInstance } from "fastify";

import { Show } from "../controllers/helloWorld.controller";

async function helloWorldRoutes(app: FastifyInstance) {
  app.get("/hello-world", Show);
}

export default helloWorldRoutes;
