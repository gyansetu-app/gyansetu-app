"use client";

import { useState } from "react";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { QuizOnly } from "../../lib/room";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

const CopyIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="1.5" />
    <path
      d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
      strokeWidth="1.5"
    />
  </svg>
);

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
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <Card className="mb-6 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Student Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          {!joined ? (
            <div className="flex flex-col gap-4">
              <p className="text-center text-sm text-gray-600">
                Join an existing quiz with a code or create a new quiz for your
                class.
              </p>

              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="flex-1 relative w-full">
                  <label className="sr-only">Quiz Code</label>
                  <div className="flex items-center border rounded overflow-hidden">
                    <div className="px-3 text-gray-500">
                      <Avatar className="h-7 w-7">
                        <img src="/mascots/owl.png" alt="quiz" />
                      </Avatar>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter Quiz Code"
                      className="w-full p-2 outline-none"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                    />
                    <button
                      onClick={copyRoomId}
                      className="px-3 text-gray-500 hover:bg-gray-100"
                      aria-label="Copy room id"
                    >
                      <CopyIcon />
                    </button>
                  </div>
                </div>

                <div className="flex-shrink-0 flex gap-2">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow-sm hover:shadow-md transition"
                    onClick={() => setJoined(true)}
                    disabled={!roomId}
                  >
                    Join Quiz
                  </button>
                  <button
                    className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-4 py-2 rounded shadow-sm hover:shadow-md transition"
                    onClick={createQuiz}
                  >
                    Create Quiz
                  </button>
                </div>
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
                <ClientSideSuspense fallback={<div>Loading Quiz…</div>}>
                  <QuizOnly />
                </ClientSideSuspense>
              </RoomProvider>
            </LiveblocksProvider>
          )}

          {!joined && roomId && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="text-sm text-gray-700">Room ID:</div>
              <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                {roomId}
              </div>
              <button
                className="text-sm text-sky-600 hover:underline"
                onClick={copyRoomId}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizPage;
