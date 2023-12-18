import { FastifyReply } from "fastify";
import fs from "fs";
import util from "util";
import { pipeline } from "stream";
import { IFastifyRequestWithUser } from "@/interfaces/IRequestWithUser";
import prisma from "@/database/prisma-client";

const pump = util.promisify(pipeline);

async function Upload(request: IFastifyRequestWithUser, reply: FastifyReply) {
  const parts = request.files();
  const currentTime = new Date().getTime();
  const imagePath = `src/uploads/${currentTime}.jpg`;
  const avatar_url = `uploads/${currentTime}.jpg`;

  for await (const part of parts) {
    await pump(part.file, fs.createWriteStream(imagePath));
  }

  const { id } = request.locals.user;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  await prisma.user.update({
    data: { avatar_url },
    where: { id },
  });

  reply.status(201).send({ message: "File uploaded successfully", avatar_url });
}

export { Upload };
