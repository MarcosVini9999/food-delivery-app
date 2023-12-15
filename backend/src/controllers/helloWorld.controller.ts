import { FastifyReply, FastifyRequest } from "fastify";

async function Show(request: FastifyRequest, reply: FastifyReply) {
  const message = "Hello World!";

  reply.send(message);
}

export { Show };
