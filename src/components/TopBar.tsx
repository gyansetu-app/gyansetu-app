import { useState } from "react";
import { Flame, Coins } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import CalendarDemo from "./home/StreakCalendar";
import { useNavigate } from "react-router-dom";
export default function TopBar() {
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-white px-4 py-2 shadow-shadow  sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8" onClick={() => navigate("/login")}>
            <AvatarImage
              src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
              alt="Profile"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="flex gap-1 items-center justify-center leading-tight">
            <span className="text-sm text-foreground">welcome</span>
            <span className="text-lg font-heading text-main">agni</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setShowCalendar((prev) => !prev)}
            className="flex items-center gap-1 bg-secondary-background px-1 py-1 rounded-base border-2 border-border shadow-shadow"
          >
            <Flame className="w-4 h-4 text-main !size-5" />
            <span className="font-base text-base text-foreground">4</span>
          </Button>
          <Button className="flex items-center gap-1 bg-secondary-background px-2 py-1 rounded-base border-2 border-border shadow-shadow">
            <Coins className="w-4 h-4 text-main !size-5" />
            <span className="font-base text-base text-foreground">250</span>
          </Button>
        </div>
      </div>

      {/* Calendar dropdown */}
      {showCalendar && <CalendarDemo />}
    </div>
  );
}
