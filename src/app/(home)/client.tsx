"use client"

import { trpc } from "@/trpc/client"

export function PageClient() {
  // NOTE: In this new Antonio's trpc pattern every useSuspenseQuery should have following prefetch in corr page.tsx with same param, eg:({ text: "fawas" }) passed
  // we are using the server component(page.tsx) as "loaders"
  // "render as you fetch" concept
  // refer the screenshot in this directory
  // faster load time
  // parallel data loading
  // const [data] = trpc.hello.useSuspenseQuery({ text: "fawas" })
  const [data] = trpc.categories.getMany.useSuspenseQuery()
  return <div>{JSON.stringify(data)}</div>
}
