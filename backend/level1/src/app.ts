import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import {TargetController} from "shared";
import {container} from "tsyringe";
import {z} from "zod";

// Context
// =======

export const createContext = (ctx: trpcExpress.CreateExpressContextOptions) => {
  return ctx;
};
type Context = trpc.inferAsyncReturnType<typeof createContext>;

function createRouter() {
  return trpc.router<Context>();
}

// Procedures
// ==========

const targetController = container.resolve(TargetController)
const targetsRouter = createRouter().query("perMonth", {
  input: z.object({month: z.number().gte(1).lte(12), year: z.number()}),
  resolve: async (req) => {
    const {month, year} = req.input
    return await targetController.getTargetsPerMonthForYear(Number(month), Number(year))
  },
});

// Root Router
// ==========

export const appRouter = createRouter().merge("targets.", targetsRouter);

export type AppRouter = typeof appRouter;
