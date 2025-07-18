"use client"

import { toast } from "sonner"
import { Loader2Icon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { trpc } from "@/trpc/client"
import { ResponsiveModal } from "@/components/responsive-modal"

export const StudioUploadModal = () => {
  const utils = trpc.useUtils()
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success("Video Created!")
      // NOTE: While our page uses server components (SC) with initial data prefetching,
      // we don't need explicit revalidation for the page itself. The prefetch only handles
      // the initial load - subsequent updates are managed through our client-side cache(refer app/(home)/trpc-usage-ss.png).
      // By invalidating the 'studio.getMany' query here, we trigger an automatic refetch
      // from our data cache, which will then update the UI with the fresh data.
      // This approach maintains consistency while being more efficient than full page revalidation.
      utils.studio.getMany.invalidate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => create.mutate()}
        disabled={create.isPending}
      >
        {create.isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <PlusIcon />
        )}
        Create
      </Button>

      <ResponsiveModal
        title="Upload a video"
        // NOTE: !!create.data is only true if create mutation is success
        open={!!create.data}
        // NOTE: !!create.reset() will reset the mutation which means there will be no longer having create.data
        onOpenChange={() => create.reset()}
      >
        This is an updloader
      </ResponsiveModal>
    </>
  )
}
