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
        { id: 2, img: gamesImg, label: "Quiz", route: "/quiz" },
        { id: 3, img: rankImg, label: "Shop", route: "/shop" },
    ];

    return (
        <div className="">
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

                {/* Learn topics masonry */}
                <div className="mt-6 mb-4 mx-2">
                    <h2 className="text-2xl font-semibold mb-4">Recent Modules</h2>
                    <div className="columns-2 gap-4 space-y-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Card key={index} className="break-inside-avoid p-4 bg-main text-main-foreground">
                                <h3 className="text-lg font-medium mb-2">Topic {index + 1}</h3>
                                <p className="text-sm">
                                    This is a brief description of Topic {index + 1}. It provides an overview of what you will learn.
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
