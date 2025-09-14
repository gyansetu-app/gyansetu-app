import { Flame, Coins } from "lucide-react";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 shadow-shadow mb-5">
      <div className="flex items-center gap-3">
        <img
          src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-border shadow-shadow"
        />

        <div className="flex flex-col leading-tight">
          <span className="text-sm text-foreground">Good morning</span>
          <span className="text-lg font-heading text-main">Akansha Sharma</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-secondary-background px-2 py-1 rounded-base border-2 border-border shadow-shadow">
          <Flame className="w-4 h-4 text-main" />
          <span className="font-base text-foreground">12</span>
        </div>

        <div className="flex items-center gap-1 bg-secondary-background px-2 py-1 rounded-base border-2 border-border shadow-shadow">
          <Coins className="w-4 h-4 text-main" />
          <span className="font-base text-foreground">$250</span>
        </div>
      </div>
    </div>
  );
}
