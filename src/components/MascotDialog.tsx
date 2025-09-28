"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles, Mic, Square, Volume2, } from "lucide-react";
import Lottie from "lottie-react";
import mascotAnimation from "@/assets/Smiling Owl.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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

const LANGUAGES = [
  { code: "en-IN", name: "English", flag: "🇮🇳" },
  { code: "hi-IN", name: "Hindi", flag: "🇮🇳" },
  { code: "od-IN", name: "Odia", flag: "🇮🇳" },
  { code: "bn-IN", name: "Bengali", flag: "🇮🇳" },
  { code: "ta-IN", name: "Tamil", flag: "🇮🇳" },
  { code: "te-IN", name: "Telugu", flag: "🇮🇳" },
  { code: "kn-IN", name: "Kannada", flag: "🇮🇳" },
  { code: "ml-IN", name: "Malayalam", flag: "🇮🇳" },
  { code: "mr-IN", name: "Marathi", flag: "🇮🇳" },
  { code: "gu-IN", name: "Gujarati", flag: "🇮🇳" },
  { code: "pa-IN", name: "Punjabi", flag: "🇮🇳" },
];

function Dictaphone({
  onFinalAudio,
  onResponse,
  onLoadingChange,
  onRecordingChange,
}: {
  onFinalAudio: (url: string) => void;
  onResponse: (transcript: string, response: string) => void;
  onLoadingChange: (loading: boolean) => void;
  onRecordingChange: (recording: boolean) => void;
}) {
  const { recording, start, stop, audioBlob, setAudioBlob } =
    useAudioRecorder();
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-IN");
  const [recordingTime, setRecordingTime] = useState(0);
  const [, setIsHolding] = useState(false);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null);
  // const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (recording) {
      recordingInterval.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    };
  }, [recording]);

  // Auto-process when recording stops and we have audio
  useEffect(() => {
    if (!recording && audioBlob && !loading) {
      // Small delay to ensure smooth UX
      const timeout = setTimeout(() => {
        processAudio();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [recording, audioBlob]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMouseDown = () => {
    setIsHolding(true);
    start();
  };

  const handleMouseUp = () => {
    setIsHolding(false);
    if (recording) {
      stop();
    }
  };

  const handleTouchStart = () => {
    setIsHolding(true);
    start();
  };

  const handleTouchEnd = () => {
    setIsHolding(false);
    if (recording) {
      stop();
    }
  };

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

      // Pass both transcript and response to parent
      onResponse(userText, aiReply);

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

  // const resetRecording = () => {
  //   setAudioBlob(null);
  //   setRecordingTime(0);
  // };

  // Notify parent component of loading state changes
  useEffect(() => {
    onLoadingChange(loading);
  }, [loading, onLoadingChange]);

  // Notify parent component of recording state changes
  useEffect(() => {
    onRecordingChange(recording);
  }, [recording, onRecordingChange]);

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <div className="space-y-3">
        <Select
          onValueChange={(value) => setSelectedLanguage(value)}
          defaultValue={selectedLanguage}
        >
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select a Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Language</SelectLabel>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full px-4 py-3 border-4 border-black rounded-none bg-white text-black font-bold shadow-[4px_4px_0px_black] focus:shadow-[6px_6px_0px_black] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select> */}
      </div>

      {/* Recording Status */}
      <div className="text-center">
        <div
          className={`inline-flex items-center gap-3 px-6 py-4 border-4 border-black rounded-none font-bold text-lg transition-all ${
            recording
              ? "bg-red-400 shadow-[6px_6px_0px_black] animate-pulse"
              : loading
              ? "bg-yellow-400 shadow-[6px_6px_0px_black]"
              : "bg-green-400 shadow-[4px_4px_0px_black]"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full ${
              recording
                ? "bg-red-800"
                : loading
                ? "bg-yellow-800"
                : "bg-green-800"
            }`}
          ></div>
          <span>
            {loading
              ? "🤔 Buddy is thinking..."
              : recording
              ? `🎙️ Listening... ${formatTime(recordingTime)}`
              : "🎤 Hold to Talk to Buddy"}
          </span>
        </div>
      </div>

      {/* Hold to Record Button */}
      <div className="flex justify-center">
        <div className="relative">
          <Button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            disabled={loading}
            className={`h-24 w-24 rounded-full border-4 border-black font-bold text-white shadow-[6px_6px_0px_black] transition-all transform select-none ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : recording
                ? "bg-red-500 hover:bg-red-400 scale-110 shadow-[8px_8px_0px_black] animate-pulse"
                : "bg-blue-500 hover:bg-blue-400 hover:scale-105 hover:shadow-[8px_8px_0px_black] active:scale-95"
            }`}
          >
            {loading ? (
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : recording ? (
              <Square className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </Button>

          {/* Instruction Text */}
        </div>
      </div>
    </div>
  );
}

export default function MascotDialog() {
  const [aiAudioUrl, setAiAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (aiAudioUrl && audioRef.current) {
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Autoplay failed:", err));
    }
  }, [aiAudioUrl]);

  const handleResponse = (userTranscript: string, response: string) => {
    setTranscript(userTranscript);
    setAiResponse(response);
  };

  const handleLoadingChange = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const handleRecordingChange = (isRecording: boolean) => {
    setRecording(isRecording);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

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

      <DialogContent className="flex flex-col items-center overflow-y-auto bg-background shadow-shadow max-h-[80vh]">
        {/* Buddy Animation */}
        <p className="font-bold text-3xl">Ask Buddy</p>
        <div className="flex justify-center mb-6">
          <div
            className={`relative p-4 border-4 border-black shadow-[6px_6px_0px_black] transition-colors ${
              loading
                ? "bg-yellow-300 animate-pulse"
                : recording
                ? "bg-red-200"
                : "bg-gradient-to-br from-blue-200 to-purple-200"
            }`}
          >
            <Lottie
              animationData={mascotAnimation}
              loop
              className="h-32 w-32"
            />
            {/* Thinking indicator */}
            {loading && (
              <div className="absolute -top-2 -right-2 bg-white border-2 border-black rounded-full p-2 shadow-[2px_2px_0px_black]">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-black rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-black rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-black rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Interaction */}
        <Dictaphone
          onFinalAudio={setAiAudioUrl}
          onResponse={handleResponse}
          onLoadingChange={handleLoadingChange}
          onRecordingChange={handleRecordingChange}
        />

        {/* Conversation Display */}
        <div className="flex-1 w-full overflow-y-auto px-2 mt-6">
          {(transcript || aiResponse) && (
            <div className="space-y-4 mt-6 pt-6 border-t-4 border-black">
              {transcript && (
                <div className="border-4 border-black bg-blue-100 p-4 shadow-[4px_4px_0px_black]">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-black text-black">💬 You said:</h4>
                  </div>
                  <p className="font-bold text-gray-800 italic">
                    "{transcript}"
                  </p>
                </div>
              )}

              {aiResponse && (
                <div className="border-4 border-black bg-green-100 p-4 shadow-[4px_4px_0px_black]">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-black text-black">🦉 Buddy says:</h4>
                  </div>
                  <p className="font-bold text-gray-800 mb-4">{aiResponse}</p>

                  {aiAudioUrl && (
                    <div className="border-2 border-black bg-white p-3 shadow-[2px_2px_0px_black]">
                      <div className="flex items-center gap-3 mb-2">
                        <Button
                          onClick={playAudio}
                          className="h-10 px-4 border-2 border-black bg-purple-300 hover:bg-purple-200 text-black font-bold shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all rounded-none"
                        >
                          <Volume2 className="w-4 h-4 mr-1" />
                          Play Audio
                        </Button>
                        {isPlaying && (
                          <div className="flex items-center gap-1 font-bold text-green-600">
                            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                            Playing...
                          </div>
                        )}
                      </div>
                      <audio
                        ref={audioRef}
                        src={aiAudioUrl}
                        controls
                        onEnded={() => setIsPlaying(false)}
                        onPause={() => setIsPlaying(false)}
                        className="w-full h-10 border-2 border-black shadow-[2px_2px_0px_black]"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <DialogClose asChild>
          <Button className="w-full mt-10">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
