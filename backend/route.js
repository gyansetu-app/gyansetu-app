import express from "express";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();

app.use(express.json());
app.use(cors());

// Serve static video files
app.use(
  "/video",
  express.static(
    path.join(
      dirname(fileURLToPath(import.meta.url)),
      "media/videos/generated_script/480p15"
    )
  )
);

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  console.log("Received prompt:", prompt);

  if (!prompt.trim()) {
    return res.json({
      message: "Prompt is required",
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          text: `
Generate a simple, beginner-friendly Manim Community v0.19 code example.
Topic: ${prompt}

Requirements:
- Use only Scene, Text, and simple animations like FadeIn/FadeOut or Write.
- No advanced camera movements, no MarkupText, no complex VGroups.
- The code must run without any errors.
- Output only the Python code in a single class named BasicScene.
- Make sure it is compatible with: manim -pql file.py BasicScene

Output ONLY valid Python code.
Do NOT wrap it in triple backticks or include any markdown formatting.
`,
        },
      ],
    });

    const generatedText = response.text;

    fs.writeFileSync("generated_script.py", generatedText);

    const command = `manim -pql generated_script.py BasicScene`;
    console.log("Running:", command);

    exec("rm -rf media");

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Manim error:", stderr || error);
        return res
          .status(500)
          .json({ message: "Manim render failed", error: stderr || error });
      }
      console.log("Manim output:", stdout);
      res.json({
        message: "Manim render complete.",
        output: stdout,
        videoPath: "/video/BasicScene.mp4",
        success: true,
      });
    });
  } catch (error) {
    console.log("error", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
