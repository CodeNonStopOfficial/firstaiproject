import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import { marked } from "marked";
dotenv.config({})

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Gemini Ai",
  });
});

app.post("/generate", async (req, res) => {
  const { text } = req.body;
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const interaction = await ai.interactions.create({
      model: "gemini-2.5-flash",
      input: text,
    });
    return res.json({
         result : marked(interaction.output_text),
         success : "true"
    })
  } catch (error) {
      console.log(error)
  }
});

app.listen(port, () => {
  console.log("Server is Running Now");
});
