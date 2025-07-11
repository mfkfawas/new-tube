import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useEffect } from "react"
import { Button } from "./ui/button"

interface InfiniteScrollProps {
  isManual?: boolean // for manual fetch
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

export const InfiniteScroll = ({
  isManual = false,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: InfiniteScrollProps) => {
  const { isIntersecting, targetRef } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "100px",
  })

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage && !isManual) {
      fetchNextPage()
    }
  }, [isManual, hasNextPage, isFetchingNextPage, fetchNextPage, isIntersecting])

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div ref={targetRef} className="h-1">
        {hasNextPage ? (
          <Button
            variant="secondary"
            disabled={!hasNextPage && isFetchingNextPage}
            // NOTE: like a fallback, if in case intersection doesnt works/isManual is true then allow for manual fetch
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground">
            You have reached the end of the list
          </p>
        )}
      </div>
    </div>
  )
}
