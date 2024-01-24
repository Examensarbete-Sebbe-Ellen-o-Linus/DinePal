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

  getTableBookings: protectedProcedure.query(async ({ ctx }) => {
    const tableBookings = await ctx.db.tableBooking.findMany();
    return tableBookings;
  }),

  updateCustomerOfBooking: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        guests: z.string().optional(),
        time: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updatedBooking = await ctx.db.tableBooking.update({
        where: {
          id: input.id,
        },
        data: {
          guests: input.guests,
          time: input.time,
        },
      });
      return updatedBooking;
    }),

  setTableNumberToBooking: protectedProcedure
    .input(z.object({ bookingId: z.string(), tableNumber: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const updatedBooking = await ctx.db.tableBooking.update({
        where: {
          id: input.bookingId,
        },
        data: {
          tableNumber: input.tableNumber,
        },
      });

      return updatedBooking;
    }),

  addTable: protectedProcedure
    .input(z.object({ tableNumber: z.number(), size: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const newTable = await ctx.db.table.create({
        data: {
          ...input,
        },
      });

      return newTable;
    }),

  getTables: protectedProcedure.query(async ({ ctx }) => {
    const tables = await ctx.db.table.findMany();

    return tables;
  }),

  removeTable: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const removedTable = await ctx.db.table.delete({
        where: {
          id: input.id,
        },
      });

      return removedTable;
    }),
});
