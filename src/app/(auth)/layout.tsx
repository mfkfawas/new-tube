import { PropsWithChildren } from "react"

export default function Layout({ children }: PropsWithChildren) {
  return <div className="grid place-items-center min-h-screen">{children}</div>
}
