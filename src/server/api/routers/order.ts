/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const orderRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string(), content: z.string() }))
    .mutation(async ({ input: { name, content }, ctx }) => {
      const food = await ctx.db.food.create({ data: { name, content } });

      return food;
    }),

  createWithSocket: publicProcedure
    .input(z.object({}))
    .mutation(async ({ input: {}, ctx }) => {
      // const food = await ctx.db.food.create({ data: { name, content } });
      const order = 'order from backend';

      // Skicka till socket servern
      fetch('https://14d1-92-35-35-90.ngrok-free.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Notification sent', data);
        })
        .catch(error => {
          console.error('Error sending notification', error);
        });

      return order;
    }),

  getOrders: publicProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.food.findMany({});
    return orders;
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

// export const orderRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   create: publicProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ ctx, input }) => {
//       // simulate a slow db call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       return ctx.db.post.create({
//         data: {
//           name: input.name,
//         },
//       });
//     }),

//   getLatest: publicProcedure.query(({ ctx }) => {
//     return ctx.db.post.findFirst({
//       orderBy: { createdAt: 'desc' },
//     });
//   }),
// });
