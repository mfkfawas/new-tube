import { PropsWithChildren } from "react"
import { StudioLayout } from "@/modules/studio/ui/layouts/studio-layout"

export default function Layout({ children }: PropsWithChildren) {
  return <StudioLayout>{children}</StudioLayout>
}
