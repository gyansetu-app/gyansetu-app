import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Play } from "lucide-react"
type Props = {
  imageUrl: string
  caption: string
  className?: string
}

export default function GameCarouselItem({ imageUrl, caption, className }: Props) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-base border-2 border-border bg-main font-base shadow-shadow",
        className,
      )}
    >
      <img className="w-full" src={imageUrl} alt="image" />
      <figcaption className="border-t-2 flex max-h-[50px] justify-between items-center text-main-foreground border-border p-4">
        <span>{caption}</span>
        <Button className=" relative w-15 h-15
          -top-7" variant={"neutral"}>
          <Play className="!size-7" />
        </Button>
      </figcaption>
    </figure>
  )
}
