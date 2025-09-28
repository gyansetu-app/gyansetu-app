import { Home, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import MascotDialog from "./MascotDialog";
import { useTranslation } from "react-i18next";

export default function BottomBar() {
  const { t } = useTranslation();
  const location = useLocation();
  const active =
    location.pathname === "/"
      ? "home"
      : location.pathname === "/leaderboard"
      ? "leaders"
      : "";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t-2 border-border shadow-shadow px-6 py-3 flex items-end justify-between">
      <Link to="/">
        {active === "home" ? (
          <Button variant="noShadow">
            <Home className="!size-6" />
            {t("Home")}
          </Button>
        ) : (
          <Button variant="transparent">
            <Home className="!size-6" />
            {t("Home")}
          </Button>
        )}
      </Link>

      {/* Center section with mascot and visualise button stacked */}
      <div className="flex flex-col items-center gap-1">
        <MascotDialog />
      </div>

      <Link to="/leaderboard">
        {active === "leaders" ? (
          <Button variant="noShadow">
            <Trophy className="!size-6" />
            {t("Leaders")}
          </Button>
        ) : (
          <Button variant="transparent">
            <Trophy className="!size-6" />
            {t("Leaders")}
          </Button>
        )}
      </Link>
    </div>
  );
}
