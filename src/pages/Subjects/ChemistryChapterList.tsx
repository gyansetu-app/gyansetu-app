import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Search, Lock, Play } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ChemistryChapterList() {
  const { t } = useTranslation();

  const chapter_list = [
    { id: 1, name: "Atomic Structure", status: "completed", progress: 100 },
    { id: 2, name: "Chemical Bonding", status: "completed", progress: 100 },
    { id: 3, name: "Thermodynamics", status: "locked", progress: 0 },
    { id: 4, name: "Equilibrium", status: "in-progress", progress: 50 },
    { id: 5, name: "Kinetics", status: "locked", progress: 0 },
    { id: 6, name: "Electrochemistry", status: "locked", progress: 0 },
    { id: 7, name: "Surface Chemistry", status: "locked", progress: 0 },
    { id: 8, name: "Coordination Compounds", status: "locked", progress: 0 },
    { id: 9, name: "Organic Chemistry Basics", status: "locked", progress: 0 },
    { id: 10, name: "Hydrocarbons", status: "locked", progress: 0 },
    {
      id: 11,
      name: "Haloalkanes and Haloarenes",
      status: "locked",
      progress: 0,
    },
    {
      id: 12,
      name: "Alcohols, Phenols and Ethers",
      status: "locked",
      progress: 0,
    },
  ];

  return (
    <>
      <TopBar />
      <main className="flex flex-col items-start pt-5 ">
        <p className="text-2xl mb-3 ms-3">{t("Chemistry Chapters")}</p>
        <div className="flex gap-3 px-3 w-full">
          <Input
            placeholder={t("Search anything...")}
            className="w-full relative top-1 shadow-shadow"
          />
          <Button className="relative top-1 h-12 w-15 mr-1">
            <Search />
          </Button>
        </div>
        {/* Chapter list */}
        <div className="px-3 mt-5 w-full">
          {chapter_list.map((chapter) => (
            <Card key={chapter.id} className="mt-3 bg-white w-full">
              <CardContent>
                <div className="flex gap-3">
                  {chapter.status === "completed" ? (
                    <div className="p-1 border-2 bg-(--chart-4) rounded-full mt-1">
                      <Check />
                    </div>
                  ) : chapter.status === "in-progress" ? (
                    <div className="bg-main p-1 border-2 rounded-full mt-1">
                      <Play />
                    </div>
                  ) : (
                    <div className="p-1 border-2 bg-gray-400 rounded-full mt-1">
                      <Lock />
                    </div>
                  )}
                  <p className="relative top-3">{chapter.name}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
