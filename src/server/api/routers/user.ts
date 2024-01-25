import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const userRouter = createTRPCRouter({
  addUser: publicProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ input: { username }, ctx }) => {
      const user = await ctx.db.allowedUsers.create({ data: { username } });
      return user;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const allUsers = await ctx.db.allowedUsers.findMany();
      if (allUsers.length === 1) {
        return Error('Cannot delete the last user');
      }

      const user = await ctx.db.allowedUsers.delete({ where: { id } });

      return user;
    }),

  getUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.allowedUsers.findMany();

    return users;
  }),
});
