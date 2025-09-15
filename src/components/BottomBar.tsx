import { Home, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import MascotDialog from "./MascotDialog";


export default function BottomBar() {
  const location = useLocation();
  const active =
    location.pathname === "/" ? "home" :
      location.pathname === "/leaderboard" ? "leaders" :
        "";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t-2 max-h-20 border-border shadow-shadow px-10 py-3 flex items-center justify-center gap-13">
      <Link to="/">{active === "home" ? (
        <Button variant="noShadow">
          <Home className="!size-6" />
          Home
        </Button>
      ) : (
        <Button variant="transparent">
          <Home className="!size-6" />
          Home
        </Button>
      )}
      </Link>

      <MascotDialog />
      <Link to="/leaderboard">
        {active === "leaders" ? (
          <Button variant="noShadow">
            <Trophy className="!size-6" />
            Leaders
          </Button>
        ) : (
          <Button variant="transparent">
            <Trophy className="!size-6" />
            Leaders
          </Button>

        )}
      </Link>

    </div>
  );
}
