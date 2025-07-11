import { db } from "@/db"
import { videos } from "@/db/schema"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { and, desc, eq, lt, or } from "drizzle-orm"
import { z } from "zod"

export const studioRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({ id: z.string().uuid(), updatedAt: z.date() })
          .nullish(),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input
      const { id: userId } = ctx.user

      const data = await db
        .select()
        .from(videos)
        .where(
          and(
            eq(videos.userId, userId),
            // Cursor pagination needs:
            //    A stable sort order (usually timestamp + ID)
            //    Conditions to get records "before" or "after" the cursor
            //    Tiebreakers for duplicate sort values
            cursor
              ? or(
                  // Get records older than cursor
                  lt(videos.updatedAt, cursor.updatedAt),
                  // OR if same timestamp: then by ID as tiebreaker
                  and(
                    eq(videos.updatedAt, cursor.updatedAt),
                    lt(videos.id, cursor.id)
                  )
                )
              : undefined
          )
        )
        // Newest first by updatedAt, then by ID as tiebreaker
        .orderBy(desc(videos.updatedAt), desc(videos.id))
        // Add 1 to the limit requested from FE so that to check if there is more data
        .limit(limit + 1)

      const hasMore = data.length > limit
      // Remove the last item if there is more data

      const items = hasMore ? data.slice(0, -1) : data
      // Set the next cursor to the last item if there is more data.
      const lastItem = items[items.length - 1]
      const nextCursor = hasMore
        ? { id: lastItem.id, updatedAt: lastItem.updatedAt }
        : null

      return { items, nextCursor }
    }),
})
