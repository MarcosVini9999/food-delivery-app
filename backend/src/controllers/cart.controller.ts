import { ParamsSchema } from "@/config/zod";
import prisma from "@/database/prisma-client";
import { FastifyReply, FastifyRequest } from "fastify";

async function showCart(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);

  const user = await prisma.user.findUnique({
    where: { id },
    include: { cart: true },
  });

  const cart = await prisma.cart.findMany({
    where: { id: user?.cart[0]?.id },
    include: { cartXProduct: { include: { product: true } } },
  });

  reply.status(200).send(cart);
}

async function addProtuctToCart(request: FastifyRequest, reply: FastifyReply) {
  const { userId, productId, quantity } = request.body as any;

  const user = await prisma.user.findUnique({
    where: { id: String(userId) },
    include: { cart: true },
  });

  await prisma.cartXProduct.create({
    data: {
      cartId: user?.cart[0]?.id,
      productId: productId,
      quantity: quantity,
    },
  });

  reply.status(201);
}

export { showCart, addProtuctToCart };
