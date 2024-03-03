import { z } from "zod";
import { NHLResult } from "~/lib/nhlresult";
import httpGet from "~/lib/utils";

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
  testFetch: publicProcedure.query(async () => {
    const data = httpGet("https://api-web.nhle.com/v1/schedule/now");

    return data;
  }),
});
