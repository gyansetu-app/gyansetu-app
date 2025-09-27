"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Sparkles, Brain, Lightbulb, Zap } from "lucide-react";

const VideoVisualisePage = () => {
  const [concept, setConcept] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState("");

  const handleGenerateVideo = async () => {
    if (!concept.trim()) return;

    setIsGenerating(true);
    setVideoTitle(concept);

    try {
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: concept }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Video is generated, use the path returned from backend
        const videoUrl = `http://localhost:8000${result.videoPath}`;
        setGeneratedVideo(videoUrl);
      } else {
        console.error("Video generation failed:", result.error);
        alert("Failed to generate video. Please try again.");
      }
    } catch (error) {
      console.error("Error generating video:", error);
      alert(
        "Failed to generate video. Please check if the backend is running."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen  bg-background">
      <TopBar />

      <main className="flex flex-col mt-5 px-4 pb-20">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-heading text-main mb-2">
            🎥 AI Video Visualizer
          </h1>
          <p className="text-foreground/70 text-base">
            Transform any concept into engaging visual explanations
          </p>
        </div>

        {/* Main Input Section */}
        <Card className="mb-6 bg-secondary-background">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex gap-3 flex-col">
                <Input
                  placeholder="Enter any concept you want to visualize..."
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  className="flex-1 h-12 shadow-shadow"
                  onKeyPress={(e) => e.key === "Enter" && handleGenerateVideo()}
                />
                <Button
                  onClick={handleGenerateVideo}
                  disabled={isGenerating || !concept.trim()}
                  className="h-12 px-6"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-main-foreground border-t-transparent mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Video
                    </>
                  )}
                </Button>
              </div>

              {/* AI Features Info */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Brain className="w-4 h-4 text-main" />
                  AI-Powered Explanations
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Zap className="w-4 h-4 text-main" />
                  Instant Generation
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Video className="w-4 h-4 text-main" />
                  HD Quality Videos
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Lightbulb className="w-4 h-4 text-main" />
                  Visual Learning
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generated Video Section */}
        {(generatedVideo || isGenerating) && (
          <Card className="mb-6 bg-secondary-background">
            <CardContent className="p-6">
              <h3 className="text-xl font-heading text-main mb-4">
                📹{" "}
                {isGenerating
                  ? `Generating Video: ${videoTitle}`
                  : `Generated Video: ${videoTitle}`}
              </h3>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-64 bg-black/5 rounded-base border-2 border-dashed border-main/30">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-main border-t-transparent mb-4"></div>
                  <p className="text-foreground/70 text-center">
                    Creating your visualization...
                    <br />
                    <span className="text-sm">This may take a few moments</span>
                  </p>
                </div>
              ) : (
                <>
                  <div className="relative bg-black rounded-base overflow-hidden">
                    <video
                      controls
                      className="w-full h-64 object-contain"
                      src={generatedVideo || ""}
                      onError={(e) => {
                        console.error("Video loading error:", e);
                        alert(
                          "Error loading video. Please try generating again."
                        );
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default VideoVisualisePage;
