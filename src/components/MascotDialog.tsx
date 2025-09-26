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

const SARVAM_KEY = import.meta.env.VITE_SARVAM_API_KEY as string;
const STT_URL = "https://api.sarvam.ai/speech-to-text";
const TTS_URL = "https://api.sarvam.ai/text-to-speech";
const CHAT_URL = "https://api.sarvam.ai/v1/chat/completions";
const TRANSLATE_URL = "https://api.sarvam.ai/translate";

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

async function sarvamTranslate(
  text: string,
  targetLang: string,
  sourceLang: string = "auto"
): Promise<string> {
  const payload = {
    input: text,
    source_language_code: sourceLang,
    target_language_code: targetLang,
    model: "sarvam-translate:v1",
  };

  const res = await fetch(TRANSLATE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-subscription-key": SARVAM_KEY,
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  const translated = json.translated_text;
  if (!translated) {
    console.error("Translation error or no translated_text:", json);
    return text;
  }
  return translated;
}

function Dictaphone({ onFinalAudio }: { onFinalAudio: (url: string) => void }) {
  const { recording, start, stop, audioBlob, setAudioBlob } =
    useAudioRecorder();
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  async function processAudio() {
    if (!audioBlob) return;
    setLoading(true);

    try {
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
      let aiReply =
        chatJson.choices?.[0]?.message?.content || "I didn't understand.";

      if (selectedLanguage && selectedLanguage !== "en-IN") {
        aiReply = await sarvamTranslate(aiReply, selectedLanguage, "en-IN");
      }

      const ttsRes = await fetch(TTS_URL, {
        method: "POST",
        headers: {
          "api-subscription-key": SARVAM_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: aiReply,
          speaker: "anushka",
          target_language_code: selectedLanguage || "en-IN",
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
      console.error("Error in processAudio:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Recording Status */}
      <div className="flex items-center gap-2 p-3 rounded-base border-2 border-border bg-secondary-background min-w-[200px] justify-center">
        <div
          className={`w-3 h-3 rounded-full ${
            recording ? "bg-red-500 animate-pulse" : "bg-gray-400"
          }`}
        ></div>
        <span className="text-sm font-base">
          {recording ? "🎙️ Recording..." : "🎤 Ready to record"}
        </span>
      </div>

      {/* Language Selection */}
      <div className="w-full max-w-[280px]">
        <label className="block text-sm font-base mb-2 text-foreground">
          Select Language:
        </label>
        <select
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full h-12 px-3 py-2 rounded-base border-2 border-border bg-secondary-background text-foreground text-sm font-base focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
          defaultValue=""
        >
          <option value="" disabled>
            Choose your language
          </option>
          <option value="en-IN">🇮🇳 English</option>
          <option value="hi-IN">🇮🇳 Hindi</option>
          <option value="od-IN">🇮🇳 Odia</option>
          <option value="bn-IN">🇮🇳 Bengali</option>
          <option value="ta-IN">🇮🇳 Tamil</option>
          <option value="te-IN">🇮🇳 Telugu</option>
          <option value="kn-IN">🇮🇳 Kannada</option>
          <option value="ml-IN">🇮🇳 Malayalam</option>
          <option value="mr-IN">🇮🇳 Marathi</option>
          <option value="gu-IN">🇮🇳 Gujarati</option>
          <option value="pa-IN">🇮🇳 Punjabi</option>
        </select>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3 flex-wrap justify-center">
        <Button
          onClick={start}
          disabled={recording}
          variant={recording ? "transparent" : "default"}
          className="min-w-[80px]"
        >
          {recording ? "Recording..." : "🎤 Start"}
        </Button>
        <Button
          onClick={stop}
          disabled={!recording}
          variant={!recording ? "transparent" : "neutral"}
          className="min-w-[80px]"
        >
          ⏹️ Stop
        </Button>
        <Button
          onClick={processAudio}
          disabled={!audioBlob || loading}
          variant={!audioBlob || loading ? "transparent" : "default"}
          className="min-w-[80px]"
        >
          {loading ? "⏳ Processing..." : "🚀 Send"}
        </Button>
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="w-full max-w-[350px] p-3 rounded-base border-2 border-border bg-secondary-background">
          <p className="text-xs font-base text-foreground/70 mb-1">You said:</p>
          <p className="text-sm text-foreground italic">"{transcript}"</p>
        </div>
      )}
    </div>
  );
}

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
        <div className="relative -top-6">
          <Button
            variant="neutral"
            className="h-17 w-17 hover:scale-105 transition-transform"
          >
            <Sparkles className="!size-6" />
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-heading text-main">
            🦉 Ask Your AI Companion
          </DialogTitle>
          <DialogDescription className="text-base text-foreground/70">
            Speak naturally and hear AI responses in your chosen language!
          </DialogDescription>
        </DialogHeader>

        {/* Mascot Animation */}
        <div className="flex justify-center my-4">
          <div className="relative">
            <Lottie
              animationData={mascotAnimation}
              loop
              className="h-48 w-48 mx-auto"
            />
            {/* Add a subtle glow effect around the mascot */}
            <div className="absolute inset-0 rounded-full bg-main/10 blur-xl -z-10"></div>
          </div>
        </div>

        {/* Main Interaction Area */}
        <Dictaphone onFinalAudio={(url) => setAiAudioUrl(url)} />

        {/* AI Response Section */}
        {aiAudioUrl && (
          <div className="mt-6 p-4 rounded-base border-2 border-border bg-secondary-background">
            <div className="text-center">
              <p className="mb-3 text-sm font-base text-foreground/70">
                🤖 AI Response:
              </p>
              <div className="bg-main/10 rounded-base p-3 border border-main/20">
                <audio
                  ref={audioRef}
                  src={aiAudioUrl}
                  controls
                  autoPlay
                  className="w-full"
                  style={{
                    height: "40px",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="neutral" className="w-full">
              ✨ Close Chat
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
