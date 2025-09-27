"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import GameCarousel from "@/components/home/GameCarousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import learnImg from "/homePage/learn.png";
import gamesImg from "/homePage/games.png";
import rankImg from "/homePage/leaderboard.png";

export default function HomePage() {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(true);

  const buttons = [
    { id: 1, img: learnImg, label: "Learn", route: "/learn" },
    { id: 2, img: gamesImg, label: "Quiz", route: "/quiz" },
    { id: 3, img: rankImg, label: "Shop", route: "/shop" },
  ];

  const modules = [
    {
      title: "Physics Fundamentals",
      desc: "Explore motion, forces, and energy to understand how the physical world works.",
    },
    {
      title: "Introduction to Chemistry",
      desc: "Learn about atoms, molecules, and reactions that form the basis of matter.",
    },
    {
      title: "Biology & Life Sciences",
      desc: "Dive into cells, ecosystems, and genetics to see how living things thrive.",
    },
    {
      title: "Mathematics Essentials",
      desc: "Strengthen problem-solving skills with algebra, geometry, and basic calculus.",
    },
    {
      title: "Computer Science Basics",
      desc: "Discover programming logic, algorithms, and how computers process data.",
    },
    {
      title: "Engineering & Design",
      desc: "Apply science and math to design solutions for real-world challenges.",
    },
  ];

  return (
    <div className="relative">
      {/* Animated Overlay */}

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Dialog Box */}
            <motion.div
              className="bg-white/90 p-6 rounded-xl shadow-xl text-center max-w-md mx-4"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <h1 className="text-2xl font-bold mb-4">New Streak Achieved!</h1>
              <p>You have been logging in daily for 10 days!</p>
              <img
                src="/home/streak_achievement.png"
                alt="celebration"
                className="mx-auto my-4 rounded-[40px]"
              />
              <Button size="lg" onClick={() => setShowOverlay(false)}>
                Next
              </Button>
            </motion.div>

            {/* Bottom-left GIF */}
            <motion.img
              src="mascots/waving_mascot.gif" // place your GIF inside /public
              alt="corner gif"
              className="absolute bottom-15 right-14 w-24 h-24"
              initial={{ opacity: 0, scale: 3 }}
              animate={{ opacity: 1, scale: 4 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <TopBar />
      <div className="flex flex-col px-2 mt-5">
        {/* top buttons */}
        <div className="flex px-2 mb-3 gap-2">
          {buttons.map((button) => (
            <div
              key={button.id}
              className="flex flex-col items-center basis-1/3 cursor-pointer"
              onClick={() => navigate(button.route)}
            >
              <Card
                className="w-full aspect-square overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${button.img})` }}
              />
              <p className="mt-2 text-lg font-medium">{button.label}</p>
            </div>
          ))}
        </div>

        <GameCarousel />

        <div className="mt-6 mb-4 mx-2">
          <h2 className="text-2xl font-semibold mb-4">Recent Modules</h2>
          <div className="columns-2 gap-4 space-y-4">
            {modules.map((module, index) => (
              <Card
                key={index}
                className="break-inside-avoid p-4 bg-main text-main-foreground"
              >
                <h3 className="text-lg font-medium mb-2">{module.title}</h3>
                <p className="text-sm">{module.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
