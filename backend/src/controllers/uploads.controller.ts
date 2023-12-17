import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import util from "util";
import { pipeline } from "stream";

const pump = util.promisify(pipeline);

async function Upload(request: FastifyRequest, reply: FastifyReply) {
  const parts = request.files();

  for await (const part of parts)
    await pump(part.file, fs.createWriteStream(`./uploads/${part.filename}`));

  reply.status(201).send({ message: "File uploaded successfully" });
}

export { Upload };
