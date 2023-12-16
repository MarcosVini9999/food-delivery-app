import { FastifyRequest } from "fastify";

export interface IFastifyRequestWithUser extends FastifyRequest {
  locals: {
    user: {
      id: string;
      name: string | null;
      email: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
}
