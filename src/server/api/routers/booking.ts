import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';

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
        tableNumber: z.number().optional(),
        date: z.date(),
        time: z.string(),
        email: z.string().min(4),
        commentary: z.string().optional(),
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        phone: z.string().min(7),
        guests: z.string(),
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

  changeTableBookingStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        bookingStatus: z.enum([
          'received',
          'booked',
          'cancelled',
          'bookedAndConfirmed',
        ]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updatedTableBooking = await ctx.db.tableBooking.update({
        where: {
          id: input.id,
        },
        data: {
          bookingStatus: input.bookingStatus,
        },
      });
      return updatedTableBooking;
    }),

  deleteTableBooking: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const deletedTableBooking = await ctx.db.tableBooking.delete({
        where: {
          id: input.id,
        },
      });
      return deletedTableBooking;
    }),

  getTableBookings: protectedProcedure
    // .input(z.object({}))
    .query(async ({ ctx }) => {
      const tableBookings = await ctx.db.tableBooking.findMany();
      return tableBookings;
    }),
});
