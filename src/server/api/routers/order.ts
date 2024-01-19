import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const orderRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string(), content: z.string() }))
    .mutation(async ({ input: { name, content }, ctx }) => {
      const food = await ctx.db.food.create({ data: { name, content } });

      return food;
    }),

  createOrder: publicProcedure
    .input(
      z.object({
        cart: z.array(
          z.object({
            description: z.string().optional(),
            price: z.number().optional(),
            title: z.string().optional(),
            image: z
              .object({
                alt: z.string().optional(),
                url: z.string().optional(),
              })
              .optional(),
            tags: z.object({ tag: z.array(z.string()) }).optional(),
            quantity: z.number(),
          })
        ),
        customer: z.object({
          firstName: z.string().min(2),
          lastName: z.string().min(2),
          email: z.string().min(4),
          phone: z.string().min(7),
          comment: z.string().optional(),
        }),
        orderStatus: z.enum(['received', 'ongoing', 'completed']),
        totalPrice: z.number(),
        orderNumber: z.string(),
      })
    )
    .mutation(
      async ({
        input: { cart, customer, orderStatus, totalPrice, orderNumber },
        ctx,
      }) => {
        const newOrder = await ctx.db.order.create({
          data: {
            cart: { dish: cart },
            customer,
            orderStatus,
            totalPrice,
            orderNumber,
          },
        });
        return newOrder;
      }
    ),

  getOrders: publicProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.order.findMany({});
    return orders;
  }),

  changeOrderStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        orderStatus: z.enum(['received', 'ongoing', 'completed']),
      })
    )
    .mutation(async ({ input: { id, orderStatus }, ctx }) => {
      const updatedOrder = await ctx.db.order.update({
        where: { id },
        data: { orderStatus },
      });

      return updatedOrder;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const food = await ctx.db.food.delete({ where: { id } });

      return food;
    }),

  getFoods: publicProcedure.query(async ({ ctx }) => {
    const foods = await ctx.db.food.findMany({});

    return foods;
  }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.food.findFirst({
      orderBy: { createdAt: 'desc' },
    });
  }),
});
