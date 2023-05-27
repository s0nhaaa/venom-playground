import { cn } from "@/lib/utils"

export function ResizeSeparator({ direction, ...props }: any) {
  return (
    <hr
      className={cn(
        "h-full",
        " m-0 w-1 shrink-0 cursor-col-resize bg-secondary",
        direction === "horizontal" && "h-[4px] w-full cursor-row-resize"
      )}
      {...props}
    />
  )
}
