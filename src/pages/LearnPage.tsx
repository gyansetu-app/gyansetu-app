"use client";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
// import React from 'react';
import { useNavigate } from "react-router-dom";
import { Atom, FlaskConical, Sigma, Monitor, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageCard from "@/components/ui/image-card";
import { useTranslation } from "react-i18next";

const LearnPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <TopBar />
      <main className="flex flex-col">
        <div className="flex p-2 gap-3 px-3">
          <Input
            placeholder={t("Search anything...")}
            className="w-full relative top-1 shadow-shadow"
          />
          <Button className="relative top-1 h-12 w-15 mr-1">
            <Search />
          </Button>
        </div>
        <div className="px-3 mx-2 mt-5">
          <p className="text-2xl">{t("Modules in Progress")}</p>
          <div className="flex flex-col">
            <Card className="mt-3 bg-white">
              <CardContent>
                <div className="flex flex-col">
                  <div className="flex">
                    <Avatar>
                      <AvatarImage src="https://cbx-prod.b-cdn.net/COLOURBOX17488026.jpg?width=80&height=80&quality=70" />
                      <AvatarFallback>TR</AvatarFallback>
                    </Avatar>
                    <div className="ml-3 mr-1 flex flex-col">
                      <p className="ml-3">
                        {t("A Basic Introduction to Trigonometry")}
                      </p>
                      <p className="ml-3">
                        {t("Teacher")}:{" "}
                        <span className="font-normal">
                          {t("Mrs. Jaya Chaturvedi")}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-3">
                    <p className="text-xs relative text-(--chart-3)">
                      {t("Stone 18 - 45% completed")}
                    </p>
                    <p className="text-xs relative text-(--chart-3)">
                      {t("34 Stones")}
                    </p>
                  </div>
                  <Progress value={45} className="" />
                </div>
              </CardContent>
            </Card>
            <Card className="mt-3 bg-white">
              <CardContent>
                <div className="flex flex-col">
                  <div className="flex">
                    <Avatar>
                      <AvatarImage src="https://i.pinimg.com/736x/9f/cf/03/9fcf03460710d991aa56fe671f3e0d58.jpg" />
                      <AvatarFallback>TR</AvatarFallback>
                    </Avatar>
                    <div
                      className="ml-3 mr-1 flex flex-col"
                      onClick={() => navigate("/learn/progress")}
                    >
                      <p className="ml-3">{t("Light and Optics")}</p>
                      <p className="ml-3">
                        {t("Teacher")}:{" "}
                        <span className="font-normal">
                          {t("Mr. Ram Govind")}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-3">
                    <p className="text-xs relative text-(--chart-3)">
                      {t("Stone 26 - 80% completed")}
                    </p>
                    <p className="text-xs relative text-(--chart-3)">
                      {t("30 Stones")}
                    </p>
                  </div>
                  <Progress value={80} className="" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mx-5 mt-5">
          <p className="text-2xl mb-3">{t("Explore on Diksha")}</p>
          <div className="flex gap-3 overflow-x-auto pb-3">
            <ImageCard
              className="min-w-[200px]"
              caption={t("NCERT Assignment on Light")}
              imageUrl="/learnPage/illustrations/optics.png"
            ></ImageCard>
            <ImageCard
              className="min-w-[200px]"
              caption={t("Flashcards on pulmonary system")}
              imageUrl="/learnPage/illustrations/pulmonary.png"
            ></ImageCard>
            <ImageCard
              className="min-w-[200px]"
              caption={t("CBSE Class 10 Chemistry Papers")}
              imageUrl="/learnPage/illustrations/test_papers.png"
            ></ImageCard>
          </div>
        </div>

        <div>
          <p className="text-2xl mx-5 mt-4">{t("View Subjects")}</p>
          <div className="flex justify-center items-start p-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
              <Button
                className="w-full h-40 flex flex-col items-center justify-center bg-(--chart-3) rounded-lg"
                onClick={() => navigate("/learn/physics")}
              >
                <Atom className="w-20 h-20 mb-4" />
                <span className="text-lg font-medium">{t("Physics")}</span>
              </Button>
              <Button
                className="w-full h-40 flex flex-col items-center justify-center bg-(--chart-4) rounded-lg"
                onClick={() => navigate("/learn/chemistry")}
              >
                <FlaskConical className="w-20 h-20 mb-4" />
                <span className="text-lg font-medium">{t("Chemistry")}</span>
              </Button>
              <Button
                className="w-full h-40 flex flex-col items-center justify-center bg-(--chart-1) rounded-lg"
                onClick={() => navigate("/learn/maths")}
              >
                <Sigma className="w-20 h-20 mb-4" />
                <span className="text-lg font-medium">{t("Maths")}</span>
              </Button>
              <Button
                className="w-full h-40 flex flex-col items-center justify-center bg-(--chart-2) rounded-lg"
                onClick={() => navigate("/learn/computer")}
              >
                <Monitor className="w-20 h-20 mb-4" />
                <span className="text-lg font-medium">{t("Computer")}</span>
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-35">{t("TRes")}</p>
      </main>
    </>
  );
};

export default LearnPage;
