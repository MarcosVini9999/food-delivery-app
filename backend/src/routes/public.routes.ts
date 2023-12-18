import { FastifyInstance } from "fastify";
import { Login } from "@/controllers/login.controller";
import * as path from "path";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "url";

export async function publicRoutes(app: FastifyInstance) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.post("/login", Login);
  app.register(fastifyStatic, {
    root: path.resolve(__dirname, "../uploads"),
    prefix: "/uploads/",
  });
}
