import { FastifyInstance } from "fastify";
import { Login } from "@/controllers/login.controller";

export async function publicRoutes(app: FastifyInstance) {
  app.post("/login", Login);
}
