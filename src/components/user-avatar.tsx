import { cva, VariantProps } from "class-variance-authority"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const avatarVariants = cva("", {
  variants: {
    size: {
      default: "h-9 w-9",
      xs: "h-4 w-4",
      sm: "h-6 w-6",
      lg: "h-10 w-10",
      xl: "h-[160]px w-[160]px",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
  imageUrl: string
  name: string
  className?: string
  onClick?: () => void
}

export function UserAvatar({
  imageUrl,
  name,
  className,
  size,
  onClick,
}: UserAvatarProps) {
  return (
    <Avatar
      className={cn(avatarVariants({ size, className }))}
      onClick={onClick}
    >
      <AvatarImage src={imageUrl} alt={name} />
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
  )
}
