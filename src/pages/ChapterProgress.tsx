"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/TopBar";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Book, Play, Gamepad } from "lucide-react"; // import lucide icons

export default function ChapterProgress() {
  const [loading, setLoading] = useState(true);

  // Simulated loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Define checkpoints on the pond
  const checkpoints = [
    {
      id: 6,
      top: 20,
      left: 30,
      label: "Stone 5",
      type: "book",
      status: "locked",
    },
    {
      id: 5,
      top: 30,
      left: 50,
      label: "Stone 4",
      type: "play",
      status: "todo",
    },
    {
      id: 4,
      top: 43,
      left: 45,
      label: "Stone 4",
      type: "play",
      status: "done",
    },
    {
      id: 3,
      top: 56,
      left: 54,
      label: "Stone 3",
      type: "game",
      status: "done",
    },
    {
      id: 2,
      top: 65,
      left: 80,
      label: "Stone 2",
      type: "play",
      status: "revise",
    },
    {
      id: 1,
      top: 80,
      left: 75,
      label: "Stone 1",
      type: "book",
      status: "done",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "book":
        return <Book className="w-5 h-5 text-white" />;
      case "play":
        return <Play className="w-5 h-5 text-white" />;
      case "game":
        return <Gamepad className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <TopBar />

        <div className="relative w-full flex-1 bg-[url('/pond_back.png')] bg-cover bg-center flex items-center flex-col justify-start">
          <img
            src="/mascots/mascot_idle.gif"
            alt="animation"
            className="absolute bottom-35 left-2 w-40 h-40 z-10"
          />
          <AnimatePresence>
            {loading ? (
              <motion.div
                key="loader"
                className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Spinning circle */}
                <motion.div
                  className="w-10 h-10 border-4 border-white border-t-amber-300 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 1,
                  }}
                />
                <p className="mt-2 text-gray-700 font-medium text-sm">
                  Personalizing your learning path
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                className="flex-start w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Progress card */}
                <Card className="mt-3 mx-3 bg-white">
                  <CardContent>
                    <div className="flex flex-col">
                      <div className="flex">
                        <Avatar>
                          <AvatarImage src="https://i.pinimg.com/736x/9f/cf/03/9fcf03460710d991aa56fe671f3e0d58.jpg" />
                          <AvatarFallback>TR</AvatarFallback>
                        </Avatar>
                        <div className="ml-3 mr-1 flex flex-col">
                          <p className="ml-3">Light and Optics</p>
                          <p className="ml-3">
                            Teacher:{" "}
                            <span className="font-normal">Mr. Ram Govind</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between mt-3">
                        <p className="text-xs relative text-(--chart-3)">
                          Stone 26 - 80% completed
                        </p>
                        <p className="text-xs relative text-(--chart-3)">
                          30 Stones
                        </p>
                      </div>
                      <Progress value={80} className="" />
                    </div>
                  </CardContent>
                </Card>

                {/* Checkpoints on pond */}

                {[...checkpoints].reverse().map((cp, index) => (
                  <motion.div
                    key={cp.id}
                    // if status is done, make it green, if revise make it red else yellow
                    className={`absolute p-3 rounded-full border-2 border-white hover:grow-10 cursor-pointer shadow-lg ${
                      cp.status === "done"
                        ? "bg-(--chart-4)"
                        : cp.status === "revise"
                        ? "bg-(--chart-3)"
                        : cp.status === "locked"
                        ? "bg-gray-500"
                        : "bg-yellow-500"
                    }`}
                    style={{ top: `${cp.top}%`, left: `${cp.left}%` }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    // If the point is todo then make it pulse
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 * index, duration: 0.5 }}
                    onClick={() => alert(`You clicked ${cp.label}`)}
                  >
                    {getIcon(cp.type)}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
