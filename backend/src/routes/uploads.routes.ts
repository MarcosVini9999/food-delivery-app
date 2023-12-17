import { FastifyInstance } from "fastify";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Upload } from "@/controllers/uploads.controller";

export async function uploadRoute(app: FastifyInstance) {
  app.addHook("preHandler", authMiddleware);
  app.post("/upload", Upload);
}
