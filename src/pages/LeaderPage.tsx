"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

// Hardcoded leaderboard data
// Hardcoded STEM leaderboard data
const leaderboardData = [
  {
    id: 1,
    name: "Aryan Mehta",
    score: 2950,
    subjects: ["Mathematics", "Physics"],
    streak: 50,
    badge: "🔬 STEM Genius",
    avatar: "/mascots/owl.png",
    achievements: [
      "Solved 500 Advanced Math Problems",
      "Physics Olympiad Winner",
    ],
    level: "Prodigy",
  },
  {
    id: 2,
    name: "Nisha Kapoor",
    score: 2820,
    subjects: ["Computer Science", "Robotics"],
    streak: 45,
    badge: "🤖 Tech Innovator",
    avatar: "/mascots/owl.png",
    achievements: ["Built Autonomous Robot", "Hackathon Winner"],
    level: "Innovator",
  },
  {
    id: 3,
    name: "Rahul Singh",
    score: 2750,
    subjects: ["Chemistry", "Biology"],
    streak: 40,
    badge: "🧪 Lab Master",
    avatar: "/mascots/owl.png",
    achievements: ["Published Science Project", "Biology Quiz Champion"],
    level: "Scientist",
  },
  {
    id: 4,
    name: "Ananya Verma",
    score: 2680,
    subjects: ["Mathematics", "Astronomy"],
    streak: 35,
    badge: "🌌 Space Explorer",
    avatar: "/mascots/owl.png",
    achievements: ["Astronomy Research Published", "Math Competitions Winner"],
    level: "Astronomer",
  },
  {
    id: 5,
    name: "Dev Patel",
    score: 2600,
    subjects: ["Engineering", "Physics"],
    streak: 30,
    badge: "⚙️ Engineering Whiz",
    avatar: "/mascots/owl.png",
    achievements: ["Built Smart IoT Device", "Physics Quiz Champion"],
    level: "Engineer",
  },
  {
    id: 6,
    name: "Meera Reddy",
    score: 2550,
    subjects: ["Computer Science", "AI & ML"],
    streak: 28,
    badge: "🖥️ AI Specialist",
    avatar: "/mascots/owl.png",
    achievements: ["Created ML Model", "Algorithmic Challenge Winner"],
    level: "Programmer",
  },
  {
    id: 7,
    name: "Aditya Choudhary",
    score: 2500,
    subjects: ["Mathematics", "Data Science"],
    streak: 25,
    badge: "📊 Data Guru",
    avatar: "/mascots/owl.png",
    achievements: ["Data Analysis Projects", "Math Puzzle Champion"],
    level: "Analyst",
  },
  {
    id: 8,
    name: "Kavita Iyer",
    score: 2450,
    subjects: ["Physics", "Robotics"],
    streak: 20,
    badge: "🤖 Robo Expert",
    avatar: "/mascots/owl.png",
    achievements: ["Robot Design Winner", "Physics Olympiad Runner-up"],
    level: "Technologist",
  },
  {
    id: 9,
    name: "Rishi Mathur",
    score: 2400,
    subjects: ["Biology", "Chemistry"],
    streak: 18,
    badge: "🧬 Bio Chem Pro",
    avatar: "/mascots/owl.png",
    achievements: ["Genetics Project Awarded", "Chemistry Lab Expert"],
    level: "Researcher",
  },
  {
    id: 10,
    name: "Lakshmi Menon",
    score: 2350,
    subjects: ["Mathematics", "Computer Science"],
    streak: 15,
    badge: "💻 Coding Star",
    avatar: "/mascots/owl.png",
    achievements: ["Developed Web App", "Math Competition Finalist"],
    level: "Coder",
  },
];

const LeaderPage = () => {
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Top Learners 🏆
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {leaderboardData.map((leader, index) => (
          <Card
            key={leader.id}
            className={`transform transition-all hover:scale-102 ${
              index === 0 ? "bg-amber-50" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="font-bold text-3xl mr-4 w-10 text-center text-orange-600">
                  {index + 1}
                </div>
                <Avatar className="h-16 w-16 mr-4">
                  <img src={leader.avatar} alt={leader.name} />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-xl">{leader.name}</h3>
                    <span className="text-sm px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
                      {leader.level}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {leader.subjects.join(" • ")}
                  </div>
                  <div className="text-base mt-2">
                    <span className="text-orange-600 font-medium">
                      {leader.badge}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-2xl text-orange-600">
                    {leader.score}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {leader.streak} day streak 🔥
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-sm font-medium text-gray-600">
                  Recent Achievements:
                </div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {leader.achievements.map((achievement, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-orange-50 text-orange-700 rounded-full"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeaderPage;
