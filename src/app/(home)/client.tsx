"use client"

import { trpc } from "@/trpc/client"

export function PageClient() {
  const [data] = trpc.hello.useSuspenseQuery({ text: "fawas" })
  return <div>page client says {data.greeting}</div>
}
