import { z } from "zod";
import { Convert, type ScoresResult } from "~/lib/scoresResult";
import { getDateInAmericanFormat, getLastSunday, httpGet } from "~/lib/utils";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  scheduleNow: publicProcedure.query(async () => {
    const data = httpGet("https://api-web.nhle.com/v1/schedule/" + "now");

    return data;
  }),
  scoresNow: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      if (input === undefined) {
        return null;
      }
      const data = httpGet("https://api-web.nhle.com/v1/score/" + input);

      return data;
    }),
});
