import express from "express";

import asteroidsQuery from "./asteroids/query";
import asteroidsYears from "./asteroids/years";

const router = express.Router();

import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: "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",
});

export const createInstructions = (instructions: string) => {
  return `Instruction: "${instructions}"
  Given the above instruction, please respond with the corrected text based on the following user input. Only provide the improved or formatted text without any additional explanations or descriptions.`;
};

export const correctWithGPTPrompt = async () =>
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
          "אני אוהב לשחק כדורגל עם החברים שלי בסופשבוע. אנחנו תמיד מנצחים את היריבים שלנו ואני מרגיש שאני השחקן הכי טוב בקבוצה שלי",
      },
    ],
  });

router.get("/", async (req, res) => {
  const response = await correctWithGPTPrompt();
  res.json({
    message: response.choices[0].message.content,
  });
});

router.use("/asteroids/query", asteroidsQuery);
router.use("/asteroids/years", asteroidsYears);

export default router;
