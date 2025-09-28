"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import GameCarousel from "@/components/home/GameCarousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import learnImg from "/learn_illustration.png";
import gamesImg from "/quiz_illustration.png";
import rankImg from "/visualize_illustration.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import PeerDeviceLoader from "@/components/PeerLoader";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Star, Sword } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(true);
  const { t } = useTranslation();

  const peerlist = [
    {
      id: 1,
      img: "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairNotTooLong&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Brown",
      online: true,
    },
    {
      id: 2,
      img: "https://www.shutterstock.com/image-photo/portrait-confident-young-boy-260nw-1700676295.jpg",
      online: false,
    },
    {
      id: 3,
      img: "https://knot9prod.s3.amazonaws.com/thumbnails/021030/hover_021030017.jpg",
      online: false,
    },
    {
      id: 4,
      img: "https://static.vecteezy.com/system/resources/previews/010/714/887/large_2x/stray-dog-on-a-floor-photo.jpg",
      online: true,
    },
    {
      id: 5,
      img: "https://c.ndtvimg.com/2025-07/emtfht5o_student_160x120_15_July_25.jpg",
    },
    {
      id: 6,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXRloDEtT_J00hcfbYUy8brS7k6S9yWq8sXA&s",
    },
  ];

  const buttons = [
    { id: 1, img: learnImg, label: t("Learn"), route: "/learn" },
    { id: 2, img: gamesImg, label: t("Quiz"), route: "/quiz" },
    { id: 3, img: rankImg, label: t("Visualize"), route: "/visualise" },
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
              <h1 className="text-2xl font-bold mb-4">
                {t("New Streak Achieved!")}
              </h1>
              <p>{t("You have been logging in daily for 10 days!")}</p>
              <img
                src="/streak.jpeg"
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
              className="absolute right-14 w-24 h-24"
              initial={{ opacity: 0, scale: 3 }}
              animate={{ opacity: 1, scale: 2.5 }}
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
          <p className="text-2xl font-semibold mb-4">{t("Your Peers")} </p>
          <div className="flex overflow-x-auto gap-4 py-3 px-1">
            {peerlist.map((peer) => (
              <div
                key={peer.id}
                className="flex-shrink-0 w-20 h-20 rounded-full border-2 border-main overflow-hidden"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Avatar className="w-full h-full md-5">
                      <AvatarImage
                        src={
                          peer.img ||
                          `https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Brown`
                        }
                        alt={`Peer ${peer.id}`}
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm">
                    <DialogHeader>
                      <DialogTitle>View Peer</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center">
                      <Avatar className="w-32 h-32 md-5">
                        <AvatarImage
                          src={
                            peer.img ||
                            `https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Brown`
                          }
                          alt={`Peer ${peer.id}`}
                          className="w-full h-full object-cover"
                        />
                      </Avatar>
                      <p className="mt-3 text-lg">Subhajit Behura</p>
                      <p className="text-sm text-(--chart-1)">Level 18</p>
                      {/* Circular Button Row */}
                      <div className="flex gap-4 mt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-12 h-12 rounded-full p-0 bg-(--chart-4) hover:bg-(--chart-4)/90">
                              <Download className="w-6 h-6" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-sm">
                            <DialogHeader>
                              <DialogTitle>NearbyShare Module</DialogTitle>
                            </DialogHeader>
                            <PeerDeviceLoader />
                          </DialogContent>
                        </Dialog>
                        <Button className="w-12 h-12 rounded-full p-0 bg-(--chart-3) hover:bg-(--chart-3)/90">
                          <Star />
                        </Button>
                        <Button className="w-12 h-12 rounded-full p-0 bg-(--chart-2) hover:bg-(--chart-2)/90">
                          <Sword />
                        </Button>
                      </div>
                      <p className="mb-2 mt-4 text-xl">
                        Past Quiz Battles with Subhajit
                      </p>
                      <div className="w-full max-h-48 overflow-y-auto">
                        <div className="space-y-2">
                          {[1, 2, 3].map((battle) => (
                            <div
                              key={battle}
                              className="flex justify-between items-center bg-secondary-background p-3 rounded-lg"
                            >
                              <div>
                                <p className="font-medium">
                                  {t("Quiz Battle")} #{battle}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {t("Date")}:{" "}
                                  <span className="font-normal">
                                    {t("2024-08-0" + battle)}
                                  </span>
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-(--chart-4)">
                                  {t("Won")}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {t("Score")}:{" "}
                                  <span
                                    className={
                                      battle % 2 === 0
                                        ? "text-(--chart-3)"
                                        : "text-(--chart-4)"
                                    }
                                  >
                                    {battle % 2 === 0 ? "80" : "95"}
                                  </span>
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 mb-4 mx-2">
          <h2 className="text-2xl font-semibold mb-4">{t("Recent Modules")}</h2>
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
