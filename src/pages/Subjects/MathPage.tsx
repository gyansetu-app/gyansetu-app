import TopBar from "@/components/TopBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MathPage() {
  const navigate = useNavigate();

  const buttons = [
    { id: 1, img: "/theory_image.png", label: "Theory" },
    { id: 2, img: "/practise_image.png", label: "Practise" },
    { id: 3, img: "/virtual_lab.png", label: "Virtual Lab" },
  ];

  const topics = [
    {
      id: 1,
      title: "Fractions and Decimals",
      module: "Number Systems",
      progress: 50,
      image:
        "https://media.istockphoto.com/id/1846143157/photo/back-to-school-background-close-up-colorful-wooden-fractions-on-the-table-mathematics-in.jpg?s=612x612&w=0&k=20&c=-Sp2qIh-9RQHz_FJOxQhF09Cw7OmsvY3EIzMTpAWXXs=",
    },
    {
      id: 2,
      title: "Lines and Angles",
      module: "Foundational Geometry",
      progress: 40,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu0xfQ9-UeDQDPaMEJ04I5kHYm3ZOcMzicUA&s",
    },
    {
      id: 3,
      title: "Integers",
      module: "Number Systems",
      progress: 90,
      image:
        "https://i.pinimg.com/564x/48/9c/85/489c854240c7774d963b661c91601b63.jpg",
    },
    {
      id: 4,
      title: "Data Handling",
      module: "Statistics",
      progress: 20,
      image:
        "https://img.freepik.com/premium-vector/statistics-doodles-equations-math-equation-formula-background_138828-326.jpg",
    },
  ];
  return (
    <>
      <TopBar />
      <div className="relative min-h-screen w-full flex flex-col items-start justify-start overflow-x-hidden">
        <div className="absolute inset-0 bg-[url('/physics_background.png')] bg-cover bg-center opacity-30"></div>

        <p className="relative text-3xl text-(--main-foreground) mx-3 mt-5 z-10">
          Mathematics at a Glance
        </p>

        {/* Buttons grid */}
        <div className="flex flex-row flex-nowrap gap-3 z-20 w-full px-4 mt-6 overflow-x-auto">
          {buttons.map((button) => (
            <div
              key={button.id}
              className="flex flex-col items-center flex-shrink-0 w-28 cursor-pointer"
            >
              <Card
                className="w-full aspect-square overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${button.img})` }}
              />
              <p className="mt-2 text-lg font-medium text-center">
                {button.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-2xl mx-5 mt-6 z-10">Assigned Modules</p>
        <div className="relative z-10 mt-3 px-5 mb-10 w-full max-w-2xl">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className="mt-3 w-full bg-white max-h-40"
              onClick={() =>
                navigate(
                  "/learn/progress?chapter=" +
                    topic.title +
                    "&module=" +
                    topic.module +
                    "&progress=" +
                    topic.progress +
                    "&imgurl=" +
                    topic.image
                )
              }
            >
              <CardContent>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage src={topic.image} />
                      <AvatarFallback>TR</AvatarFallback>
                    </Avatar>
                    <div className="ml-3 flex flex-col">
                      <p>{topic.title}</p>
                      <p>
                        Module:{" "}
                        <span className="font-normal">{topic.module}</span>
                      </p>
                    </div>
                  </div>

                  {/* Progress + Button row */}
                  <div className="flex justify-between items-center mt-3 gap-3">
                    <div className="flex-1">
                      <p className="text-xs text-(--chart-3)">
                        {topic.progress}% completed
                      </p>
                      <Progress value={topic.progress} className="w-full" />
                    </div>
                    <Button className="w-14 h-14 flex items-center justify-center">
                      <Play className="!size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <p className="mt-10 text-center">Hello</p>
    </>
  );
}
