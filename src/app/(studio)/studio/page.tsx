import { HydrateClient, trpc } from "@/trpc/server"
import { StudioView } from "@/modules/studio/ui/views/studio-view"
import { DEFAULT_LIMIT } from "@/constants"

export default async function Page() {
  //NOTE: If you are using prefetchInfinite() then you have to use useSuspenseInfiniteQuery() in the corr client component where you are trying to use this prefetched data
  void trpc.studio.getMany.prefetchInfinite(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      pages: 1, // Prefetch only the first page initially
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  )

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  )
}
