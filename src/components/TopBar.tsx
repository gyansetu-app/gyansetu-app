import { useState, useEffect } from "react";
import { Flame, Bell, ChevronDown, Settings } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import CalendarDemo from "./home/StreakCalendar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function TopBar() {
  const { t } = useTranslation();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  // Effect for flame animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-shadow sticky top-0 z-20 border-b-2 border-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar
              className="w-10 h-10 border-2 border-main hover:scale-105 transition-all cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <AvatarImage
                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                alt="Profile"
              />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <span className="text-xs text-foreground font-medium">
              {t("welcome")}
            </span>
            <span className="text-lg font-heading text-main">
              {t("Student")}{" "}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="transparent"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1 top-0.3  hover:bg-secondary-background"
          >
            <Bell className="w-5 h-5 text-main" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </Button>

          <Button
            onClick={() => setShowCalendar((prev) => !prev)}
            className={`flex items-center gap-2 bg-secondary-background px-3 py-1.5 rounded-base border-2 border-border shadow-shadow transition-all ${
              showCalendar ? "bg-main/10" : ""
            }`}
          >
            <Flame
              className={`w-5 h-5 text-main transition-transform ${
                animate ? "scale-125" : ""
              }`}
              style={{
                filter: animate
                  ? "drop-shadow(0 0 3px rgba(255, 100, 0, 0.7))"
                  : "none",
                color: animate ? "#ff4d00" : "",
              }}
            />
            <span className="font-medium text-base text-foreground">10</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                showCalendar ? "rotate-180" : ""
              }`}
            />
          </Button>
          {/* 
          <Button className="flex items-center gap-2 bg-secondary-background px-3 py-1.5 rounded-base border-2 border-border shadow-shadow hover:bg-secondary-background/80 transition-all">
            <Coins className="w-5 h-5 text-main" />
            <span className="font-medium text-base text-foreground">250</span>
          </Button> */}

          {/* Settings Button */}
          <Button
            variant="transparent"
            size="icon"
            onClick={() => navigate("/settings")}
            className="p-1 top-0.3 hover:bg-secondary-background"
          >
            <Settings className="w-5 h-5 text-main" />
          </Button>
        </div>
      </div>

      {/* Calendar dropdown */}
      {showCalendar && (
        <div className="absolute right-12 top-full z-30 mt-1 animate-in fade-in slide-in-from-top-5 duration-200">
          <CalendarDemo />
        </div>
      )}

      {/* Notifications dropdown */}
      {showNotifications && (
        <div className="absolute right-24 top-full z-30 mt-1 bg-white p-3 rounded-base shadow-shadow border-2 border-border w-72 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex justify-between items-center mb-2 pb-1 border-b">
            <h3 className="font-medium">Notifications</h3>
            <span className="text-xs bg-main/10 text-main px-2 py-1 rounded-full">
              2 new
            </span>
          </div>
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
            <div className="p-2 bg-secondary-background/50 rounded-base border border-border hover:bg-secondary-background cursor-pointer">
              <p className="text-sm font-medium">New quiz available</p>
              <p className="text-xs text-foreground/70">
                Science quiz for Class 10 is now available
              </p>
              <p className="text-xs text-main mt-1">5 minutes ago</p>
            </div>
            <div className="p-2 bg-secondary-background/50 rounded-base border border-border hover:bg-secondary-background cursor-pointer">
              <p className="text-sm font-medium">Assignment due</p>
              <p className="text-xs text-foreground/70">
                Math assignment due tomorrow
              </p>
              <p className="text-xs text-main mt-1">2 hours ago</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
