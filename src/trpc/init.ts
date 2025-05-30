import { auth } from "@clerk/nextjs/server"
import { initTRPC } from "@trpc/server"
import { cache } from "react"
import superjson from "superjson"

// NOTE: This context would be available for every single API call that you do, so we need to keep it light as possible
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */

  // NOTE: This auth() method will not make any API call instead destructure, so this would be lightweight.
  const { userId } = await auth()
  return { clerkUserId: userId }
})
export type Context = Awaited<ReturnType<typeof createTRPCContext>>

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
})
// Base router and procedure helpers
export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure
