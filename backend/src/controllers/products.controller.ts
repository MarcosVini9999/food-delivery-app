import { ParamsSchema } from "@/config/zod";
import prisma from "@/database/prisma-client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

async function createProduct(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    image_url: z.string(),
    stock: z.number(),
  });

  const { name, description, image_url, price, stock } = BodySchema.parse(request.body);

  const product = await prisma.product.create({
    data: {
      name,
      description,
      image_url,
      price,
      stock,
    },
  });

  return reply.status(201).send(product);
}

async function showProduct(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return reply.status(404).send();

  reply.status(200).send({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image_url: product.image_url,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  });
}

export { createProduct, showProduct };
