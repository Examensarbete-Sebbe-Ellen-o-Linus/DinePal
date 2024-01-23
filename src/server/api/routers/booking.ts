import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const bookingRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string(), content: z.string() }))
    .mutation(async ({ input: { name, content }, ctx }) => {
      const food = await ctx.db.food.create({ data: { name, content } });

      return food;
    }),

  createTableBooking: publicProcedure
    .input(
      z.object({
        tableNumber: z.number(),
        date: z.date(),
        time: z.string(),
        email: z.string().min(4),
        commentary: z.string().optional(),
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        phone: z.string().min(7),
        guests: z.number(),
        bookingStatus: z.enum([
          'received',
          'booked',
          'cancelled',
          'bookedAndConfirmed',
        ]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newTableBooking = await ctx.db.tableBooking.create({
        data: {
          ...input,
        },
      });
      return newTableBooking;
    }),
});
