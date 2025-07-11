import { createTRPCRouter } from "../init"
import { categoriesRouter } from "@/modules/categories/server/procedures"
import { studioRouter } from "@/modules/studio/server/procedures"
import { vidoesRouter } from "@/modules/videos/server/procedures"

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  studio: studioRouter,
  videos: vidoesRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
