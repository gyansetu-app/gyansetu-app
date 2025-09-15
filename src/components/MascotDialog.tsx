"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import Lottie from "lottie-react";
import mascotAnimation from "@/assets/Smiling Owl.json";

// 🔑 Sarvam API key from .env
const SARVAM_KEY = import.meta.env.VITE_SARVAM_API_KEY as string;

// API URLs
const STT_URL = "https://api.sarvam.ai/speech-to-text";
const TTS_URL = "https://api.sarvam.ai/text-to-speech";
const CHAT_URL = "https://api.sarvam.ai/v1/chat/completions";

// ---------- Hook to record audio ----------
function useAudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<BlobPart[]>([]);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    mediaRecorder.current = recorder;
    chunks.current = [];

    recorder.ondataavailable = (e) => chunks.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      setAudioBlob(blob);
      stream.getTracks().forEach((t) => t.stop());
    };

    recorder.start();
    setRecording(true);
  }

  function stop() {
    mediaRecorder.current?.stop();
    setRecording(false);
  }

  return { recording, start, stop, audioBlob, setAudioBlob };
}

// ---------- Dictaphone ----------
function Dictaphone({ onFinalAudio }: { onFinalAudio: (url: string) => void }) {
  const { recording, start, stop, audioBlob, setAudioBlob } =
    useAudioRecorder();
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");

  async function processAudio() {
    if (!audioBlob) return;
    setLoading(true);

    try {
      // 1️⃣ Speech → Text
      const formData = new FormData();
      formData.append("model", "saarika:v2.5");
      formData.append("language_code", "en-IN");
      formData.append("file", audioBlob, "speech.webm");

      const sttRes = await fetch(STT_URL, {
        method: "POST",
        headers: { "api-subscription-key": SARVAM_KEY },
        body: formData,
      });

      const sttJson = await sttRes.json();
      const userText = sttJson.transcript || "";
      setTranscript(userText);

      // 2️⃣ Send user text to Sarvam-M for AI response
      const chatRes = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SARVAM_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sarvam-m",
          messages: [{ role: "user", content: userText }],
        }),
      });

      const chatJson = await chatRes.json();
      const aiReply =
        chatJson.choices?.[0]?.message?.content || "I didn't understand.";

      // 3️⃣ Text → Speech
      const ttsRes = await fetch(TTS_URL, {
        method: "POST",
        headers: {
          "api-subscription-key": SARVAM_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: aiReply,
          speaker: "anushka",
        }),
      });

      const ttsJson = await ttsRes.json();

      if (ttsJson.audios && ttsJson.audios.length > 0) {
        const base64Audio = ttsJson.audios[0];
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const aiBlob = new Blob([bytes], { type: "audio/wav" });
        const aiUrl = URL.createObjectURL(aiBlob);

        onFinalAudio(aiUrl);
      } else {
        console.error("No audio received from TTS");
      }

      setAudioBlob(null);
    } catch (err) {
      console.error("Error processing audio:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p>Mic: {recording ? "🎙️ Recording…" : "Idle"}</p>
      <div className="flex gap-2">
        <Button onClick={start} disabled={recording}>
          Start
        </Button>
        <Button onClick={stop} disabled={!recording}>
          Stop
        </Button>
        <Button onClick={processAudio} disabled={!audioBlob || loading}>
          {loading ? "Processing…" : "Send"}
        </Button>
      </div>
      {transcript && (
        <p className="mt-2 text-sm text-gray-700">You said: {transcript}</p>
      )}
    </div>
  );
}

// ---------- Main Dialog ----------
export default function MascotDialog() {
  const [aiAudioUrl, setAiAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (aiAudioUrl && audioRef.current) {
      audioRef.current.load();
      audioRef.current
        .play()
        .catch((err) => console.warn("Autoplay failed:", err));
    }
  }, [aiAudioUrl]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative -top-11">
          <Button variant="neutral" className="h-17 w-17">
            <Sparkles className="!size-6" />
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ask Character</DialogTitle>
          <DialogDescription>
            Speak and hear the AI respond in voice!
          </DialogDescription>
        </DialogHeader>

        <Lottie animationData={mascotAnimation} loop className="h-72 mx-auto" />

        <Dictaphone onFinalAudio={(url) => setAiAudioUrl(url)} />

        {aiAudioUrl && (
          <div className="mt-4 text-center">
            <p className="mb-1">AI Response:</p>
            <audio ref={audioRef} src={aiAudioUrl} controls autoPlay />
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="neutral">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
