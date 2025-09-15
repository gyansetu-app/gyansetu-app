import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import ImageCard from "@/components/ui/game-carousel-item";

export default function GameCarousel() {
  const items = [
    { caption: "Rasyan: Compound Building Game", image: "home/game_posters/slide_0.png" },
    { caption: "Ballebaaz: Trigonometry Puzzle", image: "home/game_posters/slide_1.png" },
    { caption: "Aanganwadi: Virtual Village", image: "home/game_posters/slide_2.png" },
    {
      caption: "Fun Lab",
      image: "home/game_posters/slide_3.png",
      link: "https://sandboxels.r74n.com/"
    },
  ];

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-[10px] flex flex-col items-center w-full">
              {item.link ? (
                <a
                  href={item.link}
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <ImageCard
                    caption={item.caption}
                    className="w-full"
                    imageUrl={item.image}
                  />
                </a>
              ) : (
                <ImageCard
                  caption={item.caption}
                  className="w-full"
                  imageUrl={item.image}
                />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
