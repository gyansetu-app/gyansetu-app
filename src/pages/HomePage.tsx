"use client";

import TopBar from "@/components/TopBar";
import GameCarousel from "@/components/home/GameCarousel";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

import learnImg from "/homePage/learn.png";
import gamesImg from "/homePage/games.png";
import rankImg from "/homePage/leaderboard.png";

export default function HomePage() {
  const navigate = useNavigate();

  const buttons = [
    { id: 1, img: learnImg, label: "Learn", route: "/learn" },
    { id: 2, img: gamesImg, label: "Games", route: "/games" },
    { id: 3, img: rankImg, label: "Rank", route: "/rank" },
  ];

  return (
    <>
      <TopBar />
      <div className="flex flex-col px-2">
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
      </div>
    </>
  );
}
