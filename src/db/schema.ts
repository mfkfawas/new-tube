import { relations } from "drizzle-orm"
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("clerk_id").unique().notNull(),
    name: text("name").notNull(),
    // TODO: Add banner fields
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("clerk_id_idx").on(t.clerkId)]
)

// Same apply here(read line 59 NOTE)
export const userRelations = relations(users, ({ many }) => ({
  videos: many(videos),
}))

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("name_idx").on(t.name)]
)

// Same apply here(read line 59 NOTE)
export const categoryRelations = relations(categories, ({ many }) => ({
  videos: many(videos),
}))

export const videos = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  userId: uuid("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  categoryId: uuid("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  description: text("description"),
  // tells the status like: uploading, transcribing,...
  muxStatus: text("mux_status"),
  // assetId will recieved once the asset is created
  muxAssetId: text("mux_asset_id").unique(),
  // upload id is something that we are going to immediately populate when we create the video inside of our videos procedure and then when the webhook comes then we're going to connect the asset with the video.(In DB row we need to know which mux asset belongs to which video)
  muxUploadId: text("mux_upload_id").unique(),
  // playback id comes when asset is created and we're going to use playback to play the video and generate thumbnails/previews.
  muxPlaybackId: text("mux_playback_id").unique(),
  // available only if the video has subtitles
  muxTrackId: text("mux_track_id").unique(),
  // available only if the video has subtitles
  muxTrackStatus: text("mux_track_status"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// NOTE:
// This relation is **not required** for us because we are using **PostgreSQL**,
// which supports foreign key constraints. In our case, the `userId` field in the
// `videos` schema already defines the relationship at the database level.

// However, we are keeping this for **study purposes**.

// When is this actually useful?
// - It's mainly needed for databases like **PlanetScale**, which do **not** support
//   foreign keys at the database level.
// - This relation setup works only **at the app level** with **Drizzle ORM**,
//   and it does **not** apply any constraints in the database itself.
export const videoRelations = relations(videos, ({ one }) => ({
  user: one(users, { fields: [videos.userId], references: [users.id] }),
  category: one(categories, {
    fields: [videos.categoryId],
    references: [categories.id],
  }),
}))
