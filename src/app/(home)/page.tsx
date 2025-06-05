import { HomeView } from "@/modules/home/ui/views/home-view"
import { HydrateClient, trpc } from "@/trpc/server"

// NOTE: To solve the build errors of next due to our prefetch here
// if we dont give this next will think this route is static(next dont understand our trpc prefetch query)
export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ categoryId?: string }>
}

// NOTE: In this pattern:
// The Page(server component) are for:
// 1)prefetch things
// 2)To hydrate the client
// 3)To render respective View
const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams
  void trpc.categories.getMany.prefetch()

  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  )
}

export default Page
