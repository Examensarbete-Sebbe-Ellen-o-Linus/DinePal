import { orderRouter } from '~/server/api/routers/order';
import { createTRPCRouter } from '~/server/api/trpc';
import { bookingRouter } from './routers/booking';
import { userRouter } from './routers/user';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  order: orderRouter,
  allowedUsers: userRouter,
  booking: bookingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
