import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export default function GameCarousel() {
    return <Carousel className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} >
                 <div className="p-[10px]">
                <Card className="shadow-none p-0 bg-main text-main-foreground min-h-[200px]">
                  <CardContent className="flex items-center  justify-center p-4">
                    <span className="text-3xl font-base">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
 }