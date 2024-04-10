import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const subscriptionRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(
      z.object({
        subscription: z.object({
          endpoint: z.string(),
          keys: z.object({
            p256dh: z.string(),
            auth: z.string(),
          }),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      // check if subscription already exists
      const existingSubscription = await db.pushSubscription.findFirst({
        where: {
          endpoint: input.subscription.endpoint,
        },
      });
      if (existingSubscription) {
        return {
          subscription: existingSubscription,
        };
      }
      const subscription = await db.pushSubscription.create({
        data: {
          endpoint: input.subscription.endpoint,
          p256dh: input.subscription.keys.p256dh,
          auth: input.subscription.keys.auth,
        },
      });

      return {
        subscription,
      };
    }),
  getSubscriptions: publicProcedure.query(async () => {
    const subscriptions = await db.pushSubscription.findMany();
    return {
      subscriptions,
    };
  }),
});
