"use client";

import { useState } from "react";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { QuizOnly } from "../../lib/room";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Copy, BookOpen, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

const QuizPage = () => {
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate random room ID for new quiz
  const createQuiz = () => {
    const newRoomId = "quiz-" + Math.floor(Math.random() * 1000000);
    setRoomId(newRoomId);
    setJoined(true);
  };

  const copyRoomId = async () => {
    if (!roomId) return;
    try {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // ignore
    }
  };

  return (
    <>
      <TopBar />
      <main className="flex flex-col">
        <div className="px-3 mx-2 mt-5">
          <p className="text-2xl mb-3">Student Quiz</p>
          <Card className="bg-white shadow-shadow border-2 border-border">
            <CardContent className="pt-6">
              {!joined ? (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-foreground">
                    Join an existing quiz with a code or create a new quiz for
                    your class.
                  </p>

                  <div className="flex flex-col md:flex-row items-center gap-3">
                    <div className="flex-1 relative w-full">
                      <div className="flex items-center">
                        <div className="px-2 text-main">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/mascots/owl.png" alt="quiz" />
                            <AvatarFallback>Q</AvatarFallback>
                          </Avatar>
                        </div>
                        <Input
                          type="text"
                          placeholder="Enter Quiz Code"
                          className="w-full shadow-shadow"
                          value={roomId}
                          onChange={(e) => setRoomId(e.target.value)}
                        />
                        <Button
                          variant="transparent"
                          className="ml-2"
                          onClick={copyRoomId}
                          aria-label="Copy room id"
                        >
                          <Copy className="h-4 w-4" />
                          {copied ? "Copied" : "Copy"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 mt-4">
                    <Button
                      variant="neutral"
                      onClick={() => setJoined(true)}
                      disabled={!roomId}
                      className="flex items-center"
                    >
                      <Users className="h-5 w-5" />
                      <span>Join Quiz</span>
                    </Button>
                    <Button onClick={createQuiz} className="flex items-center">
                      <BookOpen className="h-5 w-5" />
                      <span>Create Quiz</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <LiveblocksProvider
                  publicApiKey={import.meta.env.VITE_LIVEBLOCKS_API_KEY!}
                >
                  <RoomProvider
                    id={roomId}
                    initialPresence={{ name: "Student", score: 0 }}
                    initialStorage={{ leaderboard: {}, started: false }}
                  >
                    <ClientSideSuspense
                      fallback={
                        <div className="flex justify-center items-center p-8">
                          <p className="text-main font-medium">Loading Quiz…</p>
                        </div>
                      }
                    >
                      <QuizOnly />
                    </ClientSideSuspense>
                  </RoomProvider>
                </LiveblocksProvider>
              )}

              {!joined && roomId && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="text-sm text-foreground">Room ID:</div>
                  <div className="px-3 py-1 bg-secondary-background rounded-base text-sm font-medium border border-border">
                    {roomId}
                  </div>
                  <Button
                    variant="transparent"
                    size="sm"
                    className="text-sm"
                    onClick={copyRoomId}
                  >
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div style={{ height: "80px" }}></div>
      </main>
    </>
  );
};

export default QuizPage;
