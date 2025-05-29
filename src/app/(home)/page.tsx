import { HydrateClient, trpc } from "@/trpc/server"
import { PageClient } from "./client"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

export default async function Page() {
  void trpc.hello.prefetch({ text: "Fawas" })

  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  )
}
