import { db } from "@/db"
import { categories } from "@/db/schema"

const categoryNames = [
  "Cars and vehicles",
  "Comedy",
  "Education",
  "Gaming",
  "Entertainment",
  "Film and Animation",
  "How-to and style",
  "Music",
  "News and politics",
  "People and blogs",
  "Pet and animals",
  "Science and technology",
  "Sports",
  "Travel and events",
]

async function main() {
  console.log("seeding categories")

  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Videos related to ${name.toLowerCase()}`,
    }))

    await db.insert(categories).values(values)

    console.log("categories seeded succesfully!")
  } catch (error) {
    console.error("Error seeding categories", error)
    process.exit(1)
  }
}

main()
