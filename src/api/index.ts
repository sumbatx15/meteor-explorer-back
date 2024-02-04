import express from "express";

import asteroidsQuery from "./asteroids/query";
import asteroidsYears from "./asteroids/years";
import { openai } from "../app";

const router = express.Router();

export const createInstructions = (instructions: string) => {
  return `Instruction: "${instructions}"
  Given the above instruction, please respond with the corrected text based on the following user input. Only provide the improved or formatted text without any additional explanations or descriptions.`;
};

export const correctWithGPTPrompt = async (model = "gpt-3.5-turbo-1106") =>
  openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: createInstructions(
          "Translate the following text into English. Ensure that the translation captures the essence of any slang, cultural nuances, and contextual subtleties. Aim for a natural and fluent English expression, maintaining consistency in tense and style. Adjust phrases as needed to sound idiomatic in English, while preserving the original meaning and sentiment of the text"
        ),
      },
      {
        role: "user",
        content:
          "אני אוהב לשחק כדורגל עם החברים שלי בסופשבוע. אנחנו תמיד מנצחים את היריבים שלנו ואני מרגיש שאני השחקן הכי טוב בקבוצה שלי ואני מאמין שאני יכול להפוך לשחקן מקצועי בעתיד.",
      },
    ],
  });

router.post("/", async (req, res) => {
  const response = await correctWithGPTPrompt(req.body.model);
  res.json({
    message: response.choices[0].message.content,
  });
});

router.post("/test", async (req, res) => {
  const startTime = Date.now();
  res.json({
    message: Date.now() - startTime,
  });
});

router.use("/asteroids/query", asteroidsQuery);
router.use("/asteroids/years", asteroidsYears);

export default router;
