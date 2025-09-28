"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./ui/card";
import { Check, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type Module = {
  id: number;
  name: string;
  status: "available" | "downloading" | "downloaded";
  size: number;
  progress?: number;
};

export default function PeerDeviceLoader() {
  const initialModules: Module[] = [
    { id: 1, name: "Intro to Trigonometry", status: "downloaded", size: 25 },
    { id: 2, name: "Ray Optics", status: "available", size: 55 },
    { id: 3, name: "Atomic Structure", status: "available", size: 40 },
    { id: 4, name: "Radioactivity", status: "available", size: 15 },
  ];

  const [modules, setModules] = useState(initialModules);
  const [step, setStep] = useState<"detect" | "found" | "loading" | "done">(
    "detect"
  );

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStep("found"), 2000));
    timers.push(setTimeout(() => setStep("loading"), 3000));
    timers.push(setTimeout(() => setStep("done"), 5000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const getText = () => {
    switch (step) {
      case "detect":
        return (
          <p className="mt-4 text-yellow-500 font-semibold">
            Detecting Peer Device...
          </p>
        );
      case "found":
        return (
          <p className="mt-4 text-green-500 font-semibold">Found Device ✅</p>
        );
      case "loading":
        return (
          <p className="mt-4 text-blue-500 font-semibold">
            Loading Available Modules...
          </p>
        );
      default:
        return null;
    }
  };

  const handleDownload = (id: number) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: "downloading", progress: 0 } : m
      )
    );

    const tick = () => {
      setModules((prev) =>
        prev.map((m) => {
          if (m.id === id && m.status === "downloading") {
            const jump = Math.floor(Math.random() * 10) + 2; // 2–11%
            const newProgress = Math.min((m.progress || 0) + jump, 100);

            if (newProgress >= 100) {
              return { ...m, status: "downloaded", progress: 100 };
            }

            // schedule next jump
            setTimeout(tick, Math.floor(Math.random() * 900) + 300); // 300–1200ms

            return { ...m, progress: newProgress };
          }
          return m;
        })
      );
    };

    // start first jump
    setTimeout(tick, Math.floor(Math.random() * 900) + 300);
  };

  return (
    <AnimatePresence mode="wait">
      {step !== "done" ? (
        <motion.div
          key="loader"
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Spinner */}
          <motion.div
            className="w-12 h-12 border-4 border-gray-300 border-t-amber-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 1,
            }}
          />
          {getText()}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mt-4 font-semibold">
            Modules Available for Download on Subhajit's device
          </p>
          <div className="mt-4 pe-2 overflow-y-auto">
            {modules.map((module) => (
              <Card key={module.id} className="mb-3 bg-white">
                <CardContent className="flex flex-col gap-2">
                  <div className="flex gap-5 items-center">
                    {module.status === "available" ? (
                      <Button
                        className="p-1 bg-(--chart-1)"
                        size="icon"
                        onClick={() => handleDownload(module.id)}
                      >
                        <Download className="w-5 h-5" />
                      </Button>
                    ) : module.status === "downloading" ? (
                      <Button
                        disabled
                        className="p-1 bg-(--chart-5)"
                        variant="noShadow"
                        size="icon"
                      >
                        {module.progress}%
                      </Button>
                    ) : module.status === "downloaded" ? (
                      <Button
                        className="p-2 bg-(--chart-4) hover:bg-green-500/90"
                        variant="noShadow"
                      >
                        <Check className="w-5 h-5" />
                      </Button>
                    ) : null}

                    <div className="flex flex-col">
                      <p>{module.name}</p>
                      <p className="text-gray-500">{module.size} MB</p>
                    </div>
                  </div>

                  {module.status === "downloading" && (
                    <Progress value={module.progress || 0} className="h-2" />
                  )}
                </CardContent>
              </Card>
            ))}
            <p className="text-sm font-normal">
              Downloading these modules will not use Mobile Data!
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
