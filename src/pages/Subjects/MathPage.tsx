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
      title: "Projectile Motion",
      module: "Kinematics",
      progress: 70,
      image:
        "https://media.istockphoto.com/id/1045529612/photo/physics-formula-chalkboard-kinematics-calculation.jpg?s=612x612&w=0&k=20&c=xeIKMTTNrEIAm2_v_aB9yGO7XyMEt_tUmfwAGWrOnOk=",
    },
    {
      id: 2,
      title: "Pendulum Motion",
      module: "Dynamics",
      progress: 40,
      image:
        "https://t4.ftcdn.net/jpg/00/88/77/47/360_F_88774737_rteelY3QeIgcysysRUtUejr2QK038Nbp.jpg",
    },
    {
      id: 3,
      title: "Spherical Mirrors",
      module: "Optics",
      progress: 90,
      image:
        "https://repository-images.githubusercontent.com/52271379/0955fbcb-beb4-435a-b73f-3bbb8572c5d9",
    },
    {
      id: 4,
      title: "Voltage and Current",
      module: "Electricity",
      progress: 20,
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/071/065/554/small/lightning-bolt-on-black-background-photo.jpeg",
    },
  ];
  return (
    <>
      <TopBar />
      <div className="relative h-screen w-screen flex flex-col items-start justify-start">
        <div className="absolute inset-0 bg-[url('/physics_background.png')] bg-cover bg-center opacity-30"></div>
        <p className="relative text-3xl text-(--main-foreground) mx-3 mt-5 z-10">
          Physics at a Glance
        </p>
        {/* 4 Button grid */}
        {/* top buttons */}
        <div className="flex px-2 mb-3 mt-4 gap-2 z-20 w-95 mx-4 items-center">
          {buttons.map((button) => (
            <div
              key={button.id}
              className="flex flex-col items-center basis-1/3 cursor-pointer"
            >
              <Card
                className="w-full aspect-square overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${button.img})` }}
              />
              <p className="mt-2 text-lg font-medium">{button.label}</p>
            </div>
          ))}
        </div>
        <p className="text-2xl mx-5 z-10">Assigned Modules</p>
        <div className=" relative z-10 mt-3 mx-5 mb-10">
          {topics.map((topic) => (
            // Set max height to 40
            <Card
              className="mt-3 w-110 bg-white max-h-40"
              // navigate to /learn/progress
              onClick={() => navigate("/learn/progress")}
            >
              <CardContent>
                <div className="flex flex-col">
                  <div className="flex">
                    <Avatar>
                      <AvatarImage src={topic.image} />
                      <AvatarFallback>TR</AvatarFallback>
                    </Avatar>
                    <div className="ml-3 mr-1 flex flex-col">
                      <p className="ml-3">{topic.title}</p>
                      <p className="ml-3">
                        Module:{" "}
                        <span className="font-normal"> {topic.module}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-3">
                    <p className="text-xs relative text-(--chart-3)">
                      {topic.progress}% completed
                    </p>
                  </div>
                  <Progress value={topic.progress} className="" />
                  <Button className=" relative w-14 h-14 left-86 -top-26">
                    <Play className="!size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <p className="mt-25">Hello</p>
    </>
  );
}
