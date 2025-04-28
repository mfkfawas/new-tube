import dotenv from "dotenv"
import { defineConfig } from "drizzle-kit"

dotenv.config({ path: ".env.local" })

export default defineConfig({
  out: "./drizzle", // where migration files will be saved
  schema: "./src/db/schema.ts", // where your TypeScript table schemas are
  dialect: "postgresql", // database type (PostgreSQL)
  dbCredentials: { url: process.env.DATABASE_URL! }, // how to connect to the database
})
