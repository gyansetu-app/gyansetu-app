import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import ImageCard from '@/components/ui/image-card'

export default function GameCarousel() {
  const captions = [
    "Rasayan: Compound Building Game",
    "Ballebaaz: Trigonometry Puzzle",
    "Aanganwadi: Virtual Village",
    "Experimental Fun Lab"
  ]
  return <Carousel className="w-full">
    <CarouselContent>
      {Array.from({ length: 4 }).map((_, index) => (
        <CarouselItem key={index} >
          <div className="p-[10px]">
            <ImageCard
              caption={captions[index % captions.length]}
              className="w-full"
              imageUrl={`home/game_posters/slide_${index}.png`}></ImageCard>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
}