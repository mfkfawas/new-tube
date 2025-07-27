import { db } from "@/db"
import { videos } from "@/db/schema"
import { mux } from "@/lib/mux"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
// import { TRPCError } from "@trpc/server"

export const vidoesRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.user

    // throw new TRPCError({ code: "BAD_REQUEST", message: "Specific Message" })

    // NOTE: the logic is mux immediately while uploading gives us some data(eg: upload.id), then while the upload finishes it sends webohook(which we are handling in api/videos/webhook)
    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        // metadata to know which user uploaded, upload sometime take long time and when done mux send a webhook, so we need to know which user uploaded the corr video.
        passthrough: userId,
        playback_policy: ["public"],
        // mp4_support: "standard",
      },
      cors_origin: "*", // TODO: In production, set to our URL
    })

    const [video] = await db
      .insert(videos)
      .values({
        userId,
        title: "Untitled",
        // we're waiting for a video to be uploaded.
        muxStatus: "waiting",
        muxUploadId: upload.id,
      })

      .returning()

    return { video, url: upload.url }
  }),
})
